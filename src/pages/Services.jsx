
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Watch,
  MessageCircle,
  Mic,
  ArrowRight,
  Check,
  BarChart3,
  Brain,
  Shield,
  Sparkles,
  Clock,
  PieChart,
  Share2
} from 'lucide-react';
import { link } from 'framer-motion/client';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon: Icon, features, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`bg-white rounded-xl p-8 transition-all duration-500 ${
        isHovered ? 'shadow-2xl scale-105' : 'shadow-lg'
      } cursor-pointer border-2 border-transparent hover:border-blue-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div 
          className={`p-4 rounded-lg transition-colors duration-300 ${
            isHovered ? 'bg-blue-100' : 'bg-purple-100'
          }`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className={`w-8 h-8 transition-colors duration-300 ${
            isHovered ? 'text-blue-600' : 'text-purple-600'
          }`} />
        </motion.div>
        <h3 className="font-bold text-2xl text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </motion.li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <div className="flex items-center text-blue-600 font-medium">
          <span>View details</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

const FeatureBox = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <motion.div 
      className="p-3 bg-blue-100 rounded-full mb-4"
      whileHover={{ scale: 1.1 }}
    >
      <Icon className="w-6 h-6 text-blue-600" />
    </motion.div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ProcessStep = ({ number, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4"
      whileHover={{ scale: 1.1 }}
    >
      {number}
    </motion.div>
    <h4 className="font-semibold text-lg mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Services = ({ navigate }) => {
  // Add navigation function if not provided
  const handleNavigation = navigate || (() => console.log("Navigation function not provided"));
  
  const services = [
    {
      icon: Watch,
      title: "Wearable Sensor Data",
      description: "Advanced analysis of physiological data from wearable devices to track mental health indicators in real-time.",
      features: [
        "Heart rate variability analysis",
        "Sleep pattern monitoring",
        "Activity level tracking",
        "Stress level detection",
        "24/7 continuous monitoring"
      ],
      path: "/services/wearable",
    },
    {
      icon: MessageCircle,
      title: "Social Media Data",
      description: "Comprehensive analysis of social media activity to identify patterns and indicators of mental health status.",
      features: [
        "Sentiment analysis",
        "Behavioral pattern recognition",
        "Interaction frequency monitoring",
        "Content analysis",
        "Timeline pattern detection"
      ],
      path: "/services/social-media",
    },
    {
      icon: Mic,
      title: "Speech Pattern Data",
      description: "Advanced vocal analysis using AI to detect subtle changes in speech patterns indicating mental health variations.",
      features: [
        "Voice tone analysis",
        "Speech rhythm detection",
        "Emotional state identification",
        "Linguistic pattern analysis",
        "Real-time monitoring"
      ],
      path: "/services/speech-pattern",
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms for accurate pattern recognition"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade encryption and privacy protection"
    },
    {
      icon: PieChart,
      title: "Comprehensive Reports",
      description: "Detailed insights and actionable recommendations"
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Continuous analysis and instant alerts"
    }
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="min-h-screen bg-gradient-to-b from-[rgb(241,232,255)] to-[rgb(228,222,254)]">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-700 font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Our Services
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Comprehensive Mental Health
            <span className="text-blue-600"> Analysis</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Leveraging multiple data sources and advanced AI technology to provide
            thorough mental health monitoring and analysis.
          </motion.p>
        </motion.div>

        {/* Services Grid - Now in a single container with onClick navigation */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <Link key={index} to="/predict" className="font-medium py-3 hover:text-purple-700 transition duration-300">
            <ServiceCard 
              key={index} 
              {...service} 
              onClick={() => handleNavigation(service.path)} 
            />

            </Link>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our services come with powerful features to ensure accurate and reliable mental health analysis.
          </motion.p>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureBox key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;


