import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Scroll progress indicator at top of page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-red z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
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
      </main>
      
      <Footer />
    </div>
  );
}
