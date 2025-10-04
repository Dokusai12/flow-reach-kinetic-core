import { ArrowLeft, TrendingUp, Clock, DollarSign, Users, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/flowreach-logo.png";

const CaseStudiesPage = () => {
  const navigate = useNavigate();

  const caseStudies = [
    {
      company: "TechCorp Solutions",
      industry: "SaaS",
      challenge: "Manual data entry across 5 different systems consuming 40 hours/week",
      solution: "Custom AI agent that automated data synchronization and validation",
      results: [
        { metric: "60%", label: "Manual work reduced" },
        { metric: "$120K", label: "Saved annually" },
        { metric: "3 months", label: "To full ROI" },
      ],
      testimonial: "Flow Reach transformed our operations. The ROI was clear within the first quarter.",
      technologies: ["Zapier", "Salesforce", "HubSpot", "Custom AI Agent"],
      timeline: "3 months",
      teamSize: "15 employees",
      keyFeatures: [
        "Real-time data synchronization",
        "Automated error detection",
        "Custom reporting dashboard",
        "24/7 monitoring"
      ]
    },
    {
      company: "HealthFlow Clinic",
      industry: "Healthcare",
      challenge: "Patient scheduling and follow-ups requiring 3 full-time staff members",
      solution: "Intelligent scheduling system with automated reminders and rescheduling",
      results: [
        { metric: "85%", label: "No-shows reduced" },
        { metric: "$200K", label: "Annual savings" },
        { metric: "2 months", label: "Implementation time" },
      ],
      testimonial: "Our staff can now focus on patient care instead of administrative tasks.",
      technologies: ["Make.com", "Calendly", "SMS API", "EHR Integration"],
      timeline: "2 months",
      teamSize: "25 employees",
      keyFeatures: [
        "Automated appointment reminders",
        "Smart rescheduling logic",
        "Patient preference learning",
        "Integration with existing EHR"
      ]
    },
    {
      company: "RetailMax Inc",
      industry: "E-commerce",
      challenge: "Order processing and inventory management causing frequent stockouts",
      solution: "AI-powered inventory prediction and automated order fulfillment",
      results: [
        { metric: "95%", label: "Accuracy improved" },
        { metric: "40%", label: "Faster processing" },
        { metric: "$300K", label: "Revenue increase" },
      ],
      testimonial: "We haven't had a stockout in 6 months. Customer satisfaction is at an all-time high.",
      technologies: ["n8n", "Shopify", "AWS", "Machine Learning"],
      timeline: "4 months",
      teamSize: "50 employees",
      keyFeatures: [
        "Predictive inventory management",
        "Automated reorder triggers",
        "Demand forecasting",
        "Real-time stock monitoring"
      ]
    },
    {
      company: "FinanceFlow Partners",
      industry: "Financial Services",
      challenge: "Client onboarding taking 2-3 weeks with high error rates",
      solution: "End-to-end automated onboarding workflow with compliance checks",
      results: [
        { metric: "75%", label: "Faster onboarding" },
        { metric: "99%", label: "Compliance accuracy" },
        { metric: "$150K", label: "Cost savings" },
      ],
      testimonial: "We can now onboard clients in 3 days instead of 3 weeks. Our compliance team loves the accuracy.",
      technologies: ["Zapier", "DocuSign", "Compliance APIs", "Custom Workflows"],
      timeline: "6 weeks",
      teamSize: "30 employees",
      keyFeatures: [
        "Automated document collection",
        "Compliance verification",
        "Client communication workflows",
        "Audit trail generation"
      ]
    },
    {
      company: "EduTech Academy",
      industry: "Education",
      challenge: "Student enrollment and course management requiring manual coordination",
      solution: "Smart enrollment system with automated course recommendations and scheduling",
      results: [
        { metric: "90%", label: "Enrollment efficiency" },
        { metric: "50%", label: "Admin time saved" },
        { metric: "$80K", label: "Annual savings" },
      ],
      testimonial: "Our administrative team can now focus on student success instead of paperwork.",
      technologies: ["Make.com", "Learning Management System", "Email Automation", "AI Recommendations"],
      timeline: "5 weeks",
      teamSize: "20 employees",
      keyFeatures: [
        "Automated course recommendations",
        "Smart scheduling optimization",
        "Student progress tracking",
        "Automated communications"
      ]
    },
    {
      company: "ManufacturingMax Corp",
      industry: "Manufacturing",
      challenge: "Quality control and production scheduling causing delays and waste",
      solution: "AI-powered quality prediction and automated production optimization",
      results: [
        { metric: "40%", label: "Defect reduction" },
        { metric: "25%", label: "Production efficiency" },
        { metric: "$400K", label: "Cost savings" },
      ],
      testimonial: "We've eliminated quality issues and optimized our entire production line. Game changer.",
      technologies: ["IoT Sensors", "Machine Learning", "Production APIs", "Custom Analytics"],
      timeline: "8 weeks",
      teamSize: "100 employees",
      keyFeatures: [
        "Real-time quality monitoring",
        "Predictive maintenance alerts",
        "Production optimization",
        "Quality trend analysis"
      ]
    }
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
              Real Results from Real Businesses
            </h1>
            <p className="text-xl text-muted-foreground">
              See how we've helped companies like yours transform their operations with intelligent automation
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-6 space-y-20">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevated hover-tilt"
            >
              <div className="p-8 md:p-12 space-y-8">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{study.company}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="text-accent font-medium">{study.industry}</span>
                      <span>•</span>
                      <span>{study.teamSize}</span>
                      <span>•</span>
                      <span>{study.timeline} implementation</span>
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
                      Challenge
                    </h3>
                    <p className="text-lg">{study.challenge}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
                      Solution
                    </h3>
                    <p className="text-lg">{study.solution}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {study.keyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-wider">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-muted text-sm rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-6 py-8 border-y border-border">
                  {study.results.map((result, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div className="text-4xl font-bold text-gradient-flow">{result.metric}</div>
                      <div className="text-sm text-muted-foreground">{result.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-xl italic text-muted-foreground border-l-4 border-accent pl-6">
                  "{study.testimonial}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold">Proven Results Across Industries</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gradient-flow">$1.25M+</div>
                <div className="text-muted-foreground">Total Client Savings</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gradient-flow">50+</div>
                <div className="text-muted-foreground">Successful Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gradient-flow">6</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gradient-flow">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Write Your Success Story?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results. Book a free consultation to explore your automation opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/site", { state: { scrollTo: "contact" } })}>
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10" onClick={() => navigate("/chat")}>
              Try Our AI Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
