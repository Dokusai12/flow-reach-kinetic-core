import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Users, 
  Settings, 
  MessageSquare, 
  FileText, 
  Calendar,
  Zap,
  Activity,
  Shield,
  Download,
  Filter,
  Search,
  Bell,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused' | 'planning';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: string[];
  lastUpdate: string;
}

interface AutomationHealth {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'offline';
  uptime: number;
  lastRun: string;
  nextRun: string;
  successRate: number;
  avgExecutionTime: number;
  errors: number;
}

interface SupportTicket {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  created: string;
  assignedTo: string;
  category: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const projects: Project[] = [
    {
      id: "1",
      name: "CRM Integration Automation",
      status: "active",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 50000,
      spent: 37500,
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      lastUpdate: "2024-02-10"
    },
    {
      id: "2",
      name: "Email Processing Bot",
      status: "completed",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-15",
      budget: 25000,
      spent: 22000,
      team: ["Jane Smith", "Sarah Wilson"],
      lastUpdate: "2024-01-15"
    },
    {
      id: "3",
      name: "Data Analytics Pipeline",
      status: "planning",
      progress: 15,
      startDate: "2024-03-01",
      endDate: "2024-06-01",
      budget: 75000,
      spent: 5000,
      team: ["Mike Johnson", "Alex Brown"],
      lastUpdate: "2024-02-08"
    }
  ];

  const automationHealth: AutomationHealth[] = [
    {
      id: "1",
      name: "Lead Processing Bot",
      status: "healthy",
      uptime: 99.8,
      lastRun: "2024-02-10 14:30:00",
      nextRun: "2024-02-10 15:00:00",
      successRate: 98.5,
      avgExecutionTime: 2.3,
      errors: 2
    },
    {
      id: "2",
      name: "Invoice Automation",
      status: "warning",
      uptime: 95.2,
      lastRun: "2024-02-10 13:45:00",
      nextRun: "2024-02-10 14:15:00",
      successRate: 89.2,
      avgExecutionTime: 4.1,
      errors: 12
    },
    {
      id: "3",
      name: "Customer Support Bot",
      status: "healthy",
      uptime: 99.9,
      lastRun: "2024-02-10 14:25:00",
      nextRun: "2024-02-10 14:30:00",
      successRate: 96.8,
      avgExecutionTime: 1.8,
      errors: 1
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: "T-001",
      title: "Email bot not responding to certain queries",
      priority: "medium",
      status: "in-progress",
      created: "2024-02-09",
      assignedTo: "Jane Smith",
      category: "Technical Issue"
    },
    {
      id: "T-002",
      title: "Need to add new data source integration",
      priority: "high",
      status: "open",
      created: "2024-02-10",
      assignedTo: "Mike Johnson",
      category: "Feature Request"
    },
    {
      id: "T-003",
      title: "Monthly performance report",
      priority: "low",
      status: "resolved",
      created: "2024-02-05",
      assignedTo: "Sarah Wilson",
      category: "Report Request"
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    { name: "Time Saved", value: 240, change: 15, trend: "up", unit: "hours" },
    { name: "Cost Savings", value: 12500, change: 8, trend: "up", unit: "$" },
    { name: "Processes Automated", value: 45, change: 3, trend: "up", unit: "count" },
    { name: "Error Rate", value: 2.1, change: -0.5, trend: "down", unit: "%" },
    { name: "Uptime", value: 99.2, change: 0.3, trend: "up", unit: "%" },
    { name: "ROI", value: 340, change: 25, trend: "up", unit: "%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'planning': return 'text-purple-600 bg-purple-100';
      case 'open': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Portal</h1>
          <p className="text-muted-foreground">Monitor your automation projects and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value.toLocaleString()}{metric.unit}</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-medium">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: "CRM Integration completed", time: "2 hours ago", type: "success" },
                  { action: "Email bot updated", time: "4 hours ago", type: "info" },
                  { action: "New automation deployed", time: "1 day ago", type: "success" },
                  { action: "Support ticket resolved", time: "2 days ago", type: "info" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {automationHealth.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        automation.status === 'healthy' ? 'bg-green-500' :
                        automation.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{automation.name}</p>
                        <p className="text-xs text-muted-foreground">{automation.uptime}% uptime</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(automation.status)}>
                      {automation.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Performance chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Projects</h3>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.startDate} - {project.endDate}
                      </p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="text-lg font-semibold">
                          ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Team</p>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="w-8 h-8 border-2 border-background">
                              <AvatarFallback className="text-xs">
                                {member.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Last updated: {project.lastUpdate}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Automations Tab */}
        <TabsContent value="automations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Automation Health</h3>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <div className="grid gap-6">
            {automationHealth.map((automation) => (
              <Card key={automation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        automation.status === 'healthy' ? 'bg-green-500' :
                        automation.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <h4 className="text-lg font-semibold">{automation.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Last run: {automation.lastRun}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(automation.status)}>
                      {automation.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{automation.uptime}%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{automation.successRate}%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{automation.avgExecutionTime}s</p>
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gradient-flow">{automation.errors}</p>
                      <p className="text-sm text-muted-foreground">Errors</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t mt-4">
                    <p className="text-sm text-muted-foreground">
                      Next run: {automation.nextRun}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Zap className="w-4 h-4 mr-2" />
                        Run Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Support Tickets</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>

          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{ticket.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Created: {ticket.created} • Assigned to: {ticket.assignedTo}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Category: {ticket.category}
                    </p>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
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

export default ClientPortal;
