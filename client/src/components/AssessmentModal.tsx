import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AssessmentData = {
  name: string;
  email: string;
  age: string;
  primaryGoal: string;
  currentDiet: string;
  healthConditions: string[];
  activityLevel: string;
  challenges: string;
  motivation: string;
};

type AssessmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AssessmentData>>({});
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AssessmentData>();

  const totalSteps = 5;

  const healthConditionOptions = [
    "Diabetes", "High Blood Pressure", "High Cholesterol", 
    "Digestive Issues", "Food Allergies", "Thyroid Issues", "None"
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: AssessmentData) => {
    try {
      // Submit to Formspree or your preferred service
      const response = await fetch('https://formspree.io/f/xovdzzpb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _subject: 'New Nutrition Assessment Submission',
          _replyto: data.email,
        }),
      });

      if (response.ok) {
        toast({
          title: "Assessment submitted!",
          description: "Thank you! We'll review your assessment and get back to you soon.",
          duration: 5000,
        });
        onClose();
        setCurrentStep(1);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleHealthConditionChange = (condition: string, checked: boolean) => {
    const current = formData.healthConditions || [];
    if (checked) {
      setFormData({
        ...formData,
        healthConditions: [...current, condition]
      });
    } else {
      setFormData({
        ...formData,
        healthConditions: current.filter(c => c !== condition)
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div 
          className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Nutrition Assessment</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Let's start with the basics</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age"
                      type="number"
                      {...register("age", { required: "Age is required" })}
                      placeholder="Your age"
                    />
                    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Goals */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">What's your primary health goal?</h3>
                  
                  <RadioGroup onValueChange={(value) => setValue("primaryGoal", value)}>
                    {["Weight Loss", "Weight Gain", "Improve Energy", "Manage Health Condition", "Better Digestion", "Sports Performance", "General Wellness"].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <RadioGroupItem value={goal} id={goal} />
                        <Label htmlFor={goal}>{goal}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 3: Current Diet */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Tell us about your current diet</h3>
                  
                  <div>
                    <Label htmlFor="currentDiet">How would you describe your current eating pattern?</Label>
                    <RadioGroup onValueChange={(value) => setValue("currentDiet", value)}>
                      {["Standard American Diet", "Mediterranean", "Vegetarian", "Vegan", "Keto", "Paleo", "Intermittent Fasting", "Other"].map((diet) => (
                        <div key={diet} className="flex items-center space-x-2">
                          <RadioGroupItem value={diet} id={diet} />
                          <Label htmlFor={diet}>{diet}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Health Conditions */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Health conditions & activity level</h3>
                  
                  <div>
                    <Label className="text-base mb-3 block">Any current health conditions? (Select all that apply)</Label>
                    {healthConditionOptions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id={condition}
                          onCheckedChange={(checked) => handleHealthConditionChange(condition, !!checked)}
                        />
                        <Label htmlFor={condition}>{condition}</Label>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label>Activity Level</Label>
                    <RadioGroup onValueChange={(value) => setValue("activityLevel", value)}>
                      {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={level} />
                          <Label htmlFor={level}>{level}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Challenges & Motivation */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">Final questions</h3>
                  
                  <div>
                    <Label htmlFor="challenges">What are your biggest nutrition challenges?</Label>
                    <Textarea 
                      id="challenges"
                      {...register("challenges")}
                      placeholder="e.g., emotional eating, time constraints, cravings..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">What motivates you most to improve your nutrition?</Label>
                    <Textarea 
                      id="motivation"
                      {...register("motivation")}
                      placeholder="e.g., feeling more energetic, setting a good example for my family..."
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary">
                    Submit Assessment
                  </Button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 