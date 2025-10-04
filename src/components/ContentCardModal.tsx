import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ContentCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: {
    type: string;
    title: string;
    description: string;
    metric?: string;
  } | null;
  onNavigate?: (path: string) => void;
  onBookCall?: () => void;
}

const contentDetails: Record<string, {
  fullDescription: string;
  benefits: string[];
  action: { label: string; type: "navigate" | "book" };
}> = {
  "AI Agents": {
    fullDescription: "Our custom AI agents are intelligent assistants that understand your business context, make decisions, and take actions on your behalf. They can handle customer queries, process documents, analyze patterns, and execute complex workflows - all while learning and improving over time.",
    benefits: [
      "24/7 operation with zero downtime",
      "Human-like understanding and responses",
      "Multi-lingual support out of the box",
      "Learns from your data and feedback",
      "Scales instantly with demand"
    ],
    action: { label: "See AI Services", type: "navigate" }
  },
  "Workflow Automation": {
    fullDescription: "Connect all your tools and automate complex business processes. From simple data transfers to multi-step approval chains, we build automation that eliminates manual work and ensures consistency across your operations.",
    benefits: [
      "40-60% time savings on average",
      "Zero manual errors",
      "Instant execution (no delays)",
      "Works with 1000+ tools",
      "Easy to modify as needs change"
    ],
    action: { label: "Explore Automation", type: "navigate" }
  },
  "CRM Integration": {
    fullDescription: "Your CRM should be the single source of truth. We ensure real-time data synchronization across all platforms, automated lead capture and enrichment, and intelligent routing based on your business rules.",
    benefits: [
      "99.9% accuracy guaranteed",
      "Real-time bidirectional sync",
      "No more data silos",
      "Automated data enrichment",
      "Smart duplicate prevention"
    ],
    action: { label: "View Integration Options", type: "navigate" }
  },
  "Data Processing": {
    fullDescription: "Transform raw data into actionable insights automatically. We build systems that collect, clean, analyze, and present data - from simple exports to complex machine learning models.",
    benefits: [
      "10x faster than manual processing",
      "100% consistent results",
      "Advanced analytics built-in",
      "Scheduled or real-time processing",
      "Beautiful dashboards included"
    ],
    action: { label: "See Data Solutions", type: "navigate" }
  },
  "Flexible Pricing": {
    fullDescription: "Our pricing is designed around your success. Starting at $2,500/month, most clients see ROI within 2-3 months through saved time and reduced errors. We offer flexible engagement models from project-based to ongoing support.",
    benefits: [
      "ROI-focused pricing",
      "No hidden fees",
      "Month-to-month flexibility",
      "Scale up or down anytime",
      "Success-based options available"
    ],
    action: { label: "Book Pricing Call", type: "book" }
  },
  "Client Success": {
    fullDescription: "See how we've transformed businesses across industries. From reducing onboarding time by 87% to increasing revenue by 29%, our clients achieve measurable results quickly.",
    benefits: [
      "Average 40-60% time savings",
      "ROI within 2-3 months",
      "99%+ accuracy rates",
      "6x throughput increases",
      "$120K+ annual savings typical"
    ],
    action: { label: "View All Case Studies", type: "navigate" }
  }
};

const ContentCardModal = ({ open, onOpenChange, card, onNavigate, onBookCall }: ContentCardModalProps) => {
  if (!card) return null;

  const details = contentDetails[card.title] || {
    fullDescription: card.description,
    benefits: [],
    action: { label: "Learn More", type: "navigate" }
  };

  const handleAction = () => {
    onOpenChange(false);
    if (details.action.type === "book" && onBookCall) {
      onBookCall();
    } else if (details.action.type === "navigate" && onNavigate) {
      onNavigate("/site#services");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                {card.type.replace("-", " ")}
              </span>
              <DialogTitle className="text-2xl mt-1">{card.title}</DialogTitle>
            </div>
            {card.metric && (
              <span className="text-lg font-bold text-flow-blue-start">{card.metric}</span>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-foreground/80 leading-relaxed">{details.fullDescription}</p>

          {details.benefits.length > 0 && (
            <div>
              <h4 className="font-bold mb-3">Key Benefits</h4>
              <div className="space-y-2">
                {details.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleAction} className="w-full group">
            {details.action.label}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentCardModal;
