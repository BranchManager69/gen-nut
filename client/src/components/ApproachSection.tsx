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
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
            Medical Nutrition Therapy
          </h2>
          <p className="text-xl text-neutral-700 leading-relaxed">
            Evidence-based, individualized nutrition care provided by a Registered Dietitian Nutritionist (RDN) to manage and treat medical conditions through comprehensive assessment, intervention, and ongoing support.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-white to-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-accent/10"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-accent text-4xl mb-6 flex justify-center">
              <HeartPulse className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-primary">Compassionate Care</h3>
            <p className="text-neutral-700 leading-relaxed">
              Rooted in compassion and understanding, creating a safe, supportive space for open conversations about food, health, and your body.
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-accent/30 rounded mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-white to-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-primary/10"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-primary text-4xl mb-6 flex justify-center">
              <UserCog className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-primary">Collaborative & Personal</h3>
            <p className="text-neutral-700 leading-relaxed">
              Patient-centered approach where your lifestyle, preferences, medical history, and personal goals guide every part of our work together.
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-white to-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-accent/10"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="text-accent text-4xl mb-6 flex justify-center">
              <Target className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-primary">Whole-Person Approach</h3>
            <p className="text-neutral-700 leading-relaxed">
              Beyond just food—addressing movement, stress, sleep, and lifestyle factors that impact your health for generational wellness.
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-accent/30 rounded mx-auto"></div>
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={toggleAbout}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {showAbout ? "Show Less" : "Meet Renee"}
          </Button>
        </div>
        
        {/* Expandable About Section */}
        <motion.div 
          className={`mt-16 max-w-5xl mx-auto ${showAbout ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showAbout ? 1 : 0,
            height: showAbout ? "auto" : 0
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-gradient-to-br from-white to-accent/5 p-10 rounded-2xl shadow-xl border border-accent/20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-accent to-primary rounded-full opacity-20 blur"></div>
                  <img 
                    src="/images/renee-hertenberger.png" 
                    alt="Renee Hertenberger, Registered Dietitian" 
                    className="relative rounded-full w-56 h-56 object-cover mx-auto shadow-lg border-4 border-white" 
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-10">
                <h3 className="text-3xl font-bold font-heading text-primary mb-4 flex items-center">
                  About Renee Hertenberger, RD
                  <span className="ml-3 w-3 h-3 bg-accent rounded-full"></span>
                </h3>
                <p className="mb-6 text-lg text-neutral-700 leading-relaxed">
                  Hi, I'm Renee Hertenberger, a Registered Dietitian with a passion for integrative medicine and the powerful role food plays in our overall health and well-being. I believe nutrition is more than just what we eat—it's deeply connected to our social lives, emotions, behaviors, and identity.
                </p>
                <p className="mb-6 text-lg text-neutral-700 leading-relaxed">
                  Using an evidence-based approach, I help individuals navigate chronic conditions such as diabetes, chronic kidney disease, cardiovascular disease, and gastrointestinal disorders through personalized lifestyle changes that feel realistic and empowering.
                </p>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  My goal is to meet you where you are, listen to your story, and work with you to create a plan that supports not only your physical health but also your emotional and mental well-being—because true wellness is about living a life filled with energy, confidence, and freedom to pursue what matters most to you.
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <div className="h-1 flex-1 bg-gradient-to-r from-primary via-accent to-secondary rounded"></div>
                  <span className="text-accent font-semibold">Evidence-Based Care</span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-secondary via-accent to-primary rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
