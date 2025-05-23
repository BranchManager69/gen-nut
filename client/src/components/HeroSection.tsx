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
              Transform Your Health Through Nutrition
            </h1>
            <p className="text-xl text-neutral-800 mb-8">
              Personalized medical nutrition therapy to help you achieve lasting health improvements and wellness goals.
            </p>
            <Button 
              onClick={onBookNow}
              className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md"
            >
              Book Free Consultation
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Nutrition consultation session" 
              className="rounded-lg shadow-xl w-full h-auto" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
