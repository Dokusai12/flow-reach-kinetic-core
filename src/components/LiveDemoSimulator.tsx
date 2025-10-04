import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, Eye, Download, Share2, Zap, Database, Bot, Cloud, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'integration' | 'output';
  label: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  data?: any;
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  status: 'idle' | 'active' | 'completed';
}

const nodeTypes = [
  { type: 'trigger', label: 'Email Received', icon: Database, color: 'from-blue-500 to-blue-600' },
  { type: 'action', label: 'Extract Data', icon: Bot, color: 'from-purple-500 to-pink-500' },
  { type: 'condition', label: 'Check Priority', icon: Settings, color: 'from-yellow-500 to-orange-500' },
  { type: 'integration', label: 'Update CRM', icon: Cloud, color: 'from-cyan-500 to-blue-500' },
  { type: 'output', label: 'Send Notification', icon: CheckCircle2, color: 'from-green-500 to-emerald-600' },
];

const sampleData = {
  email: {
    subject: "New Lead: John Smith - Software Development",
    from: "john.smith@techcorp.com",
    body: "Hi, I'm interested in your automation services for our development team. We have 50 developers and need help with CI/CD pipeline automation.",
    priority: "high",
    timestamp: "2024-01-15 10:30:00"
  },
  extracted: {
    name: "John Smith",
    company: "TechCorp",
    email: "john.smith@techcorp.com",
    teamSize: "50",
    interest: "CI/CD pipeline automation",
    priority: "high"
  },
  crmUpdate: {
    leadId: "LEAD-2024-001",
    status: "Qualified",
    assignedTo: "Sales Team",
    nextAction: "Schedule Demo Call"
  }
};

const LiveDemoSimulator = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'trigger',
      label: 'Email Received',
      icon: Database,
      position: { x: 50, y: 100 },
      color: 'from-blue-500 to-blue-600',
      status: 'idle'
    },
    {
      id: '2',
      type: 'action',
      label: 'Extract Data',
      icon: Bot,
      position: { x: 200, y: 100 },
      color: 'from-purple-500 to-pink-500',
      status: 'idle'
    },
    {
      id: '3',
      type: 'condition',
      label: 'Check Priority',
      icon: Settings,
      position: { x: 350, y: 100 },
      color: 'from-yellow-500 to-orange-500',
      status: 'idle'
    },
    {
      id: '4',
      type: 'integration',
      label: 'Update CRM',
      icon: Cloud,
      position: { x: 500, y: 100 },
      color: 'from-cyan-500 to-blue-500',
      status: 'idle'
    },
    {
      id: '5',
      type: 'output',
      label: 'Send Notification',
      icon: CheckCircle2,
      position: { x: 650, y: 100 },
      color: 'from-green-500 to-emerald-600',
      status: 'idle'
    }
  ]);

  const [connections] = useState<WorkflowConnection[]>([
    { id: 'c1', from: '1', to: '2', status: 'idle' },
    { id: 'c2', from: '2', to: '3', status: 'idle' },
    { id: 'c3', from: '3', to: '4', status: 'idle' },
    { id: 'c4', from: '4', to: '5', status: 'idle' }
  ]);

  const [simulationSpeed, setSimulationSpeed] = useState([2]);
  const [showDataFlow, setShowDataFlow] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const workflowSteps = [
    { nodeId: '1', duration: 1000, data: sampleData.email },
    { nodeId: '2', duration: 2000, data: sampleData.extracted },
    { nodeId: '3', duration: 1500, data: { priority: 'high' } },
    { nodeId: '4', duration: 2500, data: sampleData.crmUpdate },
    { nodeId: '5', duration: 1000, data: { notification: 'Lead processed successfully' } }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < workflowSteps.length) {
      const step = workflowSteps[currentStep];
      const timeout = setTimeout(() => {
        // Update node status
        setWorkflowNodes(prev => prev.map(node => 
          node.id === step.nodeId 
            ? { ...node, status: 'processing', data: step.data }
            : node
        ));

        // Update connections
        const connection = connections.find(conn => conn.from === step.nodeId);
        if (connection) {
          // Update connection status logic here
        }

        // Move to next step
        setTimeout(() => {
          setWorkflowNodes(prev => prev.map(node => 
            node.id === step.nodeId 
              ? { ...node, status: 'completed' }
              : node
          ));
          setCurrentStep(prev => prev + 1);
        }, step.duration / simulationSpeed[0]);
      }, 500);

      return () => clearTimeout(timeout);
    } else if (currentStep >= workflowSteps.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, simulationSpeed]);

  const startSimulation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setWorkflowNodes(prev => prev.map(node => ({ ...node, status: 'idle' })));
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setWorkflowNodes(prev => prev.map(node => ({ ...node, status: 'idle', data: undefined })));
  };

  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'from-yellow-400 to-orange-500';
      case 'completed': return 'from-green-400 to-emerald-500';
      case 'error': return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getConnectionStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'stroke-accent';
      case 'completed': return 'stroke-green-500';
      default: return 'stroke-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <Play className="w-4 h-4" />
          <span className="text-sm font-medium">Live Demo Simulator</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Build & Test Your <span className="text-gradient-flow">Automation Workflow</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Drag, drop, and simulate your automation workflow in real-time. See exactly how your processes will work.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Workflow Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Workflow Builder
                  </CardTitle>
                  <CardDescription>
                    Drag and drop nodes to build your automation workflow
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={isPlaying ? pauseSimulation : startSimulation}
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetSimulation}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Controls */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="speed">Speed</Label>
                      <Slider
                        id="speed"
                        value={simulationSpeed}
                        onValueChange={setSimulationSpeed}
                        max={5}
                        min={1}
                        step={1}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">{simulationSpeed[0]}x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="data-flow"
                        checked={showDataFlow}
                        onCheckedChange={setShowDataFlow}
                      />
                      <Label htmlFor="data-flow">Show Data Flow</Label>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Workflow Canvas */}
                <div 
                  ref={canvasRef}
                  className="relative h-96 bg-muted/20 rounded-lg border-2 border-dashed border-border overflow-hidden"
                >
                  {/* SVG for connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {connections.map((conn) => {
                      const fromNode = workflowNodes.find(n => n.id === conn.from);
                      const toNode = workflowNodes.find(n => n.id === conn.to);
                      if (!fromNode || !toNode) return null;

                      return (
                        <line
                          key={conn.id}
                          x1={fromNode.position.x}
                          y1={fromNode.position.y + 30}
                          x2={toNode.position.x}
                          y2={toNode.position.y + 30}
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition-colors duration-300 ${getConnectionStatusColor(conn.status)}`}
                        />
                      );
                    })}
                  </svg>

                  {/* Workflow Nodes */}
                  {workflowNodes.map((node) => {
                    const Icon = node.icon;
                    const isSelected = selectedNode === node.id;
                    const statusColor = node.status === 'idle' ? node.color : getNodeStatusColor(node.status);

                    return (
                      <div
                        key={node.id}
                        className={`absolute w-24 h-24 rounded-xl bg-gradient-to-br ${statusColor} flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                          isSelected ? 'ring-2 ring-accent ring-offset-2' : ''
                        }`}
                        style={{
                          left: node.position.x - 48,
                          top: node.position.y - 48,
                        }}
                        onClick={() => setSelectedNode(isSelected ? null : node.id)}
                      >
                        <Icon className="w-8 h-8 text-white mb-1" />
                        <span className="text-xs text-white text-center font-medium px-1">
                          {node.label}
                        </span>
                        {node.status === 'processing' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        {node.status === 'completed' && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Data Flow Animation */}
                  {showDataFlow && isPlaying && currentStep > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {connections.map((conn, index) => {
                        const fromNode = workflowNodes.find(n => n.id === conn.from);
                        const toNode = workflowNodes.find(n => n.id === conn.to);
                        if (!fromNode || !toNode) return null;

                        return (
                          <div
                            key={`flow-${conn.id}`}
                            className="absolute w-3 h-3 bg-accent rounded-full animate-pulse"
                            style={{
                              left: fromNode.position.x + (index * 50),
                              top: fromNode.position.y + 30,
                              animationDelay: `${index * 0.5}s`,
                              animation: 'flowParticle 2s ease-in-out infinite'
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Node Library */}
                <div className="space-y-2">
                  <h4 className="font-medium">Drag & Drop Nodes</h4>
                  <div className="flex gap-2 flex-wrap">
                    {nodeTypes.map((nodeType, index) => {
                      const Icon = nodeType.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg cursor-grab hover:bg-muted/50 transition-colors"
                          draggable
                        >
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${nodeType.color} flex items-center justify-center`}>
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium">{nodeType.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Preview & Results */}
        <div className="space-y-6">
          <Tabs defaultValue="data" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="data">Data Flow</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Data Processing</CardTitle>
                  <CardDescription>
                    See how data flows through your workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedNode && workflowNodes.find(n => n.id === selectedNode)?.data && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">Current Node Data:</h4>
                        <pre className="text-xs text-muted-foreground overflow-auto max-h-40">
                          {JSON.stringify(workflowNodes.find(n => n.id === selectedNode)?.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {!selectedNode && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click on a node to see its data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation Results</CardTitle>
                  <CardDescription>
                    Performance metrics and execution summary
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-gradient-flow">
                        {workflowNodes.filter(n => n.status === 'completed').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Steps Completed</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-gradient-flow">
                        {workflowSteps.reduce((acc, step) => acc + step.duration, 0) / 1000}s
                      </div>
                      <div className="text-sm text-muted-foreground">Total Duration</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Error Rate</span>
                      <span className="font-medium text-green-600">0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Efficiency</span>
                      <span className="font-medium text-gradient-flow">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Try It Yourself CTA */}
          <Card className="bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-lg font-bold">Ready to Build Your Own?</h3>
              <p className="text-sm text-muted-foreground">
                Start creating your automation workflow today
              </p>
              <Button className="w-full">
                Start Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes flowParticle {
          0%, 100% {
            opacity: 0;
            transform: translateX(0);
          }
          50% {
            opacity: 1;
            transform: translateX(50px);
          }
        }
      `}</style>
    </div>
  );
};

export default LiveDemoSimulator;
