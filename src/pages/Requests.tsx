
import React, { useState } from 'react';
import RequestCard, { BloodRequest } from '@/components/RequestCard';
import { mockRequests } from '@/services/mockData';
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
import { Search, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BloodRequestForm from '@/components/BloodRequestForm';

const Requests = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  
  const handleRespond = (request: BloodRequest) => {
    toast({
      title: "Response Recorded",
      description: `Your response to help ${request.patientName} has been recorded.`,
    });
  };
  
  const filteredRequests = mockRequests.filter(request => {
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
        <Button className="gap-2" onClick={() => setRequestFormOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          <span>New Request</span>
        </Button>
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
      
      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
            <RequestCard 
              key={request.id} 
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

export default Requests;
