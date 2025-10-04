import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Play, Pause, RotateCcw, Zap, Brain, Target, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/flowreach-logo.png";

const MainSite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(0);

  const industries = [
    { id: "sales", name: "Sales", color: "from-blue-500 to-cyan-500" },
    { id: "marketing", name: "Marketing", color: "from-purple-500 to-pink-500" },
    { id: "operations", name: "Operations", color: "from-green-500 to-emerald-500" },
    { id: "customer-service", name: "Customer Service", color: "from-orange-500 to-red-500" },
    { id: "data", name: "Data Processing", color: "from-indigo-500 to-purple-500" }
  ];

  const processes = {
    sales: [
      { step: 1, title: "Lead Qualification", description: "AI analyzes and scores leads in real-time", time: "0.3s", accuracy: "98%" },
      { step: 2, title: "Follow-up Automation", description: "Personalized emails sent automatically", time: "Instant", accuracy: "95%" },
      { step: 3, title: "Meeting Scheduling", description: "AI books meetings based on availability", time: "2s", accuracy: "99%" },
      { step: 4, title: "Proposal Generation", description: "Custom proposals created automatically", time: "30s", accuracy: "97%" }
    ],
    marketing: [
      { step: 1, title: "Content Creation", description: "AI generates blog posts, social media content", time: "2min", accuracy: "94%" },
      { step: 2, title: "Campaign Optimization", description: "Real-time A/B testing and optimization", time: "Live", accuracy: "96%" },
      { step: 3, title: "Audience Targeting", description: "AI finds and targets ideal customers", time: "5min", accuracy: "93%" },
      { step: 4, title: "Performance Analysis", description: "ROI tracking and insights generation", time: "Real-time", accuracy: "99%" }
    ],
    operations: [
      { step: 1, title: "Inventory Management", description: "AI predicts and manages stock levels", time: "Continuous", accuracy: "97%" },
      { step: 2, title: "Process Optimization", description: "Identifies bottlenecks and inefficiencies", time: "24/7", accuracy: "95%" },
      { step: 3, title: "Quality Control", description: "Automated quality checks and alerts", time: "Real-time", accuracy: "99%" },
      { step: 4, title: "Resource Allocation", description: "AI optimizes team and resource usage", time: "Dynamic", accuracy: "96%" }
    ],
    "customer-service": [
      { step: 1, title: "Ticket Classification", description: "AI categorizes and prioritizes tickets", time: "0.5s", accuracy: "98%" },
      { step: 2, title: "Response Generation", description: "AI creates personalized responses", time: "3s", accuracy: "94%" },
      { step: 3, title: "Escalation Detection", description: "Identifies when human intervention needed", time: "Instant", accuracy: "97%" },
      { step: 4, title: "Satisfaction Tracking", description: "Monitors and improves customer experience", time: "Real-time", accuracy: "95%" }
    ],
    data: [
      { step: 1, title: "Data Collection", description: "AI gathers data from multiple sources", time: "Continuous", accuracy: "99%" },
      { step: 2, title: "Data Cleaning", description: "Automatically cleans and validates data", time: "5min", accuracy: "98%" },
      { step: 3, title: "Pattern Recognition", description: "AI identifies trends and insights", time: "10min", accuracy: "96%" },
      { step: 4, title: "Actionable Reports", description: "Generates reports with recommendations", time: "2min", accuracy: "97%" }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setIsAnimating(true);
    setCurrentProcess(0);
    
    // Animate through processes
    const processSteps = processes[industryId as keyof typeof processes];
    let step = 0;
    const interval = setInterval(() => {
      if (step < processSteps.length - 1) {
        step++;
        setCurrentProcess(step);
    } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 2000);
  };

  const resetAnimation = () => {
    setSelectedIndustry("");
    setCurrentProcess(0);
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "w-[95%] max-w-6xl bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl"
            : "w-auto bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img
            src={logo}
            alt="Flow Reach"
            className="h-14 w-auto cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
            >
              Demo
            </button>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
            >
              Pricing
            </button>
              <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
              >
              Contact
              </button>
            <Button 
              size="sm" 
              className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-3">
            <button
              onClick={() => {
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium hover:text-cyan-400 transition-colors w-full text-left"
            >
              Demo
            </button>
            <button
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium hover:text-cyan-400 transition-colors w-full text-left"
            >
              Pricing
            </button>
              <button
                onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              className="block text-sm font-medium hover:text-cyan-400 transition-colors w-full text-left"
              >
              Contact
              </button>
            <Button 
              size="sm" 
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Revolutionary AI Automation
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Your Business
              <br />
              <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Runs Itself
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Most people think AI = ChatGPT. They're missing the <span className="text-cyan-400 font-semibold">REAL REVOLUTION</span>.
              <br />
              Watch how AI can automate <span className="text-blue-400 font-semibold">80% of your business processes</span> while you sleep.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 w-5 h-5" />
              See the Magic
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold transition-all duration-300"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "80%", label: "Processes Automated", sublabel: "while you sleep" },
              { value: "10x", label: "Faster Execution", sublabel: "than manual work" },
              { value: "99%", label: "Accuracy Rate", sublabel: "no human errors" },
              { value: "24/7", label: "Always Working", sublabel: "never takes breaks" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Choose Your Industry
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how AI transforms your specific business processes in real-time. 
              This isn't just a demo - it's your future.
            </p>
          </div>

          {/* Industry Selection */}
          <div className="grid md:grid-cols-5 gap-6 mb-16 max-w-6xl mx-auto">
            {industries.map((industry) => (
              <Card
                key={industry.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedIndustry === industry.id
                    ? 'ring-2 ring-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                }`}
                onClick={() => handleIndustrySelect(industry.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${industry.color} flex items-center justify-center`}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{industry.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Process Animation */}
          {selectedIndustry && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">
                  {industries.find(i => i.id === selectedIndustry)?.name} Automation
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAnimation}
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="space-y-6">
                {processes[selectedIndustry as keyof typeof processes].map((process, index) => (
                  <Card
                    key={index}
                    className={`transition-all duration-1000 ${
                      index <= currentProcess
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/50 scale-105'
                        : 'bg-gray-800/30 border-gray-700'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            index <= currentProcess
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black'
                              : 'bg-gray-700 text-gray-400'
                          }`}>
                            {process.step}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-white">{process.title}</h4>
                            <p className="text-gray-300">{process.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold">{process.time}</div>
                          <div className="text-sm text-gray-400">{process.accuracy} accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Results Summary */}
              {currentProcess === processes[selectedIndustry as keyof typeof processes].length - 1 && (
                <Card className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50">
                  <CardContent className="p-8 text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">🎉 Your Business is Now Automated!</h4>
                    <p className="text-gray-300 mb-6">
                      This is what happens when AI takes over your {industries.find(i => i.id === selectedIndustry)?.name.toLowerCase()} processes.
                      <br />
                      <span className="text-green-400 font-semibold">80% less manual work, 10x faster execution, 99% accuracy.</span>
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold"
                      onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Make This Reality
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$2,997",
                description: "Perfect for small businesses",
                features: [
                  "Up to 5 automation workflows",
                  "Basic AI agents",
                  "Email automation",
                  "1 CRM integration",
                  "Basic analytics",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$7,997",
                description: "Ideal for growing businesses",
                features: [
                  "Up to 25 automation workflows",
                  "Advanced AI agents",
                  "Multi-channel automation",
                  "Up to 3 CRM integrations",
                  "Advanced analytics",
                  "Priority support",
                  "Custom integrations"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$19,997",
                description: "Complete business transformation",
                features: [
                  "Unlimited automation workflows",
                  "Enterprise AI agents",
                  "Full business automation",
                  "Unlimited integrations",
                  "Enterprise analytics",
                  "24/7 dedicated support",
                  "White-label options",
                  "Dedicated account manager"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'ring-2 ring-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                  <div className="text-4xl font-bold text-cyan-400 mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stop thinking AI = ChatGPT. Start thinking AI = Your business running itself.
              <br />
              <span className="text-cyan-400 font-semibold">Let's make it happen.</span>
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Book a Free Strategy Session</h3>
                  <p className="text-gray-300">
                    We'll analyze your business and show you exactly how AI can automate your processes.
                    <br />
                    <span className="text-cyan-400 font-semibold">No sales pitch. Just results.</span>
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold text-lg py-6"
                    onClick={() => window.open('https://calendly.com/flowreach/strategy-session', '_blank')}
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Schedule Free Strategy Session
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Or email us directly: <span className="text-cyan-400">hello@flowreach.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <img src={logo} alt="Flow Reach" className="h-12 mx-auto mb-6" />
          <p className="text-gray-400 mb-4">
            The AI automation revolution starts here.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Flow Reach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainSite;