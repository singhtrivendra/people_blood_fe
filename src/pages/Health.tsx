
import React, { useState } from 'react';
import { mockHealthArticles } from '@/services/mockData';
import HealthCard from '@/components/HealthCard';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const Health = () => {
  const categories = ['All', 'Health', 'Education', 'Tips', 'Emergency'];
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  
  const handleReadMore = (slug: string) => {
    const article = mockHealthArticles.find(article => article.slug === slug);
    if (article) {
      setSelectedArticle(article);
      setShowArticleDialog(true);
    }
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Health & Awareness</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay informed with the latest health information, tips, and educational resources about blood donation and healthcare.
        </p>
      </div>
      
      <Tabs defaultValue="All" className="mb-12">
        <TabsList className="justify-center">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(category === 'All' 
                ? mockHealthArticles
                : mockHealthArticles.filter(article => article.category === category)
              ).map(article => (
                <div key={article.id} onClick={() => handleReadMore(article.slug)}>
                  <HealthCard info={article} />
                </div>
              ))}
            </div>
            
            {category !== 'All' && 
             mockHealthArticles.filter(article => article.category === category).length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles available in this category yet.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-gradient-to-r from-lifelink-50 to-health-50 dark:from-lifelink-900/20 dark:to-health-900/20 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Our health specialists regularly update this section with important information about blood donation, health tips, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Donation Process', 'Health Benefits', 'FAQ', 'Eligibility'].map(topic => (
            <span 
              key={topic} 
              className="bg-background border px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-muted transition-colors"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedArticle?.title}</DialogTitle>
            <DialogDescription>
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                {selectedArticle?.category}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">{selectedArticle?.readTime} min read</span>
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="mb-4">
            <img 
              src={selectedArticle?.imageUrl} 
              alt={selectedArticle?.title}
              className="w-full rounded-md h-48 object-cover mb-4"
            />
            <p className="text-lg mb-6">{selectedArticle?.excerpt}</p>
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, 
                eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <h3 className="text-xl font-semibold">Why This Matters</h3>
              <p>
                Blood donation is crucial for maintaining adequate supplies for medical emergencies and regular treatments. 
                Every donation can save up to three lives, making it one of the most impactful ways to help others.
              </p>
              <p>
                Understanding the process and benefits of blood donation can help reduce anxiety and encourage more people to donate regularly.
                This knowledge can also help dispel myths and misconceptions about blood donation.
              </p>
              <h3 className="text-xl font-semibold">Tips for Donors</h3>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Stay hydrated before and after donating</li>
                <li>Eat a healthy meal at least 3 hours before donation</li>
                <li>Avoid strenuous physical activity for 24 hours after donating</li>
                <li>Bring a photo ID and list of medications you're taking</li>
                <li>Wear comfortable clothing with sleeves that can be rolled up</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setShowArticleDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Health;
