import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, School, Users } from "lucide-react";

export default function About() {
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

  const cards = [
    {
      title: "Our Vision",
      description: "To create a vibrant community of data enthusiasts, fostering innovation and excellence in the field of data science.",
      icon: <Brain className="text-power-red text-3xl" />,
      color: "bg-power-red"
    },
    {
      title: "University Affiliation",
      description: "DataZen is proudly affiliated with Somaiya Vidyavihar University, upholding its tradition of academic excellence and innovation.",
      icon: <School className="text-vitality-red text-3xl" />,
      color: "bg-vitality-red"
    },
    {
      title: "Our Community",
      description: "A diverse network of students, faculty, and industry experts collaborating to advance data science knowledge and applications.",
      icon: <Users className="text-somaiya-black text-3xl" />,
      color: "bg-somaiya-black"
    }
  ];

  const features = [
    {
      title: "Skill Development",
      description: "Access cutting-edge workshops, hands-on projects, and industry-relevant training in data science and analytics.",
      icon: "psychology"
    },
    {
      title: "Networking",
      description: "Connect with fellow data enthusiasts, faculty experts, and industry professionals through our events and community.",
      icon: "diversity_3"
    },
    {
      title: "Innovation",
      description: "Participate in hackathons, research projects, and innovative challenges to solve real-world problems using data.",
      icon: "rocket_launch"
    }
  ];
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-somaiya-black mb-4 text-center font-poppins">About DataZen</h2>
          <div className="w-24 h-1 bg-power-red mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-gray-700">
            Exploring the frontiers of data science to empower students with skills, knowledge, and opportunities for innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <div className={`h-3 ${card.color}`}></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 font-poppins">{card.title}</h3>
                <p className="text-gray-700">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
              alt="DataZen team collaboration" 
              className="rounded-lg shadow-xl max-w-full h-auto" 
              width="600" 
              height="400"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 font-poppins text-somaiya-black">Why DataZen?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div className="flex" key={index}>
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full ${index === 0 ? 'bg-power-red' : index === 1 ? 'bg-vitality-red' : 'bg-somaiya-black'} flex items-center justify-center text-white`}>
                      <span className="material-icons">{feature.icon}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-medium mb-2 font-poppins">{feature.title}</h4>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
