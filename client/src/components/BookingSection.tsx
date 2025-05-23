import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Clock, Users, Star } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    Calendly: any;
  }
}

export default function BookingSection() {
  useEffect(() => {
    // Initialize Calendly embed script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openCalendly = () => {
    // Open Calendly in a popup
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/nrsander/30min'
      });
    } else {
      // Fallback to opening in new tab
      window.open('https://calendly.com/nrsander/30min', '_blank');
    }
  };

  return (
    <section className="bg-gradient-to-br from-neutral-50 to-white section-padding">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
            Schedule Your First Session
          </h2>
          <p className="text-xl text-neutral-700 leading-relaxed">
            Begin your personalized nutrition journey with a comprehensive consultation designed to understand your unique needs and create a plan that fits your life.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-accent/10">
            <div className="flex flex-col lg:flex-row">
              <motion.div 
                className="lg:w-2/5 bg-gradient-to-br from-primary to-secondary p-8 text-white"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-2xl font-bold font-heading">What to Expect</h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {["Get to know you—not just your health history, but your life as a whole", 
                    "Understand your lifestyle, routines, and challenges", 
                    "Explore what you're hoping to achieve through nutrition counseling", 
                    "Begin mapping out a personalized, realistic care plan"].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-1" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="border-t border-white/20 pt-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 text-accent mr-2" />
                    <h4 className="font-bold text-lg">Specialized Care Areas:</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Diabetes Management", 
                      "Chronic Kidney Disease", 
                      "Cardiovascular Disease", 
                      "GI Disorders"].map((service, index) => (
                      <motion.div 
                        key={index}
                        className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-sm font-medium">{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-3/5 p-8 lg:p-12"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="mb-8">
                    <div className="text-8xl mb-6 text-accent">📅</div>
                    
                    <h3 className="text-3xl font-bold font-heading mb-4 text-primary">
                      Ready to Get Started?
                    </h3>
                    
                    <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
                      Click below to view available time slots and book your free consultation instantly.
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <Button
                      onClick={openCalendly}
                      className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg w-full"
                    >
                      Schedule Your Free Consultation
                    </Button>
                    
                    <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-accent mr-2" />
                        <span>30 minutes</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-accent mr-2" />
                        <span>Virtual or Phone</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-accent mr-2" />
                        <span>Completely Free</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-neutral-500 italic">
                      Choose from available time slots that work best for your schedule
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
