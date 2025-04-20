import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Activities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const activities = [
    {
      title: "Workshops & Training",
      description: "Hands-on learning experiences in data analysis, machine learning, visualization, and more, led by industry experts.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Speaker Series",
      description: "Engaging talks and panel discussions with thought leaders shaping the future of data science and AI technologies.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Research Projects",
      description: "Collaborative research initiatives applying data science methodologies to solve real-world problems across domains.",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];
  
  return (
    <section id="activities" className="py-16 md:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-somaiya-black mb-4 text-center font-poppins">Our Activities & Initiatives</h2>
          <div className="w-24 h-1 bg-power-red mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-gray-700">
            Driving excellence through a diverse range of programs and events that nurture data science skills and innovation.
          </p>
        </motion.div>

        {/* Featured Initiative */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="DataZen Hackathon" 
                className="w-full h-80 md:h-full object-cover" 
                width="600" 
                height="400"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="bg-power-red text-white inline-block px-4 py-1 rounded text-sm font-medium mb-4">Featured Initiative</div>
              <h3 className="text-2xl font-bold mb-4 font-poppins">#HackMasterz - Annual Data Science Hackathon</h3>
              <p className="text-gray-700 mb-6">
                A national coding challenge for top tech talent in Data science. Here's your chance to show what you're made of and win exciting prizes. Our flagship event brings together brilliant minds to solve complex data challenges.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-red-100 text-power-red px-3 py-1 rounded-full text-sm">Machine Learning</span>
                <span className="bg-red-100 text-power-red px-3 py-1 rounded-full text-sm">Big Data</span>
                <span className="bg-red-100 text-power-red px-3 py-1 rounded-full text-sm">AI</span>
                <span className="bg-red-100 text-power-red px-3 py-1 rounded-full text-sm">Innovation</span>
              </div>
              <Button className="bg-power-red hover:bg-red-700 text-white">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-48 object-cover" 
                width="400" 
                height="200"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 font-poppins">{activity.title}</h3>
                <p className="text-gray-700 mb-4">
                  {activity.description}
                </p>
                <a href={activity.link} className="text-power-red font-medium hover:underline flex items-center">
                  View Schedule <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
