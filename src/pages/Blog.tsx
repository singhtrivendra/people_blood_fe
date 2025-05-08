
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User, MessageSquare, ArrowRight, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmitStory = () => {
    toast({
      title: "Story Submission",
      description: "Thank you for your interest! The story submission form will be available soon.",
    });
  };
  
  const blogPosts = [
    {
      id: 1,
      title: "The Importance of Regular Blood Donation",
      excerpt: "Learn why regular blood donation is crucial for healthcare systems and how it impacts patients' lives.",
      content: "Blood donation is a critical lifeline for healthcare systems worldwide...",
      date: "2023-05-15",
      author: {
        name: "Dr. Sarah Johnson",
        image: "https://i.pravatar.cc/150?img=1",
        role: "Medical Director"
      },
      category: "education",
      tags: ["health", "donation", "impact"],
      commentCount: 14,
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Understanding Blood Types and Compatibility",
      excerpt: "A comprehensive guide to different blood types, their characteristics, and compatibility for transfusion.",
      content: "Blood types are determined by the presence or absence of certain antigens...",
      date: "2023-04-22",
      author: {
        name: "Dr. Michael Chen",
        image: "https://i.pravatar.cc/150?img=3",
        role: "Hematologist"
      },
      category: "education",
      tags: ["blood types", "compatibility", "science"],
      commentCount: 7,
      readTime: "8 min"
    },
    {
      id: 3,
      title: "From Donor to Patient: The Journey of Blood",
      excerpt: "Follow the journey of donated blood from collection to transfusion, and all the steps in between.",
      content: "Have you ever wondered what happens to your blood after donation?...",
      date: "2023-03-10",
      author: {
        name: "Emma Rodriguez",
        image: "https://i.pravatar.cc/150?img=5",
        role: "Lab Technician"
      },
      category: "behind-the-scenes",
      tags: ["process", "laboratory", "transfusion"],
      commentCount: 23,
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Overcoming Fear: A First-Time Donor's Story",
      excerpt: "Read about one donor's journey from fear and anxiety to becoming a regular blood donor.",
      content: "The first time I considered donating blood, I was paralyzed with fear...",
      date: "2023-06-05",
      author: {
        name: "James Wilson",
        image: "https://i.pravatar.cc/150?img=8",
        role: "Regular Donor"
      },
      category: "stories",
      tags: ["first-time", "fear", "personal story"],
      commentCount: 31,
      readTime: "4 min"
    },
    {
      id: 5,
      title: "The Role of Blood Donation During Disasters",
      excerpt: "Discover how blood donation programs respond to natural disasters and emergencies.",
      content: "When disasters strike, the need for blood products increases dramatically...",
      date: "2023-02-18",
      author: {
        name: "Dr. Robert Adams",
        image: "https://i.pravatar.cc/150?img=11",
        role: "Emergency Medicine Specialist"
      },
      category: "impact",
      tags: ["disasters", "emergency", "response"],
      commentCount: 9,
      readTime: "7 min"
    },
    {
      id: 6,
      title: "Innovations in Blood Collection and Storage",
      excerpt: "Explore the latest technological advancements in blood collection, processing, and storage.",
      content: "The field of blood banking has seen remarkable technological advances in recent years...",
      date: "2023-07-14",
      author: {
        name: "Dr. Lisa Cohen",
        image: "https://i.pravatar.cc/150?img=10",
        role: "Research Director"
      },
      category: "innovation",
      tags: ["technology", "research", "storage"],
      commentCount: 5,
      readTime: "9 min"
    }
  ];
  
  const categories = ["all", "education", "behind-the-scenes", "stories", "impact", "innovation"];
  
  // Navigate to individual blog post
  const viewBlogPost = (postId: number) => {
    // In a real app, this would navigate to a dedicated blog post page
    toast({
      title: "Blog Post",
      description: `Viewing blog post #${postId}. Full article page coming soon!`,
    });
  };
  
  // Filter posts based on search query and category
  const filterPosts = (posts, category, query) => {
    return posts.filter(post => {
      // Filter by category
      const categoryMatch = category === "all" || post.category === category;
      
      // Filter by search query
      const searchMatch = !query || 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      return categoryMatch && searchMatch;
    });
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Blood Donation Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay informed with articles, stories, and updates about blood donation and healthcare.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => {
          const filteredPosts = filterPosts(blogPosts, category, searchQuery);
          
          return (
            <TabsContent key={category} value={category}>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="flex flex-col h-full hover:shadow-md cursor-pointer transition-all duration-200"
                      onClick={() => viewBlogPost(post.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="capitalize text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-between items-center border-t">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={post.author.image} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-xs">
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-muted-foreground">{post.author.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {post.commentCount}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
      
      <div className="max-w-4xl mx-auto mb-12 bg-card border rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="rounded-full bg-primary/10 p-5">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
          <p className="text-muted-foreground mb-4">
            Are you a blood donor or recipient with a story to tell? We'd love to feature your experience on our blog.
          </p>
          <Button className="flex items-center gap-2" onClick={handleSubmitStory}>
            <span>Submit Your Story</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
