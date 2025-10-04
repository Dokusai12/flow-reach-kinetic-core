import { ArrowLeft, MessageSquare, Search, Code, Rocket, Settings, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/flowreach-logo.png";

const ProcessPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: MessageSquare,
      title: "Discovery Call",
      duration: "1 hour",
      description: "We dive deep into your business processes, pain points, and goals. No sales pitch—just understanding your needs.",
      deliverables: ["Process audit", "Automation opportunities map", "ROI projection"],
    },
    {
      icon: Search,
      title: "Analysis & Strategy",
      duration: "3-5 days",
      description: "Our team analyzes your workflows and creates a detailed automation strategy with clear priorities and timeline.",
      deliverables: ["Technical feasibility report", "Implementation roadmap", "Cost-benefit analysis"],
    },
    {
      icon: Code,
      title: "Development",
      duration: "2-8 weeks",
      description: "We build your custom automation solution with regular check-ins and demos. You see progress every step of the way.",
      deliverables: ["Working prototypes", "Weekly progress updates", "Integration testing"],
    },
    {
      icon: Rocket,
      title: "Deployment",
      duration: "1-2 weeks",
      description: "Smooth rollout with comprehensive training for your team. We ensure everyone is confident using the new systems.",
      deliverables: ["Production deployment", "User training", "Documentation"],
    },
    {
      icon: Settings,
      title: "Optimization",
      duration: "Ongoing",
      description: "We monitor performance, gather feedback, and continuously improve your automation. Your success is our priority.",
      deliverables: ["Performance monitoring", "Monthly reports", "Feature enhancements"],
    },
    {
      icon: TrendingUp,
      title: "Scale",
      duration: "As needed",
      description: "As your business grows, we expand your automation capabilities. New departments, new processes—we're ready.",
      deliverables: ["Expansion planning", "Additional integrations", "Team growth support"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/site")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={logo} alt="Flow Reach" className="h-12 w-auto" />
          </div>
          <Button onClick={() => navigate("/site")}>Back to Home</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Our Process: Transparent & Proven
            </h1>
            <p className="text-xl text-muted-foreground">
              From discovery to deployment and beyond, we're with you every step of the way
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-border -z-10" />
                )}

                <div className="flex gap-8 items-start">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-flow flex items-center justify-center shadow-glow">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card border border-border rounded-xl p-8 hover-tilt">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm font-bold text-accent mb-2">
                          STEP {index + 1}
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>

                    <p className="text-lg text-muted-foreground mb-6">{step.description}</p>

                    <div className="space-y-2">
                      <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Deliverables
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="text-sm bg-muted px-3 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Book your free discovery call and see how we can transform your operations
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/site", { state: { scrollTo: "contact" } })}>
            Schedule Your Call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProcessPage;
