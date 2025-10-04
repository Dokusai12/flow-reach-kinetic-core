import { useState } from "react";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Rocket, 
  ArrowRight, 
  Calculator,
  MessageSquare,
  Calendar,
  Shield,
  Clock,
  Users,
  Database,
  Bot,
  Workflow,
  BarChart3,
  Headphones,
  FileText,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  icon: any;
  color: string;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
    description?: string;
  }[];
  limits: {
    name: string;
    value: string;
  }[];
  cta: string;
  ctaVariant: "default" | "outline" | "secondary";
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  popular?: boolean;
}

const PricingPackages = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small businesses getting started with automation",
      price: {
        monthly: 299,
        yearly: 2990
      },
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      features: [
        { name: "Up to 5 automation workflows", included: true },
        { name: "Basic AI chatbot", included: true },
        { name: "Email automation", included: true },
        { name: "CRM integration (1 platform)", included: true },
        { name: "Basic analytics dashboard", included: true },
        { name: "Email support", included: true },
        { name: "Setup & onboarding", included: true },
        { name: "Advanced AI features", included: false },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
        { name: "White-label options", included: false },
        { name: "Advanced analytics", included: false }
      ],
      limits: [
        { name: "Workflows", value: "5" },
        { name: "Monthly executions", value: "1,000" },
        { name: "Team members", value: "3" },
        { name: "Data storage", value: "1GB" }
      ],
      cta: "Start Free Trial",
      ctaVariant: "outline"
    },
    {
      id: "professional",
      name: "Professional",
      description: "Ideal for growing businesses with complex automation needs",
      price: {
        monthly: 799,
        yearly: 7990
      },
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        { name: "Up to 25 automation workflows", included: true },
        { name: "Advanced AI chatbot", included: true },
        { name: "Multi-channel automation", included: true },
        { name: "CRM integration (up to 3 platforms)", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Priority email support", included: true },
        { name: "Setup & onboarding", included: true },
        { name: "Advanced AI features", included: true },
        { name: "Custom integrations (2 included)", included: true },
        { name: "Phone support", included: true },
        { name: "White-label options", included: false },
        { name: "Dedicated account manager", included: false }
      ],
      limits: [
        { name: "Workflows", value: "25" },
        { name: "Monthly executions", value: "10,000" },
        { name: "Team members", value: "10" },
        { name: "Data storage", value: "10GB" }
      ],
      cta: "Start Free Trial",
      ctaVariant: "default"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Complete solution for large organizations with unlimited needs",
      price: {
        monthly: 1999,
        yearly: 19990
      },
      icon: Rocket,
      color: "from-orange-500 to-red-500",
      features: [
        { name: "Unlimited automation workflows", included: true },
        { name: "Enterprise AI chatbot", included: true },
        { name: "Multi-channel automation", included: true },
        { name: "Unlimited CRM integrations", included: true },
        { name: "Enterprise analytics dashboard", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Dedicated setup & onboarding", included: true },
        { name: "Advanced AI features", included: true },
        { name: "Unlimited custom integrations", included: true },
        { name: "Phone & chat support", included: true },
        { name: "White-label options", included: true },
        { name: "Dedicated account manager", included: true }
      ],
      limits: [
        { name: "Workflows", value: "Unlimited" },
        { name: "Monthly executions", value: "Unlimited" },
        { name: "Team members", value: "Unlimited" },
        { name: "Data storage", value: "Unlimited" }
      ],
      cta: "Contact Sales",
      ctaVariant: "secondary"
    }
  ];

  const addOns: AddOn[] = [
    {
      id: "ai-training",
      name: "AI Model Training",
      description: "Custom AI model training on your specific data and use cases",
      price: 500,
      icon: Bot,
      popular: true
    },
    {
      id: "custom-integration",
      name: "Custom Integration",
      description: "Build custom integrations with your existing tools and systems",
      price: 2000,
      icon: Database
    },
    {
      id: "white-label",
      name: "White-Label Solution",
      description: "Rebrand our platform with your company's branding and domain",
      price: 1000,
      icon: Shield
    },
    {
      id: "dedicated-support",
      name: "Dedicated Support",
      description: "Dedicated support team member for your account",
      price: 1500,
      icon: Headphones
    },
    {
      id: "advanced-analytics",
      name: "Advanced Analytics",
      description: "Advanced reporting and analytics with custom dashboards",
      price: 300,
      icon: BarChart3
    },
    {
      id: "api-access",
      name: "API Access",
      description: "Full API access for custom development and integrations",
      price: 400,
      icon: Workflow
    }
  ];

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  const getFeatureIcon = (included: boolean) => {
    return included ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-gray-400" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <Calculator className="w-4 h-4" />
          <span className="text-sm font-medium">Pricing & Packages</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Choose Your <span className="text-gradient-flow">Automation Plan</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Start with a free trial and scale as you grow. No hidden fees, cancel anytime.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
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
      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => {
          const Icon = tier.icon;
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
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
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
                {/* Limits */}
                <div className="grid grid-cols-2 gap-4">
                  {tier.limits.map((limit, index) => (
                    <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-gradient-flow">{limit.value}</div>
                      <div className="text-sm text-muted-foreground">{limit.name}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {getFeatureIcon(feature.included)}
                      <div className="flex-1">
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                        {feature.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full ${tier.ctaVariant === 'default' ? 'bg-gradient-flow hover:shadow-glow' : ''}`}
                  variant={tier.ctaVariant}
                  size="lg"
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add-ons Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Add-ons & Extensions</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enhance your automation with additional features and services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addOn) => {
            const Icon = addOn.icon;
            return (
              <Card key={addOn.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-flow flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{addOn.name}</h4>
                        <p className="text-sm text-muted-foreground">{addOn.description}</p>
                      </div>
                    </div>
                    {addOn.popular && (
                      <Badge className="text-xs">Popular</Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gradient-flow">
                      ${addOn.price.toLocaleString()}
                      <span className="text-sm text-muted-foreground font-normal">/month</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Add to Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Can I change my plan anytime?</h4>
              <p className="text-muted-foreground text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! All plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What happens if I exceed my limits?</h4>
              <p className="text-muted-foreground text-sm">
                We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity as needed.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Do you offer custom solutions?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! Our Enterprise plan includes custom solutions, or you can work with our team to create a tailored package.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What support do you provide?</h4>
              <p className="text-muted-foreground text-sm">
                All plans include email support. Professional and Enterprise plans include phone support and dedicated account management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-foreground text-sm">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
        <CardContent className="p-12 text-center space-y-6">
          <h3 className="text-3xl font-bold">Ready to Transform Your Business?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses already saving time and money with intelligent automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              Talk to Sales
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPackages;
