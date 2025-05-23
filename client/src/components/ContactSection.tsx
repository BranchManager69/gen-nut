import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
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
    <section className="section-padding">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="lg:w-1/3 bg-primary text-white p-8">
              <h2 className="text-3xl font-bold font-heading mb-6">Let's Connect</h2>
              <p className="mb-8">Ready to start your nutrition journey? Reach out to discuss how Medical Nutrition Therapy can support your health goals.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4 text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Service Area</h3>
                    <p className="opacity-90">Virtual consultations available nationwide</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4 text-accent">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Response Time</h3>
                    <p className="opacity-90">Initial consultations typically scheduled within 1-2 weeks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4 text-accent">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Support</h3>
                    <p className="opacity-90">Compassionate, personalized care with ongoing support throughout your journey</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 p-8">
              <h3 className="text-2xl font-bold font-heading text-primary mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-neutral-800">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-neutral-800">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john@example.com" 
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-neutral-800">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="(123) 456-7890" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-neutral-800">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can I help you?" 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel className="font-medium text-neutral-800 block mb-2">Upload Documents (Optional)</FormLabel>
                    <div 
                      className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-neutral-200 transition-colors"
                      onClick={() => document.getElementById('fileUpload')?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="text-2xl text-primary mb-2 flex justify-center">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="text-neutral-800 mb-1">Drag and drop files here or click to browse</p>
                      <p className="text-sm text-gray-500">Max file size: 10MB (PDF, JPG, PNG)</p>
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
                      <div className="mt-2 text-sm space-y-1">
                        {uploadedFiles.map((file, index) => {
                          const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                          return (
                            <div key={index} className="flex items-center justify-between py-1">
                              <span className="text-gray-700">{file.name} ({fileSize} MB)</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700 h-6 p-0"
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
                      <FormItem className="flex items-start space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="text-sm text-gray-600 pt-0.5">
                          I consent to having this website store my submitted information so they can respond to my inquiry.
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Form"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
