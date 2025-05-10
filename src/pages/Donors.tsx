import React, { useState, useEffect } from 'react';
import DonorCard, { DonorInfo } from '@/components/DonorCard';
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
import { Search, RefreshCw } from 'lucide-react';

import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://people-blood-be.onrender.com/api';

const Donors = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [donors, setDonors] = useState<DonorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 // Fetch donors data from backend
useEffect(() => {
  fetchDonors();
}, []);

const fetchDonors = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/donors`);
    setDonors(response.data);
    setError(null);
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to load donors'
      : err.message || 'An error occurred while fetching donors';

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

// Handle contacting donor
const handleContactDonor = (donor: DonorInfo) => {
  toast({
    title: "Contact Request Sent",
    description: `A message has been sent to ${donor.name}.`,
  });
};

// Refresh donors list
const handleRefresh = () => {
  fetchDonors();
  toast({
    title: "Refreshing",
    description: "Updating donors list with latest data",
  });
};

  
  const resetFilters = () => {
    setSearchQuery('');
    setBloodTypeFilter('all');
    setStatusFilter('all');
  };
  
  const filteredDonors = donors.filter(donor => {
    // Apply search filter - searching by name, city or state
    const matchesSearch = 
      searchQuery === '' || 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      donor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply blood type filter
    const matchesBloodType = bloodTypeFilter === 'all' ? true : donor.bloodType === bloodTypeFilter;
    
    // Apply status filter - use a default value if status is not defined
    const donorStatus = donor.status || 'available';
    const matchesStatus = statusFilter === 'all' ? true : donorStatus === statusFilter;
    
    return matchesSearch && matchesBloodType && matchesStatus;
  });

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Find Blood Donors</h1>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
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
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
      
      {/* Donors Grid with Loading/Error States */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Loading donors data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-lg text-red-500">{error}</p>
          <Button className="mt-4" onClick={fetchDonors}>Try Again</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonors.length > 0 ? (
            filteredDonors.map(donor => (
              <DonorCard 
                key={donor._id} 
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
      )}
    </div>
  );
};

export default Donors;