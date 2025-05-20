'use client';

import * as React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { AgentCard } from "@/components/ui/agent-card";
import { cn } from "@/lib/utils";
import { SharedHeader } from "@/components/ui/shared-header";
import { SharedFooter } from "@/components/ui/shared-footer";

const categories = [
  "All",
  "Content Creation",
  "Marketing Strategy",
  "Data Analytics",
  "Decision Making",
];

const agents = [
  {
    title: "Data Whisperer",
    description: "Unlock data insights with AI-powered analysis",
    category: "Data Analytics",
    imagePath: "/lovable-uploads/8fd0ee35-491c-40c7-8e4a-028bdc2ea3ad.png",
    link: "https://mrdatawhisperer.streamlit.app/",
  },
  {
    title: "CalendlySocial",
    description:
      "Streamline your social media calendar with AI-driven scheduling",
    category: "Content Creation",
    imagePath: "/lovable-uploads/c9f4c6a5-97e2-4104-8e77-6c195914e5c4.png",
    link: "https://calenderly.streamlit.app/",
  },
  {
    title: "Mr. Blogger",
    description: "Craft engaging blog posts effortlessly with AI assistance",
    category: "Content Creation",
    imagePath: "/lovable-uploads/e287c9ec-58c4-4cc9-b80a-48c70c9814cf.png",
    link: "https://mrblogger.streamlit.app/",
  },
  {
    title: "Copywriter",
    description: "Auto-generate compelling social media posts with ease",
    category: "Content Creation",
    imagePath: "/lovable-uploads/1edce8c4-f9c2-4226-b20a-e58c8ea3da40.png",
    link: "https://copywriter.streamlit.app/",
  },
  {
    title: "Content Idea Seeker",
    description: "Discover viral content ideas with AI-powered insights",
    category: "Content Creation",
    imagePath: "/lovable-uploads/3a05dbb9-2969-4937-a4f4-c122dc1b2ede.png",
    link: "https://static-content.streamlit.app/",
  },
  {
    title: "Positioning Master",
    description: "Optimize and validate your marketing positioning with AI",
    category: "Marketing Strategy",
    imagePath: "/lovable-uploads/2bca7ee5-3c0c-4c81-a5e2-fac2a736548b.png",
    link: "https://socialmediapositioningmaster.streamlit.app/",
  },
  {
    title: "Six Thinking Hats",
    description: "Enhance decision-making with a structured approach",
    category: "Decision Making",
    imagePath: "/lovable-uploads/1b3826d5-2512-4379-a37a-797d1af325a9.png",
    link: "https://sixthinkinghats.streamlit.app/",
  },
  {
    title: "Debating Arena",
    description: "Sharpen your ideas with AI-powered debates",
    category: "Decision Making",
    imagePath: "/lovable-uploads/b5a40246-1a1f-413e-a3e7-a5f46910aabc.png",
    link: "https://debating-arena.streamlit.app/",
  },
  {
    title: "LinkedIn Post Master",
    description: "Create a Professional LinkedIn Post Using the Provided URL",
    category: "Content Creation",
    imagePath: "/lovable-uploads/3509990a-996f-4e46-a672-02033d1a47d8.png",
    link: "https://linkedinpostmaster.streamlit.app/",
  },
  {
    title: "SmartMatching AI",
    description: "Optimize consultants search with AI-driven matching",
    category: "Decision Making",
    imagePath: "/lovable-uploads/e467e6f5-b118-47cd-b21f-b6323fbc307b.png",
    link: "https://advancedmatcher.streamlit.app/",
  },
  {
    title: "Client Success Story Teller",
    description:
      "Generate client success stories and automatically save to Google Doc",
    category: "Content Creation",
    imagePath: "/lovable-uploads/IMG_0377.jpg",
    link: "https://clientstoryteller.streamlit.app/",
  },
  {
    title: "Interactive SmartMatcher",
    description: "Mactchmaking consultants with Human-in-the-Loop feature",
    category: "Decision Making",
    imagePath: "/lovable-uploads/IMG_0412.JPG",
    link: "https://advancedmatcher.streamlit.app/",
  },
  {
    title: "Pantheon Discourse Engine",
    description: "Mactchmaking consultants with Human-in-the-Loop feature",
    category: "Decision Making",
    imagePath: "/lovable-uploads/IMG_0413.JPG",
    link: "https://pantheondiscourseengine.streamlit.app/",
  },
  {
    title: "AI Socail Media Listener",
    description: "Monitor social media sentiment with AI-driven insights",
    category: "Data Analytics",
    imagePath: "/lovable-uploads/IMG_0372.JPG",
    link: "#",
  },
  {
    title: "Market Horizon Explorer",
    description: "Navigate market trends with AI-powered strategic insights",
    category: "Marketing Strategy",
    imagePath: "/lovable-uploads/IMG_0379.JPG",
    link: "#",
  },
];

const AgentGardenPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAgents = agents.filter(
    (agent) => selectedCategory === "All" || agent.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SharedHeader />

      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-16 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">
              Agent Garden
            </span>
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-all",
                  "border border-white/10 backdrop-blur-sm",
                  selectedCategory === category
                    ? "bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 text-white"
                    : "hover:bg-white/5 text-white/70 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AgentCard
                {...filteredAgents[0]}
                className="md:col-span-2 h-[400px]"
              />
              <AgentCard {...filteredAgents[1]} className="h-[400px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAgents.slice(2).map((agent) => (
                <AgentCard key={agent.title} {...agent} className="h-[300px]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SharedFooter />
    </div>
  );
};

export default AgentGardenPage;
