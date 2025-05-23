import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function MethodSection() {
  const steps = [
    {
      number: 1,
      title: "Identify",
      color: "bg-primary",
      description: "Through comprehensive assessment and analysis, we identify your current nutritional status, health concerns, and goals.",
      items: [
        "Health history evaluation",
        "Dietary pattern analysis",
        "Lab result interpretation (if available)",
        "Goal setting and prioritization"
      ]
    },
    {
      number: 2,
      title: "Generate & Establish",
      color: "bg-secondary",
      description: "Based on our findings, we create a personalized nutrition plan and establish practical strategies for implementation.",
      items: [
        "Custom nutrition recommendations",
        "Meal planning and preparation guidance",
        "Supplement recommendations (if needed)",
        "Habit formation strategies"
      ]
    },
    {
      number: 3,
      title: "Refine",
      color: "bg-accent",
      description: "Through ongoing follow-up sessions, we monitor progress, make adjustments, and refine your plan for optimal results.",
      items: [
        "Progress tracking and assessment",
        "Troubleshooting challenges",
        "Plan adjustments based on response",
        "Long-term strategy development"
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
          <Badge variant="secondary" className="bg-secondary text-white py-2 px-6 rounded-full mb-8 text-base font-medium">
            Take an Assessment
          </Badge>
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
    </section>
  );
}
