
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          id: 'faq1',
          question: 'What is blood donation?',
          answer: 'Blood donation is a voluntary procedure where a person allows blood to be drawn for use as needed for transfusions or made into biopharmaceutical medications.'
        },
        {
          id: 'faq2',
          question: 'How often can I donate blood?',
          answer: 'Most people can donate whole blood every 8 to 12 weeks. The exact waiting period depends on the type of donation and local regulations.'
        },
        {
          id: 'faq3',
          question: 'Is blood donation safe?',
          answer: 'Yes, blood donation is very safe. All equipment used for the procedure is sterile and disposed of after a single use, eliminating the risk of infection.'
        }
      ]
    },
    {
      id: 'eligibility',
      title: 'Eligibility',
      questions: [
        {
          id: 'faq4',
          question: 'What are the basic requirements to donate blood?',
          answer: 'Generally, donors must be at least 17 years old (16 with parental consent in some areas), weigh at least 110 pounds, and be in good general health.'
        },
        {
          id: 'faq5',
          question: 'Can I donate if I have a medical condition?',
          answer: 'It depends on the condition. Some medical conditions may disqualify you from donating blood, while others may not affect your eligibility. It is best to consult with the donation center staff.'
        },
        {
          id: 'faq6',
          question: 'Does medication use affect my ability to donate?',
          answer: 'Some medications may require a waiting period before donation. Many common medications like blood pressure medicine, birth control pills, and over-the-counter pain relievers do not affect eligibility.'
        }
      ]
    },
    {
      id: 'process',
      title: 'Donation Process',
      questions: [
        {
          id: 'faq7',
          question: 'How long does it take to donate blood?',
          answer: 'The actual blood donation takes about 8-10 minutes. However, the entire process, including registration, health screening, and refreshment time, typically takes about an hour.'
        },
        {
          id: 'faq8',
          question: 'Does donating blood hurt?',
          answer: 'Most people feel only a brief pinch when the needle is inserted. The rest of the donation process is usually painless.'
        },
        {
          id: 'faq9',
          question: 'What should I do before donating blood?',
          answer: 'Eat a healthy meal, drink plenty of fluids, get a good night sleep, and avoid fatty foods before donating. Wear comfortable clothing with sleeves that can be rolled up.'
        }
      ]
    },
    {
      id: 'after',
      title: 'After Donation',
      questions: [
        {
          id: 'faq10',
          question: 'What should I do after donating blood?',
          answer: 'Rest for a few minutes, have some refreshments provided by the donation center, avoid strenuous activities for the rest of the day, drink extra fluids, and keep the bandage on for a few hours.'
        },
        {
          id: 'faq11',
          question: 'How long does it take to recover from blood donation?',
          answer: 'Your body replaces the fluid lost from donation in about 24 hours. The red blood cells are replaced in about 4-6 weeks.'
        },
        {
          id: 'faq12',
          question: 'Can I exercise after donating blood?',
          answer: 'It is recommended to avoid strenuous physical activity and heavy lifting for at least 24 hours after blood donation.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about blood donation, eligibility, and the donation process.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Input
            className="pl-10"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map(category => (
          <div key={category.id} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No FAQs found matching your search.</p>
          <Button 
            variant="outline" 
            onClick={() => setSearchQuery('')}
            className="mt-4"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
