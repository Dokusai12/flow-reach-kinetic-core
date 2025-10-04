import { Linkedin, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/flowreach-logo.png";

type LinkItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
};

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const links: {
    services: LinkItem[];
    company: LinkItem[];
    resources: LinkItem[];
    legal: LinkItem[];
  } = {
    services: [
      { label: "AI Agents", onClick: () => scrollToSection("services") },
      { label: "Workflow Automation", onClick: () => scrollToSection("services") },
      { label: "CRM Integration", onClick: () => scrollToSection("services") },
      { label: "Data Processing", onClick: () => scrollToSection("services") },
    ],
    company: [
      { label: "About Us", onClick: () => navigate("/about") },
      { label: "Case Studies", onClick: () => navigate("/case-studies") },
      { label: "Blog", href: "#", external: true },
      { label: "Careers", href: "#", external: true },
    ],
    resources: [
      { label: "Documentation", href: "#", external: true },
      { label: "API Reference", href: "#", external: true },
      { label: "Support", href: "#", external: true },
      { label: "Contact", onClick: () => scrollToSection("contact") },
    ],
    legal: [
      { label: "Privacy Policy", href: "#", external: true },
      { label: "Terms of Service", href: "#", external: true },
      { label: "Cookie Policy", href: "#", external: true },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <img src={logo} alt="Flow Reach" className="h-16 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/70 leading-relaxed max-w-md">
              Transforming businesses through intelligent automation. We build AI agents and workflows that save time, reduce errors, and scale operations exponentially.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Services</h4>
            <ul className="space-y-2">
              {links.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </button>
                  ) : link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Resources</h4>
            <ul className="space-y-2 mb-6">
              {links.resources.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </button>
                  ) : link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
            <h4 className="font-bold mb-4 text-accent">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Flow Reach. All rights reserved.</p>
          <p>Built with precision. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
