import { useState, useEffect } from "react";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    industry: "",
    monthlyRevenue: 0,
    teamSize: 0,
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
  });

  const industryBenchmarks = {
    "SaaS": { timeSaved: 45, costReduction: 35 },
    "E-commerce": { timeSaved: 55, costReduction: 40 },
    "Healthcare": { timeSaved: 60, costReduction: 50 },
    "Legal": { timeSaved: 70, costReduction: 45 },
    "Finance": { timeSaved: 50, costReduction: 55 },
    "Manufacturing": { timeSaved: 40, costReduction: 30 },
  };

  const calculateROI = () => {
    if (!formData.industry || formData.monthlyRevenue === 0) return;

    const benchmark = industryBenchmarks[formData.industry as keyof typeof industryBenchmarks];
    if (!benchmark) return;

    const { monthlyRevenue, teamSize, processesToAutomate, avgProcessTime, avgHourlyCost } = formData;

    // Calculate time saved based on industry benchmark
    const timeSavedHours = (processesToAutomate * avgProcessTime * benchmark.timeSaved) / 100;
    
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

    setResults({
      timeSaved: timeSavedHours,
      costSavings: monthlyCostSavings,
      monthlyROI: monthlyROI,
      annualROI: annualROI,
      paybackPeriod: paybackPeriod,
    });
  };

  const handleInputChange = (field: string, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Recalculate when form data changes
  useEffect(() => {
    calculateROI();
  }, [formData]);

  return (
    <section id="roi-calculator" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
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
                    {Object.keys(industryBenchmarks).map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
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
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
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
                    <div className="text-2xl font-bold text-gradient-flow">{results.timeSaved.toFixed(1)}h</div>
                    <div className="text-sm text-muted-foreground">Time Saved/Month</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-gradient-flow">${results.costSavings.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly ROI</span>
                    <span className={`text-lg font-bold ${results.monthlyROI > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.monthlyROI > 0 ? '+' : ''}{results.monthlyROI.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Annual ROI</span>
                    <span className={`text-lg font-bold ${results.annualROI > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.annualROI > 0 ? '+' : ''}{results.annualROI.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Payback Period</span>
                    <span className="text-lg font-bold text-gradient-flow">
                      {results.paybackPeriod.toFixed(1)} months
                    </span>
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
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Schedule Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
