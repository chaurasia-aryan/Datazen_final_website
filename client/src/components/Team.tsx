import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Users, Sparkles, Award, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Team() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Team data with realistic roles
  const teamMembers = [
    // Core Team
    { name: "Rahul Mehta", role: "President", category: "Core" },
    { name: "Priya Sharma", role: "Vice President", category: "Core" },
    { name: "Vivek Joshi", role: "Secretary", category: "Core" },
    { name: "Anjali Desai", role: "Treasurer", category: "Core" },
    { name: "Karan Patel", role: "Technical Lead", category: "Core" },
    
    // Technical Team
    { name: "Aditya Kumar", role: "ML Engineer", category: "Technical" },
    { name: "Neha Singh", role: "Data Scientist", category: "Technical" },
    { name: "Rohan Gupta", role: "AI Researcher", category: "Technical" },
    { name: "Tanvi Shah", role: "Backend Developer", category: "Technical" },
    { name: "Arjun Nair", role: "Frontend Developer", category: "Technical" },
    { name: "Meera Iyer", role: "Data Analyst", category: "Technical" },
    { name: "Raj Malhotra", role: "DevOps Engineer", category: "Technical" },
    { name: "Pooja Verma", role: "UI/UX Designer", category: "Technical" },
    
    // Events Team
    { name: "Siddharth Reddy", role: "Events Head", category: "Events" },
    { name: "Nisha Patel", role: "Workshop Coordinator", category: "Events" },
    { name: "Varun Kapoor", role: "Hackathon Lead", category: "Events" },
    { name: "Shreya Deshmukh", role: "Events Coordinator", category: "Events" },
    { name: "Rohit Verma", role: "Logistics Manager", category: "Events" },
    
    // Content Team
    { name: "Ananya Mehta", role: "Content Head", category: "Content" },
    { name: "Vikram Singhania", role: "Social Media Manager", category: "Content" },
    { name: "Ritu Sharma", role: "Content Writer", category: "Content" },
    { name: "Aryan Kapoor", role: "Graphic Designer", category: "Content" },
    
    // PR & Outreach Team
    { name: "Divya Khanna", role: "PR Head", category: "Outreach" },
    { name: "Manish Tiwari", role: "Industry Relations", category: "Outreach" },
    { name: "Aishwarya Iyer", role: "Outreach Coordinator", category: "Outreach" },
    { name: "Sameer Patel", role: "Sponsorship Lead", category: "Outreach" },
    { name: "Kavita Nair", role: "Community Manager", category: "Outreach" },
    
    // Research Team
    { name: "Dr. Amit Joshi", role: "Research Advisor", category: "Research" },
    { name: "Prateek Sinha", role: "Research Lead", category: "Research" },
    { name: "Deepa Menon", role: "Research Associate", category: "Research" }
  ];
  
  // Group members by category
  const teamCategories = [
    { name: "Core Team", members: teamMembers.filter(m => m.category === "Core") },
    { name: "Technical Team", members: teamMembers.filter(m => m.category === "Technical") },
    { name: "Events Team", members: teamMembers.filter(m => m.category === "Events") },
    { name: "Content Team", members: teamMembers.filter(m => m.category === "Content") },
    { name: "PR & Outreach", members: teamMembers.filter(m => m.category === "Outreach") },
    { name: "Research Team", members: teamMembers.filter(m => m.category === "Research") }
  ];
  
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Handle horizontal scrolling of member cards
  const handleScroll = (direction: "left" | "right", categoryId: string) => {
    const container = document.getElementById(categoryId);
    if (container) {
      const scrollAmount = 300;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Generate random avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-100 text-red-800",
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-yellow-100 text-yellow-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-teal-100 text-teal-800"
    ];
    
    const hash = name.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hash % colors.length];
  };
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("");
  };
  
  // Team Mosaic Background Pattern
  const TeamMosaicPattern = () => (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mosaic" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="var(--power-red)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mosaic)" />
      </svg>
    </div>
  );
  
  return (
    <section 
      id="team" 
      className="py-20 md:py-28 bg-white relative overflow-hidden" 
      ref={containerRef}
    >
      {/* Background pattern */}
      <TeamMosaicPattern />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-[5%] left-[10%] w-32 h-32 rounded-full bg-[var(--power-red)] opacity-5"
        style={{ y: y1 }}
      />
      
      <motion.div 
        className="absolute top-[30%] right-[5%] w-48 h-48 rounded-full bg-[var(--vitality-red)] opacity-5"
        style={{ y: y2 }}
      />
      
      <motion.div 
        className="absolute bottom-[10%] left-[20%] w-40 h-40 rounded-full bg-[var(--somaiya-black)] opacity-5"
        style={{ y: y3 }}
      />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
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
            Our People
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[var(--somaiya-black)]">The Team </span>
            <span className="text-gradient">Behind </span>
            <span className="text-[var(--somaiya-black)]">DataZen</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet our passionate team of data enthusiasts driving innovation and excellence in data science.
          </motion.p>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-red mx-auto mt-8"
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Highlighted leadership tiles */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.slice(0, 3).map((member, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold ${getAvatarColor(member.name)}`}>
                {getInitials(member.name)}
              </div>
              
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-[var(--power-red)] font-medium mb-3">{member.role}</p>
              
              <div className="flex justify-center space-x-3 mt-4">
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Team Members by Category (horizontally scrollable) */}
        <div className="space-y-16">
          {teamCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative">
              <motion.h3 
                className="text-2xl font-bold mb-6 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              >
                {categoryIndex === 0 ? <Award className="text-[var(--power-red)]" size={20} /> : 
                 categoryIndex === 1 ? <Sparkles className="text-[var(--power-red)]" size={20} /> : 
                 <Users className="text-[var(--power-red)]" size={20} />} 
                {category.name}
                <span className="text-sm font-normal text-gray-500 ml-2">({category.members.length})</span>
              </motion.h3>
              
              <div className="relative">
                {/* Scroll buttons */}
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white opacity-90 hover:opacity-100 hidden md:flex" 
                  onClick={() => handleScroll("left", `team-category-${categoryIndex}`)}
                >
                  <ChevronLeft size={18} />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white opacity-90 hover:opacity-100 hidden md:flex" 
                  onClick={() => handleScroll("right", `team-category-${categoryIndex}`)}
                >
                  <ChevronRight size={18} />
                </Button>
                
                {/* Scrollable member cards */}
                <div 
                  id={`team-category-${categoryIndex}`} 
                  className="flex overflow-x-auto pb-4 space-x-4 no-scrollbar"
                >
                  {category.members.map((member, memberIndex) => (
                    <motion.div
                      key={memberIndex}
                      className="flex-shrink-0 w-48 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.05 * memberIndex + 0.2 * categoryIndex }}
                      whileHover={{ y: -4 }}
                    >
                      <div className={`h-12 ${memberIndex % 2 === 0 ? 'bg-gradient-red' : 'bg-[var(--somaiya-black)]'}`}>
                        <div className="w-16 h-16 rounded-full mx-auto mt-4 flex items-center justify-center text-xl font-bold border-4 border-white shadow-md bg-white">
                          <div className={`w-full h-full rounded-full flex items-center justify-center ${getAvatarColor(member.name)}`}>
                            {getInitials(member.name)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 pb-4 px-3 text-center">
                        <h4 className="font-semibold truncate">{member.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats about the team */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-4xl font-bold text-[var(--power-red)]">30+</p>
            <p className="text-gray-600 mt-1">Team Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--power-red)]">6</p>
            <p className="text-gray-600 mt-1">Departments</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--power-red)]">15+</p>
            <p className="text-gray-600 mt-1">Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[var(--power-red)]">20+</p>
            <p className="text-gray-600 mt-1">Events Per Year</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}