import { useState, useEffect } from "react";
import { 
  Star, 
  Award, 
  Shield, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Globe,
  Lock,
  Zap,
  Bot,
  Workflow,
  Database,
  BarChart3,
  Heart,
  MessageSquare,
  ThumbsUp,
  Share2,
  Play,
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  featured: boolean;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar?: string;
  videoUrl?: string;
  verified: boolean;
  featured: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  icon: any;
  description: string;
  verified: boolean;
  expiryDate?: string;
}

interface Award {
  id: string;
  name: string;
  year: string;
  category: string;
  issuer: string;
  description: string;
  icon: any;
}

interface TrustIndicator {
  id: string;
  type: 'security' | 'compliance' | 'privacy' | 'support';
  name: string;
  description: string;
  icon: any;
  verified: boolean;
}

interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  author: string;
  authorRole: string;
  authorCompany: string;
  likes: number;
  shares: number;
  comments: number;
  timestamp: string;
  imageUrl?: string;
  verified: boolean;
}

const SocialProof = () => {
  const [activeTab, setActiveTab] = useState("testimonials");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const clientLogos: ClientLogo[] = [
    { id: "1", name: "TechCorp", logo: "/logos/techcorp.png", industry: "SaaS", size: "500+ employees", featured: true },
    { id: "2", name: "RetailMax", logo: "/logos/retailmax.png", industry: "E-commerce", size: "1000+ employees", featured: true },
    { id: "3", name: "MediCare", logo: "/logos/medicare.png", industry: "Healthcare", size: "200+ employees", featured: true },
    { id: "4", name: "LegalTech", logo: "/logos/legaltech.png", industry: "Legal", size: "150+ employees", featured: false },
    { id: "5", name: "FinancePro", logo: "/logos/financepro.png", industry: "Finance", size: "300+ employees", featured: false },
    { id: "6", name: "EduTech", logo: "/logos/edutech.png", industry: "Education", size: "100+ employees", featured: false },
    { id: "7", name: "ManufacturingCo", logo: "/logos/manufacturing.png", industry: "Manufacturing", size: "800+ employees", featured: false },
    { id: "8", name: "RealEstatePro", logo: "/logos/realestate.png", industry: "Real Estate", size: "250+ employees", featured: false }
  ];

  const testimonials: Testimonial[] = [
    {
      id: "1",
      quote: "Flow Reach transformed our entire customer onboarding process. We went from 2 hours per client to just 15 minutes, with 99% accuracy. The ROI was immediate and substantial.",
      author: "Sarah Johnson",
      role: "VP of Operations",
      company: "TechCorp Inc.",
      rating: 5,
      verified: true,
      featured: true,
      videoUrl: "https://example.com/testimonial1"
    },
    {
      id: "2",
      quote: "The AI-powered automation they built for us has been a game-changer. We've reduced our inventory management time by 75% and eliminated stockouts almost completely.",
      author: "Mike Chen",
      role: "Head of Operations",
      company: "RetailMax",
      rating: 5,
      verified: true,
      featured: true
    },
    {
      id: "3",
      quote: "Working with Flow Reach was one of the best decisions we've made. Their team understood our complex healthcare requirements and delivered a HIPAA-compliant solution that exceeded our expectations.",
      author: "Dr. Emily Rodriguez",
      role: "Chief Medical Officer",
      company: "MediCare Solutions",
      rating: 5,
      verified: true,
      featured: true
    },
    {
      id: "4",
      quote: "The automation workflows they created have saved us countless hours and significantly improved our data accuracy. Our team can now focus on strategic work instead of manual tasks.",
      author: "Alex Kim",
      role: "CTO",
      company: "LegalTech Pro",
      rating: 5,
      verified: true,
      featured: false
    },
    {
      id: "5",
      quote: "Flow Reach's solution integrated seamlessly with our existing systems. The implementation was smooth, and the results were immediate. Highly recommend their services.",
      author: "Jennifer Wang",
      role: "Operations Director",
      company: "FinancePro",
      rating: 5,
      verified: true,
      featured: false
    }
  ];

  const certifications: Certification[] = [
    {
      id: "1",
      name: "SOC 2 Type II",
      issuer: "AICPA",
      icon: Shield,
      description: "Security, availability, and confidentiality controls",
      verified: true,
      expiryDate: "2025-12-31"
    },
    {
      id: "2",
      name: "ISO 27001",
      issuer: "ISO",
      icon: Lock,
      description: "Information security management system",
      verified: true,
      expiryDate: "2025-06-30"
    },
    {
      id: "3",
      name: "HIPAA Compliant",
      issuer: "HHS",
      icon: CheckCircle2,
      description: "Healthcare data protection standards",
      verified: true
    },
    {
      id: "4",
      name: "GDPR Compliant",
      issuer: "EU",
      icon: Globe,
      description: "General Data Protection Regulation",
      verified: true
    }
  ];

  const awards: Award[] = [
    {
      id: "1",
      name: "Best AI Automation Platform",
      year: "2024",
      category: "Technology",
      issuer: "TechCrunch",
      description: "Recognized for innovation in business process automation",
      icon: Award
    },
    {
      id: "2",
      name: "Top 10 Automation Tools",
      year: "2024",
      category: "Software",
      issuer: "G2",
      description: "Highest rated automation platform by users",
      icon: Star
    },
    {
      id: "3",
      name: "Innovation in AI",
      year: "2023",
      category: "Artificial Intelligence",
      issuer: "AI Awards",
      description: "Outstanding contribution to AI-powered business solutions",
      icon: Bot
    }
  ];

  const trustIndicators: TrustIndicator[] = [
    {
      id: "1",
      type: "security",
      name: "Enterprise-Grade Security",
      description: "256-bit SSL encryption, multi-factor authentication, and regular security audits",
      icon: Shield,
      verified: true
    },
    {
      id: "2",
      type: "compliance",
      name: "SOC 2 Certified",
      description: "Audited and certified for security, availability, and confidentiality",
      icon: CheckCircle2,
      verified: true
    },
    {
      id: "3",
      type: "privacy",
      name: "GDPR & HIPAA Compliant",
      description: "Full compliance with data protection regulations",
      icon: Lock,
      verified: true
    },
    {
      id: "4",
      type: "support",
      name: "24/7 Expert Support",
      description: "Round-the-clock support from automation experts",
      icon: MessageSquare,
      verified: true
    }
  ];

  const socialMediaPosts: SocialMediaPost[] = [
    {
      id: "1",
      platform: "linkedin",
      content: "Just implemented Flow Reach's automation solution and the results are incredible! 75% time savings in our first month. Highly recommend! #automation #productivity",
      author: "Sarah Johnson",
      authorRole: "VP Operations",
      authorCompany: "TechCorp",
      likes: 156,
      shares: 23,
      comments: 12,
      timestamp: "2 hours ago",
      verified: true
    },
    {
      id: "2",
      platform: "twitter",
      content: "Flow Reach's AI automation is a game-changer for our business. From 2 hours to 15 minutes per client onboarding. The ROI is insane! 🚀",
      author: "Mike Chen",
      authorRole: "Head of Ops",
      authorCompany: "RetailMax",
      likes: 89,
      shares: 34,
      comments: 8,
      timestamp: "4 hours ago",
      verified: true
    },
    {
      id: "3",
      platform: "linkedin",
      content: "The team at Flow Reach understood our complex healthcare requirements and delivered a HIPAA-compliant solution that exceeded expectations. Professional, reliable, and results-driven.",
      author: "Dr. Emily Rodriguez",
      authorRole: "CMO",
      authorCompany: "MediCare Solutions",
      likes: 234,
      shares: 45,
      comments: 18,
      timestamp: "1 day ago",
      verified: true
    }
  ];

  const stats = [
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Automation Workflows", value: "10,000+", icon: Workflow },
    { label: "Time Saved (Hours)", value: "1M+", icon: Clock },
    { label: "Cost Savings", value: "$50M+", icon: DollarSign },
    { label: "Success Rate", value: "99.5%", icon: TrendingUp },
    { label: "Countries Served", value: "50+", icon: Globe }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '𝕏';
      case 'linkedin': return 'in';
      case 'facebook': return 'f';
      case 'instagram': return 'ig';
      default: return '?';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-gray-900 bg-gray-100';
      case 'linkedin': return 'text-blue-600 bg-blue-100';
      case 'facebook': return 'text-blue-600 bg-blue-100';
      case 'instagram': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">Social Proof</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Trusted by <span className="text-gradient-flow">Industry Leaders</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join hundreds of companies that have transformed their operations with our automation solutions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-flow flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient-flow">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Client Logos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Trusted by Industry Leaders</CardTitle>
          <CardDescription className="text-center">
            Companies across various industries rely on our automation solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                  <span className="text-sm font-bold text-muted-foreground">{logo.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">{logo.industry}</div>
                {logo.featured && (
                  <Badge className="text-xs mt-1">Featured</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                    {testimonial.verified && (
                      <CheckCircle2 className="w-4 h-4 text-green-500 ml-2" />
                    )}
                  </div>
                  
                  <blockquote className="text-sm italic text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-flow rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {testimonial.videoUrl && (
                    <Button size="sm" variant="outline" className="w-full mt-4">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <Card key={cert.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-flow flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mb-4">{cert.description}</p>
                    {cert.verified && (
                      <Badge className="text-green-600 bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {cert.expiryDate && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Expires: {cert.expiryDate}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <Card key={award.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-flow flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{award.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{award.issuer} • {award.year}</p>
                        <p className="text-xs text-muted-foreground mb-3">{award.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {award.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialMediaPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{post.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {post.authorRole} at {post.authorCompany}
                        {post.verified && <CheckCircle2 className="w-3 h-3 text-blue-500 inline ml-1" />}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                  </div>
                  
                  <p className="text-sm mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-3 h-3" />
                      {post.shares}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {post.comments}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Trust Indicators */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-center">Why Trust Flow Reach?</CardTitle>
          <CardDescription className="text-center">
            We maintain the highest standards of security, compliance, and support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator) => {
              const Icon = indicator.icon;
              return (
                <div key={indicator.id} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-flow flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{indicator.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{indicator.description}</p>
                  {indicator.verified && (
                    <Badge className="text-green-600 bg-green-100">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
        <CardContent className="p-8 text-center space-y-6">
          <h3 className="text-3xl font-bold">Ready to Join Our Success Stories?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See why industry leaders trust Flow Reach for their automation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Success Stories
            </Button>
            <Button size="lg" variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Download Case Studies
            </Button>
            <Button size="lg" variant="outline">
              <ExternalLink className="w-5 h-5 mr-2" />
              View All Reviews
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialProof;
