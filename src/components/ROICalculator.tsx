import { useState, useEffect } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface IndustryBenchmark {
  industry: string;
  avgTimeSaved: number;
  avgCostReduction: number;
  avgROI: number;
  avgImplementationTime: number;
}

const industryBenchmarks: IndustryBenchmark[] = [
  { industry: "SaaS", avgTimeSaved: 45, avgCostReduction: 35, avgROI: 850, avgImplementationTime: 8 },
  { industry: "E-commerce", avgTimeSaved: 55, avgCostReduction: 40, avgROI: 1200, avgImplementationTime: 12 },
  { industry: "Healthcare", avgTimeSaved: 60, avgCostReduction: 50, avgROI: 1500, avgImplementationTime: 16 },
  { industry: "Legal", avgTimeSaved: 70, avgCostReduction: 45, avgROI: 2000, avgImplementationTime: 20 },
  { industry: "Finance", avgTimeSaved: 50, avgCostReduction: 55, avgROI: 1800, avgImplementationTime: 14 },
  { industry: "Manufacturing", avgTimeSaved: 40, avgCostReduction: 30, avgROI: 600, avgImplementationTime: 10 },
  { industry: "Real Estate", avgTimeSaved: 35, avgCostReduction: 25, avgROI: 400, avgImplementationTime: 6 },
  { industry: "Education", avgTimeSaved: 30, avgCostReduction: 20, avgROI: 300, avgImplementationTime: 8 },
];

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    industry: "",
    monthlyRevenue: 0,
    teamSize: 0,
    currentAutomationLevel: 0,
    processesToAutomate: 0,
    avgProcessTime: 0,
    avgHourlyCost: 0,
  });

  const [results, setResults] = useState({
    timeSaved: 0,
    costSavings: 0,
    monthlyROI: 0,
    annualROI: 0,
    paybackPeriod: 0,
    efficiencyGain: 0,
  });

  const [selectedBenchmark, setSelectedBenchmark] = useState<IndustryBenchmark | null>(null);

  useEffect(() => {
    if (formData.industry) {
      const benchmark = industryBenchmarks.find(b => b.industry === formData.industry);
      setSelectedBenchmark(benchmark || null);
    }
  }, [formData.industry]);

  useEffect(() => {
    calculateROI();
  }, [formData, selectedBenchmark]);

  const calculateROI = () => {
    if (!selectedBenchmark || formData.monthlyRevenue === 0) return;

    const {
      monthlyRevenue,
      teamSize,
      currentAutomationLevel,
      processesToAutomate,
      avgProcessTime,
      avgHourlyCost,
    } = formData;

    // Calculate time saved based on industry benchmark and current automation level
    const timeSavedPercentage = selectedBenchmark.avgTimeSaved * (1 - currentAutomationLevel / 100);
    const timeSavedHours = (processesToAutomate * avgProcessTime * timeSavedPercentage) / 100;
    
    // Calculate cost savings
    const monthlyCostSavings = timeSavedHours * avgHourlyCost * teamSize;
    const annualCostSavings = monthlyCostSavings * 12;
    
    // Calculate implementation cost (estimated as 2-3 months of savings)
    const implementationCost = monthlyCostSavings * 2.5;
    
    // Calculate ROI
    const monthlyROI = ((monthlyCostSavings - implementationCost / 12) / monthlyRevenue) * 100;
    const annualROI = ((annualCostSavings - implementationCost) / (monthlyRevenue * 12)) * 100;
    
    // Calculate payback period
    const paybackPeriod = implementationCost / monthlyCostSavings;
    
    // Calculate efficiency gain
    const efficiencyGain = (timeSavedHours / (processesToAutomate * avgProcessTime)) * 100;

    setResults({
      timeSaved: timeSavedHours,
      costSavings: monthlyCostSavings,
      monthlyROI: monthlyROI,
      annualROI: annualROI,
      paybackPeriod: paybackPeriod,
      efficiencyGain: efficiencyGain,
    });
  };

  const handleInputChange = (field: string, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      industry: "",
      monthlyRevenue: 0,
      teamSize: 0,
      currentAutomationLevel: 0,
      processesToAutomate: 0,
      avgProcessTime: 0,
      avgHourlyCost: 0,
    });
    setResults({
      timeSaved: 0,
      costSavings: 0,
      monthlyROI: 0,
      annualROI: 0,
      paybackPeriod: 0,
      efficiencyGain: 0,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/20">
          <Calculator className="w-4 h-4" />
          <span className="text-sm font-medium">ROI Calculator</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          Calculate Your <span className="text-gradient-flow">Automation ROI</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how much time and money you could save with intelligent automation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Your Business Details
            </CardTitle>
            <CardDescription>
              Fill in your business information to get personalized ROI calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Industry Selection */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryBenchmarks.map((benchmark) => (
                    <SelectItem key={benchmark.industry} value={benchmark.industry}>
                      {benchmark.industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Revenue */}
            <div className="space-y-2">
              <Label htmlFor="revenue">Monthly Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="100000"
                value={formData.monthlyRevenue || ""}
                onChange={(e) => handleInputChange("monthlyRevenue", parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                placeholder="10"
                value={formData.teamSize || ""}
                onChange={(e) => handleInputChange("teamSize", parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Current Automation Level */}
            <div className="space-y-2">
              <Label>Current Automation Level: {formData.currentAutomationLevel}%</Label>
              <Slider
                value={[formData.currentAutomationLevel]}
                onValueChange={([value]) => handleInputChange("currentAutomationLevel", value)}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Manual</span>
                <span>Fully Automated</span>
              </div>
            </div>

            {/* Processes to Automate */}
            <div className="space-y-2">
              <Label htmlFor="processes">Processes to Automate (per month)</Label>
              <Input
                id="processes"
                type="number"
                placeholder="100"
                value={formData.processesToAutomate || ""}
                onChange={(e) => handleInputChange("processesToAutomate", parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Average Process Time */}
            <div className="space-y-2">
              <Label htmlFor="processTime">Average Process Time (hours)</Label>
              <Input
                id="processTime"
                type="number"
                placeholder="2"
                value={formData.avgProcessTime || ""}
                onChange={(e) => handleInputChange("avgProcessTime", parseInt(e.target.value) || 0)}
              />
            </div>

            {/* Average Hourly Cost */}
            <div className="space-y-2">
              <Label htmlFor="hourlyCost">Average Hourly Cost ($)</Label>
              <Input
                id="hourlyCost"
                type="number"
                placeholder="50"
                value={formData.avgHourlyCost || ""}
                onChange={(e) => handleInputChange("avgHourlyCost", parseInt(e.target.value) || 0)}
              />
            </div>

            <Button onClick={resetCalculator} variant="outline" className="w-full">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {/* Industry Benchmark */}
          {selectedBenchmark && (
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Industry Benchmark</CardTitle>
                <CardDescription>
                  Average results for {selectedBenchmark.industry} companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-flow">{selectedBenchmark.avgTimeSaved}%</div>
                    <div className="text-sm text-muted-foreground">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-flow">{selectedBenchmark.avgROI}%</div>
                    <div className="text-sm text-muted-foreground">Average ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ROI Results */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Projected Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-gradient-flow">{results.timeSaved.toFixed(1)}h</div>
                  <div className="text-sm text-muted-foreground">Time Saved/Month</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-gradient-flow">${results.costSavings.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly ROI</span>
                  <Badge variant={results.monthlyROI > 0 ? "default" : "destructive"} className="text-lg px-3 py-1">
                    {results.monthlyROI > 0 ? "+" : ""}{results.monthlyROI.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Annual ROI</span>
                  <Badge variant={results.annualROI > 0 ? "default" : "destructive"} className="text-lg px-3 py-1">
                    {results.annualROI > 0 ? "+" : ""}{results.annualROI.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Payback Period</span>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {results.paybackPeriod.toFixed(1)} months
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Efficiency Gain</span>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    +{results.efficiencyGain.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              {results.annualROI > 0 && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Excellent Investment Opportunity!</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Your projected ROI of {results.annualROI.toFixed(1)}% exceeds industry standards.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="p-6 bg-gradient-to-r from-accent/10 to-flow-blue-start/10 border-accent/20">
            <CardContent className="text-center space-y-4">
              <h3 className="text-xl font-bold">Ready to Start Your Automation Journey?</h3>
              <p className="text-muted-foreground">
                Let's discuss how we can help you achieve these results
              </p>
              <Button size="lg" className="w-full">
                Schedule Free Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
