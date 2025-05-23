import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Shield, Star, Users, Award } from "lucide-react";

type HeroSectionProps = {
  onBookNow: () => void;
};

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 min-h-screen flex items-center justify-center py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Content Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Central Hero Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-white/20">
              
              {/* Header Badge */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 mb-6">
                  <Award className="w-5 h-5 text-primary mr-3" />
                  <span className="text-base font-semibold text-primary">Registered Dietitian Nutritionist</span>
                </div>
              </motion.div>

              {/* Main Heading - Centered */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
                  <span className="block text-slate-800 mb-2">Transform Your</span>
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Health Journey
                  </span>
                  <span className="block text-slate-600 text-4xl md:text-5xl lg:text-6xl mt-4">
                    With Expert Nutrition Therapy
                  </span>
                </h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Evidence-based Medical Nutrition Therapy with a <span className="font-semibold text-primary">compassionate, personalized approach</span>. 
                  Create lasting wellness that spans generations.
                </motion.p>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10+</div>
                  <div className="text-slate-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">500+</div>
                  <div className="text-slate-600 font-medium">Clients Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">95%</div>
                  <div className="text-slate-600 font-medium">Success Rate</div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={onBookNow}
                    size="lg"
                    className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-6 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                  >
                    Start Your Health Transformation
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-slate-300 hover:border-primary text-slate-700 hover:text-primary hover:bg-primary/5 py-6 px-10 rounded-2xl transition-all duration-300 text-lg"
                  >
                    Learn Our Method
                  </Button>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex flex-wrap justify-center gap-8 pt-8 border-t border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center text-slate-600">
                  <Shield className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">Evidence-Based Care</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Heart className="w-5 h-5 text-secondary mr-3" />
                  <span className="font-medium">Compassionate Approach</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Sparkles className="w-5 h-5 text-accent mr-3" />
                  <span className="font-medium">Lasting Results</span>
                </div>
              </motion.div>
            </div>

            {/* Floating Cards */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-primary/10 hidden lg:block"
              initial={{ opacity: 0, x: -50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Virtual Consultations</div>
                  <div className="text-sm text-slate-600">Available Nationwide</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-secondary/10 hidden lg:block"
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">5-Star Rated</div>
                  <div className="text-sm text-slate-600">Client Reviews</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl p-6 border border-accent/10 hidden lg:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-slate-800">Free Initial Consultation</div>
                <div className="text-sm text-slate-600">Get Started Today</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="relative max-w-2xl">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src="/images/gn-image-2.png"
                alt="Generational Nutrition - Medical Nutrition Therapy"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
