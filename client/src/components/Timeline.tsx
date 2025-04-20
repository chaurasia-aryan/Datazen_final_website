import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Clock, Code, Fingerprint, Beaker, Lightbulb, Network, Rocket } from "lucide-react";

export default function Timeline() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  
  // Parallax scrolling effect for background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Get appropriate icon for each timeline item
  const getTimelineIcon = (index: number) => {
    switch (index) {
      case 0: return <Fingerprint className="w-5 h-5" />; // Foundation
      case 1: return <Lightbulb className="w-5 h-5" />; // Workshop
      case 2: return <Network className="w-5 h-5" />; // Virtual
      case 3: return <Code className="w-5 h-5" />; // Partnerships
      case 4: return <Rocket className="w-5 h-5" />; // Hackathon
      case 5: return <Beaker className="w-5 h-5" />; // Research
      case 6: return <Clock className="w-5 h-5" />; // Present
      default: return <Fingerprint className="w-5 h-5" />;
    }
  };
  
  const timelineItems = [
    {
      year: "2018",
      title: "Foundation",
      description: "DataZen was established as a student initiative with the vision to create a platform for data science enthusiasts at Somaiya Vidyavihar University."
    },
    {
      year: "2019",
      title: "First Data Science Workshop Series",
      description: "Launched our inaugural workshop series covering fundamentals of data analysis, visualization techniques, and basic machine learning algorithms."
    },
    {
      year: "2020",
      title: "Virtual Transformation",
      description: "Successfully pivoted to virtual events during the pandemic, expanding our reach and community through online workshops, webinars, and virtual hackathons."
    },
    {
      year: "2021",
      title: "Industry Partnerships",
      description: "Established key partnerships with leading technology companies, creating internship opportunities and collaborative projects for our members."
    },
    {
      year: "2022",
      title: "First National Hackathon",
      description: "Organized #HackMasterz, our first national-level data science hackathon, attracting participants from universities across India."
    },
    {
      year: "2023",
      title: "Research Initiative Launch",
      description: "Initiated collaborative research programs with faculty members, focusing on applying data science to solve real-world challenges in healthcare, environment, and education."
    },
    {
      year: "Present",
      title: "Expanding Horizons",
      description: "Today, DataZen continues to grow, focusing on innovation, inclusivity, and creating impactful learning experiences in the rapidly evolving field of data science."
    }
  ];
  
  // Binary code background decorator component
  const BinaryBackground = () => (
    <motion.div 
      className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none"
      style={{ y: bgY }}
    >
      <div className="absolute inset-0 font-mono text-sm text-[var(--power-red)] leading-none flex flex-wrap">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="p-2">
            {Array.from({ length: 8 }).map((_, j) => (
              <span key={j}>{Math.round(Math.random())}</span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section 
      id="timeline" 
      className="py-20 md:py-32 bg-white relative" 
      ref={containerRef}
    >
      {/* Decorative elements */}
      <BinaryBackground />
      
      <motion.div 
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{ 
          backgroundImage: "radial-gradient(circle at center, var(--power-red) 0%, transparent 70%)" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-gradient-red opacity-10"
        style={{ 
          backgroundImage: "radial-gradient(circle at center, var(--vitality-red) 0%, transparent 70%)" 
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block mb-4 px-4 py-1 rounded-full bg-red-50 text-[var(--power-red)] text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            Our Timeline
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[var(--somaiya-black)]">The </span>
            <span className="text-gradient">DataZen</span>
            <span className="text-[var(--somaiya-black)]"> Journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From our founding to the present day — follow our evolution as we've grown into Somaiya's premier data science community.
          </motion.p>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-red mx-auto mt-8"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Main timeline component */}
        <VerticalTimeline lineColor="var(--power-red)" className="custom-timeline">
          {timelineItems.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ 
                background: 'white', 
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)', 
                borderRadius: '12px',
                border: index % 3 === 0 ? '1px solid var(--power-red)10' :
                       index % 3 === 1 ? '1px solid var(--vitality-red)10' :
                       '1px solid var(--somaiya-black)10'
              }}
              contentArrowStyle={{ 
                borderRight: '10px solid white' 
              }}
              date={
                <span className="text-gradient font-semibold text-lg md:text-xl">
                  {item.year}
                </span>
              }
              iconStyle={{ 
                background: index % 3 === 0 ? 'var(--power-red)' :
                           index % 3 === 1 ? 'var(--vitality-red)' :
                           'var(--somaiya-black)', 
                color: '#fff',
                boxShadow: '0 0 0 4px white, 0 0 0 5px rgba(0,0,0,0.05)'
              }}
              icon={getTimelineIcon(index)}
              visible={true}
            >
              <div className="p-2">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--somaiya-black)]">
                  {item.title}
                </h3>
                
                <div 
                  className="h-1 w-12 mt-2 mb-4"
                  style={{ 
                    background: index % 3 === 0 ? 'var(--power-red)' :
                              index % 3 === 1 ? 'var(--vitality-red)' :
                              'var(--somaiya-black)'
                  }}
                />
                
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        
        {/* Add custom CSS to improve the vertical timeline appearance */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Override react-vertical-timeline-component styles */
          .vertical-timeline-element-content {
            padding: 1.5rem !important;
            transition: all 0.4s ease !important;
          }
          
          .vertical-timeline-element-content:hover {
            transform: translateY(-5px) !important;
          }
          
          .vertical-timeline-element-content-arrow {
            top: 22px !important;
          }
          
          .vertical-timeline-element-date {
            margin: 0 1.5rem !important;
            padding: 0.5rem 0 !important;
          }
          
          .vertical-timeline::before {
            width: 3px !important;
            background: linear-gradient(to bottom, var(--power-red), var(--vitality-red)) !important;
          }
          
          .vertical-timeline-element-icon {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 0 0 4px white, 0 2px 10px rgba(0,0,0,0.2) !important;
          }
        `}} />
      </div>
    </section>
  );
}
