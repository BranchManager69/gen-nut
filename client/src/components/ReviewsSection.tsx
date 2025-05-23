import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <section className="bg-white section-padding">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            What Clients Are Saying
          </h2>
          <p className="text-lg text-neutral-800">
            Real experiences from people who have transformed their nutrition and health.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonials Carousel */}
          <div className="reviews-carousel">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className={`${currentSlide === index ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-neutral-200 rounded-xl p-6 md:p-8 shadow-md">
                  <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto md:mx-0 flex items-center justify-center text-2xl text-primary font-bold">
                        {review.initials}
                      </div>
                    </div>
                    <div className="md:w-3/4 md:pl-6">
                      <div className="flex mb-3 justify-center md:justify-start">
                        {Array.from({ length: Math.floor(review.stars) }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {review.stars % 1 !== 0 && (
                          <div className="relative">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1/2">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                      </div>
                      <blockquote className="text-lg italic mb-4">{review.quote}</blockquote>
                      <cite className="font-medium block">— {review.name}, {review.duration}</cite>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none z-10"
            onClick={prevSlide}
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none z-10"
            onClick={nextSlide}
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </Button>
          
          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
