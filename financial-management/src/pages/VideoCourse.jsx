import { motion } from 'framer-motion';
import React from 'react';

const videos = [
  { id: 'CCQwz_Gwo6o', title: 'Fundamentals of Financial Management - Part 1' },
  { id: 'dgPlxTq9lLw', title: 'Fundamentals of Financial Management - Part 2' },
  { id: 'Hus0QjGA35E', title: 'Fundamentals of Financial Management - Part 3' },
  { id: 'FiEFngDYUzA', title: 'Fundamentals of Financial Management – Part 4' },
  { id: 'zeYN_013jQ4', title: 'Fundamentals of Financial Management - Part 5' },
  { id: 'moPLocn-0rk', title: 'Time Value of Money - Part 1' },
  { id: 'LeuNL4GbnqM', title: 'Time Value of Money - Part 2' },
  { id: 'SBQAcWrv5ec', title: 'Time Value of Money – Part 3' },
  { id: 'UGP52-nDciE', title: 'Time Value of Money – Part 4' },
  { id: 'ZJTnsnUUpfo', title: 'Time Value of Money – Part 5' },
  { id: 'DFefpPJegFw', title: 'Time Value of Money – Part 6' },
  { id: 'A6tGXT4xqHg', title: 'Time Value of Money – Part 7' },
  { id: 'JlYY1NxGTQI', title: 'Cost of Capital - Part 1' },
  { id: 'q8zGFdBKWjQ', title: 'Cost of Capital - Part 2' },
  { id: 'RPfpx3HoRr4', title: 'Cost of Capital - Part 3' },
  { id: 'sjLJKfbpJ7Q', title: 'Cost of Capital - Part 4' },
  { id: 'hJ3G5BCU_lQ', title: 'Cost of Capital - Part 5' },
  { id: 'tRen708yP6U', title: 'Cost of Capital - Part 6' },
  { id: 'Sc6_CVb-mRU', title: 'Cost of Capital - Part 7' },
  { id: 'G0KagC5UA7o', title: 'Dividend Decisions - Part 1' },
  { id: 'mR0NfFOetHQ', title: 'Dividend Decisions - Part 2' },
];

const VideoCard = ({ id, title, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-[#0a0a0a] border border-white/5 p-4 transition-all duration-500 hover:border-orange-200/30 hover:bg-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    <div className="aspect-video mb-6 overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
      ></iframe>
    </div>
    <div className="flex justify-between items-end">
      <div>
        <span className="font-label text-[10px] tracking-[0.3em] text-orange-200/40 uppercase mb-2 block">Lesson {String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-headline text-xl text-stone-200 group-hover:text-orange-100 transition-colors duration-300">{title}</h3>
      </div>
      <div className="h-px w-12 bg-white/10 group-hover:w-20 transition-all duration-500"></div>
    </div>
  </motion.div>
);

export default function VideoCourse() {
  return (
    <main className="min-h-screen pt-40 pb-32 px-10 md:px-16 lg:px-24 bg-stone-950">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 max-w-4xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-orange-200/40"></div>
          <span className="font-label text-xs tracking-[0.4em] text-orange-200 uppercase">Learning Library</span>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl mb-12 tracking-tight uppercase">Video Course</h1>
        <p className="font-body text-stone-500 text-xl leading-relaxed max-w-2xl">
          A curated collection of visual lessons designed to transform your understanding of financial systems through high-fidelity instruction and real-world application.
        </p>
      </motion.div>

      {/* Video Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {videos.map((video, index) => (
          <VideoCard key={video.id} id={video.id} title={video.title} index={index} />
        ))}
      </section>

      {/* Back to Modules */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-40 text-center"
      >
        <div className="inline-block p-12 border border-white/5 bg-white/[0.01]">
          <p className="font-label text-[10px] tracking-[0.5em] text-stone-600 uppercase mb-8">Completed a lesson?</p>
          <h4 className="font-headline text-2xl mb-10 text-stone-400">Apply your knowledge in the dynamic calculators.</h4>
          <a href="/modules" className="inline-block border border-orange-200/20 px-12 py-5 text-orange-200 font-label text-xs tracking-[0.3em] hover:bg-orange-200 hover:text-[#0a0a0a] transition-all duration-500 uppercase">
            Explore Modules
          </a>
        </div>
      </motion.div>
    </main>
  );
}
