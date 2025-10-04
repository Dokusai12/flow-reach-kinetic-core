import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To democratize business automation by making AI-powered solutions accessible to companies of all sizes, helping them save time, reduce costs, and scale efficiently."
    },
    {
      icon: Users,
      title: "Team",
      description: "We're a team of passionate automation experts, AI engineers, and business strategists who believe in the power of intelligent workflows to transform businesses."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We're committed to delivering exceptional results through cutting-edge technology, proven methodologies, and unwavering dedication to our clients' success."
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Our goal is to create meaningful impact by helping businesses focus on what matters most while we handle the repetitive, time-consuming tasks."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "10,000+", label: "Automations Built" },
    { number: "1M+", label: "Hours Saved" },
    { number: "$50M+", label: "Cost Savings" }
  ];

  return (
    <section id="about" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            About <span className="text-gradient-flow">Flow Reach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to transform how businesses operate through intelligent automation. 
            Our team combines deep technical expertise with real-world business experience to deliver 
            solutions that actually work.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gradient-flow mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-flow flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Our Story</h3>
              <div className="prose max-w-none text-center space-y-4">
                <p className="text-lg text-muted-foreground">
                  Flow Reach was born from a simple observation: businesses were drowning in repetitive, 
                  time-consuming tasks that could be automated. We saw the potential of AI and automation 
                  to transform entire industries, but also noticed that most solutions were either too 
                  complex, too expensive, or too generic to be truly effective.
                </p>
                <p className="text-lg text-muted-foreground">
                  So we set out to change that. We built a platform that makes intelligent automation 
                  accessible to businesses of all sizes, with solutions that are tailored to specific 
                  industries and use cases. Our approach combines the latest AI technology with deep 
                  business understanding to deliver results that matter.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to have helped hundreds of companies save millions of hours and 
                  dollars through intelligent automation. But we're just getting started. Our vision 
                  is a world where every business can leverage the power of AI to focus on what they 
                  do best while we handle the rest.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
