import { Mail, Github, Twitter, Linkedin, ArrowUp, Database, BarChart, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const containerRef = useRef(null);
  
  // Parallax effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Activities", href: "#activities" },
    { name: "Timeline", href: "#timeline" },
  ];
  
  const resourceLinks = [
    { name: "Events", href: "#" },
    { name: "Workshops", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Research", href: "#" },
    { name: "Blog", href: "#" }
  ];
  
  const socialLinks = [
    { 
      icon: <Github className="h-5 w-5" />, 
      href: "#", 
      label: "GitHub",
      color: "hover:text-white"
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: "#", 
      label: "Twitter",
      color: "hover:text-blue-400"
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "#", 
      label: "LinkedIn",
      color: "hover:text-blue-500"
    }
  ];
  
  // Data pattern for footer background
  const DataPattern = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Binary dots */}
      <div className="absolute top-0 left-0 right-0 h-10 w-full overflow-hidden opacity-5">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Data flow lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-5" 
        viewBox="0 0 1000 500" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <path
            key={i}
            d={`M${Math.random() * 500},0 
                C${Math.random() * 500 + 200},${Math.random() * 150 + 50} 
                 ${Math.random() * 500 + 400},${Math.random() * 150 + 150} 
                 ${Math.random() * 500 + 500},${Math.random() * 200 + 200}`}
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity="0.2"
          />
        ))}
      </svg>
    </div>
  );
  
  // Logo component with animated elements
  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="relative w-10 h-10 bg-gradient-red rounded-lg overflow-hidden flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.5) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <span className="text-white text-xl font-bold">DZ</span>
      </div>
      <div className="text-white font-bold text-2xl tracking-tight">
        Data<span className="text-[var(--vitality-red)]">Zen</span>
      </div>
    </div>
  );
  
  // Features list with icons
  const features = [
    { icon: <Database size={16} />, text: "Data Science" },
    { icon: <BarChart size={16} />, text: "Analytics" },
    { icon: <Code size={16} />, text: "Machine Learning" }
  ];
  
  return (
    <footer 
      className="bg-[var(--somaiya-black)] text-white pt-16 pb-8 relative"
      ref={containerRef}
    >
      {/* Background pattern */}
      <DataPattern />
      
      {/* Back to top button */}
      <motion.a 
        href="#home"
        className="absolute -top-6 right-6 md:right-12 w-12 h-12 bg-gradient-red rounded-full flex items-center justify-center shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
        style={{ y: y1 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowUp className="text-white" size={20} />
      </motion.a>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Logo and About column */}
          <div className="md:col-span-4 space-y-6">
            <Logo />
            
            <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
              The official Data Science council of Somaiya Vidyavihar University, dedicated to fostering innovation and excellence in data science education and research.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-1">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-gray-400"
                >
                  <div className="text-[var(--vitality-red)]">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links column */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-red"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--vitality-red)] mr-2 opacity-75"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources column */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Resources
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-red"></div>
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--vitality-red)] mr-2 opacity-75"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Stay Updated
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-red"></div>
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates on events, 
              workshops, and data science opportunities.
            </p>
            <form className="flex max-w-md">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="rounded-r-none bg-gray-800/50 border-gray-700 focus:border-[var(--vitality-red)] focus:ring-[var(--vitality-red)] text-white"
              />
              <Button type="submit" className="rounded-l-none bg-gradient-red hover:opacity-90">
                <Mail className="h-4 w-4 mr-2" />
                <span>Subscribe</span>
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} DataZen - Somaiya Vidyavihar University. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
