  import React, { useEffect, useState } from 'react';
  import { useForm } from "react-hook-form";
  import * as z from "zod";
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { cn } from "@/lib/utils";
  import { format } from "date-fns";
  import { Calendar as CalendarIcon, AlertCircle, MapPin } from "lucide-react";
  import { useToast } from '@/hooks/use-toast';

  import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';
// const BASE_URL = 'https://people-blood-be.onrender.com/api';

  // Note: Since we can't use zodResolver directly, we'll implement basic form validation in the component
  // and will need to add it back when actually implementing

  const GEOCODING_CACHE_KEY = 'geocoding_cache';
  const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 hours
  const GEOLOCATION_RATE_LIMIT = 5000; // 5 seconds

  const getGeocodingCache = () => {
    const cache = localStorage.getItem(GEOCODING_CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  };

  const updateGeocodingCache = (address: string, coordinates: [number, number]) => {
    const cache = getGeocodingCache();
    cache[address.toLowerCase()] = {
      coordinates,
      timestamp: Date.now()
    };
    localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
  };

  const requestFormSchema = z.object({
    patientName: z.string().min(2, { message: "Patient name must be at least 2 characters." }),
    contactPerson: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    bloodType: z.string({
      required_error: "Please select the required blood type.",
    }),
    unitsNeeded: z.string().min(1, { message: "Please specify how many units are needed." }),
    hospital: z.string().min(2, { message: "Hospital name must be at least 2 characters." }),
    address: z.string().min(5, { message: "Please enter a valid address." }),
    location: z.object({
      type: z.string(),
      coordinates: z.array(z.number()).length(2),
    }),
    urgency: z.string({
      required_error: "Please select the urgency level.",
    }),
    requiredBy: z.date({
      required_error: "Please select when the blood is needed by.",
    }),
    reason: z.string().min(10, { message: "Please provide a detailed reason for the request." }),
    additionalInfo: z.string().optional(),
    verifyInfo: z.boolean().refine(val => val === true, {
      message: "You must verify that the information is accurate."
    }),
  });

  type Props = {
    onClose: () => void;
  };

  const BloodRequestForm: React.FC<Props> = ({ onClose }) => {
    const { toast } = useToast();
    const [isLocating, setIsLocating] = useState(false);
    const [lastGeolocationRequest, setLastGeolocationRequest] = useState(0);

      // Cleanup old cache entries on mount
      useEffect(() => {
        const cleanupGeocodingCache = () => {
          const cache = getGeocodingCache();
          const now = Date.now();
          let needsUpdate = false;
          
          Object.keys(cache).forEach(key => {
            if (now - cache[key].timestamp > MAX_CACHE_AGE) {
              delete cache[key];
              needsUpdate = true;
            }
          });
          
          if (needsUpdate) {
            localStorage.setItem(GEOCODING_CACHE_KEY, JSON.stringify(cache));
          }
        };
    
        cleanupGeocodingCache();
      }, []);

      
    // Improved geocoding function with caching
    const geocodeAddress = async (address: string) => {
      if (!address?.trim()) return;

      // Check cache first
      const cache = getGeocodingCache();
      const cached = cache[address.toLowerCase()];
      if (cached && Date.now() - cached.timestamp < MAX_CACHE_AGE) {
        form.setValue("location", {
          type: "Point",
          coordinates: cached.coordinates
        });
        return;
      }

      setIsLocating(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
        );
        
        if (!response.ok) throw new Error('Geocoding failed');
        const data = await response.json();
        if (data.length === 0) throw new Error('No coordinates found');
        
        const coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        updateGeocodingCache(address, coordinates);
        
        form.setValue("location", {
          type: "Point",
          coordinates
        });
        
        toast({
          title: "Address Located",
          description: "Your address has been successfully geocoded.",
          variant: "success",
        });
      } catch (error) {
        console.error("Geocoding error:", error);
        toast({
          title: "Geocoding Error",
          description: "Could not convert address to coordinates. Try the location pin button.",
          variant: "destructive",
        });
      } finally {
        setIsLocating(false);
      }
    };
      
    const form = useForm({
      defaultValues: {
        patientName: "",
        contactPerson: "",
        email: "",
        phone: "",
        unitsNeeded: "",
        hospital: "",
        address: "",
        location: {
          type: "Point",
          coordinates: [0, 0], // [longitude, latitude]
        },
        urgency: "",
        reason: "",
        additionalInfo: "",
        verifyInfo: false,
      },
    });
    
    // Debug function to check coordinate values
    const checkCoordinates = () => {
      const values = form.getValues();
      console.log("Current form values:", values);
      console.log("Location coordinates:", values.location?.coordinates);
      
      // Show coordinates in toast for debugging purposes
      toast({
        title: "Current Coordinates",
        description: `Longitude: ${values.location?.coordinates[0]}, Latitude: ${values.location?.coordinates[1]}`,
      });
    };


    // Geolocation handler with rate limiting
    const getLocation = async () => {
      if (Date.now() - lastGeolocationRequest < GEOLOCATION_RATE_LIMIT) {
        toast({
          title: "Please Wait",
          description: "Geolocation requests are limited to once every 5 seconds",
          variant: "destructive",
        });
        return;
      }

      setIsLocating(true);
      setLastGeolocationRequest(Date.now());

      if (!navigator.geolocation) {
        toast({
          title: "Geolocation Error",
          description: "Browser doesn't support geolocation. Enter address manually.",
          variant: "destructive",
        });
        setIsLocating(false);
        return;
      }

      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coordinates = [position.coords.longitude, position.coords.latitude];
            form.setValue("location.coordinates", coordinates);
            toast({
              title: "Location Detected",
              description: "Current location added to form.",
              variant: "success",
            });
            setIsLocating(false);
          },
          (error) => {
            const errorMessages = {
              1: "Location access denied. Enable location services.",
              2: "Unable to determine location. Try again.",
              3: "Location request timed out. Try again.",
            };
            toast({
              title: "Location Error",
              description: errorMessages[error.code] || "Failed to get location.",
              variant: "destructive",
            });
            setIsLocating(false);
          }
        );
      } catch (error) {
        toast({
          title: "Location Error",
          description: "Failed to get location. Please try again.",
          variant: "destructive",
        });
        setIsLocating(false);
      }
    };


    const onSubmit = async (data: z.infer<typeof requestFormSchema>) => {
  try {
    // Validate location data
    if (!data.location?.coordinates || data.location.coordinates.every(coord => coord === 0)) {
      if (data.address) {
        await geocodeAddress(data.address);
        const updatedData = form.getValues();
        if (updatedData.location.coordinates.every(coord => coord === 0)) {
          throw new Error("Location information required");
        }
        data = updatedData;
      } else {
        throw new Error("Location information required");
      }
    }

    const payload = {
      ...data,
      status: 'pending',
      donorAccepted: false,
      notificationSent: false,
      donationConfirmed: false
    };

    await axios.post(`${BASE_URL}/blood-requests`, payload);

    toast({
      title: "Request Submitted",
      description: "We'll match you with nearby donors soon.",
    });

    onClose();
  } catch (err) {
    const message = axios.isAxiosError(err) && err.response
      ? err.response.data.message || 'Submission failed'
      : err instanceof Error
      ? err.message
      : 'Please try again.';

    console.error('Submission error:', err);
    toast({
      title: "Submission Failed",
      description: message,
      variant: "destructive",
    });
  }
};

    return (
      <div className="max-h-[80vh] overflow-y-auto px-1">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Blood Request Form</h2>
          <p className="text-muted-foreground">Please provide details about the blood requirement</p>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-300">Important</p>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              For emergency situations requiring immediate blood, please contact our 
              emergency hotline at 1-800-BLOOD-HELP in addition to submitting this form.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800 dark:text-blue-300">Location Required</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Your location information is essential for matching with nearby donors. 
              Please provide your address or use the location pin button to share your current location.
            </p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Patient Information</h3>
              
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name of the patient" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unitsNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units Needed</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="Number of units" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the person to contact" {...field} />
                    </FormControl>
                    <FormDescription>
                      Person responsible for coordinating the request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact email address" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requirement Details</h3>
              
              <FormField
                control={form.control}
                name="hospital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital/Medical Center</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the hospital" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="Full address including city and state" 
                            className="flex-grow"
                            {...field} 
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            onClick={getLocation}
                            disabled={isLocating}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Click the map pin to use your current location
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="critical">Critical (Within hours)</SelectItem>
                          <SelectItem value="high">High (Within 24 hours)</SelectItem>
                          <SelectItem value="medium">Medium (Within 2-3 days)</SelectItem>
                          <SelectItem value="low">Low (Within a week)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="requiredBy"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Required By (Date)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide details about why the blood is needed"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other relevant information"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="verifyInfo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Verification</FormLabel>
                    <FormDescription>
                      I verify that all information provided is accurate and 
                      I understand the urgency of this blood request. I agree to the process
                      of being matched with a suitable donor based on location and blood type.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  };

  export default BloodRequestForm;