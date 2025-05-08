import React, { useState } from 'react';
import Hero from '@/components/Hero';
import DonorCard, { DonorInfo } from '@/components/DonorCard';
import RequestCard from '@/components/RequestCard';
import HealthCard from '@/components/HealthCard';
import { mockDonors, mockRequests, mockHealthArticles } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DonorRegistrationForm from '@/components/DonorRegistrationForm';
import BloodRequestForm from '@/components/BloodRequestForm';

const Index = () => {
  const { toast } = useToast();
  const [donorFormOpen, setDonorFormOpen] = useState(false);
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  
  const handleContactDonor = (donor: DonorInfo) => {
    toast({
      title: "Contact Request Sent",
      description: `A message has been sent to ${donor.name}.`,
    });
  };
  
  const handleRespondToRequest = (request: any) => {
    toast({
      title: "Response Recorded",
      description: `Your response to help ${request.patientName} has been recorded.`,
    });
  };

  return (
    <div>
      <Hero />
      
      {/* Featured Donors Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Available Donors</h2>
            <Button variant="outline" asChild>
              <Link to="/donors">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDonors.slice(0, 4).map(donor => (
              <DonorCard 
                key={donor.id} 
                donor={donor} 
                onContact={handleContactDonor}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Emergency Requests Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-lifelink-50 to-health-50 dark:from-lifelink-950/30 dark:to-health-950/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Emergency Requests</h2>
            <Button variant="outline" asChild>
              <Link to="/requests">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRequests.slice(0, 3).map(request => (
              <RequestCard 
                key={request.id} 
                request={request} 
                onRespond={handleRespondToRequest}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Health & Awareness Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Health & Awareness</h2>
            <Button variant="outline" asChild>
              <Link to="/health">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHealthArticles.slice(0, 3).map(article => (
              <HealthCard key={article.id} info={article} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-lifelink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of donors and help save lives through blood donation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setDonorFormOpen(true)}
            >
              Register as Donor
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/20 dark:text-white dark:border-white dark:hover:bg-white/20"
              onClick={() => setRequestFormOpen(true)}
            >
              Create Request
            </Button>
          </div>
        </div>
      </section>
      
      <Dialog open={donorFormOpen} onOpenChange={setDonorFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Donor Registration</DialogTitle>
          </DialogHeader>
          <DonorRegistrationForm onClose={() => setDonorFormOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={requestFormOpen} onOpenChange={setRequestFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Blood Request</DialogTitle>
          </DialogHeader>
          <BloodRequestForm onClose={() => setRequestFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;