
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resourceCategories = [
    { 
      id: 'guides', 
      name: 'Donor Guides',
      resources: [
        { id: 1, title: 'First Time Donor Guide', description: 'Everything you need to know for your first donation', type: 'pdf', size: '1.2MB' },
        { id: 2, title: 'Donation Day Preparation', description: 'How to prepare 24 hours before donating', type: 'pdf', size: '845KB' },
        { id: 3, title: 'Post-Donation Care', description: 'Taking care of yourself after donating blood', type: 'pdf', size: '920KB' },
      ]
    },
    { 
      id: 'forms', 
      name: 'Important Forms',
      resources: [
        { id: 4, title: 'Donor Registration Form', description: 'Required for all new donors', type: 'pdf', size: '380KB' },
        { id: 5, title: 'Medical History Questionnaire', description: 'Health information form', type: 'pdf', size: '520KB' },
        { id: 6, title: 'Consent Form', description: 'Legal consent for blood donation', type: 'pdf', size: '290KB' },
      ]
    },
    { 
      id: 'videos', 
      name: 'Educational Videos',
      resources: [
        { id: 7, title: 'The Donation Process', description: 'Step-by-step video guide', type: 'video', duration: '5:24' },
        { id: 8, title: 'How Blood Saves Lives', description: 'The journey of donated blood', type: 'video', duration: '7:12' },
        { id: 9, title: 'Blood Types Explained', description: 'Understanding blood compatibility', type: 'video', duration: '4:45' },
      ]
    },
    { 
      id: 'links', 
      name: 'External Resources',
      resources: [
        { id: 10, title: 'World Health Organization', description: 'Global blood donation guidelines', type: 'link', url: 'https://www.who.int/health-topics/blood-transfusion-safety' },
        { id: 11, title: 'National Blood Service', description: 'Official blood service information', type: 'link', url: '#' },
        { id: 12, title: 'Blood Donor Community', description: 'Connect with other donors', type: 'link', url: '#' },
      ]
    }
  ];

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Resources</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access guides, forms, videos, and other helpful resources related to blood donation.
        </p>
      </div>
      
      <Tabs defaultValue={resourceCategories[0].id} className="mb-12">
        <TabsList className="justify-center">
          {resourceCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {resourceCategories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map(resource => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      {resource.type === 'pdf' && <Download className="h-5 w-5 text-muted-foreground" />}
                      {resource.type === 'video' && <FileText className="h-5 w-5 text-muted-foreground" />}
                      {resource.type === 'link' && <LinkIcon className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {resource.type === 'pdf' && `PDF · ${resource.size}`}
                        {resource.type === 'video' && `Video · ${resource.duration}`}
                        {resource.type === 'link' && 'External Resource'}
                      </span>
                      <Link 
                        to={resource.type === 'link' ? (resource.url || '#') : '#'} 
                        className="text-sm text-primary font-medium hover:underline"
                        target={resource.type === 'link' ? "_blank" : "_self"}
                      >
                        {resource.type === 'pdf' && 'Download'}
                        {resource.type === 'video' && 'Watch'}
                        {resource.type === 'link' && 'Visit'}
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Resources;
