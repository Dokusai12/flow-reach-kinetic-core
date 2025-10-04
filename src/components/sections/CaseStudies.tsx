import { useRef, useEffect, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

const cases = [
  {
    company: "TechCorp Inc.",
    industry: "SaaS",
    challenge: "Manual customer onboarding taking 2+ hours per client",
    solution: "Automated onboarding workflow with AI document processing",
    before: { time: "2 hours", errors: "15%", cost: "$120/client" },
    after: { time: "15 minutes", errors: "0.5%", cost: "$12/client" },
    savings: "$120K/year",
    color: "from-flow-blue-start to-flow-blue-end",
  },
  {
    company: "RetailMax",
    industry: "E-commerce",
    challenge: "Inventory sync issues across 3 platforms causing stockouts",
    solution: "Real-time inventory sync with predictive reordering AI",
    before: { stockouts: "23/month", revenue: "$450K", satisfaction: "68%" },
    after: { stockouts: "2/month", revenue: "$580K", satisfaction: "94%" },
    savings: "$1.5M/year increased revenue",
    color: "from-accent to-yellow-500",
  },
  {
    company: "MediCare Solutions",
    industry: "Healthcare",
    challenge: "Patient data entry consuming 20 staff hours/day",
    solution: "OCR + AI data extraction from medical forms",
    before: { hours: "20 hrs/day", accuracy: "92%", cost: "$25K/month" },
    after: { hours: "2 hrs/day", accuracy: "99.5%", cost: "$3K/month" },
    savings: "$264K/year",
    color: "from-flow-blue-end to-purple-500",
  },
  {
    company: "LegalTech Pro",
    industry: "Legal Services",
    challenge: "Contract review taking 3 days per document",
    solution: "AI-powered contract analysis and risk flagging",
    before: { time: "3 days", throughput: "10/month", cost: "$500/doc" },
    after: { time: "4 hours", throughput: "60/month", cost: "$50/doc" },
    savings: "$180K/year + 6x capacity",
    color: "from-purple-500 to-pink-500",
  },
];

const CaseStudies = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleMetrics, setVisibleMetrics] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleMetrics((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = scrollRef.current?.querySelectorAll("[data-index]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cases" className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Real Results, Real <span className="text-gradient-hazard">Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we've transformed businesses across industries
          </p>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x snap-mandatory scrollbar-hide">
        {cases.map((caseStudy, index) => (
          <div
            key={index}
            data-index={index}
            className="flex-shrink-0 w-[500px] snap-center"
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden hover-tilt h-full">
              {/* Header */}
              <div className={`bg-gradient-to-r ${caseStudy.color} p-6 text-white`}>
                <div className="text-sm font-medium opacity-90 mb-2">{caseStudy.industry}</div>
                <h3 className="text-2xl font-bold mb-2">{caseStudy.company}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold">{caseStudy.savings}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Challenge */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Challenge
                  </div>
                  <p className="text-sm">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Solution
                  </div>
                  <p className="text-sm">{caseStudy.solution}</p>
                </div>

                {/* Before/After Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {/* Before */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-destructive mb-3">
                      Before
                    </div>
                    <div className="space-y-2">
                      {Object.entries(caseStudy.before).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="text-muted-foreground capitalize">{key}:</span>{" "}
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-green-600 mb-3">
                      After
                    </div>
                    <div className="space-y-2">
                      {Object.entries(caseStudy.after).map(([key, value], i) => (
                        <div
                          key={key}
                          className={`text-sm ${visibleMetrics.has(index) ? "animate-count-up" : "opacity-0"}`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <span className="text-muted-foreground capitalize">{key}:</span>{" "}
                          <span className="font-bold text-green-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <button className="w-full py-3 bg-muted hover:bg-muted/80 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 group">
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-8 text-sm text-muted-foreground">
        ← Scroll to explore more success stories →
      </div>
    </section>
  );
};

export default CaseStudies;
