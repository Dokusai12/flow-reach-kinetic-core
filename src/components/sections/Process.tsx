import { Search, Lightbulb, Wrench, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We analyze your workflows to identify automation opportunities and pain points",
    details: ["Workflow mapping", "Bottleneck identification", "ROI calculation"],
  },
  {
    icon: Lightbulb,
    title: "Design",
    description: "Custom automation blueprint tailored to your specific business needs",
    details: ["Solution architecture", "Integration planning", "Success metrics"],
  },
  {
    icon: Wrench,
    title: "Build",
    description: "Rapid development and deployment of your automation system",
    details: ["Agile sprints", "Testing & QA", "Team training"],
  },
  {
    icon: TrendingUp,
    title: "Optimize",
    description: "Continuous monitoring and improvement to maximize your ROI",
    details: ["Performance tracking", "A/B testing", "Scaling support"],
  },
];

const Process = () => {
  return (
    <section id="process" className="py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Our <span className="text-gradient-flow">Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From consultation to optimization - your journey to automation
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Path */}
          <svg className="absolute top-0 left-0 w-full h-full -z-10 hidden lg:block">
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--flow-blue-start))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <path
              d="M 150 100 Q 400 50, 650 100 T 1150 100"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10 5"
              opacity="0.3"
            />
          </svg>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative animate-slide-diagonal"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-flow flex items-center justify-center text-white font-bold text-xl shadow-glow z-10">
                    {index + 1}
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-8 h-full hover-tilt cursor-pointer group">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-flow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{step.description}</p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-flow-blue-start to-accent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timeline on Mobile */}
          <div className="lg:hidden mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  {index < steps.length - 1 && <div className="w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
