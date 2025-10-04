import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, Calculator, Play, Crown, Brain, DollarSign, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/flowreach-logo.png";
import ROICalculator from "@/components/ROICalculator";
import LiveDemoSimulator from "@/components/LiveDemoSimulator";
import ClientPortal from "@/components/ClientPortal";
import AIFeatures from "@/components/AIFeatures";
import PricingPackages from "@/components/PricingPackages";

const FeaturesPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      id: "roi-calculator",
      title: "ROI Calculator",
      description: "Calculate your automation ROI with industry benchmarks",
      icon: Calculator,
      color: "from-blue-500 to-blue-600",
      component: ROICalculator
    },
    {
      id: "live-demo",
      title: "Live Demo Simulator",
      description: "Build and test automation workflows in real-time",
      icon: Play,
      color: "from-purple-500 to-pink-500",
      component: LiveDemoSimulator
    },
    {
      id: "client-portal",
      title: "Client Portal",
      description: "Monitor projects and automation health",
      icon: Crown,
      color: "from-green-500 to-emerald-600",
      component: ClientPortal
    },
    {
      id: "ai-features",
      title: "AI Features",
      description: "Smart recommendations and automated proposals",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      component: AIFeatures
    },
    {
      id: "pricing",
      title: "Pricing & Packages",
      description: "Comprehensive pricing with clear CTAs",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      component: PricingPackages
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const handleBackToOverview = () => {
    setActiveFeature(null);
  };

  const renderActiveFeature = () => {
    const feature = features.find(f => f.id === activeFeature);
    if (!feature) return null;

    const FeatureComponent = feature.component;
    return <FeatureComponent />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl shadow-elevated border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img 
              src={logo} 
              alt="Flow Reach" 
              className="h-12 w-auto cursor-pointer" 
              onClick={() => navigate("/site")}
            />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate("/site")}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/case-studies")}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Case Studies
              </button>
              <button
                onClick={() => navigate("/process")}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                About
              </button>
              <Button size="sm" onClick={() => navigate("/site")}>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border px-6 py-4 space-y-3">
              <button
                onClick={() => {
                  navigate("/site");
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-medium hover:text-accent transition-colors w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/case-studies");
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-medium hover:text-accent transition-colors w-full text-left"
              >
                Case Studies
              </button>
              <button
                onClick={() => {
                  navigate("/process");
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-medium hover:text-accent transition-colors w-full text-left"
              >
                Process
              </button>
              <button
                onClick={() => {
                  navigate("/about");
                  setMobileMenuOpen(false);
                }}
                className="block text-sm font-medium hover:text-accent transition-colors w-full text-left"
              >
                About
              </button>
              <Button size="sm" className="w-full mt-4" onClick={() => {
                navigate("/site");
                setMobileMenuOpen(false);
              }}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {!activeFeature ? (
          /* Features Overview */
          <div className="max-w-7xl mx-auto p-6 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Interactive Features</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                Explore Our <span className="text-gradient-flow">Advanced Features</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the power of intelligent automation through our interactive tools and demos. 
                Try them out and see how they can transform your business.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    className="group cursor-pointer"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Try it now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Features Preview */}
            <div className="bg-muted/30 rounded-2xl p-8">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold">More Features Coming Soon</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're constantly adding new features to help you automate more effectively. 
                  Stay tuned for advanced analytics, mobile apps, and more integrations.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  {[
                    "Advanced Analytics",
                    "Mobile PWA",
                    "Real-time Chat",
                    "CRM Integrations",
                    "A/B Testing",
                    "Resource Center"
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose a feature above to explore, or get in touch to discuss your automation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => navigate("/site")}>
                  View All Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/site")}>
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Active Feature View */
          <div>
            {/* Feature Header */}
            <div className="bg-muted/30 border-b border-border">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackToOverview}
                    >
                      ← Back to Features
                    </Button>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {features.find(f => f.id === activeFeature)?.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {features.find(f => f.id === activeFeature)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Content */}
            <div>
              {renderActiveFeature()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesPage;
