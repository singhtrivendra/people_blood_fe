
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/people-blood-logo.png" 
                alt="People Blood Logo" 
                className="h-12 w-auto" 
              />
              <span className="text-lg font-bold">People Blood</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting donors with those in need, saving lives one donation at a time.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-lifelink-500">Home</Link></li>
              <li><Link to="/donors" className="text-sm text-muted-foreground hover:text-lifelink-500">Donors</Link></li>
              <li><Link to="/requests" className="text-sm text-muted-foreground hover:text-lifelink-500">Requests</Link></li>
              <li><Link to="/health" className="text-sm text-muted-foreground hover:text-lifelink-500">Health</Link></li>
              <li><Link to="/analytics" className="text-sm text-muted-foreground hover:text-lifelink-500">Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-lifelink-500">FAQs</Link></li>
              <li><Link to="/eligibility" className="text-sm text-muted-foreground hover:text-lifelink-500">Eligibility</Link></li>
              <li><Link to="/donation-process" className="text-sm text-muted-foreground hover:text-lifelink-500">Donation Process</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-lifelink-500">Blog</Link></li>
              <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-lifelink-500">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Email: info@peopleblood.org</li>
              <li className="text-sm text-muted-foreground">Phone: +91 7703913626</li>
              <li className="text-sm text-muted-foreground">Emergency: 1-800-BLOOD-HELP</li>
              <li className="text-sm text-muted-foreground">Address: sector-14 Chandigarh</li>
              <li><Link to="/contact" className="text-sm font-medium text-lifelink-500 hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} People Blood. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-lifelink-500">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-lifelink-500">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
