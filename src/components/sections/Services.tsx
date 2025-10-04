import { useState } from "react";
import { Bot, Workflow, Database, Zap } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Agents",
    shortDesc: "Intelligent assistants that work 24/7",
    fullDesc: "Custom AI agents that handle customer queries, process documents, analyze data patterns, and make intelligent decisions based on your business rules. Fully trainable on your data and processes.",
    metrics: ["24/7 Operation", "Human-like responses", "Multi-lingual support"],
    features: ["Natural Language Processing", "Custom Training", "Multi-channel Support", "Real-time Learning"],
    technologies: ["OpenAI GPT-4", "Custom ML Models", "NLP", "Voice Recognition"],
    color: "flow-blue-start",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    shortDesc: "Eliminate repetitive tasks forever",
    fullDesc: "Connect all your tools and automate complex workflows. From data entry to approval chains, we build automation that handles the boring stuff so your team can focus on what matters.",
    metrics: ["40% time saved", "Zero manual errors", "Instant execution"],
    features: ["Drag & Drop Builder", "Conditional Logic", "Error Handling", "Human Oversight"],
    technologies: ["Zapier", "Microsoft Power Automate", "Custom APIs", "Webhooks"],
    color: "accent",
  },
  {
    icon: Database,
    title: "CRM Integration",
    shortDesc: "Seamless data flow everywhere",
    fullDesc: "Sync customer data across all platforms in real-time. Automated lead capture, enrichment, and routing. Never lose a prospect or duplicate data again.",
    metrics: ["99% accuracy", "Real-time sync", "No data silos"],
    features: ["Real-time Sync", "Data Enrichment", "Lead Scoring", "Duplicate Detection"],
    technologies: ["Salesforce", "HubSpot", "Pipedrive", "Custom APIs"],
    color: "flow-blue-end",
  },
  {
    icon: Zap,
    title: "Data Processing",
    shortDesc: "Transform data into insights instantly",
    fullDesc: "Automated data collection, cleaning, and analysis. Extract insights from documents, generate reports, and trigger actions based on data patterns - all without manual intervention.",
    metrics: ["10x faster", "100% consistent", "Smart analytics"],
    features: ["OCR Processing", "Data Validation", "Report Generation", "Predictive Analytics"],
    technologies: ["Python", "TensorFlow", "Apache Kafka", "Machine Learning"],
    color: "accent",
  },
];

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Our <span className="text-gradient-flow">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            End-to-end automation solutions that scale with your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className={`bg-card border border-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover-tilt ${
                  isExpanded ? "md:col-span-2" : ""
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-flow flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.shortDesc}</p>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 space-y-6 animate-slide-diagonal">
                      <p className="text-foreground/80 leading-relaxed">{service.fullDesc}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {service.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="bg-muted/50 rounded-lg p-4 text-center animate-count-up"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          >
                            <div className="text-sm font-bold text-gradient-flow">{metric}</div>
                          </div>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Key Features</h5>
                          <div className="space-y-2">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-accent rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Technologies</h5>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`h-1 bg-gradient-flow transform origin-left transition-transform duration-500 ${isExpanded ? "scale-x-100" : "scale-x-0"}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
