import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-primary text-white section-padding">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-6 flex justify-center">
            <Mail className="h-16 w-16 text-accent" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Newsletter
          </h2>
          
          <div className="bg-accent text-white py-4 px-8 rounded-full inline-block mb-6">
            <p className="text-xl font-semibold">
              COMING SOON
            </p>
          </div>
          
          <p className="text-lg opacity-90 mb-8">
            Stay tuned for nutrition tips, evidence-based insights, and wellness strategies delivered directly to your inbox.
          </p>
          
          <Button 
            disabled
            className="bg-accent/50 text-white font-medium py-3 px-8 rounded-lg cursor-not-allowed opacity-50"
          >
            Newsletter Coming Soon
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
