import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeartPulse, UserCog, Target } from "lucide-react";

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
            Evidence-based, individualized nutrition care provided by a Registered Dietitian Nutritionist (RDN) to manage and treat medical conditions through comprehensive assessment, intervention, and ongoing support.
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
            <h3 className="text-xl font-semibold font-heading mb-3">Compassionate Care</h3>
            <p className="text-neutral-800">
              Rooted in compassion and understanding, creating a safe, supportive space for open conversations about food, health, and your body.
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
            <h3 className="text-xl font-semibold font-heading mb-3">Collaborative & Personal</h3>
            <p className="text-neutral-800">
              Patient-centered approach where your lifestyle, preferences, medical history, and personal goals guide every part of our work together.
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
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold font-heading mb-3">Whole-Person Approach</h3>
            <p className="text-neutral-800">
              Beyond just food—addressing movement, stress, sleep, and lifestyle factors that impact your health for generational wellness.
            </p>
          </motion.div>
        </div>
        
        <div className="text-center mt-10">
          <Button
            onClick={toggleAbout}
            className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all"
          >
            {showAbout ? "Show Less" : "Meet Renee"}
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
                  src="/images/renee-hertenberger.png" 
                  alt="Renee Hertenberger, Registered Dietitian" 
                  className="rounded-full w-48 h-48 object-cover mx-auto shadow-md" 
                />
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-bold font-heading text-primary mb-3">About Renee Hertenberger, RD</h3>
                <p className="mb-4">
                  Hi, I'm Renee Hertenberger, a Registered Dietitian with a passion for integrative medicine and the powerful role food plays in our overall health and well-being. I believe nutrition is more than just what we eat—it's deeply connected to our social lives, emotions, behaviors, and identity.
                </p>
                <p className="mb-4">
                  Using an evidence-based approach, I help individuals navigate chronic conditions such as diabetes, chronic kidney disease, cardiovascular disease, and gastrointestinal disorders through personalized lifestyle changes that feel realistic and empowering.
                </p>
                <p>
                  My goal is to meet you where you are, listen to your story, and work with you to create a plan that supports not only your physical health but also your emotional and mental well-being—because true wellness is about living a life filled with energy, confidence, and freedom to pursue what matters most to you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
