
import React, { useState } from 'react';
import DonorCard from '@/components/DonorCard';
import { mockDonors } from '@/services/mockData';
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
import { Search } from 'lucide-react';

const Donors = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleContactDonor = (donor: any) => {
    toast({
      title: "Contact Request Sent",
      description: `A message has been sent to ${donor.name}.`,
    });
  };
  
  const filteredDonors = mockDonors.filter(donor => {
    // Apply search filter
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          donor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply blood type filter
    const matchesBloodType = bloodTypeFilter === 'all' ? true : donor.bloodType === bloodTypeFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' ? true : donor.status === statusFilter;
    
    return matchesSearch && matchesBloodType && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Blood Donors</h1>
      
      {/* Filters Section */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Input
              placeholder="Search by name or location"
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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setBloodTypeFilter('all');
            setStatusFilter('all');
          }}>
            Reset Filters
          </Button>
        </div>
      </div>
      
      {/* Donors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map(donor => (
            <DonorCard 
              key={donor.id} 
              donor={donor} 
              onContact={handleContactDonor}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">No donors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;
