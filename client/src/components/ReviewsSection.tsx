import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

type Review = {
  initials: string;
  stars: number;
  quote: string;
  name: string;
  duration: string;
};

export default function ReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const reviews: Review[] = [
    {
      initials: "NS",
      stars: 5,
      quote: "Working with Renee changed my relationship with food. I've finally found a sustainable approach to eating that supports my health conditions while still enjoying meals.",
      name: "Nick S.",
      duration: "Client for 8 months"
    },
    {
      initials: "RS",
      stars: 5,
      quote: "After struggling with digestive issues for years, Renee's personalized nutrition plan helped me identify trigger foods and rebuild a diet that works for my body. My symptoms have improved dramatically.",
      name: "Robert S.",
      duration: "Client for 1 year"
    },
    {
      initials: "MT",
      stars: 4.5,
      quote: "Renee's consultation process was so thorough. Instead of generic advice, I received a plan that considered my medical history, lifestyle, and preferences. It's been easy to follow and the results speak for themselves.",
      name: "Maria T.",
      duration: "Client for 4 months"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  
  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-5 w-5 text-neutral-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-5 w-5 fill-accent text-accent" />
            </div>
          </div>
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-5 w-5 text-neutral-300" />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-white via-neutral-50 to-white section-padding">
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
            What Clients Are Saying
          </h2>
          <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
            Real stories from people who have transformed their health through personalized nutrition therapy.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-10 md:p-12 border border-accent/10"
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Review Content */}
              <div className="text-center">
                <blockquote className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-8 italic">
                  "{reviews[currentSlide].quote}"
                </blockquote>
                
                <div className="flex flex-col items-center space-y-4">
                  {/* Stars */}
                  <div className="flex justify-center">
                    {renderStars(reviews[currentSlide].stars)}
                  </div>
                  
                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {reviews[currentSlide].initials}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-primary text-lg">
                        {reviews[currentSlide].name}
                      </div>
                      <div className="text-accent font-medium text-sm">
                        {reviews[currentSlide].duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full border-2 border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
              >
                <ChevronLeft className="h-5 w-5 text-accent" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-accent shadow-lg' 
                        : 'bg-neutral-300 hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full border-2 border-accent/30 hover:border-accent hover:bg-accent/10 transition-all"
              >
                <ChevronRight className="h-5 w-5 text-accent" />
              </Button>
            </div>
          </div>
          
          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-2xl p-8 border border-accent/20">
              <h3 className="text-2xl font-bold font-heading text-primary mb-4">
                Ready to Start Your Own Success Story?
              </h3>
              <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                Join hundreds of clients who have transformed their health through personalized nutrition therapy.
              </p>
              <Button 
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                onClick={() => {
                  const bookingSection = document.getElementById('booking');
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Book Your Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
