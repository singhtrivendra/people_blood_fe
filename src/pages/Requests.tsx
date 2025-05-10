import React, { useState, useEffect } from 'react';
import RequestCard, { BloodRequest } from '@/components/RequestCard';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BloodRequestForm from '@/components/BloodRequestForm';

import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://people-blood-be.onrender.com/api';

const Requests = () => {
  const { toast } = useToast();
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
// Fetch blood requests
const fetchBloodRequests = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/blood-requests`);
    setBloodRequests(response.data);
    setError(null);
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to load blood requests'
      : err.message || 'An error occurred';

    setError(message);
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

// Load data on component mount
useEffect(() => {
  fetchBloodRequests();
}, []);

// Respond to a blood request
const handleRespond = async (request: BloodRequest) => {
  try {
    // You could uncomment and customize this for real API interaction
    // await axios.post(`${BASE_URL}/blood-requests/${request._id}/respond`, {
    //   donorId: selectedDonorId,
    // });

    toast({
      title: "Response Recorded",
      description: `Your response to help ${request.patientName} has been recorded.`,
    });

    fetchBloodRequests();
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to respond to request'
      : err.message || 'An error occurred';

    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  }
};

// Submit new blood request
const handleSubmitRequest = async (formData: any) => {
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

  const filteredRequests = bloodRequests.filter(request => {
    // Apply search filter
    const matchesSearch = request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          request.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply blood type filter
    const matchesBloodType = bloodTypeFilter === 'all' ? true : request.bloodType === bloodTypeFilter;
    
    // Apply urgency filter
    const matchesUrgency = urgencyFilter === 'all' ? true : request.urgency === urgencyFilter;
    
    return matchesSearch && matchesBloodType && matchesUrgency;
  });

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blood Requests</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="gap-2" onClick={fetchBloodRequests} disabled={loading}>
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button className="gap-2" onClick={() => setRequestFormOpen(true)}>
            <PlusCircle className="h-4 w-4" />
            <span>New Request</span>
          </Button>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Search by patient, hospital or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Blood Types</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Urgency Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setBloodTypeFilter('all');
            setUrgencyFilter('all');
          }}>
            Reset Filters
          </Button>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading blood requests...</p>
        </div>
      )}
      
      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-12">
          <p className="text-lg text-red-500">{error}</p>
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
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <RequestCard 
                key={request._id} 
                request={request} 
                onRespond={handleRespond}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No requests found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* New Request Dialog */}
      <Dialog open={requestFormOpen} onOpenChange={setRequestFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New Blood Request</DialogTitle>
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

export default Requests;