import { useState } from "react";
import { Check, X, Star, Calculator, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small businesses getting started",
      price: { monthly: 299, yearly: 2990 },
      features: [
        "Up to 5 automation workflows",
        "Basic AI chatbot",
        "Email automation",
        "1 CRM integration",
        "Basic analytics",
        "Email support",
        "Setup & onboarding"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Ideal for growing businesses",
      price: { monthly: 799, yearly: 7990 },
      features: [
        "Up to 25 automation workflows",
        "Advanced AI chatbot",
        "Multi-channel automation",
        "Up to 3 CRM integrations",
        "Advanced analytics",
        "Priority email support",
        "Setup & onboarding",
        "Advanced AI features",
        "2 custom integrations",
        "Phone support"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Complete solution for large organizations",
      price: { monthly: 1999, yearly: 19990 },
      features: [
        "Unlimited automation workflows",
        "Enterprise AI chatbot",
        "Multi-channel automation",
        "Unlimited CRM integrations",
        "Enterprise analytics",
        "24/7 priority support",
        "Dedicated setup & onboarding",
        "Advanced AI features",
        "Unlimited custom integrations",
        "Phone & chat support",
        "White-label options",
        "Dedicated account manager"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    { name: "AI Model Training", price: 500, description: "Custom AI training on your data" },
    { name: "Custom Integration", price: 2000, description: "Build custom tool integrations" },
    { name: "White-Label Solution", price: 1000, description: "Rebrand with your company branding" },
    { name: "Dedicated Support", price: 1500, description: "Dedicated support team member" }
  ];

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  const handleCTAClick = (tierId: string) => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Simple, <span className="text-gradient-flow">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. Start free, scale as you grow.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="billing-toggle" className="text-lg font-medium">
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <Label htmlFor="billing-toggle" className="text-lg font-medium">
            Yearly
          </Label>
          {isYearly && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Save up to 20%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {pricingTiers.map((tier) => {
            const currentPrice = isYearly ? tier.price.yearly : tier.price.monthly;
            const savings = isYearly ? calculateSavings(tier.price.monthly, tier.price.yearly) : null;

            return (
              <Card 
                key={tier.id} 
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  tier.popular ? 'ring-2 ring-accent shadow-lg scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1 text-sm font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold">${currentPrice.toLocaleString()}</span>
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {savings && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          Save ${savings.savings.toLocaleString()} ({savings.percentage}%)
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-gradient-flow hover:shadow-glow' : ''}`}
                    variant={tier.id === 'enterprise' ? 'outline' : 'default'}
                    size="lg"
                    onClick={() => handleCTAClick(tier.id)}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-ons */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Add-ons & Extensions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addOn, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold mb-2">{addOn.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{addOn.description}</p>
                  <div className="text-lg font-bold text-gradient-flow">
                    ${addOn.price.toLocaleString()}/month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Can I change my plan anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! All plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">What happens if I exceed my limits?</h4>
                <p className="text-sm text-muted-foreground">
                  We'll notify you when approaching limits. You can upgrade or purchase additional capacity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. No long-term contracts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of businesses already saving time and money with intelligent automation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => {
                    const element = document.getElementById('roi-calculator');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate ROI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
