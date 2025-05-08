
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    },
  });
  
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    // In a real app, you would send this data to your backend
    console.log(data);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
    
    // Reset form
    form.reset();
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+1 (123) 456-7890",
      description: "Monday-Friday, 8am-6pm"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "contact@lifelink.org",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      content: "123 Blood Center St, Health City",
      description: "Find us on Google Maps"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Hours",
      content: "Mon-Fri: 8am-6pm",
      description: "Sat-Sun: 9am-3pm"
    }
  ];

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have questions about blood donation or our services? We're here to help!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="donation">Donation Process</SelectItem>
                        <SelectItem value="eligibility">Eligibility Questions</SelectItem>
                        <SelectItem value="appointment">Schedule Appointment</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How can we help you?"
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide as much detail as possible.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Form>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-card border rounded-lg p-5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {info.icon}
                  </div>
                  <h3 className="font-medium">{info.title}</h3>
                </div>
                <p className="font-medium">{info.content}</p>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-muted rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-lg font-medium">Emergency Requests</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              For urgent blood needs or emergencies, please call our emergency hotline.
            </p>
            <div className="bg-background border rounded-md p-4 text-center">
              <p className="text-lg font-bold text-red-600">Emergency Hotline</p>
              <p className="text-xl font-bold">1-800-BLOOD-HELP</p>
              <p className="text-xs text-muted-foreground mt-1">Available 24/7</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
                <a 
                  key={platform} 
                  href={`#${platform}`} 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-card border hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {/* Icon would go here */}
                  <span className="sr-only">{platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
