import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "@/assets/flowreach-logo.png";

const SplitLanding = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  const handleNewVisitor = () => {
    navigate("/chat");
  };

  const handleReturningClient = () => {
    navigate("/site");
  };

  return (
    <div className="h-screen w-full flex overflow-hidden relative bg-background">
      {/* Logo at top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative">
          {/* Animated backdrop */}
          <div className="absolute inset-0 -m-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-elevated animate-pulse-glow" 
               style={{ animationDuration: "3s" }} />
          <div className="absolute inset-0 -m-2 bg-gradient-to-br from-white/50 to-white/30 rounded-xl" />
          
          {/* Logo */}
          <div className="relative px-4 py-2">
            <img src={logo} alt="Flow Reach" className="h-20 w-auto relative z-10" />
          </div>
        </div>
      </div>

      {/* Left Side - New Visitors */}
      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out cursor-pointer group ${
          hoveredSide === "left" ? "flex-[1.1]" : hoveredSide === "right" ? "flex-[0.9]" : "flex-1"
        }`}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleNewVisitor}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-flow-blue-start via-flow-blue-end to-primary">
          {/* Particle Flow Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--flow-blue-start))" />
                <stop offset="100%" stopColor="hsl(var(--flow-blue-end))" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <path
                key={i}
                d={`M ${i * 150} 0 Q ${i * 150 + 100} ${200 + i * 50}, ${i * 150 + 200} ${
                  400 + i * 30
                } T ${i * 150 + 400} ${800 + i * 20}`}
                stroke="url(#flowGrad)"
                strokeWidth="2"
                fill="none"
                className="animate-flow-line"
                style={{
                  strokeDasharray: "1000",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </svg>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-particle-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-white">
          <div className="max-w-md text-center space-y-6 animate-glitch-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">First Time Here?</span>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight">
              Meet Our AI Assistant
            </h2>
            
            <p className="text-xl text-white/80">
              Let's have a conversation about transforming your business with automation
            </p>

            <div className="inline-flex items-center gap-2 text-lg font-medium group-hover:gap-4 transition-all duration-300">
              <span>Start Chatting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500 ${
            hoveredSide === "left" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-border relative z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-bold">
          OR
        </div>
      </div>

      {/* Right Side - Returning Clients */}
      <div
        className={`flex-1 relative overflow-hidden transition-all duration-700 ease-out cursor-pointer group ${
          hoveredSide === "right" ? "flex-[1.1]" : hoveredSide === "left" ? "flex-[0.9]" : "flex-1"
        }`}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleReturningClient}
      >
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-background">
          {/* Subtle Grid Pattern */}
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          <div className="max-w-md text-center space-y-6 animate-glitch-in" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
              <span className="text-sm font-medium">Returning Client</span>
            </div>
            
            <h2 className="text-5xl font-bold leading-tight">
              Enter Site
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Access our full suite of automation solutions and resources
            </p>

            <div className="inline-flex items-center gap-2 text-lg font-medium group-hover:gap-4 transition-all duration-300">
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-l from-transparent via-accent/5 to-transparent transition-opacity duration-500 ${
            hoveredSide === "right" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default SplitLanding;
