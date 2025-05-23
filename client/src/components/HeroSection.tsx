import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onBookNow: () => void;
};

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const handleApproachClick = () => {
    const approachSection = document.getElementById('approach');
    if (approachSection) {
      approachSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMethodClick = () => {
    const methodSection = document.getElementById('method');
    if (methodSection) {
      methodSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-white pt-20 md:pt-24">
      <div className="container h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <img 
                src="/images/logo.png" 
                alt="Generational Nutrition - Medical Nutrition Therapy" 
                className="w-full h-auto rounded-2xl shadow-lg max-w-lg mx-auto" 
              />
            </div>
          </motion.div>
          
          {/* Right Side - Content & Buttons */}
          <motion.div 
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            
            {/* Logo/Brand */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-primary mb-4">
                Generational Nutrition
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium">
                Medical Nutrition Therapy
              </p>
            </motion.div>

            {/* Slogan */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-md mx-auto lg:mx-0">
                Transform your health with evidence-based nutrition care and compassionate, personalized support.
              </p>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex flex-col space-y-4 max-w-sm mx-auto lg:mx-0">
                
                <Button
                  onClick={handleApproachClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left py-4 px-6 text-lg font-medium border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  Approach
                </Button>

                <Button
                  onClick={handleMethodClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left py-4 px-6 text-lg font-medium border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  About Me
                </Button>

                <Button
                  disabled
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left py-4 px-6 text-lg font-medium border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                >
                  Newsletter <span className="text-sm">(Coming Soon)</span>
                </Button>

                <Button
                  onClick={onBookNow}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left py-4 px-6 text-lg font-medium border-2 border-primary hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Book Consultation
                </Button>

                <Button
                  onClick={handleContactClick}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left py-4 px-6 text-lg font-medium border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  Contact Us!
                </Button>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
