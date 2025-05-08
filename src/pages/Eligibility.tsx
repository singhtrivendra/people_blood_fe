
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, AlertCircle, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Eligibility = () => {
  const eligibilityCategories = [
    {
      id: "basic",
      name: "Basic Requirements",
      criteria: [
        { 
          id: 1, 
          title: "Age", 
          eligible: "17 years or older (16 with parental consent in some areas)",
          ineligible: "Under 17 years (or 16 without parental consent)",
          info: "Age requirements ensure donors can safely give blood without adverse effects."
        },
        { 
          id: 2, 
          title: "Weight", 
          eligible: "At least 110 pounds (50 kg)",
          ineligible: "Less than 110 pounds (50 kg)",
          info: "Weight requirements help ensure donors have enough blood volume to safely donate."
        },
        { 
          id: 3, 
          title: "General Health", 
          eligible: "Feeling well and in good health",
          ineligible: "Feeling sick, having a cold, flu, or other illness",
          info: "Donors must be in good health to ensure their safety and the safety of the blood supply."
        },
        { 
          id: 4, 
          title: "Previous Donation", 
          eligible: "At least 8 weeks since last whole blood donation",
          ineligible: "Less than 8 weeks since last whole blood donation",
          info: "Time between donations allows your body to replenish red blood cells."
        }
      ]
    },
    {
      id: "medical",
      name: "Medical Conditions",
      criteria: [
        { 
          id: 5, 
          title: "Diabetes", 
          eligible: "Well-controlled diabetes with no complications",
          ineligible: "Poorly controlled diabetes or those on insulin for less than 4 weeks",
          info: "Controlled diabetes generally does not affect eligibility for blood donation."
        },
        { 
          id: 6, 
          title: "Blood Pressure", 
          eligible: "Controlled hypertension with medication",
          ineligible: "Uncontrolled high blood pressure or change in medication within 28 days",
          info: "Blood pressure must be below 180/100 at the time of donation."
        },
        { 
          id: 7, 
          title: "Heart Conditions", 
          eligible: "Minor heart murmur with no restrictions",
          ineligible: "History of heart attack, heart failure, or severe heart conditions",
          info: "Certain heart conditions may permanently defer you from donation."
        },
        { 
          id: 8, 
          title: "Cancer", 
          eligible: "Skin cancer (basal or squamous cell) that has been treated and healed",
          ineligible: "Active cancer, undergoing treatment, or less than 12 months in remission",
          info: "Cancer eligibility depends on type, treatment, and time since recovery."
        }
      ]
    },
    {
      id: "medications",
      name: "Medications & Treatments",
      criteria: [
        { 
          id: 9, 
          title: "Antibiotics", 
          eligible: "Finished course and symptom-free",
          ineligible: "Currently taking for active infection",
          info: "You must complete the full course of antibiotics and be symptom-free."
        },
        { 
          id: 10, 
          title: "Blood Thinners", 
          eligible: "Off medication for required waiting period",
          ineligible: "Taking blood thinners like Warfarin, Heparin, or Apixaban",
          info: "Blood thinners affect blood clotting and may require deferral."
        },
        { 
          id: 11, 
          title: "Vaccines", 
          eligible: "Most vaccines require no wait time",
          ineligible: "Some live vaccines require a 2-4 week waiting period",
          info: "COVID-19 vaccines do not disqualify you from donating blood."
        },
        { 
          id: 12, 
          title: "Aspirin & OTC Medications", 
          eligible: "Most over-the-counter medications are acceptable",
          ineligible: "Aspirin within 48 hours (for platelet donation only)",
          info: "Most common medications do not affect whole blood donation."
        }
      ]
    },
    {
      id: "lifestyle",
      name: "Lifestyle & Travel",
      criteria: [
        { 
          id: 13, 
          title: "Tattoos & Piercings", 
          eligible: "Received from licensed facility and fully healed",
          ineligible: "Received within past 3-12 months (varies by location)",
          info: "Rules vary by state based on licensing requirements."
        },
        { 
          id: 14, 
          title: "International Travel", 
          eligible: "Travel to most countries after waiting period",
          ineligible: "Recent travel to malaria-risk areas or areas with other endemic diseases",
          info: "Travel to certain countries may require waiting periods from 3 months to 3 years."
        },
        { 
          id: 15, 
          title: "Alcohol Consumption", 
          eligible: "No alcohol 24 hours before donation",
          ineligible: "Alcohol consumption within 24 hours of donation",
          info: "Alcohol can cause dehydration, which is not ideal for blood donation."
        },
        { 
          id: 16, 
          title: "Pregnancy", 
          eligible: "At least 6 weeks after giving birth",
          ineligible: "Currently pregnant or within 6 weeks of delivery",
          info: "Pregnancy affects iron levels and blood volume."
        }
      ]
    }
  ];
  
  const calculateEligibility = () => {
    // This would typically connect to a more sophisticated eligibility checker
    return {
      result: "eligible",
      message: "Based on standard criteria, you appear to be eligible to donate blood. Please note that final eligibility is determined at the donation center."
    };
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Eligibility Requirements</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about the requirements for blood donation and check if you're eligible to donate.
        </p>
      </div>

      <div className="mb-16">
        <Tabs defaultValue="basic">
          <TabsList className="justify-center mb-8">
            {eligibilityCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {eligibilityCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.criteria.map((criterion) => (
                  <Card key={criterion.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium">{criterion.title}</h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <HelpCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{criterion.info}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <p className="font-medium text-green-600 dark:text-green-400">Eligible</p>
                              <p className="text-sm text-muted-foreground">{criterion.eligible}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="mt-0.5">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <p className="font-medium text-red-600 dark:text-red-400">Not Eligible</p>
                              <p className="text-sm text-muted-foreground">{criterion.ineligible}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <div className="max-w-3xl mx-auto bg-card border shadow-sm rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Check Your Eligibility</h3>
            <p className="text-muted-foreground">
              Find out if you can donate blood based on your health, travel history, and medications.
            </p>
          </div>
          <Button className="whitespace-nowrap">
            Take Eligibility Quiz
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 mr-2 text-amber-500" />
          <h3 className="text-xl font-semibold">Important Note</h3>
        </div>
        <p className="max-w-2xl mx-auto">
          Final eligibility determination is made at the time of donation after review of your health history and a mini-physical. 
          Requirements may vary by donation center and region. When in doubt, please contact your local blood center.
        </p>
      </div>
    </div>
  );
};

export default Eligibility;
