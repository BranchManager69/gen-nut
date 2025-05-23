import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingSection() {
  useEffect(() => {
    // Load Calendly embed script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/nrsander/30min'
      });
    } else {
      // Fallback if Calendly hasn't loaded
      window.open('https://calendly.com/nrsander/30min', '_blank');
    }
  };

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
            Schedule Your First Session
          </h2>
          <p className="text-lg text-neutral-800">
            Begin your personalized nutrition journey with a comprehensive consultation designed to understand your unique needs and create a plan that fits your life.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-neutral-200 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-6 text-white">
              <h3 className="text-xl font-semibold font-heading mb-4">What to Expect in Your First Session</h3>
              <ul className="space-y-3">
                {["Get to know you—not just your health history, but your life as a whole", 
                  "Understand your lifestyle, routines, and challenges", 
                  "Explore what you're hoping to achieve through nutrition counseling", 
                  "Begin mapping out a personalized, realistic care plan"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-blue-400">
                <h4 className="font-medium mb-2">Specialized Care Areas:</h4>
                <ul className="space-y-2 text-sm">
                  {["Diabetes Management", 
                    "Chronic Kidney Disease", 
                    "Cardiovascular Disease", 
                    "Gastrointestinal Disorders"].map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="bg-white rounded-lg p-8 h-full flex flex-col justify-center items-center">
                <div className="text-center py-8 w-full max-w-md">
                  <div className="text-6xl text-primary mb-6">📅</div>
                  
                  <h3 className="text-2xl font-semibold font-heading mb-4 text-primary">
                    Ready to Get Started?
                  </h3>
                  
                  <p className="text-gray-600 mb-8">
                    Click below to view available time slots and book your free consultation instantly.
                  </p>
                  
                  <Button
                    onClick={openCalendly}
                    className="bg-accent hover:bg-opacity-90 text-white font-medium py-4 px-8 rounded-lg transition-all transform hover:scale-105 w-full text-lg"
                  >
                    Schedule Your Free Consultation
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Choose from available time slots that work best for you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
