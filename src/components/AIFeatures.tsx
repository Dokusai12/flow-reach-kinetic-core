import { useState, useEffect } from "react";
import { 
  Brain, 
  Lightbulb, 
  FileText, 
  Target, 
  TrendingUp, 
  Zap, 
  Search, 
  Filter,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
  BarChart3,
  Sparkles,
  Bot,
  Database,
  Workflow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'automation' | 'integration' | 'optimization' | 'security';
  priority: 'high' | 'medium' | 'low';
  estimatedImpact: number;
  estimatedEffort: number;
  confidence: number;
  reasoning: string;
}

interface GeneratedProposal {
  id: string;
  title: string;
  summary: string;
  sections: {
    title: string;
    content: string;
  }[];
  estimatedCost: number;
  timeline: string;
  confidence: number;
  status: 'draft' | 'review' | 'approved' | 'rejected';
}

interface CaseStudyMatch {
  id: string;
  title: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: {
    timeSaved: number;
    costReduction: number;
    roi: number;
  };
  matchScore: number;
  relevance: string[];
}

interface PredictiveInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  action: string;
}

const AIFeatures = () => {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [chatInput, setChatInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const smartRecommendations: SmartRecommendation[] = [
    {
      id: "1",
      title: "Automate Lead Qualification Process",
      description: "Based on your CRM data, we can automate the initial lead scoring and qualification process, saving 15 hours per week.",
      category: "automation",
      priority: "high",
      estimatedImpact: 85,
      estimatedEffort: 2,
      confidence: 92,
      reasoning: "Your team processes 200+ leads weekly with similar patterns. Automation could handle 80% of initial qualification."
    },
    {
      id: "2",
      title: "Integrate Slack with Project Management",
      description: "Connect your Slack workspace with your project management tools to automatically update task statuses and deadlines.",
      category: "integration",
      priority: "medium",
      estimatedImpact: 60,
      estimatedEffort: 1,
      confidence: 78,
      reasoning: "Your team uses Slack heavily for communication. Integration would reduce context switching and improve visibility."
    },
    {
      id: "3",
      title: "Optimize Email Campaign Performance",
      description: "Implement AI-driven email optimization to improve open rates and conversions by analyzing send times and content.",
      category: "optimization",
      priority: "medium",
      estimatedImpact: 45,
      estimatedEffort: 3,
      confidence: 85,
      reasoning: "Your current email campaigns show room for improvement in timing and personalization."
    }
  ];

  const generatedProposals: GeneratedProposal[] = [
    {
      id: "1",
      title: "Comprehensive Automation Strategy for TechCorp",
      summary: "A complete automation solution covering lead processing, customer onboarding, and support ticket routing.",
      sections: [
        {
          title: "Executive Summary",
          content: "This proposal outlines a comprehensive automation strategy that will reduce manual work by 60% and improve customer response times by 75%."
        },
        {
          title: "Current State Analysis",
          content: "Based on our analysis, your team spends 40 hours weekly on repetitive tasks that can be automated, costing approximately $2,000 monthly."
        },
        {
          title: "Proposed Solution",
          content: "We recommend implementing AI-powered lead processing, automated customer onboarding workflows, and intelligent support ticket routing."
        },
        {
          title: "Implementation Timeline",
          content: "Phase 1: Lead Processing (4 weeks), Phase 2: Customer Onboarding (6 weeks), Phase 3: Support Automation (4 weeks)"
        }
      ],
      estimatedCost: 45000,
      timeline: "14 weeks",
      confidence: 88,
      status: "draft"
    }
  ];

  const caseStudyMatches: CaseStudyMatch[] = [
    {
      id: "1",
      title: "SaaS Company Automates Customer Onboarding",
      industry: "SaaS",
      companySize: "50-100 employees",
      challenge: "Manual customer onboarding taking 3+ hours per client",
      solution: "Automated onboarding workflow with AI document processing and personalized welcome sequences",
      results: {
        timeSaved: 75,
        costReduction: 60,
        roi: 850
      },
      matchScore: 95,
      relevance: ["SaaS industry", "Customer onboarding", "Document processing", "Similar team size"]
    },
    {
      id: "2",
      title: "E-commerce Platform Optimizes Inventory Management",
      industry: "E-commerce",
      companySize: "100-500 employees",
      challenge: "Inventory sync issues across multiple platforms",
      solution: "Real-time inventory synchronization with predictive reordering AI",
      results: {
        timeSaved: 50,
        costReduction: 40,
        roi: 1200
      },
      matchScore: 78,
      relevance: ["Multi-platform integration", "Inventory management", "Predictive analytics"]
    }
  ];

  const predictiveInsights: PredictiveInsight[] = [
    {
      id: "1",
      type: "opportunity",
      title: "High-Value Automation Opportunity",
      description: "Your customer support team handles 500+ tickets monthly. Implementing AI-powered ticket routing could reduce response time by 40%.",
      confidence: 89,
      impact: "high",
      timeframe: "Next 3 months",
      action: "Schedule discovery call to discuss implementation"
    },
    {
      id: "2",
      type: "optimization",
      title: "Process Bottleneck Identified",
      description: "Your lead qualification process has a 2-day delay between initial contact and follow-up. Automation could reduce this to 2 hours.",
      confidence: 76,
      impact: "medium",
      timeframe: "Next 6 weeks",
      action: "Review current lead management workflow"
    },
    {
      id: "3",
      type: "risk",
      title: "Potential Data Quality Issues",
      description: "Your CRM data shows 15% incomplete records. This could impact automation effectiveness and customer experience.",
      confidence: 82,
      impact: "medium",
      timeframe: "Immediate",
      action: "Implement data validation and cleanup process"
    }
  ];

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation': return <Zap className="w-4 h-4" />;
      case 'integration': return <Database className="w-4 h-4" />;
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation': return 'text-blue-600 bg-blue-100';
      case 'integration': return 'text-green-600 bg-green-100';
      case 'optimization': return 'text-purple-600 bg-purple-100';
      case 'security': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Features</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Intelligent <span className="text-gradient-flow">Automation Insights</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Let AI analyze your business and provide smart recommendations, automated proposals, and predictive insights
        </p>
      </div>

      {/* AI Chat Interface */}
      <Card className="bg-gradient-to-r from-accent/5 to-flow-blue-start/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Assistant
          </CardTitle>
          <CardDescription>
            Ask our AI about automation opportunities, get recommendations, or generate proposals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Textarea
                placeholder="Describe your business challenges or ask about automation opportunities..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="operations">Operations Manager</SelectItem>
                  <SelectItem value="sales">Sales Director</SelectItem>
                  <SelectItem value="marketing">Marketing Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerateProposal} disabled={isGenerating || !chatInput.trim()}>
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Insights
                </>
              )}
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Generate Proposal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
          <TabsTrigger value="proposals">Generated Proposals</TabsTrigger>
          <TabsTrigger value="case-studies">Case Study Matching</TabsTrigger>
          <TabsTrigger value="insights">Predictive Analytics</TabsTrigger>
        </TabsList>

        {/* Smart Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI-Generated Recommendations</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              Powered by AI
            </Badge>
          </div>

          <div className="grid gap-6">
            {smartRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(recommendation.category)}`}>
                        {getCategoryIcon(recommendation.category)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{recommendation.title}</h4>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(recommendation.category)}>
                        {recommendation.category}
                      </Badge>
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{recommendation.estimatedImpact}%</p>
                      <p className="text-sm text-muted-foreground">Impact</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{recommendation.estimatedEffort}</p>
                      <p className="text-sm text-muted-foreground">Effort (weeks)</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{recommendation.confidence}%</p>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg mb-4">
                    <h5 className="font-medium mb-2">AI Reasoning:</h5>
                    <p className="text-sm text-muted-foreground">{recommendation.reasoning}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Ready to implement</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm">
                        Implement
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Generated Proposals Tab */}
        <TabsContent value="proposals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI-Generated Proposals</h3>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate New Proposal
            </Button>
          </div>

          <div className="grid gap-6">
            {generatedProposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{proposal.title}</h4>
                      <p className="text-sm text-muted-foreground">{proposal.summary}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        {proposal.status}
                      </Badge>
                      <Badge className="text-green-600 bg-green-100">
                        {proposal.confidence}% confidence
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">${proposal.estimatedCost.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{proposal.timeline}</p>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{proposal.sections.length}</p>
                      <p className="text-sm text-muted-foreground">Sections</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {proposal.sections.map((section, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <h5 className="font-medium mb-1">{section.title}</h5>
                        <p className="text-sm text-muted-foreground">{section.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Full Proposal
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <Button size="sm">
                      Approve & Send
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Case Study Matching Tab */}
        <TabsContent value="case-studies" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Relevant Case Studies</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {caseStudyMatches.map((caseStudy) => (
              <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{caseStudy.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {caseStudy.industry} • {caseStudy.companySize}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="text-blue-600 bg-blue-100">
                        {caseStudy.matchScore}% match
                      </Badge>
                      <Badge variant="outline">
                        {caseStudy.industry}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h5 className="font-medium mb-2">Challenge:</h5>
                      <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Solution:</h5>
                      <p className="text-sm text-muted-foreground">{caseStudy.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{caseStudy.results.timeSaved}%</p>
                      <p className="text-sm text-muted-foreground">Time Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{caseStudy.results.costReduction}%</p>
                      <p className="text-sm text-muted-foreground">Cost Reduction</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{caseStudy.results.roi}%</p>
                      <p className="text-sm text-muted-foreground">ROI</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h5 className="font-medium">Why this matches your business:</h5>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.relevance.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Full Case Study
                    </Button>
                    <Button size="sm">
                      Apply Similar Solution
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Predictive Analytics Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Predictive Analytics</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Real-time Analysis
            </Badge>
          </div>

          <div className="grid gap-6">
            {predictiveInsights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.type === 'opportunity' ? 'text-green-600 bg-green-100' :
                        insight.type === 'risk' ? 'text-red-600 bg-red-100' :
                        'text-blue-600 bg-blue-100'
                      }`}>
                        {insight.type === 'opportunity' ? <Target className="w-4 h-4" /> :
                         insight.type === 'risk' ? <AlertTriangle className="w-4 h-4" /> :
                         <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                      <Badge variant="outline">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Timeframe</p>
                      <p className="font-medium">{insight.timeframe}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <div className="flex items-center gap-2">
                        <Progress value={insight.confidence} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg mb-4">
                    <h5 className="font-medium mb-2">Recommended Action:</h5>
                    <p className="text-sm text-muted-foreground">{insight.action}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Generated 2 hours ago</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                      <Button size="sm">
                        Take Action
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFeatures;
