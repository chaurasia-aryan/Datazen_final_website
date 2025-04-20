import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full bg-white z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-power-red font-poppins font-bold text-2xl">
              <span className="text-somaiya-black">Data</span>Zen
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="font-medium hover:text-power-red transition-colors">Home</a>
            <a href="#about" className="font-medium hover:text-power-red transition-colors">About Us</a>
            <a href="#activities" className="font-medium hover:text-power-red transition-colors">Activities</a>
            <a href="#timeline" className="font-medium hover:text-power-red transition-colors">Timeline</a>
            <a href="#contact" className="font-medium hover:text-power-red transition-colors">Contact</a>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu" className="p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <a 
                href="#home" 
                className="block py-2 px-4 text-sm hover:bg-gray-100 rounded"
                onClick={handleLinkClick}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="block py-2 px-4 text-sm hover:bg-gray-100 rounded"
                onClick={handleLinkClick}
              >
                About Us
              </a>
              <a 
                href="#activities" 
                className="block py-2 px-4 text-sm hover:bg-gray-100 rounded"
                onClick={handleLinkClick}
              >
                Activities
              </a>
              <a 
                href="#timeline" 
                className="block py-2 px-4 text-sm hover:bg-gray-100 rounded"
                onClick={handleLinkClick}
              >
                Timeline
              </a>
              <a 
                href="#contact" 
                className="block py-2 px-4 text-sm hover:bg-gray-100 rounded"
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
