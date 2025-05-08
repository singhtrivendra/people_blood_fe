
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface DonorInfo {
  id: string;
  name: string;
  bloodType: string;
  lastDonation: string;
  donations: number;
  location: string;
  status: 'available' | 'unavailable' | 'pending';
  distance?: number;
}

interface DonorCardProps {
  donor: DonorInfo;
  onContact: (donor: DonorInfo) => void;
}

const DonorCard: React.FC<DonorCardProps> = ({ donor, onContact }) => {
  const statusColors = {
    available: 'bg-green-500',
    unavailable: 'bg-gray-400',
    pending: 'bg-yellow-500',
  };
  
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{donor.name}</h3>
            <p className="text-sm text-muted-foreground">{donor.location}</p>
          </div>
          <Badge 
            variant="secondary" 
            className="font-bold"
          >
            {donor.bloodType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Last Donation</p>
            <p className="text-sm font-medium">{donor.lastDonation}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Donations</p>
            <p className="text-sm font-medium">{donor.donations}</p>
          </div>
          {donor.distance && (
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-medium">{donor.distance} km</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[donor.status]}`}></div>
          <p className="text-xs capitalize">{donor.status}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full text-lifelink-600 border-lifelink-600 hover:bg-lifelink-50"
          onClick={() => onContact(donor)}
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonorCard;
