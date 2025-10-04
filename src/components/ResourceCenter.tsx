import { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  Share2,
  Tag,
  ArrowRight,
  Play,
  Lock,
  Unlock,
  Star,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Zap,
  Bot,
  Workflow,
  Database,
  Shield,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'whitepaper' | 'case-study' | 'template' | 'guide' | 'webinar';
  category: 'automation' | 'ai' | 'integration' | 'best-practices' | 'industry' | 'technical';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: string;
  author: string;
  published: string;
  views: number;
  likes: number;
  isGated: boolean;
  tags: string[];
  thumbnail?: string;
  videoUrl?: string;
  downloadUrl?: string;
  content: string;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  speaker: string;
  speakerRole: string;
  speakerCompany: string;
  thumbnail: string;
  isLive: boolean;
  isUpcoming: boolean;
  attendees: number;
  maxAttendees: number;
}

const ResourceCenter = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const resources: Resource[] = [
    {
      id: "1",
      title: "Complete Guide to Business Process Automation",
      description: "A comprehensive guide covering everything from identifying automation opportunities to implementing successful workflows.",
      type: "guide",
      category: "automation",
      difficulty: "beginner",
      readTime: "15 min",
      author: "Sarah Johnson",
      published: "2024-01-15",
      views: 1250,
      likes: 89,
      isGated: false,
      tags: ["automation", "workflow", "business-process", "guide"],
      content: "This comprehensive guide will walk you through the entire process of automating your business operations..."
    },
    {
      id: "2",
      title: "AI-Powered Automation: The Future of Business",
      description: "Explore how artificial intelligence is revolutionizing business automation and what it means for your organization.",
      type: "whitepaper",
      category: "ai",
      difficulty: "intermediate",
      readTime: "25 min",
      author: "Dr. Michael Chen",
      published: "2024-01-20",
      views: 890,
      likes: 67,
      isGated: true,
      tags: ["ai", "automation", "future", "technology"],
      content: "Artificial intelligence is transforming the way businesses operate, offering unprecedented opportunities for automation..."
    },
    {
      id: "3",
      title: "CRM Integration Best Practices",
      description: "Learn how to seamlessly integrate your CRM with other business tools for maximum efficiency.",
      type: "article",
      category: "integration",
      difficulty: "intermediate",
      readTime: "12 min",
      author: "Alex Rodriguez",
      published: "2024-01-18",
      views: 2100,
      likes: 156,
      isGated: false,
      tags: ["crm", "integration", "best-practices", "tools"],
      content: "Integrating your CRM with other business tools can significantly improve your team's productivity..."
    },
    {
      id: "4",
      title: "Automation ROI Calculator Template",
      description: "Download our Excel template to calculate the ROI of your automation projects.",
      type: "template",
      category: "automation",
      difficulty: "beginner",
      readTime: "5 min",
      author: "Flow Reach Team",
      published: "2024-01-10",
      views: 3200,
      likes: 234,
      isGated: false,
      tags: ["roi", "calculator", "template", "excel"],
      downloadUrl: "/templates/roi-calculator.xlsx",
      content: "Use this template to calculate the return on investment for your automation projects..."
    },
    {
      id: "5",
      title: "How to Build Your First AI Chatbot",
      description: "Step-by-step tutorial on creating an intelligent chatbot for customer support.",
      type: "video",
      category: "ai",
      difficulty: "beginner",
      readTime: "30 min",
      author: "Emma Wilson",
      published: "2024-01-12",
      views: 4500,
      likes: 312,
      isGated: false,
      tags: ["chatbot", "ai", "tutorial", "customer-support"],
      videoUrl: "https://example.com/video1",
      content: "In this video tutorial, we'll walk you through building your first AI-powered chatbot..."
    },
    {
      id: "6",
      title: "Enterprise Automation Architecture Patterns",
      description: "Advanced patterns and architectures for large-scale automation implementations.",
      type: "whitepaper",
      category: "technical",
      difficulty: "advanced",
      readTime: "45 min",
      author: "David Kim",
      published: "2024-01-08",
      views: 650,
      likes: 45,
      isGated: true,
      tags: ["architecture", "enterprise", "patterns", "scalability"],
      content: "This whitepaper explores advanced architectural patterns for enterprise automation..."
    }
  ];

  const webinars: Webinar[] = [
    {
      id: "1",
      title: "The Future of AI in Business Automation",
      description: "Join us for an exclusive webinar on the latest trends in AI-powered business automation.",
      date: "2024-02-15",
      time: "2:00 PM EST",
      duration: "60 min",
      speaker: "Dr. Sarah Johnson",
      speakerRole: "Chief AI Officer",
      speakerCompany: "TechCorp",
      thumbnail: "/webinars/ai-future.jpg",
      isLive: false,
      isUpcoming: true,
      attendees: 150,
      maxAttendees: 500
    },
    {
      id: "2",
      title: "Automation Success Stories: Real Results",
      description: "Hear from companies that have successfully implemented automation and achieved remarkable results.",
      date: "2024-02-20",
      time: "3:00 PM EST",
      duration: "45 min",
      speaker: "Mike Chen",
      speakerRole: "VP of Operations",
      speakerCompany: "RetailMax",
      thumbnail: "/webinars/success-stories.jpg",
      isLive: false,
      isUpcoming: true,
      attendees: 89,
      maxAttendees: 200
    },
    {
      id: "3",
      title: "Live Demo: Building Your First Workflow",
      description: "Watch our experts build a complete automation workflow from scratch in real-time.",
      date: "2024-01-25",
      time: "1:00 PM EST",
      duration: "30 min",
      speaker: "Alex Rodriguez",
      speakerRole: "Senior Automation Engineer",
      speakerCompany: "Flow Reach",
      thumbnail: "/webinars/live-demo.jpg",
      isLive: true,
      isUpcoming: false,
      attendees: 0,
      maxAttendees: 1000
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    const matchesDifficulty = filterDifficulty === "all" || resource.difficulty === filterDifficulty;
    const matchesTab = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "automation", label: "Automation" },
    { value: "ai", label: "AI & Machine Learning" },
    { value: "integration", label: "Integrations" },
    { value: "best-practices", label: "Best Practices" },
    { value: "industry", label: "Industry Insights" },
    { value: "technical", label: "Technical" }
  ];

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'whitepaper': return <BookOpen className="w-4 h-4" />;
      case 'case-study': return <BarChart3 className="w-4 h-4" />;
      case 'template': return <Download className="w-4 h-4" />;
      case 'guide': return <Lightbulb className="w-4 h-4" />;
      case 'webinar': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'text-blue-600 bg-blue-100';
      case 'video': return 'text-red-600 bg-red-100';
      case 'whitepaper': return 'text-purple-600 bg-purple-100';
      case 'case-study': return 'text-green-600 bg-green-100';
      case 'template': return 'text-orange-600 bg-orange-100';
      case 'guide': return 'text-yellow-600 bg-yellow-100';
      case 'webinar': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDownload = (resource: Resource) => {
    if (resource.isGated && !isSubscribed) {
      // Show gated content modal
      return;
    }
    // Handle download
    console.log('Downloading:', resource.title);
  };

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      // Handle subscription logic
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Resource Center</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Learn & <span className="text-gradient-flow">Master Automation</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Access our comprehensive library of guides, templates, videos, and insights to accelerate your automation journey
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="whitepaper">Whitepapers</TabsTrigger>
          <TabsTrigger value="case-study">Case Studies</TabsTrigger>
          <TabsTrigger value="template">Templates</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="webinar">Webinars</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card 
                key={resource.id} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedResource(resource)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex gap-2">
                      {resource.isGated ? (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Unlock className="w-4 h-4 text-green-500" />
                      )}
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{resource.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {resource.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {resource.likes}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      by {resource.author}
                    </div>
                    <Button size="sm" variant="outline">
                      {resource.type === 'video' ? 'Watch' : resource.type === 'template' ? 'Download' : 'Read'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinar" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                    {webinar.isLive && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        LIVE
                      </Badge>
                    )}
                    {webinar.isUpcoming && (
                      <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                        Upcoming
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{webinar.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{webinar.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {webinar.date} at {webinar.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {webinar.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {webinar.speaker}, {webinar.speakerRole}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      {webinar.attendees}/{webinar.maxAttendees} registered
                    </div>
                  </div>

                  <Button className="w-full">
                    {webinar.isLive ? 'Join Now' : webinar.isUpcoming ? 'Register' : 'Watch Recording'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
        <CardContent className="p-8 text-center space-y-6">
          <h3 className="text-3xl font-bold">Stay Updated with Latest Insights</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get weekly automation tips, industry insights, and exclusive resources delivered to your inbox
          </p>
          
          {!isSubscribed ? (
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubscribe} disabled={!email}>
                Subscribe
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Successfully subscribed!</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Weekly insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Exclusive resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No spam, ever</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <Card className="fixed inset-4 z-50 overflow-auto">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">{selectedResource.title}</h3>
                <p className="text-muted-foreground">by {selectedResource.author} • {selectedResource.published}</p>
              </div>
              <Button variant="outline" onClick={() => setSelectedResource(null)}>
                Close
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className={getTypeColor(selectedResource.type)}>
                  {getTypeIcon(selectedResource.type)}
                  <span className="ml-1">{selectedResource.type}</span>
                </Badge>
                <Badge className={getDifficultyColor(selectedResource.difficulty)}>
                  {selectedResource.difficulty}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {selectedResource.readTime}
                </div>
              </div>

              <p className="text-lg">{selectedResource.description}</p>

              <div className="flex flex-wrap gap-2">
                {selectedResource.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <p>{selectedResource.content}</p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t">
                <Button onClick={() => handleDownload(selectedResource)}>
                  {selectedResource.type === 'video' ? 'Watch' : selectedResource.type === 'template' ? 'Download' : 'Read Full'}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResourceCenter;
