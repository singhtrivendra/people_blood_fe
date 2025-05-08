
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface HealthInfo {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readTime: number;
  slug: string;
}

interface HealthCardProps {
  info: HealthInfo;
}

const HealthCard: React.FC<HealthCardProps> = ({ info }) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col cursor-pointer">
      <div className="relative h-48">
        <img 
          src={info.imageUrl} 
          alt={info.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
            {info.category}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{info.title}</h3>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-muted-foreground">{info.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{info.readTime} min read</span>
        <Button 
          variant="ghost"
          size="sm"
          className="text-health-600 hover:text-health-800"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent div's click handler from firing
          }}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthCard;
