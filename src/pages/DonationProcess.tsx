
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Registration",
      duration: "5-10 minutes",
      description: "Sign in, show ID, and read educational materials about the donation process.",
      details: [
        "Bring a valid ID and donor card (if you have one)",
        "Fill out a donor registration form",
        "Review information on the donation process",
        "Receive a donor identification number"
      ]
    },
    {
      id: 2,
      title: "Health History & Mini-Physical",
      duration: "10-15 minutes",
      description: "Answer questions about your health history and receive a quick check of your vital signs.",
      details: [
        "Complete confidential health questionnaire",
        "Temperature, pulse, blood pressure measurement",
        "Hemoglobin test via finger prick",
        "Review of eligibility based on health history"
      ]
    },
    {
      id: 3,
      title: "The Donation",
      duration: "8-10 minutes",
      description: "A sterile needle is inserted and whole blood is collected in a bag with preservatives.",
      details: [
        "Arm is cleansed with antiseptic",
        "Single-use sterile needle is inserted",
        "Approximately 1 pint (450-500 ml) of blood is collected",
        "Needle is removed and a bandage is applied"
      ]
    },
    {
      id: 4,
      title: "Refreshment & Recovery",
      duration: "10-15 minutes",
      description: "Rest and enjoy provided snacks and drinks to replenish fluids and blood sugar.",
      details: [
        "Rest for at least 10-15 minutes",
        "Enjoy refreshments (juice, water, cookies)",
        "Staff monitors for any adverse reactions",
        "Receive post-donation care instructions"
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does the entire donation process take?",
      answer: "The entire process takes about 1 hour, with the actual blood collection typically taking only 8-10 minutes."
    },
    {
      question: "Does donating blood hurt?",
      answer: "Most donors feel only a brief pinch when the needle is inserted. The donation itself is usually painless."
    },
    {
      question: "How much blood is taken during donation?",
      answer: "A typical whole blood donation is approximately one pint (about 450-500 milliliters)."
    },
    {
      question: "How long until my body replaces the donated blood?",
      answer: "The liquid portion of your blood (plasma) is replaced within 24 hours. Red blood cells are replaced by your bone marrow within 4-6 weeks."
    }
  ];

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">The Donation Process</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understanding what happens during blood donation helps make the experience more comfortable. Here's what to expect.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative">
          <div className="hidden md:block absolute left-[21px] top-24 bottom-24 w-[2px] bg-muted"/>
          
          {steps.map((step, index) => (
            <div key={step.id} className="mb-8 md:mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-row md:flex-col items-center">
                  <div className="flex items-center justify-center min-w-[44px] h-11 rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                    {step.id}
                  </div>
                  <div className="md:mt-2 mx-4 md:mx-0 flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {step.duration}
                  </div>
                </div>
                
                <Card className="flex-1">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex justify-center ml-[21px] mt-2 mb-4">
                  <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-muted/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Your Donation Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Registration</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Health Screening</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Donation</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Recovery</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="pt-4 text-center">
              <p className="text-muted-foreground">A whole blood donation takes approximately 45-60 minutes from start to finish.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card border rounded-lg p-6">
              <h4 className="font-medium mb-2">{faq.question}</h4>
              <p className="text-muted-foreground text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-lifelink-50 to-health-50 dark:from-lifelink-950/30 dark:to-health-950/30 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Donate?</h3>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Now that you know what to expect, you're ready to help save lives through blood donation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/register">Register as Donor</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
