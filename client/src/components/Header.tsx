import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type Section = {
  name: string;
  ref: React.RefObject<HTMLDivElement>;
};

type HeaderProps = {
  sections: Section[];
  onNavigate: (ref: React.RefObject<HTMLDivElement>) => void;
};

export default function Header({ sections, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => {
    onNavigate(ref);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white shadow-md"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(sections[0].ref);
              }}
              className="flex items-center space-x-2"
            >
              <img 
                src="/images/generational-nutrition-logo.png" 
                alt="Generational Nutrition LLC Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-primary font-heading font-bold text-xl md:text-2xl">
                Generational Nutrition LLC
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.name}
                onClick={() => handleNavClick(section.ref)}
                className="text-neutral-800 hover:text-primary font-medium transition-colors"
              >
                {section.name}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 p-4 shadow-md">
            <div className="flex flex-col space-y-3">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => handleNavClick(section.ref)}
                  className="text-neutral-800 hover:text-primary py-2 font-medium text-left"
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
