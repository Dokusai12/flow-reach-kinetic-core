import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechCorp Inc.",
    image: "👩‍💼",
    quote: "Flow Reach didn't just automate our processes - they transformed how we think about efficiency. The ROI was visible within the first month.",
    rating: 5,
    metric: "2 hours → 15 minutes per client",
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    company: "RetailMax",
    image: "👨‍💻",
    quote: "The AI integration was seamless. Our inventory sync issues disappeared overnight, and our revenue jumped 29% in quarter one.",
    rating: 5,
    metric: "$1.5M increased revenue",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "CTO",
    company: "MediCare Solutions",
    image: "👩‍⚕️",
    quote: "We were skeptical about AI in healthcare, but the accuracy and compliance Flow Reach delivered exceeded all expectations. 90% time saved on data entry.",
    rating: 5,
    metric: "20 hrs → 2 hrs daily",
  },
  {
    name: "David Park",
    role: "Managing Partner",
    company: "LegalTech Pro",
    image: "👨‍⚖️",
    quote: "Contract review used to be our bottleneck. Now we handle 6x the volume with better accuracy. Game-changing.",
    rating: 5,
    metric: "6x throughput increase",
  },
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold animate-glitch-in">
            Client <span className="text-gradient-hazard">Love</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from those we've transformed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover-tilt animate-slide-diagonal relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon Background */}
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-muted/5 group-hover:text-accent/10 transition-colors duration-500" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg leading-relaxed mb-6 relative z-10">{testimonial.quote}</p>

              {/* Metric Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
                <span className="text-sm font-bold text-accent">{testimonial.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-flow flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
