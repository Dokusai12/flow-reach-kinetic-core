import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Team = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Google AI researcher with 10+ years in machine learning. Led automation initiatives at Fortune 500 companies.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        email: "sarah@flowreach.com"
      },
      expertise: ["AI Strategy", "Machine Learning", "Leadership"]
    },
    {
      name: "Mike Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Microsoft engineer specializing in scalable automation platforms. Built systems handling millions of daily transactions.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/mikerodriguez",
        github: "https://github.com/mikerodriguez",
        email: "mike@flowreach.com"
      },
      expertise: ["System Architecture", "DevOps", "Cloud Computing"]
    },
    {
      name: "Dr. Lisa Wang",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from Stanford. Published researcher in natural language processing and AI ethics.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/lisawang",
        twitter: "https://twitter.com/lisawang",
        email: "lisa@flowreach.com"
      },
      expertise: ["NLP", "AI Ethics", "Research"]
    },
    {
      name: "Alex Thompson",
      role: "Head of Product",
      bio: "Former product manager at Slack and Zapier. Expert in building user-friendly automation tools that people actually use.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/alexthompson",
        twitter: "https://twitter.com/alexthompson",
        email: "alex@flowreach.com"
      },
      expertise: ["Product Strategy", "UX Design", "User Research"]
    },
    {
      name: "David Park",
      role: "Head of Engineering",
      bio: "Full-stack engineer with expertise in React, Node.js, and cloud infrastructure. Passionate about building reliable systems.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/davidpark",
        github: "https://github.com/davidpark",
        email: "david@flowreach.com"
      },
      expertise: ["Full-Stack Development", "Cloud Infrastructure", "Team Leadership"]
    },
    {
      name: "Maria Santos",
      role: "Head of Customer Success",
      bio: "Former consultant at McKinsey specializing in digital transformation. Ensures every client achieves their automation goals.",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "https://linkedin.com/in/mariasantos",
        email: "maria@flowreach.com"
      },
      expertise: ["Customer Success", "Digital Transformation", "Strategy"]
    }
  ];

  const stats = [
    { value: "50+", label: "Years Combined Experience" },
    { value: "15+", label: "Previous Companies" },
    { value: "100+", label: "Automation Projects" },
    { value: "5+", label: "Industry Awards" }
  ];

  return (
    <section id="team" className="py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Meet Our <span className="text-gradient-flow">Expert Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of AI researchers, engineers, and business experts work together to deliver exceptional automation solutions.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient-flow mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-flow-blue-start/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-accent font-medium">{member.role}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {member.social.linkedin && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.social.twitter && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.social.github && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {member.social.email && (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={`mailto:${member.social.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who are passionate about AI and automation. 
                Help us build the future of business automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  View Open Positions
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  careers@flowreach.com
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
