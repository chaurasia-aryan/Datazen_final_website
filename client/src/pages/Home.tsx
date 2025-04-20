import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import Timeline from "@/components/Timeline";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Update document title
    document.title = "DataZen - Data Science Council of Somaiya Vidyavihar University";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Activities />
        <Timeline />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
