import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-power-red to-vitality-red text-white overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2"
            variants={heroVariants}
            initial="hidden"
            animate={controls}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins leading-tight">
              Unleashing the Power of Data Science
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light max-w-lg">
              DataZen is the official Data Science council of Somaiya Vidyavihar University, 
              where we transform data into insights and innovations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#about" className="px-8 py-3 bg-white text-power-red font-medium rounded-lg shadow-lg hover:bg-gray-100 transition text-center">
                Learn More
              </a>
              <a href="#contact" className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-power-red transition text-center">
                Join Us
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="Data visualization concept" 
              className="rounded-lg shadow-2xl mx-auto max-w-full h-auto" 
              width="500" 
              height="375"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
