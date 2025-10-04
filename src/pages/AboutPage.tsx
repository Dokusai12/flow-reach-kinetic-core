import { ArrowLeft, Users, Target, Zap, Award, Clock, CheckCircle, ArrowRight, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/flowreach-logo.png";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your ROI, not by hours billed. Every automation must deliver measurable value.",
    },
    {
      icon: Zap,
      title: "Move Fast",
      description: "Time is money. We deploy working solutions in weeks, not months. Iterate quickly, optimize constantly.",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We're not vendors—we're your automation team. Your success is our success, and we're in it for the long haul.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Good enough isn't good enough. We build robust, scalable solutions that grow with your business.",
    },
  ];

  const stats = [
    { number: "50+", label: "Businesses Transformed" },
    { number: "$1.25M+", label: "In Client Savings" },
    { number: "200K+", label: "Hours Automated" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former automation engineer at Google. Built the first version of Flow Reach after seeing how manual processes were holding back small businesses.",
      expertise: ["AI/ML", "Process Automation", "Business Strategy"]
    },
    {
      name: "Sarah Rodriguez",
      role: "Head of Engineering",
      bio: "10+ years in enterprise automation. Previously led automation teams at Salesforce and HubSpot.",
      expertise: ["Enterprise Systems", "API Integration", "Scalable Architecture"]
    },
    {
      name: "Marcus Johnson",
      role: "Lead Solutions Architect",
      bio: "Specializes in complex workflow design. Has implemented automation solutions for Fortune 500 companies.",
      expertise: ["Workflow Design", "System Integration", "Process Optimization"]
    },
    {
      name: "Dr. Emily Watson",
      role: "AI Research Director",
      bio: "PhD in Machine Learning from Stanford. Focuses on making AI accessible and practical for business automation.",
      expertise: ["Machine Learning", "Natural Language Processing", "AI Ethics"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We dive deep into your current processes, identify pain points, and map out automation opportunities.",
      duration: "1-2 weeks"
    },
    {
      step: "02", 
      title: "Strategy & Planning",
      description: "We design a comprehensive automation roadmap tailored to your business goals and constraints.",
      duration: "1 week"
    },
    {
      step: "03",
      title: "Implementation",
      description: "Our team builds and deploys your automation solutions with minimal disruption to your operations.",
      duration: "2-8 weeks"
    },
    {
      step: "04",
      title: "Optimization & Support",
      description: "We continuously monitor, optimize, and enhance your automations to ensure maximum ROI.",
      duration: "Ongoing"
    }
  ];

  const technologies = [
    { name: "Zapier", category: "Workflow Automation" },
    { name: "Make.com", category: "Visual Automation" },
    { name: "n8n", category: "Open Source Automation" },
    { name: "Salesforce", category: "CRM Integration" },
    { name: "HubSpot", category: "Marketing Automation" },
    { name: "OpenAI GPT", category: "AI Agents" },
    { name: "Custom APIs", category: "System Integration" },
    { name: "Machine Learning", category: "Predictive Analytics" }
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
              We Automate So You Can Innovate
            </h1>
            <p className="text-xl text-muted-foreground">
              Flow Reach was founded on a simple belief: businesses shouldn't waste time on repetitive tasks when AI can handle them better, faster, and 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-5xl font-bold text-gradient-flow">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Our Story</h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>
                  Flow Reach started when our founders, frustrated with spending 40% of their week on manual data entry, built their first automation agent. Within three months, that agent saved their company 30 hours per week and eliminated 95% of data entry errors.
                </p>
                <p>
                  Other businesses noticed. They had the same problems—talented teams wasting time on tasks that machines could handle. We realized this was bigger than just one company's pain point.
                </p>
                <p>
                  Today, we've helped over 50 businesses reclaim hundreds of thousands of hours. From healthcare clinics to e-commerce stores, from SaaS companies to manufacturing plants—we've proven that intelligent automation isn't just for tech giants.
                </p>
                <p>
                  Every business deserves to operate at peak efficiency. That's what drives us every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Our Values</h2>
              <p className="text-xl text-muted-foreground">
                These principles guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-8 hover-tilt"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-flow flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">How We Work</h2>
              <p className="text-xl text-muted-foreground">
                Our proven process ensures successful automation implementation
              </p>
            </div>

            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-flow flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                      <span className="px-3 py-1 bg-muted text-sm rounded-full">{step.duration}</span>
                    </div>
                    <p className="text-lg text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">
                Automation experts with deep industry experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-8 hover-tilt">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-accent font-medium">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-muted text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Technologies We Use</h2>
              <p className="text-xl text-muted-foreground">
                We leverage the best tools and platforms to build your automation solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 text-center hover-tilt">
                  <h4 className="font-bold mb-1">{tech.name}</h4>
                  <p className="text-sm text-muted-foreground">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Let's Build Something Great Together</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Ready to see what intelligent automation can do for your business? Let's start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/site", { state: { scrollTo: "contact" } })}>
              Get in Touch
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

export default AboutPage;
