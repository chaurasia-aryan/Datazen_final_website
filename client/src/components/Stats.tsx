import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: number;
  label: string;
  delay: number;
}

function Stat({ value, label, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const statRef = useRef(null);
  const isInView = useInView(statRef, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let currentCount = 0;
      const duration = 2000; // ms
      const stepTime = 20; // ms
      const totalSteps = duration / stepTime;
      const increment = value / totalSteps;
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return (
    <motion.div
      ref={statRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2 font-poppins">{count}+</div>
      <p className="text-lg opacity-90">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { value: 1000, label: "Students Impacted", delay: 0.1 },
    { value: 50, label: "Workshops Conducted", delay: 0.2 },
    { value: 25, label: "Industry Partners", delay: 0.3 },
    { value: 10, label: "Research Projects", delay: 0.4 }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-r from-power-red to-vitality-red text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <Stat
              key={index}
              value={stat.value}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
