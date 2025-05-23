import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AssessmentModal from "./AssessmentModal";

export default function MethodSection() {
  const [showAssessment, setShowAssessment] = useState(false);

  const openAssessment = () => {
    // Option 1: Use the in-page modal
    setShowAssessment(true);
    
    // Option 2: Use external form (uncomment to use instead)
    // window.open('https://forms.gle/YOUR_GOOGLE_FORM_ID', '_blank');
  };

  const steps = [
    {
      number: 1,
      title: "Identify",
      colorClass: "method-step-1",
      description: "Through comprehensive assessment and conversation, we identify your unique needs, current routine, medical history, and vision for change.",
      items: [
        "Complete health and nutrition assessment",
        "Understanding your lifestyle and preferences",
        "Identifying barriers and challenges",
        "Setting realistic, collaborative goals"
      ]
    },
    {
      number: 2,
      title: "Create",
      colorClass: "method-step-2",
      description: "Together, we design a personalized care plan that aligns with your life, medical needs, and long-term wellness goals.",
      items: [
        "Evidence-based nutrition interventions",
        "Lifestyle modification strategies",
        "Practical meal planning guidance",
        "Sustainable habit formation techniques"
      ]
    },
    {
      number: 3,
      title: "Refine",
      colorClass: "method-step-3",
      description: "Through ongoing support and accountability, we monitor progress, make adjustments, and refine your approach for lasting success.",
      items: [
        "Regular progress monitoring and evaluation",
        "Plan adjustments based on your response",
        "Problem-solving and strategy refinement",
        "Building long-term maintenance skills"
      ]
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
            My Consulting Method
          </h2>
          <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
            A structured approach to transform your nutrition and health through evidence-based care.
          </p>
          <Button 
            onClick={openAssessment}
            className="bg-accent hover:bg-accent/90 text-white py-4 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Take an Assessment
          </Button>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02]"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`md:w-1/3 ${step.colorClass} text-white p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:brightness-110`}>
                    <motion.span 
                      className="text-6xl md:text-7xl font-bold mb-3 font-heading"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.number}
                    </motion.span>
                    <h3 className="text-2xl md:text-3xl font-bold font-heading tracking-wide">{step.title}</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <p className="text-neutral-700 mb-6 text-lg leading-relaxed">{step.description}</p>
                    <ul className="space-y-3">
                      {step.items.map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start text-neutral-700"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <span className="text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <AssessmentModal 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
      />
    </section>
  );
}
