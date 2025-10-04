import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Play, 
  Calculator, 
  Crown, 
  Brain, 
  DollarSign, 
  BarChart3, 
  BookOpen, 
  Star,
  Zap,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/flowreach-logo.png";

const DemoPage = () => {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const features = [
    {
      id: "roi-calculator",
      title: "Interactive ROI Calculator",
      description: "Calculate your automation ROI with industry benchmarks and real-time calculations",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      status: "Live Demo",
      benefits: ["Industry benchmarks", "Real-time calculations", "Custom scenarios", "ROI projections"]
    },
    {
      id: "live-demo",
      title: "Live Demo Simulator",
      description: "Build and test automation workflows with drag-and-drop interface",
      icon: Play,
      color: "from-purple-500 to-pink-500",
      status: "Interactive",
      benefits: ["Drag & drop builder", "Real-time preview", "Sample data", "Try it yourself"]
    },
    {
      id: "client-portal",
      title: "Client Portal Dashboard",
      description: "Monitor projects, automation health, and performance metrics",
      icon: Crown,
      color: "from-green-500 to-emerald-600",
      status: "Full Access",
      benefits: ["Project tracking", "Health monitoring", "Support tickets", "Performance metrics"]
    },
    {
      id: "ai-features",
      title: "AI-Powered Features",
      description: "Smart recommendations, automated proposals, and predictive analytics",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      status: "AI Powered",
      benefits: ["Smart recommendations", "Auto proposals", "Case study matching", "Predictive insights"]
    },
    {
      id: "pricing",
      title: "Pricing & Packages",
      description: "Comprehensive pricing with clear CTAs and add-ons",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      status: "Transparent",
      benefits: ["Clear pricing", "Multiple tiers", "Add-ons", "Free trial"]
    },
    {
      id: "case-studies",
      title: "Advanced Case Studies",
      description: "Interactive case studies with filters and video testimonials",
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      status: "Interactive",
      benefits: ["Filter by industry", "Video testimonials", "Before/after", "Implementation timeline"]
    },
    {
      id: "resource-center",
      title: "Resource Center",
      description: "Comprehensive library of guides, templates, and insights",
      icon: BookOpen,
      color: "from-pink-500 to-rose-500",
      status: "Rich Content",
      benefits: ["Guides & tutorials", "Templates", "Webinars", "Gated content"]
    },
    {
      id: "social-proof",
      title: "Social Proof",
      description: "Client logos, certifications, awards, and trust indicators",
      icon: Star,
      color: "from-cyan-500 to-blue-500",
      status: "Verified",
      benefits: ["Client logos", "Certifications", "Awards", "Trust indicators"]
    }
  ];

  const stats = [
    { label: "Features Implemented", value: "8", icon: CheckCircle2 },
    { label: "Interactive Demos", value: "5", icon: Play },
    { label: "Client Portals", value: "1", icon: Crown },
    { label: "AI Features", value: "4", icon: Brain },
    { label: "Case Studies", value: "3", icon: BarChart3 },
    { label: "Resources", value: "20+", icon: BookOpen }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveDemo(featureId);
    // Navigate to the specific feature
    navigate(`/features#${featureId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Flow Reach" className="h-12 w-auto" />
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/site")}>
                Back to Site
              </Button>
              <Button onClick={() => navigate("/features")}>
                Try All Features
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Complete Feature Demo</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">
            Experience Our <span className="text-gradient-flow">Full Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore all the features we've built for you. From interactive calculators to AI-powered recommendations, 
            see how Flow Reach can transform your business operations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-flow flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gradient-flow">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">All Features at a Glance</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any feature to explore it in detail
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{feature.description}</p>

                  <div className="space-y-2">
                    {feature.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {benefit}
                      </div>
                    ))}
                    {feature.benefits.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{feature.benefits.length - 3} more features
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-sm font-medium text-accent group-hover:text-accent/80">
                      Try it now
                    </span>
                    <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Implementation Progress */}
      <div className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-r from-accent/5 to-flow-blue-start/5 border-accent/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold">Implementation Progress</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We've successfully implemented 8 major feature categories with interactive demos and real functionality
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Completed Features</h4>
                  <div className="space-y-2">
                    {[
                      "Interactive ROI Calculator",
                      "Live Demo Simulator", 
                      "Client Portal Dashboard",
                      "AI-Powered Features",
                      "Pricing & Packages",
                      "Advanced Case Studies",
                      "Resource Center",
                      "Social Proof Components"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Coming Soon</h4>
                  <div className="space-y-2">
                    {[
                      "Real-time Chat Support",
                      "Advanced Analytics Dashboard",
                      "Mobile PWA App",
                      "Accessibility Features",
                      "CRM Integrations",
                      "A/B Testing Framework"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" onClick={() => navigate("/features")}>
                  <Play className="w-5 h-5 mr-2" />
                  Explore All Features
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/site")}>
                  <Users className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
          <CardContent className="p-12 text-center space-y-6">
            <h3 className="text-4xl font-bold">Ready to Get Started?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the full power of Flow Reach's automation platform. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoPage;
