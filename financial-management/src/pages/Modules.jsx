import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ModulesSkeleton from '../components/modules/ModulesSkeleton';
import { modules } from '../data/moduleData';



export default function Modules() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <ModulesSkeleton />;
  }

  return (
    <main className="relative z-10 pt-32 pb-24 px-8 max-w-screen-xl mx-auto">
      {/* Header Section */}
      <motion.header 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-container mb-4">
          LEARNING PATH
        </p>
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-primary leading-none mb-8">
          All Modules
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-on-surface-variant font-body">
              Six comprehensive modules covering the core pillars of financial management. Each module includes concept explanations, interactive calculators, and practice quizzes.
            </p>
          </div>
        </div>
      </motion.header>

      {/* Learning Path Bento Grid */}
      <motion.div 
        className="grid grid-cols-1 gap-12"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {modules.map((mod, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <Link 
              to={mod.path} 
              className="group relative bg-surface-container-low p-10 flex flex-col md:flex-row gap-12 transition-all duration-500 hover:bg-surface-container border-l border-primary-container/20 block"
            >
              <div className="flex-none">
                <div className="text-primary-container font-mono text-xs tracking-widest mb-6 italic opacity-50">
                  {mod.number} / {mod.total}
                </div>
                <div className="w-16 h-16 bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary-container text-3xl">{mod.icon}</span>
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-headline font-bold text-primary">{mod.title}</h2>
                  <span className="material-symbols-outlined text-primary-container/40 group-hover:text-primary-container transition-colors">
                    chevron_right
                  </span>
                </div>
                <p className="text-on-surface-variant font-body text-lg mb-8 max-w-2xl">{mod.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {mod.topics.map((topic, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3 py-1 bg-surface-container-highest font-label text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {mod.calculators.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mod.calculators.map((calc, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="flex items-center gap-3 p-4 bg-background border-b border-outline-variant/20 hover:border-primary-container transition-colors cursor-pointer group/item"
                      >
                        <span className="material-symbols-outlined text-sm text-primary-container">
                          {calc.icon}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-hover/item:text-primary transition-colors">
                          {calc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
