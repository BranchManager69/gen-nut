import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeartPulse, UserCog, MapPin } from "lucide-react";

export default function ApproachSection() {
  const [showAbout, setShowAbout] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5 }
    })
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
            Medical Nutrition Therapy
          </h2>
          <p className="text-lg text-neutral-800">
            A science-based approach that addresses nutritional imbalances to improve health outcomes through personalized dietary interventions.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="bg-neutral-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-secondary text-3xl mb-4">
              <HeartPulse className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold font-heading mb-3">Evidence-Based</h3>
            <p className="text-neutral-800">
              All recommendations are grounded in the latest nutritional science and clinical research.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-neutral-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-secondary text-3xl mb-4">
              <UserCog className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold font-heading mb-3">Personalized</h3>
            <p className="text-neutral-800">
              Your nutrition plan is tailored to your unique health needs, preferences, and lifestyle.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-neutral-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-secondary text-3xl mb-4">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold font-heading mb-3">Sustainable</h3>
            <p className="text-neutral-800">
              Focus on creating lasting habits that can be maintained for long-term health improvements.
            </p>
          </motion.div>
        </div>
        
        <div className="text-center mt-10">
          <Button
            onClick={toggleAbout}
            className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all"
          >
            {showAbout ? "Show Less" : "Learn More About Me"}
          </Button>
        </div>
        
        {/* Expandable About Section */}
        <motion.div 
          className={`mt-12 max-w-4xl mx-auto ${showAbout ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showAbout ? 1 : 0,
            height: showAbout ? "auto" : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-neutral-200 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Nutritionist portrait" 
                  className="rounded-full w-48 h-48 object-cover mx-auto shadow-md" 
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-bold font-heading text-primary mb-3">About the Nutritionist</h3>
                <p className="mb-4">
                  With over 10 years of experience in medical nutrition therapy, I help clients address health concerns through evidence-based dietary interventions. My approach combines clinical expertise with compassionate coaching to create sustainable health improvements.
                </p>
                <p>
                  I hold a Master's degree in Nutrition Science and maintain certifications in specialized areas including digestive health, sports nutrition, and chronic disease management.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
