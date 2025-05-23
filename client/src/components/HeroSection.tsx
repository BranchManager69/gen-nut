import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onBookNow: () => void;
};

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section className="pt-20 md:pt-24 section-padding">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-primary mb-4">
              Medical Nutrition Therapy for Lasting Wellness
            </h1>
            <p className="text-xl text-neutral-800 mb-8">
              Evidence-based nutrition care with a compassionate, personalized approach. Build sustainable habits that support your health conditions and create generational wellness.
            </p>
            <Button 
              onClick={onBookNow}
              className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              Schedule Your Consultation
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/images/gn-image-2.png" 
              alt="Generational Nutrition - Medical Nutrition Therapy" 
              className="rounded-lg shadow-xl w-full h-auto" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
