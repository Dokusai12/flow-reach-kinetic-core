import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/flowreach-logo.png";
import BookCallModal from "./BookCallModal";
import ContentCardModal from "./ContentCardModal";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

interface ContentCard {
  type: "service" | "case-study" | "pricing";
  title: string;
  description: string;
  metric?: string;
}

interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

const ChatExperience = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Flow Reach AI. Let's find the perfect automation solution for your business. What industry are you in?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [contentCards, setContentCards] = useState<ContentCard[]>([]);
  const [showBookCall, setShowBookCall] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ContentCard | null>(null);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<"industry" | "department" | "details" | "book">("industry");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [showTextInput, setShowTextInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const industryOptions: QuickReply[] = [
    { label: "🏥 Healthcare", value: "Healthcare", icon: "🏥" },
    { label: "💼 Finance", value: "Finance", icon: "💼" },
    { label: "🛒 E-commerce", value: "E-commerce", icon: "🛒" },
    { label: "🏭 Manufacturing", value: "Manufacturing", icon: "🏭" },
    { label: "🏨 Hospitality", value: "Hospitality", icon: "🏨" },
    { label: "📚 Education", value: "Education", icon: "📚" },
    { label: "🏗️ Real Estate", value: "Real Estate", icon: "🏗️" },
    { label: "✍️ Other", value: "other", icon: "✍️" },
  ];

  const departmentOptions: QuickReply[] = [
    { label: "💰 Sales", value: "Sales", icon: "💰" },
    { label: "🎯 Marketing", value: "Marketing", icon: "🎯" },
    { label: "🤝 Customer Support", value: "Customer Support", icon: "🤝" },
    { label: "📊 Operations", value: "Operations", icon: "📊" },
    { label: "👥 HR", value: "HR", icon: "👥" },
    { label: "💼 Finance", value: "Finance", icon: "💼" },
    { label: "🔧 IT", value: "IT", icon: "🔧" },
    { label: "📦 All Departments", value: "All Departments", icon: "📦" },
  ];

  const getCurrentQuickReplies = (): QuickReply[] => {
    if (currentStage === "industry") return industryOptions;
    if (currentStage === "department") return departmentOptions;
    if (currentStage === "details") return [
      { label: "📞 Book a Call", value: "book-call", icon: "📞" },
      { label: "💡 Tell me more", value: "Tell me more about your services", icon: "💡" },
    ];
    return [];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeInput = (text: string) => {
    const lowerText = text.toLowerCase();
    const newCards: ContentCard[] = [];

    if (lowerText.includes("automation") || lowerText.includes("workflow")) {
      newCards.push({
        type: "service",
        title: "Workflow Automation",
        description: "Streamline repetitive tasks and connect your tools",
        metric: "40% time saved",
      });
    }

    if (lowerText.includes("ai") || lowerText.includes("intelligent")) {
      newCards.push({
        type: "service",
        title: "AI Agents",
        description: "Custom AI agents that handle complex business logic",
        metric: "24/7 operation",
      });
    }

    if (lowerText.includes("crm") || lowerText.includes("customer") || lowerText.includes("sales")) {
      newCards.push({
        type: "service",
        title: "CRM Integration",
        description: "Seamless data flow between all your systems",
        metric: "99% accuracy",
      });
    }

    if (lowerText.includes("data") || lowerText.includes("analytics") || lowerText.includes("process")) {
      newCards.push({
        type: "service",
        title: "Data Processing",
        description: "Transform raw data into actionable insights",
        metric: "10x faster",
      });
    }

    if (lowerText.includes("cost") || lowerText.includes("price") || lowerText.includes("pricing")) {
      newCards.push({
        type: "pricing",
        title: "Flexible Pricing",
        description: "ROI-focused pricing that scales with your success",
        metric: "Starting $2,500/mo",
      });
    }

    if (lowerText.includes("example") || lowerText.includes("case") || lowerText.includes("results")) {
      newCards.push({
        type: "case-study",
        title: "Client Success",
        description: "TechCorp reduced manual work by 60% in 3 months",
        metric: "$120K saved/year",
      });
    }

    if (newCards.length > 0) {
      setContentCards((prev) => {
        const existingTypes = new Set(prev.map((c) => c.title));
        return [...prev, ...newCards.filter((c) => !existingTypes.has(c.title))];
      });
    }

    if (messages.length > 4 && !showBookCall) {
      setShowBookCall(true);
    }
  };

  const typeMessage = async (fullContent: string, messageIndex: number) => {
    const words = fullContent.split(' ');
    let currentContent = '';
    
    for (let i = 0; i < words.length; i++) {
      currentContent += (i > 0 ? ' ' : '') + words[i];
      
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[messageIndex] = { 
          role: "assistant", 
          content: currentContent,
          isTyping: i < words.length - 1
        };
        return newMessages;
      });
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const streamChat = async (userMessage: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flow-reach-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: [...messages, { role: "user", content: userMessage }] }),
        }
      );

      if (!response.ok || !response.body) throw new Error("Failed to start stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      const messageIndex = messages.length + 1;
      setMessages((prev) => [...prev, { role: "assistant", content: "", isTyping: true }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setIsTyping(false);
      await typeMessage(assistantContent, messageIndex);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
    }
  };

  const handleSend = (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);
    setShowTextInput(false);

    // If we're in industry stage and user typed a custom industry
    if (currentStage === "industry" && showTextInput) {
      setSelectedIndustry(userMessage);
      setCurrentStage("department");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Great! For ${userMessage}, which department needs automation the most?`,
          },
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    analyzeInput(userMessage);
    streamChat(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    if (reply.value === "other") {
      setShowTextInput(true);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "Other" },
        {
          role: "assistant",
          content: "Please tell me what industry you're in so I can provide the best automation recommendations.",
        },
      ]);
      return;
    }

    if (reply.value === "book-call") {
      setBookCallOpen(true);
      return;
    }

    const userMessage = reply.value;
    setMessages((prev) => [...prev, { role: "user", content: reply.label }]);
    setIsTyping(true);

    if (currentStage === "industry") {
      setSelectedIndustry(userMessage);
      setCurrentStage("department");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Great! For ${userMessage}, which department needs automation the most?`,
          },
        ]);
        setIsTyping(false);
      }, 500);
    } else if (currentStage === "department") {
      setCurrentStage("details");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Perfect! We can help automate ${userMessage} in ${selectedIndustry}. Ready to discuss your specific needs?`,
          },
        ]);
        setShowBookCall(true);
        setIsTyping(false);
      }, 500);
    } else {
      analyzeInput(userMessage);
      streamChat(userMessage);
    }
  };

  const handleCardClick = (card: ContentCard) => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-background flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4 p-6">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={logo} alt="Flow Reach" className="h-16 w-auto" />
              <div className="flex-1">
                <h1 className="text-lg font-bold">Flow Reach AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Here to help you discover automation opportunities</p>
              </div>
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-flow rounded-full animate-pulse-glow" />
                <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-flow-blue-start" />
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 animate-slide-diagonal ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-flow flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                    {message.isTyping && <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-sm font-bold">
                    You
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 animate-slide-diagonal">
                <div className="w-10 h-10 rounded-full bg-gradient-flow flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-6 py-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6 space-y-4">
            {/* Quick Replies */}
            {!isTyping && getCurrentQuickReplies().length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {currentStage === "industry" && "Select Your Industry"}
                  {currentStage === "department" && "Choose Department"}
                  {currentStage === "details" && "Next Steps"}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getCurrentQuickReplies().map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      onClick={() => handleQuickReply(reply)}
                      className="justify-center text-center h-auto py-4 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <span className="text-base">{reply.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            {(showTextInput || currentStage === "details") && (
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    showTextInput 
                      ? "Type your industry..." 
                      : "Ask me anything..."
                  }
                  className="flex-1"
                />
                <Button onClick={() => handleSend()} size="lg" className="px-8">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Cards Sidebar */}
        <div className="w-80 border-l border-border bg-muted/30 p-6 overflow-y-auto">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">
            Relevant For You
          </h3>

          <div className="space-y-4">
            {contentCards.map((card, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover-tilt cursor-pointer animate-slide-diagonal"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(card)}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">
                    {card.type.replace("-", " ")}
                  </span>
                  {card.metric && (
                    <span className="text-xs font-bold text-flow-blue-start">{card.metric}</span>
                  )}
                </div>
                <h4 className="font-bold mb-1">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}

            {showBookCall && (
              <div 
                className="bg-gradient-hazard rounded-lg p-6 text-center space-y-3 animate-slide-diagonal shadow-glow-yellow cursor-pointer"
                onClick={() => setBookCallOpen(true)}
              >
                <h4 className="text-lg font-bold text-primary">Ready to Transform?</h4>
                <p className="text-sm text-primary/80">Book a free 30-minute strategy call</p>
                <Button size="lg" className="w-full">
                  Schedule Call
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookCallModal open={bookCallOpen} onOpenChange={setBookCallOpen} />
      <ContentCardModal 
        open={cardModalOpen} 
        onOpenChange={setCardModalOpen}
        card={selectedCard}
        onNavigate={(path) => navigate(path)}
        onBookCall={() => setBookCallOpen(true)}
      />
    </>
  );
};

export default ChatExperience;
