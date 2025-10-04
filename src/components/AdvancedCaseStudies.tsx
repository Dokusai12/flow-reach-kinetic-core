import { useState, useRef, useEffect } from "react";
import { 
  ArrowRight, 
  TrendingUp, 
  Filter, 
  Search, 
  Play, 
  Pause, 
  RotateCcw,
  Calendar,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Video,
  Download,
  Share2,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  implementation: {
    timeline: string;
    team: string[];
    technologies: string[];
    phases: {
      name: string;
      duration: string;
      status: 'completed' | 'in-progress' | 'planned';
      description: string;
    }[];
  };
  results: {
    timeSaved: number;
    costReduction: number;
    roi: number;
    accuracy: number;
    efficiency: number;
    customerSatisfaction: number;
  };
  beforeAfter: {
    before: {
      time: string;
      cost: string;
      errors: string;
      satisfaction: string;
    };
    after: {
      time: string;
      cost: string;
      errors: string;
      satisfaction: string;
    };
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
    videoUrl?: string;
  };
  technology: {
    stack: string[];
    integrations: string[];
    aiModels: string[];
  };
  tags: string[];
  featured: boolean;
  published: string;
}

const AdvancedCaseStudies = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [filterROI, setFilterROI] = useState([0, 2000]);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      id: "1",
      company: "TechCorp Inc.",
      industry: "SaaS",
      companySize: "50-100 employees",
      challenge: "Manual customer onboarding taking 2+ hours per client with 15% error rate",
      solution: "Automated onboarding workflow with AI document processing and personalized welcome sequences",
      implementation: {
        timeline: "12 weeks",
        team: ["Project Manager", "AI Engineer", "Frontend Developer", "QA Specialist"],
        technologies: ["OpenAI GPT-4", "Zapier", "HubSpot", "Custom API"],
        phases: [
          {
            name: "Discovery & Planning",
            duration: "2 weeks",
            status: "completed",
            description: "Analyzed current process, identified pain points, and designed solution architecture"
          },
          {
            name: "AI Model Training",
            duration: "3 weeks",
            status: "completed",
            description: "Trained custom AI model on company's document patterns and business rules"
          },
          {
            name: "Workflow Development",
            duration: "4 weeks",
            status: "completed",
            description: "Built automated workflow with error handling and human oversight"
          },
          {
            name: "Integration & Testing",
            duration: "2 weeks",
            status: "completed",
            description: "Integrated with existing systems and conducted comprehensive testing"
          },
          {
            name: "Deployment & Training",
            duration: "1 week",
            status: "completed",
            description: "Deployed solution and trained team on new processes"
          }
        ]
      },
      results: {
        timeSaved: 75,
        costReduction: 60,
        roi: 850,
        accuracy: 99.5,
        efficiency: 95,
        customerSatisfaction: 94
      },
      beforeAfter: {
        before: {
          time: "2 hours",
          cost: "$120/client",
          errors: "15%",
          satisfaction: "68%"
        },
        after: {
          time: "15 minutes",
          cost: "$12/client",
          errors: "0.5%",
          satisfaction: "94%"
        }
      },
      testimonial: {
        quote: "The automation solution has completely transformed our onboarding process. We're now able to onboard 5x more clients with the same team size.",
        author: "Sarah Johnson",
        role: "VP of Operations",
        company: "TechCorp Inc.",
        rating: 5,
        videoUrl: "https://example.com/video1"
      },
      technology: {
        stack: ["React", "Node.js", "PostgreSQL", "AWS"],
        integrations: ["HubSpot", "Slack", "Stripe", "DocuSign"],
        aiModels: ["GPT-4", "Custom Document Parser", "Sentiment Analysis"]
      },
      tags: ["Customer Onboarding", "Document Processing", "AI", "CRM Integration"],
      featured: true,
      published: "2024-01-15"
    },
    {
      id: "2",
      company: "RetailMax",
      industry: "E-commerce",
      companySize: "100-500 employees",
      challenge: "Inventory sync issues across 3 platforms causing 23 stockouts per month",
      solution: "Real-time inventory synchronization with predictive reordering AI",
      implementation: {
        timeline: "16 weeks",
        team: ["Data Engineer", "AI Specialist", "Backend Developer", "DevOps Engineer"],
        technologies: ["Python", "TensorFlow", "Apache Kafka", "Redis"],
        phases: [
          {
            name: "Data Analysis",
            duration: "3 weeks",
            status: "completed",
            description: "Analyzed historical inventory data and identified patterns"
          },
          {
            name: "AI Model Development",
            duration: "6 weeks",
            status: "completed",
            description: "Built predictive models for demand forecasting and reorder points"
          },
          {
            name: "Integration Development",
            duration: "4 weeks",
            status: "completed",
            description: "Created real-time sync system across all platforms"
          },
          {
            name: "Testing & Optimization",
            duration: "2 weeks",
            status: "completed",
            description: "Tested system under various scenarios and optimized performance"
          },
          {
            name: "Deployment & Monitoring",
            duration: "1 week",
            status: "completed",
            description: "Deployed to production with comprehensive monitoring"
          }
        ]
      },
      results: {
        timeSaved: 50,
        costReduction: 40,
        roi: 1200,
        accuracy: 92,
        efficiency: 88,
        customerSatisfaction: 94
      },
      beforeAfter: {
        before: {
          time: "4 hours/day",
          cost: "$2,500/month",
          errors: "23 stockouts/month",
          satisfaction: "68%"
        },
        after: {
          time: "30 minutes/day",
          cost: "$500/month",
          errors: "2 stockouts/month",
          satisfaction: "94%"
        }
      },
      testimonial: {
        quote: "Our inventory management is now completely automated. We've reduced stockouts by 90% and increased revenue by 30%.",
        author: "Mike Chen",
        role: "Head of Operations",
        company: "RetailMax",
        rating: 5
      },
      technology: {
        stack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
        integrations: ["Shopify", "Amazon", "Walmart", "QuickBooks"],
        aiModels: ["LSTM", "Random Forest", "Prophet"]
      },
      tags: ["Inventory Management", "Predictive Analytics", "E-commerce", "Real-time Sync"],
      featured: true,
      published: "2024-02-01"
    },
    {
      id: "3",
      company: "MediCare Solutions",
      industry: "Healthcare",
      companySize: "200-500 employees",
      challenge: "Patient data entry consuming 20 staff hours daily with 8% error rate",
      solution: "OCR + AI data extraction from medical forms with validation",
      implementation: {
        timeline: "20 weeks",
        team: ["AI Engineer", "Healthcare Specialist", "Security Expert", "UI/UX Designer"],
        technologies: ["Tesseract OCR", "BERT", "HIPAA-compliant Cloud", "React"],
        phases: [
          {
            name: "Compliance Review",
            duration: "4 weeks",
            status: "completed",
            description: "Ensured HIPAA compliance and security requirements"
          },
          {
            name: "OCR Model Training",
            duration: "6 weeks",
            status: "completed",
            description: "Trained OCR models on medical form layouts and handwriting"
          },
          {
            name: "AI Validation System",
            duration: "5 weeks",
            status: "completed",
            description: "Built AI system to validate and correct extracted data"
          },
          {
            name: "Integration & Security",
            duration: "3 weeks",
            status: "completed",
            description: "Integrated with EMR system with full security audit"
          },
          {
            name: "Testing & Deployment",
            duration: "2 weeks",
            status: "completed",
            description: "Comprehensive testing and phased deployment"
          }
        ]
      },
      results: {
        timeSaved: 60,
        costReduction: 50,
        roi: 1500,
        accuracy: 99.5,
        efficiency: 90,
        customerSatisfaction: 96
      },
      beforeAfter: {
        before: {
          time: "20 hours/day",
          cost: "$25,000/month",
          errors: "8%",
          satisfaction: "72%"
        },
        after: {
          time: "2 hours/day",
          cost: "$3,000/month",
          errors: "0.5%",
          satisfaction: "96%"
        }
      },
      testimonial: {
        quote: "The AI system has revolutionized our data entry process. We're now 90% more accurate and our staff can focus on patient care.",
        author: "Dr. Emily Rodriguez",
        role: "Chief Medical Officer",
        company: "MediCare Solutions",
        rating: 5
      },
      technology: {
        stack: ["Python", "FastAPI", "PostgreSQL", "AWS"],
        integrations: ["Epic EMR", "Cerner", "Allscripts", "HL7"],
        aiModels: ["Tesseract OCR", "BERT", "Custom Medical NER"]
      },
      tags: ["Healthcare", "OCR", "Data Extraction", "HIPAA Compliance"],
      featured: false,
      published: "2024-01-20"
    }
  ];

  const filteredCases = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseStudy.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseStudy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = filterIndustry === "all" || caseStudy.industry === filterIndustry;
    const matchesSize = filterSize === "all" || caseStudy.companySize === filterSize;
    const matchesROI = caseStudy.results.roi >= filterROI[0] && caseStudy.results.roi <= filterROI[1];
    
    return matchesSearch && matchesIndustry && matchesSize && matchesROI;
  });

  const industries = [...new Set(caseStudies.map(c => c.industry))];
  const companySizes = [...new Set(caseStudies.map(c => c.companySize))];

  const startTimelineAnimation = () => {
    setIsPlaying(true);
    setCurrentPhase(0);
  };

  const pauseTimelineAnimation = () => {
    setIsPlaying(false);
  };

  const resetTimelineAnimation = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
  };

  useEffect(() => {
    if (isPlaying && selectedCase) {
      const interval = setInterval(() => {
        setCurrentPhase(prev => {
          if (prev >= selectedCase.implementation.phases.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, selectedCase]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'planned': return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'planned': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">Advanced Case Studies</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Interactive <span className="text-gradient-flow">Success Stories</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore detailed case studies with interactive timelines, before/after comparisons, and real client testimonials
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterIndustry} onValueChange={setFilterIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSize} onValueChange={setFilterSize}>
              <SelectTrigger>
                <SelectValue placeholder="Company Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                {companySizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="space-y-2">
              <Label className="text-sm">ROI Range: {filterROI[0]}% - {filterROI[1]}%</Label>
              <Slider
                value={filterROI}
                onValueChange={setFilterROI}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseStudy) => (
          <Card 
            key={caseStudy.id} 
            className={`cursor-pointer hover:shadow-xl transition-all duration-300 ${
              selectedCase?.id === caseStudy.id ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setSelectedCase(caseStudy)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{caseStudy.company}</h3>
                  <p className="text-sm text-muted-foreground">{caseStudy.industry} • {caseStudy.companySize}</p>
                </div>
                <div className="flex gap-2">
                  {caseStudy.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline">
                    {caseStudy.results.roi}% ROI
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Challenge:</h4>
                  <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-gradient-flow">{caseStudy.results.timeSaved}%</div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-gradient-flow">${caseStudy.results.costReduction}K</div>
                    <div className="text-sm text-muted-foreground">Cost Savings</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Case Study View */}
      {selectedCase && (
        <Card className="mt-8">
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Implementation</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{selectedCase.company}</h3>
                      <div className="flex gap-4 mb-4">
                        <Badge variant="outline">{selectedCase.industry}</Badge>
                        <Badge variant="outline">{selectedCase.companySize}</Badge>
                        <Badge variant="outline">{selectedCase.implementation.timeline}</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Challenge</h4>
                      <p className="text-muted-foreground">{selectedCase.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Solution</h4>
                      <p className="text-muted-foreground">{selectedCase.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.technology.stack.map((tech, index) => (
                          <Badge key={index} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Before vs After</h4>
                      <div className="space-y-4">
                        {Object.entries(selectedCase.beforeAfter.before).map(([key, value], index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium capitalize">{key}:</span>
                            <div className="flex items-center gap-4">
                              <span className="text-red-600 font-medium">{value}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <span className="text-green-600 font-medium">
                                {Object.values(selectedCase.beforeAfter.after)[index]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Key Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-gradient-flow">{selectedCase.results.timeSaved}%</div>
                          <div className="text-sm text-muted-foreground">Time Saved</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-gradient-flow">{selectedCase.results.roi}%</div>
                          <div className="text-sm text-muted-foreground">ROI</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-gradient-flow">{selectedCase.results.accuracy}%</div>
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold text-gradient-flow">{selectedCase.results.efficiency}%</div>
                          <div className="text-sm text-muted-foreground">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Implementation Timeline</h3>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={startTimelineAnimation} disabled={isPlaying}>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline" onClick={pauseTimelineAnimation} disabled={!isPlaying}>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetTimelineAnimation}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedCase.implementation.phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                        index <= currentPhase
                          ? 'border-accent bg-accent/5'
                          : 'border-border bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index < currentPhase
                            ? 'bg-green-500 text-white'
                            : index === currentPhase
                            ? 'bg-accent text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="font-semibold">{phase.name}</h4>
                            <Badge className={getStatusColor(phase.status)}>
                              {getStatusIcon(phase.status)}
                              <span className="ml-1">{phase.status}</span>
                            </Badge>
                            <span className="text-sm text-muted-foreground">{phase.duration}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.implementation.team.map((member, index) => (
                      <Badge key={index} variant="outline">{member}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="p-6 space-y-6">
                <h3 className="text-2xl font-bold mb-6">Detailed Results</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        {Object.entries(selectedCase.results).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <div className="flex items-center gap-2">
                              <Progress value={value} className="w-24 h-2" />
                              <span className="font-bold text-gradient-flow">{value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Technology Used</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium mb-2">Tech Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedCase.technology.stack.map((tech, index) => (
                              <Badge key={index} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Integrations</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedCase.technology.integrations.map((integration, index) => (
                              <Badge key={index} variant="outline">{integration}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">AI Models</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedCase.technology.aiModels.map((model, index) => (
                              <Badge key={index} variant="outline">{model}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="testimonial" className="p-6 space-y-6">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    {[...Array(selectedCase.testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl italic text-muted-foreground max-w-3xl mx-auto">
                    "{selectedCase.testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-semibold">{selectedCase.testimonial.author}</p>
                    <p className="text-muted-foreground">{selectedCase.testimonial.role}</p>
                    <p className="text-muted-foreground">{selectedCase.testimonial.company}</p>
                  </div>

                  {selectedCase.testimonial.videoUrl && (
                    <div className="mt-8">
                      <Button>
                        <Video className="w-4 h-4 mr-2" />
                        Watch Video Testimonial
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
        <CardContent className="p-8 text-center space-y-6">
          <h3 className="text-3xl font-bold">Ready to Create Your Success Story?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results with intelligent automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Download Case Study
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-5 h-5 mr-2" />
              Share This Story
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedCaseStudies;
