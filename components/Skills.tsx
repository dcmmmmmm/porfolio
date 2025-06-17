"use client";

import { motion } from "framer-motion";
import { FaCode, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiTypescript, SiJavascript } from 'react-icons/si';

const skills = [
  { name: "HTML/CSS", icon: <FaCode className="text-2xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-2xl" /> },
  { name: "React/Next.js", icon: <FaReact className="text-2xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-2xl" /> },
  { name: "MongoDB", icon: <FaDatabase className="text-2xl" /> },
];

const sliderVariants = {
  initial: { x: '100%' },
  animate: {
    x: '-100%',
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Kỹ Năng</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>

        <div className="relative h-[200px] flex items-center">
          <motion.div 
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            className="flex gap-8 absolute"
          >
            {[...skills, ...skills].map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="w-[200px] h-[120px] flex-shrink-0 bg-blue-800/30 p-6 rounded-xl 
                          backdrop-blur-sm border border-blue-400/20 shadow-lg
                          flex flex-col items-center justify-center gap-4
                          hover:bg-blue-800/40 hover:border-yellow-400/50 transition-all
                          cursor-pointer"
              >
                <div className="text-yellow-400">
                  {skill.icon}
                </div>
                <span className="text-lg font-medium text-white text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;