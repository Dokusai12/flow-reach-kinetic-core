import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/flowreach-logo.png";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import ROICalculator from "./sections/ROICalculator";
import Pricing from "./sections/Pricing";
import CaseStudies from "./sections/CaseStudies";
import Process from "./sections/Process";
import About from "./sections/About";
import Team from "./sections/Team";
import FAQ from "./sections/FAQ";
import Resources from "./sections/Resources";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import BookCallModal from "./BookCallModal";

const MainSite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll-to functionality from other pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  const navLinks = [
    { label: "Services", href: "services" },
    { label: "Pricing", href: "pricing" },
    { label: "Case Studies", href: "cases" },
    { label: "Process", href: "process" },
    { label: "About", href: "about" },
    { label: "Team", href: "team" },
    { label: "Resources", href: "resources" },
    { label: "FAQ", href: "faq" },
    { label: "Contact", href: "contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const element = document.getElementById(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "w-[95%] max-w-6xl bg-card/80 backdrop-blur-xl shadow-elevated border border-border"
            : "w-auto bg-transparent"
        }`}
        style={{ borderRadius: scrolled ? "1rem" : "0" }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <img 
            src={logo} 
            alt="Flow Reach" 
            className="h-14 w-auto cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium hover:text-accent transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button size="sm" className="ml-4" onClick={() => handleNavClick("contact")}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden border-t border-border px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => {
                        handleNavClick(link.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block text-sm font-medium hover:text-accent transition-colors w-full text-left py-2 px-3 rounded-md hover:bg-muted/50"
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Button size="sm" className="w-full" onClick={() => {
                      handleNavClick("contact");
                      setMobileMenuOpen(false);
                    }}>
                      Get Started
                    </Button>
                  </div>
                </div>
              )}
      </nav>

      {/* Sections */}
      <Hero />
      <Services />
      <ROICalculator />
      <Pricing />
      <CaseStudies />
      <Process />
            <About />
            <Team />
            <Resources />
            <FAQ />
            <Testimonials />
            <Contact />
            <Footer />

      <BookCallModal open={bookCallOpen} onOpenChange={setBookCallOpen} />
    </div>
  );
};

export default MainSite;
