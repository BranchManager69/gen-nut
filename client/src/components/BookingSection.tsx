import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function BookingSection() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [service, setService] = useState<string>("");

  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "1:00 PM",
    "3:30 PM"
  ];

  const handleBooking = () => {
    if (!date || !timeSlot) {
      toast({
        title: "Booking incomplete",
        description: "Please select both a date and time for your consultation.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking confirmed!",
      description: `Your free 15-minute consultation is scheduled for ${format(date, "MMMM d, yyyy")} at ${timeSlot}.`,
      duration: 5000,
    });

    // Reset form
    setDate(undefined);
    setTimeSlot(undefined);
    setService("");
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
            Book a Free 15-Minute Consultation
          </h2>
          <p className="text-lg text-neutral-800">
            Schedule a complimentary call to discuss your nutrition needs and see if we're a good fit to work together.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto bg-neutral-200 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-primary p-6 text-white">
              <h3 className="text-xl font-semibold font-heading mb-4">What to Expect</h3>
              <ul className="space-y-3">
                {["Brief discussion of your health goals", 
                  "Overview of how I can help", 
                  "Opportunity to ask questions", 
                  "No obligation to continue"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-blue-400">
                <h4 className="font-medium mb-2">Available Services:</h4>
                <ul className="space-y-2">
                  {["Initial Nutrition Assessment", 
                    "Follow-up Consultations", 
                    "Meal Planning Sessions", 
                    "Group Programs"].map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="bg-white rounded-lg p-4 h-full flex flex-col justify-center items-center">
                <div className="text-center py-4 w-full max-w-md">
                  <div className="text-4xl text-primary mb-4 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded border"
                      disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold font-heading mb-2">Select a Time</h3>
                  
                  <div className="grid grid-cols-2 gap-2 my-4">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={timeSlot === time ? "default" : "outline"}
                        className={`py-2 rounded text-sm transition-colors ${
                          timeSlot === time ? "bg-primary text-white" : "bg-neutral-200 hover:bg-primary hover:text-white"
                        }`}
                        onClick={() => setTimeSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-4 mb-6">
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select service type (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Initial Consultation</SelectItem>
                        <SelectItem value="followup">Follow-up Session</SelectItem>
                        <SelectItem value="mealplan">Meal Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    onClick={handleBooking}
                    className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 w-full"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
