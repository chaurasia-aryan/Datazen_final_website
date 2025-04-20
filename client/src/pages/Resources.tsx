import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Database, 
  FileText, 
  Podcast, 
  Link as LinkIcon, 
  Video, 
  BookMarked, 
  GraduationCap, 
  BarChart,
  Brain,
  Laptop,
  FileSpreadsheet
} from "lucide-react";

export default function Resources() {
  // Refs for animation
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
  
  // Animation variants with better performance
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        staggerDirection: 1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Function to handle resource tabs animation to prevent blank screen
  const handleTabChange = (value: string) => {
    // Force visibility when tab changes
    const container = document.getElementById(`resources-${value}`);
    if (container) {
      // Make sure animations don't cause blank state
      const items = container.querySelectorAll('.resource-card');
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'translateY(0)';
      });
    }
  };
  
  // Resources data
  const resources = {
    ai: [
      {
        title: "AI For Everyone",
        description: "An introductory course to understanding AI and its applications in business.",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        type: "Course",
        level: "Beginner",
        icon: <GraduationCap size={20} />,
        provider: "Coursera"
      },
      {
        title: "Fast.ai Practical Deep Learning",
        description: "A free course teaching practical deep learning for coders.",
        url: "https://course.fast.ai/",
        type: "Course",
        level: "Intermediate",
        icon: <Brain size={20} />,
        provider: "Fast.ai"
      },
      {
        title: "Deep Learning Specialization",
        description: "A series of courses to help you understand the foundations of deep learning.",
        url: "https://www.coursera.org/specializations/deep-learning",
        type: "Course",
        level: "Advanced",
        icon: <GraduationCap size={20} />,
        provider: "Coursera"
      },
      {
        title: "AI Research Papers Daily",
        description: "Collection of the latest research papers in artificial intelligence.",
        url: "https://arxiv.org/list/cs.AI/recent",
        type: "Research",
        level: "Advanced",
        icon: <FileText size={20} />,
        provider: "arXiv"
      },
      {
        title: "Hugging Face Transformers",
        description: "State-of-the-art Natural Language Processing for Pytorch and TensorFlow.",
        url: "https://huggingface.co/docs/transformers/index",
        type: "Library",
        level: "Intermediate",
        icon: <Code size={20} />,
        provider: "Hugging Face"
      },
      {
        title: "Neural Networks: Zero to Hero",
        description: "A course on neural networks from the basics to advanced concepts.",
        url: "https://karpathy.ai/zero-to-hero.html",
        type: "Course",
        level: "All Levels",
        icon: <GraduationCap size={20} />,
        provider: "Andrej Karpathy"
      },
      {
        title: "AI Ethics Guidelines",
        description: "Comprehensive guidelines for developing ethical AI systems.",
        url: "https://www.partnershiponai.org/paper/responsible-ai-tools-map/",
        type: "Resource",
        level: "All Levels",
        icon: <BookMarked size={20} />,
        provider: "Partnership on AI"
      },
      {
        title: "Making Friends with Machine Learning",
        description: "A series of talks introducing ML concepts in an accessible way.",
        url: "https://github.com/google/making-with-ml",
        type: "Video Series",
        level: "Beginner",
        icon: <Video size={20} />,
        provider: "Google"
      }
    ],
    ml: [
      {
        title: "Machine Learning Crash Course",
        description: "Google's fast-paced, practical introduction to machine learning.",
        url: "https://developers.google.com/machine-learning/crash-course",
        type: "Course",
        level: "Beginner",
        icon: <GraduationCap size={20} />,
        provider: "Google"
      },
      {
        title: "Elements of Statistical Learning",
        description: "A comprehensive introduction to statistical learning methods.",
        url: "https://hastie.su.domains/ElemStatLearn/",
        type: "Book",
        level: "Advanced",
        icon: <BookOpen size={20} />,
        provider: "Stanford"
      },
      {
        title: "Scikit-Learn Documentation",
        description: "Python tools for predictive data analysis with excellent examples.",
        url: "https://scikit-learn.org/stable/documentation.html",
        type: "Library",
        level: "Intermediate",
        icon: <Code size={20} />,
        provider: "Scikit-Learn"
      },
      {
        title: "Kaggle Machine Learning Competitions",
        description: "Solve data science challenges and learn from community solutions.",
        url: "https://www.kaggle.com/competitions",
        type: "Practice",
        level: "All Levels",
        icon: <Laptop size={20} />,
        provider: "Kaggle"
      },
      {
        title: "Machine Learning Mastery",
        description: "Practical guides and tutorials for applied machine learning.",
        url: "https://machinelearningmastery.com/start-here/",
        type: "Tutorials",
        level: "All Levels",
        icon: <FileText size={20} />,
        provider: "Machine Learning Mastery"
      },
      {
        title: "Towards Data Science",
        description: "Medium publication sharing concepts, ideas, and codes for data science.",
        url: "https://towardsdatascience.com/",
        type: "Articles",
        level: "All Levels",
        icon: <FileText size={20} />,
        provider: "Medium"
      },
      {
        title: "TensorFlow Tutorials",
        description: "Learn how to build ML models with TensorFlow's high-level APIs.",
        url: "https://www.tensorflow.org/tutorials",
        type: "Tutorials",
        level: "Intermediate",
        icon: <Code size={20} />,
        provider: "TensorFlow"
      },
      {
        title: "PyTorch Documentation",
        description: "PyTorch tutorials and documentation for deep learning.",
        url: "https://pytorch.org/tutorials/",
        type: "Library",
        level: "Intermediate",
        icon: <Code size={20} />,
        provider: "PyTorch"
      }
    ],
    dataAnalytics: [
      {
        title: "Google Data Analytics Certificate",
        description: "Professional certificate to prepare for an entry-level data analyst job.",
        url: "https://www.coursera.org/professional-certificates/google-data-analytics",
        type: "Course",
        level: "Beginner",
        icon: <GraduationCap size={20} />,
        provider: "Coursera"
      },
      {
        title: "Pandas Documentation",
        description: "Fast, powerful, flexible and easy to use open source data analysis tool.",
        url: "https://pandas.pydata.org/docs/",
        type: "Library",
        level: "All Levels",
        icon: <FileSpreadsheet size={20} />,
        provider: "Pandas"
      },
      {
        title: "SQL for Data Analysis",
        description: "Learn SQL for data analysis with interactive exercises.",
        url: "https://mode.com/sql-tutorial/",
        type: "Tutorial",
        level: "Beginner",
        icon: <Database size={20} />,
        provider: "Mode"
      },
      {
        title: "Tableau Public Resources",
        description: "Free resources to learn data visualization with Tableau.",
        url: "https://public.tableau.com/en-us/s/resources",
        type: "Resource",
        level: "All Levels",
        icon: <BarChart size={20} />,
        provider: "Tableau"
      },
      {
        title: "Power BI Documentation",
        description: "Learn how to create impactful reports and dashboards with Power BI.",
        url: "https://docs.microsoft.com/en-us/power-bi/",
        type: "Documentation",
        level: "All Levels",
        icon: <BarChart size={20} />,
        provider: "Microsoft"
      },
      {
        title: "DataCamp Data Analysis Courses",
        description: "Interactive data science courses to improve your data analysis skills.",
        url: "https://www.datacamp.com/courses/tech:python",
        type: "Courses",
        level: "All Levels",
        icon: <GraduationCap size={20} />,
        provider: "DataCamp"
      },
      {
        title: "R for Data Science",
        description: "Free book teaching data science using R and the tidyverse packages.",
        url: "https://r4ds.had.co.nz/",
        type: "Book",
        level: "Beginner",
        icon: <BookOpen size={20} />,
        provider: "O'Reilly"
      },
      {
        title: "Data Analysis with Python",
        description: "Learn how to analyze data using Python libraries like Pandas, NumPy, and Matplotlib.",
        url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
        type: "Course",
        level: "Intermediate",
        icon: <Code size={20} />,
        provider: "freeCodeCamp"
      }
    ]
  };
  
  // Background pattern
  const ResourcePattern = () => (
    <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--power-red)" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="url(#smallGrid)" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--power-red)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
  
  // Resource card component
  const ResourceCard = ({ resource }: { resource: any }) => {
    const getColorByType = (type: string) => {
      switch (type.toLowerCase()) {
        case 'course':
          return 'bg-blue-100 text-blue-800';
        case 'book':
          return 'bg-purple-100 text-purple-800';
        case 'tutorial':
        case 'tutorials':
          return 'bg-green-100 text-green-800';
        case 'library':
          return 'bg-amber-100 text-amber-800';
        case 'article':
        case 'articles':
        case 'research':
          return 'bg-slate-100 text-slate-800';
        case 'video':
        case 'video series':
          return 'bg-red-100 text-red-800';
        case 'podcast':
          return 'bg-indigo-100 text-indigo-800';
        case 'resource':
        case 'documentation':
          return 'bg-teal-100 text-teal-800';
        case 'practice':
          return 'bg-orange-100 text-orange-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
    
    const getColorByLevel = (level: string) => {
      switch (level.toLowerCase()) {
        case 'beginner':
          return 'bg-green-100 text-green-800';
        case 'intermediate':
          return 'bg-yellow-100 text-yellow-800';
        case 'advanced':
          return 'bg-red-100 text-red-800';
        case 'all levels':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <motion.div
        variants={itemAnimation}
        whileHover={{ y: -5 }}
        className="h-full resource-card"
      >
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-red-50 text-[var(--power-red)] flex items-center justify-center mb-2">
                {resource.icon}
              </div>
              
              <Badge className={getColorByType(resource.type)}>
                {resource.type}
              </Badge>
            </div>
            
            <CardTitle className="text-xl">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">Provider:</span> {resource.provider}
            </div>
            <div className="mt-2">
              <Badge variant="outline" className={getColorByLevel(resource.level)}>
                {resource.level}
              </Badge>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-gradient-red hover:opacity-90">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <LinkIcon size={16} />
                Access Resource
              </a>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      
      <main className="flex-1 relative" ref={containerRef} style={{ position: 'relative' }}>
        {/* Background pattern */}
        <ResourcePattern />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-[10%] right-[15%] w-48 h-48 rounded-full bg-[var(--power-red)] opacity-5"
          style={{ y: y1 }}
        />
        
        <motion.div 
          className="absolute top-[60%] left-[10%] w-64 h-64 rounded-full bg-[var(--vitality-red)] opacity-5"
          style={{ y: y2 }}
        />
        
        <motion.div 
          className="absolute bottom-[20%] right-[20%] w-32 h-32 rounded-full bg-[var(--somaiya-black)] opacity-5"
          style={{ y: y3 }}
        />
        
        <div className="container mx-auto px-6 py-20 relative z-10" ref={ref}>
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
              Knowledge Center
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-[var(--somaiya-black)]">DataZen </span>
              <span className="text-gradient">Learning </span>
              <span className="text-[var(--somaiya-black)]">Resources</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our curated collection of resources for AI, Machine Learning, and Data Analytics.
            </motion.p>
            
            <motion.div 
              className="h-1 w-20 bg-gradient-red mx-auto mt-8"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          <Tabs defaultValue="ai" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="ai" className="text-base">
                <Brain className="mr-2 h-4 w-4" /> Artificial Intelligence
              </TabsTrigger>
              <TabsTrigger value="ml" className="text-base">
                <Code className="mr-2 h-4 w-4" /> Machine Learning
              </TabsTrigger>
              <TabsTrigger value="dataAnalytics" className="text-base">
                <BarChart className="mr-2 h-4 w-4" /> Data Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai">
              <motion.div 
                id="resources-ai"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {resources.ai.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="ml">
              <motion.div 
                id="resources-ml"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {resources.ml.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="dataAnalytics">
              <motion.div 
                id="resources-dataAnalytics"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {resources.dataAnalytics.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}