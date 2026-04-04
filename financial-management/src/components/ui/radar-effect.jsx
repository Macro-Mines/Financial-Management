import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, children, idx, ...rest }) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-neutral-200",
        className
      )}
    />
  );
};

export const Radar = ({ className }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>
      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(253, 186, 116, ${1 - (idx + 1) * 0.1})`, // Using orange-200 tint
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
  tooltip,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: delay || 0 }}
      className="relative z-50 hover:z-[100] flex flex-col items-center justify-center space-y-2 group"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-stone-900 shadow-inner transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:-translate-y-1 cursor-pointer">
        {icon}
      </div>
      <div className="hidden rounded-md px-2 py-1 md:block bg-stone-950/80 backdrop-blur-md border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="text-center text-[10px] font-bold text-outline-variant font-label tracking-widest uppercase relative z-10">
          {text}
        </div>
      </div>
      {tooltip && (
        <div className="absolute top-full mt-4 w-[280px] p-5 bg-stone-950/95 backdrop-blur-xl border border-primary/30 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] shadow-2xl left-1/2 -translate-x-1/2 pointer-events-none">
           <h4 className="font-headline tracking-wider text-primary text-sm mb-2 uppercase">{text}</h4>
           <div className="w-8 h-px bg-primary/40 mb-3"></div>
           <p className="font-body text-outline-variant text-xs leading-relaxed normal-case text-left">{tooltip}</p>
        </div>
      )}
    </motion.div>
  );
};
