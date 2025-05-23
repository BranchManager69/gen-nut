import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { newsletterSchema } from "@/lib/validators";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type NewsletterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
};

export default function NewsletterSection() {
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      consent: false
    }
  });
  
  const mutation = useMutation({
    mutationFn: (values: NewsletterFormValues) => {
      return apiRequest("POST", "/api/newsletter", values);
    },
    onSuccess: () => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 5000,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: `${error}`,
        variant: "destructive",
      });
    }
  });
  
  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values);
  };

  return (
    <section className="bg-primary text-white section-padding">
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg opacity-90">
            Get nutrition tips, recipes, and health insights delivered to your inbox.
          </p>
        </motion.div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-white">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        className="w-full p-3 rounded-lg text-neutral-800 focus:ring-2 focus:ring-accent focus:outline-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-white">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        className="w-full p-3 rounded-lg text-neutral-800 focus:ring-2 focus:ring-accent focus:outline-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-white">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full p-3 rounded-lg text-neutral-800 focus:ring-2 focus:ring-accent focus:outline-none"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
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
                  <div className="text-sm opacity-90 pt-0.5">
                    I consent to receiving emails about nutritional tips, services, and promotions. You can unsubscribe at any time.
                  </div>
                </FormItem>
              )}
            />
            
            <div className="text-center">
              <Button 
                type="submit"
                className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
