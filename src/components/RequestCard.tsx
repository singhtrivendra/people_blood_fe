
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  hospital: string;
  location: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  unitsNeeded: number;
  unitsReceived: number;
  reason?: string;
}

interface RequestCardProps {
  request: BloodRequest;
  onRespond: (request: BloodRequest) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onRespond }) => {
  const urgencyColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
  };
  
  const progressPercentage = (request.unitsReceived / request.unitsNeeded) * 100;
  
  return (
    <Card className={
      request.urgency === 'critical' 
        ? "border-red-500 animate-pulse-subtle card-hover" 
        : "card-hover"
    }>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{request.patientName}</h3>
              <Badge 
                variant="outline" 
                className={`text-white ${urgencyColors[request.urgency]}`}
              >
                {request.urgency}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{request.hospital}</p>
          </div>
          <Badge 
            variant="destructive" 
            className="font-bold"
          >
            {request.bloodType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{request.createdAt}</span>
        </div>
        
        {request.reason && (
          <div className="text-sm border-l-2 border-lifelink-500 pl-3 py-1">
            {request.reason}
          </div>
        )}
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{request.unitsReceived} of {request.unitsNeeded} units</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-lifelink-500 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant={request.urgency === 'critical' ? "destructive" : "default"} 
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
