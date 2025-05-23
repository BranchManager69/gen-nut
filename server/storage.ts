import { 
  InsertNewsletterSubscriber, 
  NewsletterSubscriber,
  InsertContactMessage,
  ContactMessage,
  InsertBooking,
  Booking,
  InsertReview,
  Review
} from "@shared/schema";

export interface IStorage {
  // Newsletter operations
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage & { documentUrls?: string[] }): Promise<ContactMessage>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Review operations
  createReview(review: InsertReview): Promise<Review>;
  getReview(id: number): Promise<Review | undefined>;
  getAllReviews(approvedOnly?: boolean): Promise<Review[]>;
  approveReview(id: number): Promise<Review | undefined>;
}

export class MemStorage implements IStorage {
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private contactMessages: Map<number, ContactMessage>;
  private bookings: Map<number, Booking>;
  private reviews: Map<number, Review>;
  
  private subscriberId: number;
  private messageId: number;
  private bookingId: number;
  private reviewId: number;
  
  constructor() {
    this.newsletterSubscribers = new Map();
    this.contactMessages = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    
    this.subscriberId = 1;
    this.messageId = 1;
    this.bookingId = 1;
    this.reviewId = 1;
    
    // Initialize with sample reviews
    this.initializeReviews();
  }
  
  private initializeReviews() {
    const sampleReviews: InsertReview[] = [
      {
        initials: "JD",
        name: "Jane D.",
        stars: 5,
        quote: "Working with Generational Nutrition changed my relationship with food. I've finally found a sustainable approach to eating that supports my health conditions while still enjoying meals.",
        duration: "Client for 8 months",
      },
      {
        initials: "RS",
        name: "Robert S.",
        stars: 5,
        quote: "After struggling with digestive issues for years, the personalized nutrition plan helped me identify trigger foods and rebuild a diet that works for my body. My symptoms have improved dramatically.",
        duration: "Client for 1 year",
      },
      {
        initials: "MT",
        name: "Maria T.",
        stars: 4,
        quote: "The consultation process was so thorough. Instead of generic advice, I received a plan that considered my medical history, lifestyle, and preferences. It's been easy to follow and the results speak for themselves.",
        duration: "Client for 6 months",
      }
    ];
    
    sampleReviews.forEach(review => {
      this.createReview({
        ...review,
      }).then(r => {
        this.approveReview(r.id);
      });
    });
  }
  
  // Newsletter operations
  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = this.subscriberId++;
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      createdAt: new Date(),
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }
  
  async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | undefined> {
    return Array.from(this.newsletterSubscribers.values()).find(
      subscriber => subscriber.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }
  
  // Contact operations
  async createContactMessage(message: InsertContactMessage & { documentUrls?: string[] }): Promise<ContactMessage> {
    const id = this.messageId++;
    const newMessage: ContactMessage = {
      ...message,
      id,
      documentUrls: message.documentUrls || null,
      createdAt: new Date(),
      isRead: false,
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      const updatedMessage = { ...message, isRead: true };
      this.contactMessages.set(id, updatedMessage);
      return updatedMessage;
    }
    return undefined;
  }
  
  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const newBooking: Booking = {
      ...booking,
      id,
      createdAt: new Date(),
      status: "pending",
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      const updatedBooking = { ...booking, status };
      this.bookings.set(id, updatedBooking);
      return updatedBooking;
    }
    return undefined;
  }
  
  // Review operations
  async createReview(review: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const newReview: Review = {
      ...review,
      id,
      createdAt: new Date(),
      isApproved: false,
    };
    this.reviews.set(id, newReview);
    return newReview;
  }
  
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }
  
  async getAllReviews(approvedOnly: boolean = false): Promise<Review[]> {
    let reviews = Array.from(this.reviews.values());
    
    if (approvedOnly) {
      reviews = reviews.filter(review => review.isApproved);
    }
    
    return reviews.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async approveReview(id: number): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (review) {
      const updatedReview = { ...review, isApproved: true };
      this.reviews.set(id, updatedReview);
      return updatedReview;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
