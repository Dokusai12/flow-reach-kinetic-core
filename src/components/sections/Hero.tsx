import { useState, useEffect } from "react";
import { ArrowRight, Zap, Database, Cloud, Bot, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Node types for the workflow visualization
const nodes = [
  { id: 1, icon: Database, label: "Data Source", position: { x: 10, y: 50 }, color: "from-blue-500 to-blue-600" },
  { id: 2, icon: Zap, label: "Trigger", position: { x: 25, y: 30 }, color: "from-yellow-500 to-orange-500" },
  { id: 3, icon: Bot, label: "AI Agent", position: { x: 45, y: 35 }, color: "from-purple-500 to-pink-500" },
  { id: 4, icon: Cloud, label: "Integration", position: { x: 65, y: 45 }, color: "from-cyan-500 to-blue-500" },
  { id: 5, icon: CheckCircle2, label: "Output", position: { x: 85, y: 50 }, color: "from-green-500 to-emerald-600" },
  { id: 6, icon: Database, label: "CRM", position: { x: 50, y: 65 }, color: "from-indigo-500 to-purple-500" },
];

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 3, to: 6 },
];

const Hero = () => {
  const [activeNode, setActiveNode] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev % nodes.length) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Workflow Visualization */}
      <div className="absolute inset-0 -z-5 overflow-hidden opacity-30">
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "blur(1px)" }}>
          <defs>
            <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--flow-blue-start))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines */}
          {connections.map((conn, i) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isActive = activeNode === conn.from || activeNode === conn.to;

            return (
              <line
                key={i}
                x1={`${fromNode.position.x}%`}
                y1={`${fromNode.position.y}%`}
                x2={`${toNode.position.x}%`}
                y2={`${toNode.position.y}%`}
                stroke={isActive ? "url(#connectionGrad)" : "hsl(var(--border))"}
                strokeWidth={isActive ? "3" : "2"}
                opacity={isActive ? "0.8" : "0.3"}
                className="transition-all duration-500"
                filter={isActive ? "url(#glow)" : ""}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              className={`absolute w-16 h-16 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center transition-all duration-500 ${
                isActive ? "scale-125 shadow-glow" : "scale-100 opacity-50"
              }`}
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: `translate(-50%, -50%) ${isActive ? "scale(1.25)" : "scale(1)"}`,
              }}
            >
              <Icon className="w-8 h-8 text-white" />
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {node.label}
              </div>
            </div>
          );
        })}

        {/* Flowing Data Particles */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode || activeNode !== conn.from) return null;

          return (
            <div
              key={`particle-${i}`}
              className="absolute w-3 h-3 bg-accent rounded-full animate-pulse"
              style={{
                left: `${fromNode.position.x}%`,
                top: `${fromNode.position.y}%`,
                animation: `flowParticle 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20 animate-glitch-in">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
            <span className="text-sm font-medium">AI-Powered Business Automation</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight animate-glitch-in" style={{ animationDelay: "0.2s" }}>
            Transform Your Business with{" "}
            <span className="text-gradient-flow">Intelligent Workflows</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-glitch-in" style={{ animationDelay: "0.4s" }}>
            We build AI agents and automated workflows that save time, reduce errors, and scale your operations exponentially.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-glitch-in" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 group shadow-glow hover:shadow-glow-yellow transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Transformation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => scrollToSection("pricing")}
            >
              View Pricing
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => scrollToSection("cases")}
            >
              See Case Studies
            </Button>
          </div>

          {/* Enhanced Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto animate-count-up" style={{ animationDelay: "0.8s" }}>
            {[
              { value: "500+", label: "Happy Clients", sublabel: "and growing" },
              { value: "10,000+", label: "Automations Built", sublabel: "and counting" },
              { value: "1M+", label: "Hours Saved", sublabel: "for our clients" },
              { value: "$50M+", label: "Cost Savings", sublabel: "generated" },
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-flow mb-1">{metric.value}</div>
                <div className="text-sm font-medium text-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Client Logos */}
          <div className="pt-16 max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground text-center mb-8">Trusted by industry leaders</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[
                "TechCorp", "RetailMax", "MediCare", "LegalTech"
              ].map((company, i) => (
                <div key={i} className="text-center">
                  <div className="h-12 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-muted-foreground">{company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gradient-flow rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes flowParticle {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
