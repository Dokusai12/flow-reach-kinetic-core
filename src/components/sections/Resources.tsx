import { useState } from "react";
import { Calendar, Clock, User, ArrowRight, Search, Filter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Resources" },
    { value: "automation", label: "Automation" },
    { value: "ai", label: "AI & Machine Learning" },
    { value: "case-studies", label: "Case Studies" },
    { value: "tutorials", label: "Tutorials" },
    { value: "industry", label: "Industry Insights" }
  ];

  const resources = [
    {
      id: 1,
      title: "The Complete Guide to Business Process Automation",
      excerpt: "Learn how to identify, design, and implement automation solutions that deliver real ROI for your business.",
      category: "automation",
      type: "Guide",
      readTime: "12 min read",
      author: "Sarah Chen",
      date: "2024-01-15",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "How AI Agents Transformed Our Client's Customer Service",
      excerpt: "A detailed case study showing how we reduced response times by 80% and improved customer satisfaction scores.",
      category: "case-studies",
      type: "Case Study",
      readTime: "8 min read",
      author: "Mike Rodriguez",
      date: "2024-01-12",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 3,
      title: "Building Your First Workflow: A Step-by-Step Tutorial",
      excerpt: "Get started with workflow automation using our platform. Perfect for beginners who want to see quick results.",
      category: "tutorials",
      type: "Tutorial",
      readTime: "15 min read",
      author: "Alex Thompson",
      date: "2024-01-10",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 4,
      title: "The Future of AI in Business: Trends for 2024",
      excerpt: "Explore the latest trends in AI technology and how they're reshaping the business landscape.",
      category: "ai",
      type: "Insight",
      readTime: "10 min read",
      author: "Dr. Lisa Wang",
      date: "2024-01-08",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 5,
      title: "ROI Calculator: How to Measure Automation Success",
      excerpt: "Learn the key metrics and formulas to calculate the true ROI of your automation investments.",
      category: "automation",
      type: "Guide",
      readTime: "6 min read",
      author: "David Park",
      date: "2024-01-05",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 6,
      title: "Healthcare Automation: Compliance and Best Practices",
      excerpt: "Navigate the complex world of healthcare automation while maintaining HIPAA compliance and patient privacy.",
      category: "industry",
      type: "Industry Guide",
      readTime: "14 min read",
      author: "Dr. Maria Santos",
      date: "2024-01-03",
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <section id="resources" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Resources & <span className="text-gradient-flow">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with our latest guides, case studies, and industry insights on automation and AI.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">Featured Resources</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-accent/20 to-flow-blue-start/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-white">{resource.type}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {resource.title}
                      </h4>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">{resource.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{resource.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(resource.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                    <Button className="w-full group-hover:bg-accent group-hover:text-white transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularResources.map((resource) => (
            <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 relative overflow-hidden">
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary">{resource.type}</Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors line-clamp-2">
                    {resource.title}
                  </h4>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{resource.author}</span>
                  <span>{resource.readTime}</span>
                </div>
                <Button size="sm" variant="outline" className="w-full group-hover:bg-accent group-hover:text-white transition-colors">
                  Read More
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest automation insights, case studies, and industry trends delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="sm:w-auto">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No spam, unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Resources;
