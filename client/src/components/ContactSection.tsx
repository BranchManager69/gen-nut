import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Headphones, Upload, X } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to us storing your information"
  })
});

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

export default function ContactSection() {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false
    }
  });
  
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone || '');
      formData.append('message', values.message);
      formData.append('_subject', 'New Contact Form Submission');
      formData.append('_replyto', values.email);
      
      // Add uploaded files
      uploadedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await fetch('https://formspree.io/f/xovdzzpb', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
          duration: 5000,
        });
        form.reset();
        setUploadedFiles([]);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...fileArray]);
    }
  };
  
  const handleFileDelete = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...fileArray]);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-neutral-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
              Ready to start your nutrition journey? Reach out to discuss how Medical Nutrition Therapy can support your health goals.
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-accent/10">
            <motion.div 
              className="lg:w-1/3 bg-gradient-to-br from-primary to-secondary text-white p-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold font-heading mb-8 flex items-center">
                <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
                Get in Touch
              </h3>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-accent mr-4 mt-1">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Service Area</h4>
                    <p className="opacity-90 leading-relaxed">Virtual consultations available nationwide</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-accent mr-4 mt-1">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Response Time</h4>
                    <p className="opacity-90 leading-relaxed">Initial consultations typically scheduled within 1-2 weeks</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-accent mr-4 mt-1">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Support</h4>
                    <p className="opacity-90 leading-relaxed">Compassionate, personalized care with ongoing support throughout your journey</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="h-1 flex-1 bg-gradient-to-r from-accent to-accent/30 rounded"></div>
                  <span className="text-accent font-semibold">Evidence-Based Care</span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-accent/30 to-accent rounded"></div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/3 p-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-neutral-800">Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              {...field} 
                              className="border-neutral-300 focus:border-accent focus:ring-accent/20 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-neutral-800">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              {...field} 
                              className="border-neutral-300 focus:border-accent focus:ring-accent/20 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-neutral-800">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="(555) 123-4567" 
                            {...field} 
                            className="border-neutral-300 focus:border-accent focus:ring-accent/20 rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-neutral-800">Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your health goals and how I can help you..." 
                            className="min-h-[120px] border-neutral-300 focus:border-accent focus:ring-accent/20 rounded-lg resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel className="font-semibold text-neutral-800 block mb-2">Upload Documents (Optional)</FormLabel>
                    <div 
                      className="border-2 border-dashed border-accent/30 hover:border-accent/60 rounded-xl p-6 text-center cursor-pointer hover:bg-accent/5 transition-all duration-300"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="text-3xl text-accent mb-3 flex justify-center">
                        <Upload className="h-8 w-8" />
                      </div>
                      <p className="text-neutral-700 mb-2 font-medium">Drag and drop files here or click to browse</p>
                      <p className="text-sm text-neutral-500">Max file size: 10MB (PDF, JPG, PNG)</p>
                      <input 
                        type="file" 
                        id="fileUpload" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        multiple 
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => {
                          const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                          return (
                            <div key={index} className="flex items-center justify-between py-3 px-4 bg-accent/5 rounded-lg border border-accent/20">
                              <span className="text-neutral-700 font-medium">{file.name} ({fileSize} MB)</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 rounded-full"
                                onClick={() => handleFileDelete(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="mt-1 border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                          />
                        </FormControl>
                        <div className="text-sm text-neutral-600 leading-relaxed">
                          I consent to having this website store my submitted information so they can respond to my inquiry.
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
