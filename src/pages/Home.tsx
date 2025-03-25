"use client"
import React, { useEffect, useRef } from 'react';
import { motion, Variant, useInView, useAnimation } from 'framer-motion';
import { 
  ArrowRight, 
  Sun, 
  Battery, 
  BarChart3, 
  Check, 
  Globe, 
  Leaf, 
  ShieldCheck, 
  Zap,
  LucideIcon
} from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants: Record<string, Variant> = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home: React.FC = () => {
  const features: FeatureProps[] = [
    { 
      icon: Sun, 
      color: "text-yellow-500", 
      title: "Sustainable Energy", 
      description: "Harness the power of the sun with our high-efficiency solar panels and reduce your carbon footprint.",
    },
    { 
      icon: Battery, 
      color: "text-green-500", 
      title: "Energy Storage", 
      description: "Advanced battery solutions ensure reliable power day and night, maximizing your energy independence.",
    },
    { 
      icon: BarChart3, 
      color: "text-blue-500", 
      title: "Smart Monitoring", 
      description: "Real-time analytics and monitoring for optimal performance and energy management.",
    },
    { 
      icon: Globe, 
      color: "text-purple-500", 
      title: "Global Impact", 
      description: "Every installation contributes to a greener planet and sustainable future for generations.",
    },
    { 
      icon: Leaf, 
      color: "text-emerald-500", 
      title: "Eco-Friendly", 
      description: "Minimize environmental impact with clean, renewable energy solutions tailored to your needs.",
    },
    { 
      icon: ShieldCheck, 
      color: "text-indigo-500", 
      title: "Guaranteed Performance", 
      description: "Comprehensive warranties and professional installation ensure long-term reliability.",
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-900 to-green-600">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
        >
          <div className="max-w-3xl space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold leading-tight"
            >
              Power Your Future with <span className="text-green-300">Rooftop Urja</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-green-100 max-w-2xl"
            >
              Transform your rooftop into a sustainable power station with cutting-edge solar solutions that drive innovation and environmental responsibility.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-green-500 text-white px-10 py-4 rounded-full hover:bg-green-600 flex items-center group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                Get Started
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white hover:text-green-900 transition-all duration-300 ease-in-out transform hover:scale-105">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Choose Rooftop Urja?</h2>
              <p className="text-xl text-gray-600">Experience the future of sustainable energy with our comprehensive solar solutions.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection 
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-20">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 max-w-2xl">
              <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Power Your Future?</h2>
              <p className="text-xl text-green-100 mb-6">Join thousands of satisfied customers who have made the switch to clean, sustainable energy. Our expert team is ready to design a custom solar solution tailored to your unique needs.</p>
              <div className="flex items-center space-x-4 mb-6">
                {[
                  "Free Consultation",
                  "Custom Design",
                  "Professional Installation"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-white">
                    <Check className="h-5 w-5 mr-2 text-green-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-white text-green-700 px-10 py-4 rounded-full hover:bg-gray-100 flex items-center group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              Contact Us Today
              <Zap className="ml-2 h-6 w-6 text-yellow-500 group-hover:animate-pulse" />
            </button>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Home;