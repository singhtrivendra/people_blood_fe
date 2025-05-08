
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Hero: React.FC = () => {
  const { toast } = useToast();
  
  const handleEmergencyClick = () => {
    toast({
      title: "Emergency Request",
      description: "This feature is coming soon!",
      variant: "destructive",
    });
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-lifelink-100 rounded-full blur-3xl opacity-30 dark:opacity-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-health-100 rounded-full blur-3xl opacity-30 dark:opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lifelink-600 to-health-600">
              Save Lives
            </span>{" "}
            Through Blood Donation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 fade-in">
            Connect with donors, manage emergency requests, and stay informed about blood donation and healthcare.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in">
            <Button size="lg" asChild>
              <Link to="/donors">Find Donors</Link>
            </Button>
            <Button size="lg" variant="outline" onClick={handleEmergencyClick}>
              Emergency Request
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="fade-in">
              <p className="text-3xl md:text-4xl font-bold text-lifelink-600">1,500+</p>
              <p className="text-sm text-muted-foreground">Registered Donors</p>
            </div>
            <div className="fade-in">
              <p className="text-3xl md:text-4xl font-bold text-lifelink-600">950+</p>
              <p className="text-sm text-muted-foreground">Lives Saved</p>
            </div>
            <div className="fade-in">
              <p className="text-3xl md:text-4xl font-bold text-lifelink-600">25+</p>
              <p className="text-sm text-muted-foreground">Partner Hospitals</p>
            </div>
            <div className="fade-in">
              <p className="text-3xl md:text-4xl font-bold text-lifelink-600">3k+</p>
              <p className="text-sm text-muted-foreground">App Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
