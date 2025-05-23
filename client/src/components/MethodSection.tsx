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
      color: "bg-primary",
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
      color: "bg-secondary",
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
      color: "bg-accent",
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
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            My Consulting Method
          </h2>
          <p className="text-lg text-neutral-800 mb-6">
            A structured approach to transform your nutrition and health.
          </p>
          <Button 
            onClick={openAssessment}
            variant="secondary" 
            className="bg-secondary text-white py-3 px-6 rounded-full mb-8 text-base font-medium hover:bg-secondary/90 transition-all transform hover:scale-105"
          >
            Take an Assessment
          </Button>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className={`md:w-1/3 ${step.color} text-white p-6 flex flex-col justify-center items-center text-center`}>
                    <span className="text-5xl font-bold mb-2">{step.number}</span>
                    <h3 className="text-2xl font-semibold font-heading">{step.title}</h3>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <p className="text-neutral-800 mb-4">{step.description}</p>
                    <ul className="list-disc list-inside text-neutral-800 space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i}>{item}</li>
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
