import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Play, Pause, RotateCcw, Zap, Brain, Target, TrendingUp, Calendar, Sparkles, Activity, BarChart3, Users, Clock, DollarSign, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import AdvancedThreeScene from "./AdvancedThreeScene";
import ErrorBoundary from "./ErrorBoundary";
import logo from "@/assets/flowreach-logo.png";
import { gsap } from "gsap";

const MainSite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollProgress, scrollY } = useScrollProgress();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const industries = [
    { id: "sales", name: "Sales", color: "from-blue-500 to-cyan-500", icon: Target },
    { id: "marketing", name: "Marketing", color: "from-purple-500 to-pink-500", icon: BarChart3 },
    { id: "operations", name: "Operations", color: "from-green-500 to-emerald-500", icon: Activity },
    { id: "customer-service", name: "Customer Service", color: "from-orange-500 to-red-500", icon: Users },
    { id: "data", name: "Data Processing", color: "from-indigo-500 to-purple-500", icon: Brain }
  ];

  const processes = {
    sales: [
      { step: 1, title: "Lead Qualification", description: "AI analyzes and scores leads in real-time", time: "0.3s", accuracy: "98%", impact: "40% more qualified leads" },
      { step: 2, title: "Follow-up Automation", description: "Personalized emails sent automatically", time: "Instant", accuracy: "95%", impact: "3x higher response rates" },
      { step: 3, title: "Meeting Scheduling", description: "AI books meetings based on availability", time: "2s", accuracy: "99%", impact: "60% time saved" },
      { step: 4, title: "Proposal Generation", description: "Custom proposals created automatically", time: "30s", accuracy: "97%", impact: "80% faster closing" }
    ],
    marketing: [
      { step: 1, title: "Content Creation", description: "AI generates blog posts, social media content", time: "2min", accuracy: "94%", impact: "10x more content" },
      { step: 2, title: "Campaign Optimization", description: "Real-time A/B testing and optimization", time: "Live", accuracy: "96%", impact: "3x better ROI" },
      { step: 3, title: "Audience Targeting", description: "AI finds and targets ideal customers", time: "5min", accuracy: "93%", impact: "5x more conversions" },
      { step: 4, title: "Performance Analysis", description: "ROI tracking and insights generation", time: "Real-time", accuracy: "99%", impact: "Data-driven decisions" }
    ],
    operations: [
      { step: 1, title: "Inventory Management", description: "AI predicts and manages stock levels", time: "Continuous", accuracy: "97%", impact: "30% less waste" },
      { step: 2, title: "Process Optimization", description: "Identifies bottlenecks and inefficiencies", time: "24/7", accuracy: "95%", impact: "50% faster processes" },
      { step: 3, title: "Quality Control", description: "Automated quality checks and alerts", time: "Real-time", accuracy: "99%", impact: "90% fewer defects" },
      { step: 4, title: "Resource Allocation", description: "AI optimizes team and resource usage", time: "Dynamic", accuracy: "96%", impact: "25% cost reduction" }
    ],
    "customer-service": [
      { step: 1, title: "Ticket Classification", description: "AI categorizes and prioritizes tickets", time: "0.5s", accuracy: "98%", impact: "70% faster resolution" },
      { step: 2, title: "Response Generation", description: "AI creates personalized responses", time: "3s", accuracy: "94%", impact: "Instant responses" },
      { step: 3, title: "Escalation Detection", description: "Identifies when human intervention needed", time: "Instant", accuracy: "97%", impact: "Perfect routing" },
      { step: 4, title: "Satisfaction Tracking", description: "Monitors and improves customer experience", time: "Real-time", accuracy: "95%", impact: "40% higher satisfaction" }
    ],
    data: [
      { step: 1, title: "Data Collection", description: "AI gathers data from multiple sources", time: "Continuous", accuracy: "99%", impact: "100% data coverage" },
      { step: 2, title: "Data Cleaning", description: "Automatically cleans and validates data", time: "5min", accuracy: "98%", impact: "95% time saved" },
      { step: 3, title: "Pattern Recognition", description: "AI identifies trends and insights", time: "10min", accuracy: "96%", impact: "Hidden opportunities found" },
      { step: 4, title: "Actionable Reports", description: "Generates reports with recommendations", time: "2min", accuracy: "97%", impact: "Instant insights" }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    setIsAnimating(true);
    setCurrentProcess(0);
    
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
    }, 1500);
  };

  const resetAnimation = () => {
    setSelectedIndustry("");
    setCurrentProcess(0);
    setIsAnimating(false);
  };

  // Parallax calculations based on scroll progress
  const heroParallax = scrollY * 0.5;
  const demoParallax = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <ErrorBoundary>
          <AdvancedThreeScene 
            scrollProgress={scrollProgress} 
            industry={selectedIndustry || "sales"} 
            mousePos={mousePosition}
          />
        </ErrorBoundary>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-cyan-400/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${scrolled ? 0.5 : 1})`
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
          scrolled
            ? "w-[95%] max-w-6xl bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
            : "w-auto bg-transparent"
        }`}
        style={{ 
          transform: scrolled ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'none'
        }}
      >
        <div className="flex items-center justify-between px-8 py-4">
          <img
            src={logo}
            alt="Flow Reach"
            className="h-14 w-auto cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative group"
            >
              Demo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </button>
              <button
              onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-cyan-400 transition-all duration-300 relative group"
              >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </button>
            <Button 
              size="sm" 
              className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
              onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-8 py-4 space-y-4">
            <button
              onClick={() => {
                demoRef.current?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium hover:text-cyan-400 transition-all duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Demo
            </button>
            <button
              onClick={() => {
                pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="block text-sm font-medium hover:text-cyan-400 transition-all duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
            >
              Pricing
            </button>
              <button
                onClick={() => {
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              className="block text-sm font-medium hover:text-cyan-400 transition-all duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-white/5"
              >
              Contact
              </button>
            <Button 
              size="sm" 
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold"
              onClick={() => {
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
              setMobileMenuOpen(false);
              }}
            >
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section - Cinematic */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ transform: `translateY(${heroParallax * 0.2}px)` }}
      >
        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <Badge 
              className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-6 py-3 text-sm font-medium mb-8 animate-pulse"
              style={{ 
                transform: `translateY(${scrollProgress * 50}px)`,
                opacity: 1 - scrollProgress * 0.5
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionary AI Automation
            </Badge>
            <h1 
              className="text-7xl md:text-9xl font-bold mb-8 leading-tight"
              style={{ 
                transform: `translateY(${scrollProgress * 100}px)`,
                opacity: 1 - scrollProgress * 0.3
              }}
            >
              <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Your Business
              </span>
              <br />
              <span 
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse"
                style={{ 
                  transform: `scale(${1 + scrollProgress * 0.1})`,
                  filter: `blur(${scrollProgress * 2}px)`
                }}
              >
                Runs Itself
              </span>
            </h1>
            <p 
              className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateY(${scrollProgress * 80}px)`,
                opacity: 1 - scrollProgress * 0.4
              }}
            >
              Most people think AI = ChatGPT. They're missing the{" "}
              <span className="text-cyan-400 font-bold">REAL REVOLUTION</span>.
              <br />
              Watch how AI can automate{" "}
              <span className="text-blue-400 font-bold">80% of your business processes</span>{" "}
              while you sleep.
            </p>
          </div>

          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            style={{ 
              transform: `translateY(${scrollProgress * 60}px)`,
              opacity: 1 - scrollProgress * 0.5
            }}
          >
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 hover:scale-105 group"
              onClick={() => demoRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              See the Magic
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-8 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold transition-all duration-500 hover:scale-105 group"
              onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Enhanced Stats with Scroll Animations */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            style={{ 
              transform: `translateY(${scrollProgress * 40}px)`,
              opacity: 1 - scrollProgress * 0.6
            }}
          >
            {[
              { value: "80%", label: "Processes Automated", sublabel: "while you sleep", icon: Activity },
              { value: "10x", label: "Faster Execution", sublabel: "than manual work", icon: Clock },
              { value: "99%", label: "Accuracy Rate", sublabel: "no human errors", icon: Target },
              { value: "24/7", label: "Always Working", sublabel: "never takes breaks", icon: Zap }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i} 
                  className="text-center group hover:scale-110 transition-all duration-500"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateY(${scrollProgress * 20}px) scale(${1 + scrollProgress * 0.1})`
                  }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-500">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2 group-hover:text-white transition-colors duration-500">{stat.value}</div>
                  <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors duration-500">{stat.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-500">{stat.sublabel}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ 
            transform: `translateY(${scrollProgress * 100}px)`,
            opacity: 1 - scrollProgress
          }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - 3D Enhanced */}
      <section 
        ref={demoRef}
        className="py-32 bg-gradient-to-b from-black to-gray-900 relative"
        style={{ transform: `translateY(${demoParallax * 0.1}px)` }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 
              className="text-6xl md:text-8xl font-bold mb-8"
              style={{ 
                transform: `translateY(${scrollProgress * 50}px)`,
                opacity: 1 - scrollProgress * 0.2
              }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Choose Your Industry
              </span>
            </h2>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateY(${scrollProgress * 30}px)`,
                opacity: 1 - scrollProgress * 0.3
              }}
            >
              See how AI transforms your specific business processes in real-time. 
              This isn't just a demo - it's your future.
            </p>
          </div>

          {/* Enhanced Industry Selection with 3D Effects */}
          <div 
            className="grid md:grid-cols-5 gap-8 mb-20 max-w-7xl mx-auto"
            style={{ 
              transform: `translateY(${scrollProgress * 20}px)`,
              opacity: 1 - scrollProgress * 0.4
            }}
          >
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Card
                  key={industry.id}
                  className={`cursor-pointer transition-all duration-500 hover:scale-110 group ${
                    selectedIndustry === industry.id
                      ? 'ring-2 ring-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-2xl shadow-cyan-500/25'
                      : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:shadow-2xl hover:shadow-cyan-500/10'
                  }`}
                  onClick={() => handleIndustrySelect(industry.id)}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${scrollProgress * 10}px) rotateX(${scrollProgress * 5}deg)`
                  }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${industry.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-500">{industry.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Process Animation with 3D Effects */}
          {selectedIndustry && (
            <div 
              className="max-w-6xl mx-auto"
              style={{ 
                transform: `translateY(${scrollProgress * 15}px)`,
                opacity: 1 - scrollProgress * 0.5
              }}
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-bold text-white">
                  {industries.find(i => i.id === selectedIndustry)?.name} Automation
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAnimation}
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="space-y-8">
                {processes[selectedIndustry as keyof typeof processes].map((process, index) => (
                  <Card
                    key={index}
                    className={`transition-all duration-1000 ${
                      index <= currentProcess
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/50 scale-105 shadow-2xl shadow-cyan-500/25'
                        : 'bg-gray-800/30 border-gray-700'
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.2}s`,
                      transform: index <= currentProcess ? 'scale(1.02) rotateX(5deg)' : 'scale(1)',
                      filter: index <= currentProcess ? 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))' : 'none'
                    }}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl transition-all duration-500 ${
                            index <= currentProcess
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black scale-110'
                              : 'bg-gray-700 text-gray-400'
                          }`}>
                            {process.step}
                          </div>
                          <div>
                            <h4 className="text-2xl font-semibold text-white mb-2">{process.title}</h4>
                            <p className="text-gray-300 text-lg">{process.description}</p>
                            <div className="mt-2 text-cyan-400 font-semibold">{process.impact}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold text-xl">{process.time}</div>
                          <div className="text-sm text-gray-400">{process.accuracy} accuracy</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Results Summary with 3D Effects */}
              {currentProcess === processes[selectedIndustry as keyof typeof processes].length - 1 && (
                <Card 
                  className="mt-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 shadow-2xl shadow-green-500/25"
                  style={{ 
                    transform: 'scale(1.05) rotateX(5deg)',
                    filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.3))'
                  }}
                >
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h4 className="text-4xl font-bold text-white mb-6">Your Business is Now Automated!</h4>
                    <p className="text-gray-300 mb-8 text-xl leading-relaxed">
                      This is what happens when AI takes over your {industries.find(i => i.id === selectedIndustry)?.name.toLowerCase()} processes.
                      <br />
                      <span className="text-green-400 font-semibold text-2xl">80% less manual work, 10x faster execution, 99% accuracy.</span>
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-bold text-xl px-12 py-6 hover:scale-105 transition-all duration-500"
                      onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Make This Reality
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Pricing Section with 3D Effects */}
      <section 
        ref={pricingRef}
        className="py-32 bg-gradient-to-b from-gray-900 to-black"
        style={{ transform: `translateY(${scrollProgress * 10}px)` }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 
              className="text-6xl md:text-8xl font-bold mb-8"
              style={{ 
                transform: `translateY(${scrollProgress * 40}px)`,
                opacity: 1 - scrollProgress * 0.1
              }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateY(${scrollProgress * 20}px)`,
                opacity: 1 - scrollProgress * 0.2
              }}
            >
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>

          <div 
            className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto"
            style={{ 
              transform: `translateY(${scrollProgress * 15}px)`,
              opacity: 1 - scrollProgress * 0.3
            }}
          >
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
                className={`relative transition-all duration-500 hover:scale-110 group ${
                  plan.popular
                    ? 'ring-2 ring-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-2xl shadow-cyan-500/25'
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 hover:shadow-2xl hover:shadow-cyan-500/10'
                }`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transform: `translateY(${scrollProgress * 10}px) rotateX(${scrollProgress * 2}deg)`,
                  filter: plan.popular ? 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.2))' : 'none'
                }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold text-lg px-6 py-2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-6 pt-8">
                  <CardTitle className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-lg">{plan.description}</CardDescription>
                  <div className="text-5xl font-bold text-cyan-400 mt-6 group-hover:text-white transition-colors duration-500">{plan.price}</div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full text-lg py-6 transition-all duration-500 hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                    onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section with 3D Effects */}
      <section 
        ref={contactRef}
        className="py-32 bg-black"
        style={{ transform: `translateY(${scrollProgress * 5}px)` }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 
              className="text-6xl md:text-8xl font-bold mb-8"
              style={{ 
                transform: `translateY(${scrollProgress * 30}px)`,
                opacity: 1 - scrollProgress * 0.05
              }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform?
              </span>
            </h2>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateY(${scrollProgress * 15}px)`,
                opacity: 1 - scrollProgress * 0.1
              }}
            >
              Stop thinking AI = ChatGPT. Start thinking AI = Your business running itself.
              <br />
              <span className="text-cyan-400 font-semibold text-3xl">Let's make it happen.</span>
            </p>
          </div>

          <div 
            className="max-w-4xl mx-auto"
            style={{ 
              transform: `translateY(${scrollProgress * 10}px)`,
              opacity: 1 - scrollProgress * 0.15
            }}
          >
            <Card 
              className="bg-gray-800/50 border-gray-700 shadow-2xl"
              style={{ 
                transform: 'rotateX(2deg)',
                filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.1))'
              }}
            >
              <CardContent className="p-12">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold text-white mb-6">Book a Free Strategy Session</h3>
                  <p className="text-gray-300 text-xl leading-relaxed">
                    We'll analyze your business and show you exactly how AI can automate your processes.
                    <br />
                    <span className="text-cyan-400 font-semibold text-2xl">No sales pitch. Just results.</span>
                  </p>
                </div>
                
                <div className="space-y-6">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold text-2xl py-8 hover:scale-105 transition-all duration-500 group"
                    onClick={() => window.open('https://calendly.com/flowreach/strategy-session', '_blank')}
                  >
                    <Calendar className="mr-3 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    Schedule Free Strategy Session
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-lg">
                      Or email us directly: <span className="text-cyan-400 text-xl font-semibold">hello@flowreach.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with 3D Effects */}
      <footer 
        className="bg-gray-900 py-16"
        style={{ 
          transform: `translateY(${scrollProgress * 5}px)`,
          opacity: 1 - scrollProgress * 0.2
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <img 
            src={logo} 
            alt="Flow Reach" 
            className="h-16 mx-auto mb-8 hover:scale-110 transition-transform duration-300"
            style={{ 
              transform: `rotateY(${scrollProgress * 360}deg)`,
              filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))'
            }}
          />
          <p className="text-gray-400 mb-6 text-xl">
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