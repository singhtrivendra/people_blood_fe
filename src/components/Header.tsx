
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Menu, 
  User, 
  Moon, 
  Sun, 
  X,
  UserPlus,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import DonorRegistrationForm from './DonorRegistrationForm';
import BloodRequestForm from './BloodRequestForm';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donorFormOpen, setDonorFormOpen] = useState(false);
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  
  const handleEmergencyClick = () => {
    toast({
      title: "Emergency Request",
      description: "Please call our emergency hotline at 1-800-BLOOD-HELP for immediate assistance.",
      variant: "destructive",
    });
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/images/people-blood-logo.png" 
              alt="People Blood Logo" 
              className="h-12 w-auto" 
            />
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/donors" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Donors
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/requests" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Requests
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/resources"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Resources</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Guides, forms, videos, and other helpful resources
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/faq"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Answers to common questions about blood donation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/eligibility"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Eligibility</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Check if you're eligible to donate blood
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/donation-process"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Donation Process</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about the blood donation procedure
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/health" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Health
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/blog" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Blog
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Contact
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/analytics" className="text-foreground hover:text-lifelink-500 transition-colors px-3 py-2">
                  Analytics
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Dialog open={donorFormOpen} onOpenChange={setDonorFormOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register as Donor</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Donor Registration</DialogTitle>
              </DialogHeader>
              <DonorRegistrationForm onClose={() => setDonorFormOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={requestFormOpen} onOpenChange={setRequestFormOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                className="hidden sm:flex"
              >
                Create Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Blood Request</DialogTitle>
              </DialogHeader>
              <BloodRequestForm onClose={() => setRequestFormOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <img 
                    src="/images/people-blood-logo.png" 
                    alt="People Blood Logo" 
                    className="h-6 w-auto mr-2" 
                  />
                  People Blood
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col mt-6 space-y-3">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/donors" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Donors
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/requests" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Requests
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/resources" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Resources
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/faq" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    FAQ
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/eligibility" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Eligibility
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/donation-process" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Donation Process
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/health" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Health
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/blog" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/contact" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Contact
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/analytics" className="flex items-center px-2 py-3 hover:bg-accent rounded-md" onClick={closeMenu}>
                    Analytics
                  </Link>
                </SheetClose>
                
                <div className="border-t my-2 pt-4">
                  <Button 
                    variant="outline"
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => setDonorFormOpen(true), 100);
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register as Donor
                  </Button>
                  <Button 
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => setRequestFormOpen(true), 100);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Request
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
