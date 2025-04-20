import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Home() {
  // State to control back-to-top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Create smooth scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Update document title
    document.title = "DataZen - Data Science Council of Somaiya Vidyavihar University";
    
    // Handle scroll event for back-to-top button
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Decorative elements for transition visuals
  const RedBlob = ({ className = "", size = 300, opacity = 0.15 }) => (
    <div 
      className={`red-blob ${className}`}
      style={{ 
        width: size, 
        height: size, 
        opacity,
      }}
    />
  );

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden" style={{ position: 'relative' }}>
      {/* Scroll progress indicator at top of page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-red z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Back to top button - Fixed position to avoid getting hidden */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--power-red)] text-white flex items-center justify-center shadow-lg z-50"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
      
      {/* Decorative blobs positioned throughout the page */}
      <RedBlob className="top-[15%] left-[10%]" size={400} opacity={0.08} />
      <RedBlob className="top-[45%] right-[5%]" size={300} opacity={0.06} />
      <RedBlob className="top-[75%] left-[20%]" size={250} opacity={0.04} />
      
      {/* Decorative data grid pattern */}
      <div className="fixed inset-0 data-grid pointer-events-none z-0 opacity-30" />
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Hero />
        <About />
        <Activities />
        <Timeline />
        <Stats />
        <Team />
      </main>
      
      <Footer />
    </div>
  );
}
