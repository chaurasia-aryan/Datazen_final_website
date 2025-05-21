import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Team.css';

// Define types for team member data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  photo?: string;
}

export default function Team() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  
  // State for selected category and pagination
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 4; // Number of team members to show at once
  
  // Team data with realistic roles
  const teamMembers: TeamMember[] = [
    // Core Team
    { id: 1, name: "Rahul Mehta", role: "President", category: "Core" },
    { id: 2, name: "Priya Sharma", role: "Vice President", category: "Core" },
    { id: 3, name: "Vivek Joshi", role: "Secretary", category: "Core" },
    { id: 4, name: "Anjali Desai", role: "Treasurer", category: "Core" },
    { id: 5, name: "Karan Patel", role: "Technical Lead", category: "Core" },
    
    // Technical Team
    { id: 6, name: "Aditya Kumar", role: "ML Engineer", category: "Technical" },
    { id: 7, name: "Neha Singh", role: "Data Scientist", category: "Technical" },
    { id: 8, name: "Rohan Gupta", role: "AI Researcher", category: "Technical" },
    { id: 9, name: "Tanvi Shah", role: "Backend Developer", category: "Technical" },
    { id: 10, name: "Arjun Nair", role: "Frontend Developer", category: "Technical" },
    { id: 11, name: "Meera Iyer", role: "Data Analyst", category: "Technical" },
    { id: 12, name: "Raj Malhotra", role: "DevOps Engineer", category: "Technical" },
    { id: 13, name: "Pooja Verma", role: "UI/UX Designer", category: "Technical" },
    
    // Events Team
    { id: 14, name: "Siddharth Reddy", role: "Events Head", category: "Events" },
    { id: 15, name: "Nisha Patel", role: "Workshop Coordinator", category: "Events" },
    { id: 16, name: "Varun Kapoor", role: "Hackathon Lead", category: "Events" },
    { id: 17, name: "Shreya Deshmukh", role: "Events Coordinator", category: "Events" },
    { id: 18, name: "Rohit Verma", role: "Logistics Manager", category: "Events" },
    
    // Content Team
    { id: 19, name: "Ananya Mehta", role: "Content Head", category: "Content" },
    { id: 20, name: "Vikram Singhania", role: "Social Media Manager", category: "Content" },
    { id: 21, name: "Ritu Sharma", role: "Content Writer", category: "Content" },
    { id: 22, name: "Aryan Kapoor", role: "Graphic Designer", category: "Content" },
    
    // PR & Outreach Team
    { id: 23, name: "Divya Khanna", role: "PR Head", category: "Outreach" },
    { id: 24, name: "Manish Tiwari", role: "Industry Relations", category: "Outreach" },
    { id: 25, name: "Aishwarya Iyer", role: "Outreach Coordinator", category: "Outreach" },
    { id: 26, name: "Sameer Patel", role: "Sponsorship Lead", category: "Outreach" },
    { id: 27, name: "Kavita Nair", role: "Community Manager", category: "Outreach" },
    
    // Research Team
    { id: 28, name: "Dr. Amit Joshi", role: "Research Advisor", category: "Research" },
    { id: 29, name: "Prateek Sinha", role: "Research Lead", category: "Research" },
    { id: 30, name: "Deepa Menon", role: "Research Associate", category: "Research" }
  ];
  
  // Create a flat array of all team categories including "All"
  const teamCategories = ["All", ...Array.from(new Set(teamMembers.map(m => m.category)))];
  
  // Filtered members based on selected category
  const filteredMembers = selectedCategory === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.category === selectedCategory);
  
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  
  // Get current page of members
  const getCurrentMembers = () => {
    const start = currentIndex * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  };
  
  // Handle pagination
  const paginate = (newDirection: number) => {
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= totalPages) newIndex = 0;
      if (newIndex < 0) newIndex = totalPages - 1;
      return newIndex;
    });
    setTimeout(() => setIsAnimating(false), 800);
  };
  
  // Handle horizontal scrolling of category buttons
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  
  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("");
  };
  
  // Binary Background Pattern
  const BinaryBackground = () => (
    <motion.div 
      className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none"
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
      id="team" 
      className="py-20 md:py-28 bg-white relative overflow-hidden" 
      ref={containerRef}
    >
      {/* Background pattern */}
      <BinaryBackground />
      
      {/* Decorative elements */}
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
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block mb-4 px-4 py-1 rounded-full bg-red-50 text-[var(--power-red)] text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our People
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[var(--somaiya-black)]">The Team </span>
            <span className="text-gradient">Behind </span>
            <span className="text-[var(--somaiya-black)]">DataZen</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet our passionate team of data enthusiasts driving innovation and excellence in data science.
          </motion.p>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-red mx-auto mt-8"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Team Category Selection Menu */}
        <div className="mb-14 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Filter by Team</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-all border border-red-200"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-red-600" />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-all border border-red-200"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollContainerRef} 
            className="category-filter"
          >
            {teamCategories.map((category) => {
              const count = category === "All" 
                ? teamMembers.length 
                : teamMembers.filter(m => m.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentIndex(0);
                  }}
                  className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                >
                  <span className="font-medium">{category}</span>
                  <span className={`rounded-full text-sm px-2 py-0.5 ml-2 ${
                    selectedCategory === category 
                      ? 'bg-white/20' 
                      : 'bg-red-100'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Team Members Carousel */}
        <div className="mb-24 relative">
          {/* Decorative elements */}
          <div className="absolute -left-20 -top-10 w-40 h-40 bg-gradient-to-r from-red-500/10 to-red-300/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-10 w-40 h-40 bg-gradient-to-r from-red-600/10 to-red-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative overflow-hidden py-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div 
                key={currentIndex + selectedCategory}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.7, ease: [0.4, 0.0, 0.2, 1] },
                  opacity: { duration: 0.4 }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
              >
                {getCurrentMembers().map((member, index) => (
                  <div 
                    key={`${member.id}`}
                    className="h-full"
                  >
                    <div className="team-member-card">
                      {/* Profile circle at top */}
                      <div className="team-avatar-container">
                        <div className="team-avatar">
                          <div className="team-avatar-initials">
                            {getInitials(member.name)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="team-content">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        
                        {/* Red horizontal line */}
                        <div className="team-divider"></div>
                        
                        {/* Category badge */}
                        <div className="mb-4">
                          <span className="team-category">
                            {member.category}
                          </span>
                        </div>
                        
                        <div className="team-social">
                          <a 
                            href="#" 
                            className="team-social-icon"
                          >
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                          <a 
                            href="#" 
                            className="team-social-icon"
                          >
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(-1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-6 h-6 text-red-600" />
                </button>
                
                <button
                  onClick={() => {
                    if (!isAnimating) {
                      paginate(1);
                    }
                  }}
                  className="nav-button"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-6 h-6 text-red-600" />
                </button>
              </div>
            )}
            
            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="pagination-dots">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }
                    }}
                    className={`pagination-dot ${index === currentIndex ? 'active' : 'bg-gray-300'}`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Stats about the team */}
        <motion.div 
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-slate-50 rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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