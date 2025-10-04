import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "@/assets/flowreach-logo.png";

const CleanSplitLanding = () => {
  const navigate = useNavigate();
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  const handleNewVisitor = () => {
    navigate("/chat");
  };

  const handleReturningClient = () => {
    navigate("/site");
  };

  return (
    <div className="h-screen w-full flex overflow-hidden relative bg-black">
      {/* Logo at top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative">
          <div className="absolute inset-0 -m-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl animate-pulse" />
          <div className="relative px-4 py-2">
            <img src={logo} alt="Flow Reach" className="h-20 w-auto" />
          </div>
        </div>
      </div>

      {/* Left Side - New Visitor */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center text-center p-12 transition-all duration-500 cursor-pointer ${
          hoveredSide === "left" ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20" : "bg-gradient-to-br from-gray-900 to-black"
        }`}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleNewVisitor}
      >
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">New Visitor</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover how AI can transform your business with our interactive demo
            </p>
          </div>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center mx-auto">
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

      {/* Right Side - Returning Client */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center text-center p-12 transition-all duration-500 cursor-pointer ${
          hoveredSide === "right" ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20" : "bg-gradient-to-br from-gray-900 to-black"
        }`}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={handleReturningClient}
      >
        <div className="max-w-md">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Returning Client</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Access your personalized dashboard and continue your AI transformation
            </p>
          </div>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 flex items-center mx-auto">
            Continue Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CleanSplitLanding;
