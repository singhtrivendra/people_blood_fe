import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

export interface BloodRequest {
  _id: string;
  patientName: string;
  bloodType: string;
  hospital: string;
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  unitsNeeded: number;
  unitsReceived: number;
  contactPerson: string;
  email: string;
  phone: string;
  requiredBy: string;
  status: string;
  reason?: string;
}

interface RequestCardProps {
  request: BloodRequest;
  onRespond: (request: BloodRequest) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onRespond }) => {
  const urgencyColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  // Calculate progress if unitsNeeded and unitsReceived exist
  const progressPercentage = request.unitsNeeded && request.unitsReceived 
    ? (request.unitsReceived / request.unitsNeeded) * 100 
    : 0;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${urgencyColors[request.urgency].split(' ')[0]}`} />
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{request.patientName}</h3>
          <Badge className={urgencyColors[request.urgency]}>
            {request.urgency}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{request.hospital}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <Badge variant="outline">{request.bloodType}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {/* <span>{request.location}</span> */}
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>Posted on {formatDate(request.createdAt)}</span>
          </div>
          
          {request.reason && (
            <p className="text-sm mt-2 text-muted-foreground">
              {request.reason}
            </p>
          )}
          
          {request.unitsNeeded && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{request.unitsReceived || 0} of {request.unitsNeeded} units</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          className="w-full"
          onClick={() => onRespond(request)}
        >
          Respond
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;