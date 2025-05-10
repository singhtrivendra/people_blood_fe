// Update the IBloodRequest interface
interface IBloodRequest {
  _id: string;
  patientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  bloodType: string;
  unitsNeeded: string;
  hospital: string;
  location: {  // Changed from string to GeoJSON object
    type: string;
    coordinates: [number, number];
  };
  urgency: string;
  requiredBy: string;
  status: string;
  createdAt: string;
}

// Enhance the formatLocation helper
const formatLocation = (location: any) => {
  if (!location) return "N/A";
  
  if (typeof location === 'object' && location !== null) {
    if (location.type === 'Point' && location.coordinates) {
      return `Point (${location.coordinates.join(', ')})`;
    }
    return JSON.stringify(location);
  }
  return location;
};

import axios from 'axios';
// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://people-blood-be.onrender.com/api';

import { GeolocationController } from '@/components/GeolocationController'
    import React, { useState, useEffect } from 'react';
    import {
      Tabs,
      TabsContent,
      TabsList,
      TabsTrigger,
    } from "@/components/ui/tabs";
    import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogFooter,
    } from "@/components/ui/dialog";
    import { Badge } from "@/components/ui/badge";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { useToast } from "@/hooks/use-toast";
    import {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
      PieChart,
      Pie,
      Cell,
      LineChart,
      Line,
    } from 'recharts';
    import { MoreHorizontal, Download, Filter, RefreshCw } from 'lucide-react';
    import { format } from 'date-fns';

    // Define types
    interface IDonor {
      _id: string;
      name: string;
      email: string;
      phone: string;
      bloodType: string;
      gender: string;
      city: string;
      state: string;
      previousDonation: string;
      createdAt: string;
      agreeTerms: boolean;
    }

    interface IBloodRequest {
      _id: string;
      patientName: string;
      contactPerson: string;
      email: string;
      phone: string;
      bloodType: string;
      unitsNeeded: string;
      hospital: string;
      location: {  // Changed from string to GeoJSON object
        type: string;
        coordinates: [number, number];
      };
      urgency: string;
      requiredBy: string;
      status: string;
      createdAt: string;
    }

    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      fulfilled: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    };

    const urgencyColors = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    const AdminDashboard: React.FC = () => {
      const { toast } = useToast();
      const [currentAddress, setCurrentAddress] = useState<string>("");
      const [activeTab, setActiveTab] = useState("overview");
      const [donors, setDonors] = useState<IDonor[]>([]);
      const [bloodRequests, setBloodRequests] = useState<IBloodRequest[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [searchTerm, setSearchTerm] = useState("");
      const [filterBloodType, setFilterBloodType] = useState("all");
      const [filterStatus, setFilterStatus] = useState("all");
      const [selectedRequest, setSelectedRequest] = useState<IBloodRequest | null>(null);
      const [selectedDonor, setSelectedDonor] = useState<IDonor | null>(null);
      const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
      const [updatingStatus, setUpdatingStatus] = useState(false);
      const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch blood requests
                  
      const requestsResponse = await axios.get(`${BASE_URL}/blood-requests`);
      setBloodRequests(requestsResponse.data);

      // Fetch donors
      const donorsResponse = await axios.get(`${BASE_URL}/donors`);
      setDonors(donorsResponse.data);

      setError(null);
    } catch (err) {
      const message = axios.isAxiosError(err) && err.response
        ? err.response.data.message || 'Failed to load data'
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

  fetchData();
}, [toast]);

      // Add useEffect for address lookup
  useEffect(() => {
    const fetchAddress = async () => {
      if (selectedRequest?.location?.coordinates) {
        try {
          const [lng, lat] = selectedRequest.location.coordinates;
          const { address } = await GeolocationController.coordinatesToAddress(lat, lng);
          setCurrentAddress(address);
        } catch (error) {
          console.error("Geocoding error:", error);
          setCurrentAddress("Location unavailable");
        }
      } else {
        setCurrentAddress("N/A");
      }
    };

    if (selectedRequest) fetchAddress();
  }, [selectedRequest]);


      // Update blood request status

const updateRequestStatus = async (id: string, status: string) => {
  setUpdatingStatus(true);
  try {
    const response = await axios.patch(`${BASE_URL}/blood-requests/${id}/status`, {
      status,
    });

    const updatedRequest = response.data;

    // Update state
    setBloodRequests(prevRequests =>
      prevRequests.map(req => req._id === id ? updatedRequest : req)
    );

    toast({
      title: "Status Updated",
      description: `Request status updated to ${status}`,
    });

    setIsUpdateDialogOpen(false);
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Failed to update status'
      : err.message || 'An error occurred';

    toast({
      title: "Update Failed",
      description: message,
      variant: "destructive",
    });
  } finally {
    setUpdatingStatus(false);
  }
};


      // Filter and search functions
      const filteredRequests = bloodRequests.filter(request => {
        const matchesSearch = searchTerm.toLowerCase() === "" || 
          request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBloodType = filterBloodType === "all" || filterBloodType === "" || request.bloodType === filterBloodType;
        const matchesStatus = filterStatus === "all" || filterStatus === "" || request.status === filterStatus;
        return matchesSearch && matchesBloodType && matchesStatus;
      });

      const filteredDonors = donors.filter(donor => {
        const matchesSearch = searchTerm.toLowerCase() === "" || 
          donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.state.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesBloodType = filterBloodType === "all" || donor.bloodType === filterBloodType;
        
        return matchesSearch && matchesBloodType;
      });

      // Calculate statistics for charts
      const bloodTypeStats = () => {
        const counts: Record<string, number> = {};
        donors.forEach(donor => {
          counts[donor.bloodType] = (counts[donor.bloodType] || 0) + 1;
        });
        return Object.keys(counts).map(type => ({ name: type, count: counts[type] }));
      };

      const requestStatusStats = () => {
        const counts: Record<string, number> = {};
        bloodRequests.forEach(request => {
          counts[request.status] = (counts[request.status] || 0) + 1;
        });
        return Object.keys(counts).map(status => ({ name: status, count: counts[status] }));
      };

      const requestUrgencyStats = () => {
        const counts: Record<string, number> = {};
        bloodRequests.forEach(request => {
          counts[request.urgency] = (counts[request.urgency] || 0) + 1;
        });
        return Object.keys(counts).map(urgency => ({ name: urgency, count: counts[urgency] }));
      };

      const bloodTypeRequestStats = () => {
        const counts: Record<string, number> = {};
        bloodRequests.forEach(request => {
          counts[request.bloodType] = (counts[request.bloodType] || 0) + 1;
        });
        return Object.keys(counts).map(type => ({ name: type, count: counts[type] }));
      };

      // Monthly trend data (simulated)
      const generateMonthlyTrendData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({
          name: month,
          donors: Math.floor(Math.random() * 20) + 5,
          requests: Math.floor(Math.random() * 15) + 10,
        }));
      };

      const monthlyTrendData = generateMonthlyTrendData();

      // Reset filters
      const resetFilters = () => {
        setSearchTerm("");
        setFilterBloodType("all");
        setFilterStatus("all");
      };

      // Export data as CSV
      const exportToCSV = (data: any[], filename: string) => {
        if (data.length === 0) return;

        // Get headers
        const headers = Object.keys(data[0]).filter(key => !key.startsWith('_'));
        
        // Create CSV content
        const csvContent = [
          headers.join(','),
          ...data.map(item => 
            headers.map(header => 
              item[header] ? `"${String(item[header]).replace(/"/g, '""')}"` : ""
            ).join(',')
          )
        ].join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // Handle opening update dialog
      const openUpdateDialog = (request: IBloodRequest) => {
        setSelectedRequest(request);
        setNewStatus(request.status);
        setIsUpdateDialogOpen(true);
      };

      // Refresh data
      const refreshData = async () => {
        setLoading(true);
        try {
          // Fetch blood requests
          const requestsResponse = await fetch('http://localhost:3000/api/blood-requests');
          const requestsData = await requestsResponse.json();
          setBloodRequests(requestsData);

          // Fetch donors
          const donorsResponse = await fetch('http://localhost:3000/api/donors');
          const donorsData = await donorsResponse.json();
          setDonors(donorsData);

          toast({
            title: "Data Refreshed",
            description: "Latest data has been loaded",
          });
        } catch (err) {
          toast({
            title: "Refresh Failed",
            description: err instanceof Error ? err.message : 'Failed to refresh data',
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      // Handler for "View all" buttons
      const handleViewAll = (tab: string) => {
        setActiveTab(tab);
        // Reset search and filters when changing tabs
        setSearchTerm("");
        setFilterBloodType("all");
        setFilterStatus("all");
      };

      return (
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Blood Bank Admin Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blood-requests">Blood Requests</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{donors.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Registered donors in the system</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Blood Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bloodRequests.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total blood requests submitted</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bloodRequests.filter(r => r.status === 'pending').length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Requests awaiting processing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Critical Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bloodRequests.filter(r => r.urgency === 'critical').length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Urgent blood requirements</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Blood Requests</CardTitle>
                    <CardDescription>Latest blood requests in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bloodRequests.slice(0, 5).map((request) => (
                        <div key={request._id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{request.patientName}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline">{request.bloodType}</Badge>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className={urgencyColors[request.urgency as keyof typeof urgencyColors]}>
                              {request.urgency}
                            </Badge>
                            <Badge className={`ml-2 ${statusColors[request.status as keyof typeof statusColors]}`}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="link" 
                      className="mt-4 p-0" 
                      onClick={() => handleViewAll("blood-requests")}
                    >
                      View all requests
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Latest Donors</CardTitle>
                    <CardDescription>Recently registered donors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {donors.slice(0, 5).map((donor) => (
                        <div key={donor._id} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{donor.name}</p>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline">{donor.bloodType}</Badge>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date(donor.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline">{donor.city}, {donor.state}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="link" 
                      className="mt-4 p-0" 
                      onClick={() => handleViewAll("donors")}
                    >
                      View all donors
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* BLOOD REQUESTS TAB */}
            <TabsContent value="blood-requests">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Blood Requests</CardTitle>
                      <CardDescription>Manage all blood requests</CardDescription>
                    </div>
                    <div className="flex flexF-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => exportToCSV(bloodRequests, 'blood_requests')}
                        disabled={bloodRequests.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:max-w-sm"
                    />
                    <div className="flex items-center space-x-2">
                      <Select value={filterBloodType} onValueChange={setFilterBloodType}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Blood Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="fulfilled">Fulfilled</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={resetFilters}>
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">Loading blood requests...</div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                  ) : filteredRequests.length === 0 ? (
                    <div className="text-center py-8">No blood requests found</div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Blood Type</TableHead>
                            <TableHead>Units</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Location</TableHead> {/* Add this missing header */}
                            <TableHead>Urgency</TableHead>
                            <TableHead>Required By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.map((request) => (
                            <TableRow key={request._id}>
                              <TableCell className="font-medium">{request.patientName}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{request.bloodType}</Badge>
                              </TableCell>
                              <TableCell>{request.unitsNeeded}</TableCell>
                              <TableCell>{request.hospital}</TableCell>
                              <TableCell>{formatLocation(request.location)}</TableCell> {/* Moved to correct position */}
                              <TableCell>
                                <Badge className={urgencyColors[request.urgency as keyof typeof urgencyColors]}>
                                  {request.urgency}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(request.requiredBy).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                                  {request.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => setSelectedRequest(request)}>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openUpdateDialog(request)}>
                                      Update Status
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* DONORS TAB */}
            <TabsContent value="donors">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Registered Donors</CardTitle>
                      <CardDescription>View and manage donor information</CardDescription>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => exportToCSV(donors, 'donors')}
                        disabled={donors.length === 0}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <Input
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="md:max-w-sm"
                    />
                    <div className="flex items-center space-x-2">
                      <Select value={filterBloodType} onValueChange={setFilterBloodType}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Blood Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={resetFilters}>
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-8">Loading donors...</div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                  ) : filteredDonors.length === 0 ? (
                    <div className="text-center py-8">No donors found</div>
                  ) : (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Blood Type</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Previous Donation</TableHead>
                            <TableHead>Registered Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDonors.map((donor) => (
                            <TableRow key={donor._id}>
                              <TableCell className="font-medium">{donor.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{donor.bloodType}</Badge>
                              </TableCell>
                              <TableCell>{donor.gender}</TableCell>
                              <TableCell>{donor.city}, {donor.state}</TableCell>
                              <TableCell>{donor.previousDonation}</TableCell>
                              <TableCell>{new Date(donor.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => setSelectedDonor(donor)}>
                                      View Details
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                              {/* <TableCell>
    {`${donor.city}, ${donor.state}`}
  </TableCell> */}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Type Distribution</CardTitle>
                    <CardDescription>Distribution of blood types among registered donors</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bloodTypeStats()}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {bloodTypeStats().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Request Status</CardTitle>
                    <CardDescription>Distribution of blood requests by status</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={requestStatusStats()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Donors and blood requests by month</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="donors" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="requests" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Blood Requests by Type</CardTitle>
                    <CardDescription>Distribution of requested blood types</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bloodTypeRequestStats()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Request Urgency</CardTitle>
                    <CardDescription>Distribution of blood requests by urgency level</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={requestUrgencyStats()}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {requestUrgencyStats().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Blood Request Details Dialog */}
          {selectedRequest && (
    <Dialog 
      open={!!selectedRequest} 
      onOpenChange={(open) => !open && setSelectedRequest(null)}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Blood Request Details</DialogTitle>
                  <DialogDescription>
                    Request created on {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                     
                    <div>
                      <h3 className="text-sm font-medium">Patient Name</h3>
                      <p className="text-sm">{selectedRequest.patientName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Contact Person</h3>
                      <p className="text-sm">{selectedRequest.contactPerson}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <p className="text-sm">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Phone</h3>
                      <p className="text-sm">{selectedRequest.phone}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Blood Type</h3>
                      <Badge variant="outline">{selectedRequest.bloodType}</Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Units Needed</h3>
                      <p className="text-sm">{selectedRequest.unitsNeeded}</p>
                    </div>
                  </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Hospital</h3>
                        <p className="text-sm">{selectedRequest.hospital}</p>
                      </div>
                      Location
                    </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Urgency</h3>
                      <Badge className={urgencyColors[selectedRequest.urgency as keyof typeof urgencyColors]}>
                        {selectedRequest.urgency}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Status</h3>
                      <Badge className={statusColors[selectedRequest.status as keyof typeof statusColors]}>
                        {selectedRequest.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Required By</h3>
                    <p className="text-sm">{new Date(selectedRequest.requiredBy).toLocaleDateString()}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedRequest(null)}>Close</Button>
              <Button 
                  onClick={() => {
                    if (selectedRequest) {
                      openUpdateDialog(selectedRequest);
                    }
                  }}
                >
                  Update Status
                </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Donor Details Dialog */}
          {selectedDonor && (
    <Dialog 
      open={!!selectedDonor} 
      onOpenChange={(open) => !open && setSelectedDonor(null)}
    > 
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Donor Details</DialogTitle>
                  <DialogDescription>
                    Registered on {new Date(selectedDonor.createdAt).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                              
                  <div>
                      <h3 className="text-sm font-medium">Location</h3>
                      <p className="text-sm">
                        {`${selectedDonor.city}, ${selectedDonor.state}`}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Name</h3>
                      <p className="text-sm">{selectedDonor.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <p className="text-sm">{selectedDonor.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Phone</h3>
                      <p className="text-sm">{selectedDonor.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Gender</h3>
                      <p className="text-sm">{selectedDonor.gender}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Blood Type</h3>
                      <Badge variant="outline">{selectedDonor.bloodType}</Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Previous Donation</h3>
                      <p className="text-sm">{selectedDonor.previousDonation}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">City</h3>
                      <p className="text-sm">{selectedDonor.city}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">State</h3>
                      <p className="text-sm">{selectedDonor.state}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedDonor(null)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Update Status Dialog */}
                <Dialog 
                  open={isUpdateDialogOpen} 
                  onOpenChange={(open) => {
                    setIsUpdateDialogOpen(open);
                    if (!open) setNewStatus("");
                  }}
                >      
              <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Request Status</DialogTitle>
                <DialogDescription>
                  Change the status for request from {selectedRequest?.patientName}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right text-sm font-medium col-span-1">
                    Status
                  </label>
                  <Select
                    value={newStatus}
                    onValueChange={setNewStatus}
                    disabled={updatingStatus}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)} disabled={updatingStatus}>
                  Cancel
                </Button>
                <Button
                  onClick={() => selectedRequest && updateRequestStatus(selectedRequest._id, newStatus)}
                  disabled={updatingStatus || newStatus === selectedRequest?.status}
                >
                  {updatingStatus ? 'Updating...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    };

    export default AdminDashboard;