import { useRef, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ApproachSection from "@/components/ApproachSection";
import MethodSection from "@/components/MethodSection";
import BookingSection from "@/components/BookingSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "Generational Nutrition LLC | Registered Dietitian | Medical Nutrition Therapy";
  }, []);
  
  // Refs for navigation
  const homeRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const yOffset = -80; // Account for header height
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const sections = [
    { name: "Home", ref: homeRef },
    { name: "Approach", ref: approachRef },
    { name: "Method", ref: methodRef },
    { name: "Book", ref: bookingRef },
    { name: "Gallery", ref: galleryRef },
    { name: "Reviews", ref: reviewsRef },
    { name: "Contact", ref: contactRef }
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header sections={sections} onNavigate={scrollToSection} />
      
      <main>
        <div ref={homeRef} id="home">
          <HeroSection onBookNow={() => scrollToSection(bookingRef)} />
        </div>
        
        <div ref={approachRef} id="approach">
          <ApproachSection />
        </div>
        
        <div ref={methodRef} id="method">
          <MethodSection />
        </div>
        
        <div ref={bookingRef} id="booking">
          <BookingSection />
        </div>
        
        <div ref={galleryRef} id="gallery">
          <GallerySection />
        </div>
        
        <NewsletterSection />
        
        <div ref={reviewsRef} id="reviews">
          <ReviewsSection />
        </div>
        
        <div ref={contactRef} id="contact">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
