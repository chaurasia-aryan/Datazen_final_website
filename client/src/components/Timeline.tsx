import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
  
  return (
    <section id="timeline" className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-somaiya-black mb-4 text-center font-poppins">Our Journey</h2>
          <div className="w-24 h-1 bg-power-red mb-8"></div>
          <p className="text-lg text-center max-w-3xl text-gray-700">
            Tracing the evolution and key milestones of DataZen at Somaiya Vidyavihar University.
          </p>
        </motion.div>

        <VerticalTimeline lineColor="#b7202e">
          {timelineItems.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(255, 255, 255)', color: '#231f20', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)', borderTop: '4px solid #b7202e' }}
              contentArrowStyle={{ borderRight: '7px solid rgb(255, 255, 255)' }}
              date={item.year}
              iconStyle={{ background: '#b7202e', color: '#fff' }}
              icon={<span className="material-icons text-white flex items-center justify-center h-full">event</span>}
            >
              <h3 className="vertical-timeline-element-title text-xl font-semibold font-poppins">{item.title}</h3>
              <p className="text-gray-700 mt-2">
                {item.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
