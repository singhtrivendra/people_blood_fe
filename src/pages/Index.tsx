import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import DonorCard, { DonorInfo } from '@/components/DonorCard';
import RequestCard from '@/components/RequestCard';
import HealthCard from '@/components/HealthCard';
import { mockHealthArticles } from '@/services/mockData';
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

import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://people-blood-be.onrender.com/api';

const Index = () => {
  const { toast } = useToast();
  const [donorFormOpen, setDonorFormOpen] = useState(false);
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [errorDonors, setErrorDonors] = useState(null);
  const [errorRequests, setErrorRequests] = useState(null);
  
// Fetch donors data
const fetchDonors = async () => {
  setLoadingDonors(true);
  try {
    const response = await axios.get(`${BASE_URL}/donors`);
    setDonors(response.data);
    setErrorDonors(null);
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to load donors'
      : err.message || 'An error occurred';

    setErrorDonors(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  } finally {
    setLoadingDonors(false);
  }
};

// Fetch blood requests
const fetchBloodRequests = async () => {
  setLoadingRequests(true);
  try {
    const response = await axios.get(`${BASE_URL}/blood-requests`);
    setRequests(response.data);
    setErrorRequests(null);
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to load blood requests'
      : err.message || 'An error occurred';

    setErrorRequests(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  } finally {
    setLoadingRequests(false);
  }
};

// Load data on component mount
useEffect(() => {
  fetchDonors();
  fetchBloodRequests();
}, []);

// Contact donor (placeholder)
const handleContactDonor = async (donor) => {
  try {
    // Placeholder for contact API call
    toast({
      title: "Contact Request Sent",
      description: `A message has been sent to ${donor.name}.`,
    });
  } catch (err) {
    toast({
      title: "Error",
      description: err instanceof Error ? err.message : 'Failed to contact donor',
      variant: "destructive",
    });
  }
};

// Respond to request (placeholder)
const handleRespondToRequest = async (request) => {
  try {
    // Placeholder for response API call
    toast({
      title: "Response Recorded",
      description: `Your response to help ${request.patientName} has been recorded.`,
    });

    // Refresh the requests
    fetchBloodRequests();
  } catch (err) {
    toast({
      title: "Error",
      description: err instanceof Error ? err.message : 'Failed to respond to request',
      variant: "destructive",
    });
  }
};

// Submit donor registration
const handleSubmitDonorRegistration = async (formData) => {
  try {
    await axios.post(`${BASE_URL}/donors`, formData);

    toast({
      title: "Registration Successful",
      description: "Thank you for registering as a blood donor!",
    });

    setDonorFormOpen(false);
    fetchDonors();
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to register as donor'
      : err.message || 'An error occurred';

    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }
};

// Submit blood request
const handleSubmitRequest = async (formData) => {
  try {
    await axios.post(`${BASE_URL}/blood-requests`, formData);

    toast({
      title: "Request Created",
      description: "Your blood request has been successfully created.",
    });

    setRequestFormOpen(false);
    fetchBloodRequests();
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to create blood request'
      : err.message || 'An error occurred';

    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }
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
          
          {/* Loading State for Donors */}
          {loadingDonors && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading donors...</p>
            </div>
          )}
          
          {/* Error State for Donors */}
          {!loadingDonors && errorDonors && (
            <div className="text-center py-8">
              <p className="text-lg text-red-500">{errorDonors}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={fetchDonors}
              >
                Try Again
              </Button>
            </div>
          )}
          
          {/* Donors Grid */}
          {!loadingDonors && !errorDonors && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {donors.length > 0 ? (
                donors.slice(0, 4).map(donor => (
                  <DonorCard 
                    key={donor._id} 
                    donor={donor} 
                    onContact={handleContactDonor}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-lg text-muted-foreground">No donors available at the moment.</p>
                </div>
              )}
            </div>
          )}
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
          
          {/* Loading State for Requests */}
          {loadingRequests && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Loading requests...</p>
            </div>
          )}
          
          {/* Error State for Requests */}
          {!loadingRequests && errorRequests && (
            <div className="text-center py-8">
              <p className="text-lg text-red-500">{errorRequests}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={fetchBloodRequests}
              >
                Try Again
              </Button>
            </div>
          )}
          
          {/* Requests Grid */}
          {!loadingRequests && !errorRequests && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.length > 0 ? (
                requests.slice(0, 3).map(request => (
                  <RequestCard 
                    key={request._id} 
                    request={request} 
                    onRespond={handleRespondToRequest}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-lg text-muted-foreground">No emergency blood requests at the moment.</p>
                </div>
              )}
            </div>
          )}
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
          <DonorRegistrationForm 
            onSubmit={handleSubmitDonorRegistration} 
            onClose={() => setDonorFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={requestFormOpen} onOpenChange={setRequestFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Blood Request</DialogTitle>
          </DialogHeader>
          <BloodRequestForm 
            onSubmit={handleSubmitRequest} 
            onClose={() => setRequestFormOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;