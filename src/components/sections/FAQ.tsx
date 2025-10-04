import { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is Flow Reach and what do you do?",
          answer: "Flow Reach is an AI-powered automation company that helps businesses streamline their operations through intelligent workflows, AI agents, and process automation. We build custom solutions that save time, reduce costs, and scale your business efficiently."
        },
        {
          question: "How is Flow Reach different from other automation companies?",
          answer: "Unlike generic automation tools, we provide industry-specific solutions with deep AI integration. Our approach combines custom AI model training, seamless integrations, and ongoing support to ensure your automation actually works for your specific business needs."
        },
        {
          question: "What industries do you serve?",
          answer: "We serve a wide range of industries including SaaS, E-commerce, Healthcare, Legal, Finance, Manufacturing, Real Estate, and Education. Our solutions are tailored to each industry's specific requirements and compliance needs."
        }
      ]
    },
    {
      category: "Services",
      questions: [
        {
          question: "What types of automation do you offer?",
          answer: "We offer AI Agents, Workflow Automation, CRM Integration, and Data Processing services. Each service is customized to your specific needs and can include email automation, document processing, customer support bots, inventory management, and more."
        },
        {
          question: "How long does it take to implement automation?",
          answer: "Implementation time varies based on complexity, but typically ranges from 2-12 weeks. Simple workflows can be deployed in 2-4 weeks, while complex enterprise solutions may take 8-12 weeks. We provide detailed timelines during our consultation."
        },
        {
          question: "Do you provide ongoing support after implementation?",
          answer: "Yes! We provide comprehensive ongoing support including monitoring, maintenance, updates, and optimization. Our support includes 24/7 monitoring for enterprise clients and regular check-ins to ensure your automation continues to deliver value."
        }
      ]
    },
    {
      category: "Pricing",
      questions: [
        {
          question: "How much does automation cost?",
          answer: "Our pricing starts at $299/month for the Starter plan and scales based on your needs. We offer transparent pricing with no hidden fees. The exact cost depends on the complexity of your automation, number of workflows, and level of support required."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes! All our plans come with a 14-day free trial. No credit card required to start. This gives you a chance to experience our platform and see the value before committing to a plan."
        },
        {
          question: "Can I change my plan later?",
          answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences. We're here to grow with your business needs."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use cutting-edge AI technologies including OpenAI GPT-4, custom machine learning models, and industry-standard automation platforms. Our tech stack includes React, Node.js, Python, and cloud infrastructure on AWS and Azure."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. We're SOC 2 Type II certified, HIPAA compliant, and GDPR compliant. We use enterprise-grade security measures including 256-bit SSL encryption, multi-factor authentication, and regular security audits."
        },
        {
          question: "Do you integrate with my existing systems?",
          answer: "Yes! We integrate with over 100+ popular business tools including CRM systems (Salesforce, HubSpot), email platforms (Gmail, Outlook), project management tools (Asana, Trello), and many more. We can also build custom integrations for your specific needs."
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started?",
          answer: "Getting started is easy! Schedule a free consultation with our team, and we'll assess your needs, provide recommendations, and create a custom implementation plan. You can also start with our free trial to explore the platform."
        },
        {
          question: "What information do you need from me?",
          answer: "We'll need to understand your current processes, pain points, and goals. This includes information about your team size, current tools, and specific challenges you want to solve. We'll guide you through this process during our consultation."
        },
        {
          question: "Do you offer training for my team?",
          answer: "Yes! We provide comprehensive training for your team including platform orientation, best practices, and ongoing education. We also offer documentation, video tutorials, and dedicated support to ensure your team can effectively use the automation tools."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section id="faq" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Frequently Asked <span className="text-gradient-flow">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our automation services and platform.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-bold mb-6 text-center">{category.category}</h3>
              <div className="space-y-4">
                {category.questions.map((item, index) => {
                  const globalIndex = categoryIndex * 10 + index;
                  const isOpen = openItems.has(globalIndex);
                  
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold pr-4">{item.question}</h4>
                          <Button variant="ghost" size="sm" className="flex-shrink-0">
                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardHeader>
                      {isOpen && (
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Us
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    window.open('https://calendly.com/flowreach/consultation', '_blank');
                  }}
                >
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
