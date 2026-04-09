import { Link } from 'react-router-dom';
import { FloatingPaths } from '../components/ui/background-paths';
import { Radar, IconContainer } from "../components/ui/radar-effect";
import {
  Search, Landmark, LineChart, Scale, PieChart, Target, Building,
  ClipboardCheck, Calculator, Briefcase, Coins, Handshake, Receipt
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import React, { useEffect } from 'react';
import RandomLetterSwapForward from "../components/fancy/text/random-letter-swap-forward-anim";
import RandomLetterSwapPingPong from "../components/fancy/text/random-letter-swap-pingpong-anim";

const TiltCard = ({ children, to }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <Link
        to={to}
        style={{ transform: "translateZ(30px)" }}
        className="block bg-surface-container-low p-12 border border-white/5 flex flex-col justify-between min-h-[400px] hover:bg-surface-container-high hover:-translate-y-2 hover:shadow-[0_10px_40px_-5px_rgba(253,186,116,0.15)] transition-all duration-300 group"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]); // Slower parallax for background monolith
  const yStagger = useTransform(scrollY, [0, 1000], [0, 100]); // Mild parallax for hero text layer

  // Mouse follow parallax for depth feeling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [-15, 15]), { stiffness: 50, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [0, typeof window !== "undefined" ? window.innerHeight : 1000], [-15, 15]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Framer Stagger Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="relative z-10 flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-10 md:px-16 lg:px-24 pt-40 pb-32 overflow-hidden">
        <div className="grid grid-cols-12 w-full gap-12 items-center relative z-10">

          {/* Hero Text */}
          <motion.div
            className="col-span-12 lg:col-span-9 xl:col-span-8"
            variants={containerVars}
            initial="hidden"
            animate="show"
            style={{ y: yStagger }}
          >
            <motion.div variants={itemVars} className="mb-10">
              <span className="font-label text-sm tracking-[0.4em] text-primary uppercase">FINANCIAL MANAGEMENT</span>
            </motion.div>
            <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl lg:text-7xl leading-none text-on-surface letter-spacing-cinematic mb-16 overflow-hidden flex flex-col items-start gap-y-2 md:gap-y-0">
              <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-baseline md:gap-x-4">
                <RandomLetterSwapForward
                  label="CONTROL"
                  className="!justify-start"
                />
                <RandomLetterSwapForward
                  label="CAPITAL."
                  className="!justify-start"
                />
              </motion.div>
              <motion.div variants={itemVars} className="italic text-primary-container flex flex-col md:flex-row md:gap-x-4">
                <RandomLetterSwapPingPong
                  label="SHAPE THE"
                  className="!justify-start"
                />
                <RandomLetterSwapPingPong
                  label="FUTURE."
                  className="!justify-start"
                />
              </motion.div>
            </h1>
            <motion.div variants={itemVars} className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
              <Link to="/modules/tvm" className="w-[280px] sm:w-[300px] block">
                <button className="w-full bg-primary text-on-primary py-5 sm:py-6 px-8 sm:px-0 text-left sm:text-center font-label font-bold text-sm tracking-[0.2em] hover:bg-primary-container transition-all duration-500 rounded-none uppercase">
                  START LEARNING
                </button>
              </Link>
              <Link to="/modules" className="w-[280px] sm:w-[300px] block">
                <button className="w-full border border-primary/30 text-primary py-5 sm:py-6 px-8 sm:px-0 text-left sm:text-center font-label font-bold text-sm tracking-[0.2em] hover:bg-surface-container-high transition-all duration-500 rounded-none uppercase">
                  EXPLORE MODULES
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Technical Offset Label */}
          <motion.div
            className="hidden lg:block lg:col-span-3 xl:col-span-4 mt-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="text-right max-w-[280px] ml-auto">
              <div className="mb-6 h-px w-32 bg-outline-variant/30 ml-auto"></div>
              <p className="font-label text-[10px] tracking-widest text-outline leading-loose uppercase">
                LEARN FINANCIAL MANAGEMENT THROUGH INTERACTIVE TOOLS, REAL-WORLD INSIGHTS, AND POWERFUL VISUAL LEARNING.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Absolute Visual Element: The Monolith Fragment with Parallax and Scale */}
        <motion.div
          className="absolute right-0 bottom-0 w-2/5 h-4/5 bg-surface-container-low z-[-1] translate-x-12 translate-y-12 overflow-hidden border-l border-t border-white/5"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y: yBg }}
        >
          <motion.img
            style={{ x: parallaxX, y: parallaxY }}
            className="w-[110%] h-[110%] -ml-[5%] -mt-[5%] object-cover mix-blend-luminosity opacity-40"
            alt="dramatic architectural concrete monolith structure in a vast desert landscape with sharp shadows and golden hour lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVKbIwbgK9_66TY2SEji1uEbJeVMrEhOV0VPF6ae5ci84wBY_5ZD_yhfoctXC2C99Pe9k3fIDU4ZG6LhsqRMSIgJkZva1EPbdYBQg9tOMeoNY1Z9Jfcz4GeAher-AqWwAKS7hsLLwXi6dC0tC1REZPKHYoEKN1VCJbp_89pNOPl88CNRhEzwrfGp8aHIgCp2mf7BbGgEvtnOjB70RgaAQHN5coM3ZTt-VK8U-1VOsiKIhLCRQCCKdjWlsAuDtjI3mv81EacFjJKIW_"
          />
        </motion.div>
      </section>

      {/* Curriculum Grid Section */}
      <section className="px-10 md:px-16 lg:px-24 py-40 bg-stone-950 border-t border-white/5">
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary/40"></div>
            <span className="font-label text-xs tracking-[0.4em] text-primary uppercase">Curriculum</span>
          </div>
          <h2 className="font-headline text-5xl md:text-6xl mb-10">Core Modules</h2>
          <p className="font-body text-outline max-w-2xl text-lg leading-relaxed">
            Six comprehensive modules designed to take you from fundamentals to advanced financial decision-making, delivered through a brutalist architectural lens.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {/* 01 Time Value of Money */}
          <TiltCard to="/modules/tvm">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">hourglass_empty</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">01</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Time Value of Money</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Master Present Value, Future Value, and Annuity calculations — the foundation of all decision-making.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Present Value</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Future Value</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Annuities</span>
            </div>
          </TiltCard>

          {/* 02 Cost of Capital */}
          <TiltCard to="/modules/cost-of-capital">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">monetization_on</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">02</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Cost of Capital</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Understand how companies determine the true cost of debt, equity, and overall capital.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Cost of Debt</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Cost of Equity</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">WACC</span>
            </div>
          </TiltCard>

          {/* 03 Leverage */}
          <TiltCard to="/modules/leverage">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">balance</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">03</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Leverage</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Explore how operating and financial leverage amplify risk and return in business decisions.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Operating Leverage</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Financial Leverage</span>
            </div>
          </TiltCard>

          {/* 04 Capital Structure */}
          <TiltCard to="/modules/capital-structure">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">account_tree</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">04</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Capital Structure</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Study theories on optimal mix of debt and equity — from NI approach to Modigliani-Miller.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">NI Approach</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">NOI Approach</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">MM Theory</span>
            </div>
          </TiltCard>

          {/* 05 Capital Budgeting */}
          <TiltCard to="/modules/capital-budgeting">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">assessment</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">05</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Capital Budgeting</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Learn NPV, IRR, Payback Period, and other methods to evaluate investment decisions.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">NPV</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">IRR</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Profitability Index</span>
            </div>
          </TiltCard>

          {/* 06 Dividend Decisions */}
          <TiltCard to="/modules/dividend-decisions">
            <div>
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined !text-3xl text-primary/40 group-hover:text-primary transition-colors">payments</span>
                <span className="font-label text-3xl text-outline/30 tracking-widest">06</span>
              </div>
              <h3 className="font-headline text-3xl mb-6">Dividend Decisions</h3>
              <p className="font-body text-sm text-outline leading-relaxed mb-10">
                Explore theories on how profit distribution affects firm value — from Walter to Gordon.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 font-label text-[10px] text-outline/40 uppercase tracking-[0.2em]">
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Walter Model</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Gordon Model</span>
              <span className="border border-white/10 px-3 py-1 hover:border-primary/50 hover:text-primary transition-colors duration-300">Case Study</span>
            </div>
          </TiltCard>
        </motion.div>
      </section>

      {/* Functional Areas of Financial Management */}
      <section className="py-50 bg-stone-950 border-t border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          className="z-10 mb-20 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="font-label text-xs tracking-[0.4em] text-primary uppercase">Fin-Ecosystem</span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl">Functional Areas</h2>
          <p className="font-body text-outline mt-4 max-w-2xl mx-auto">
            Financial management is the backbone of any organization, ensuring that financial resources are used efficiently to achieve business goals. It generally divides into several key functional areas, ranging from long-term planning to daily operations
          </p>
        </motion.div>

        <motion.div
          className="w-full relative flex h-[600px] max-w-4xl flex-col items-center justify-center space-y-6 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Row 1 */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer text="Financial Needs & Planning" tooltip="This process involves forecasting the total capital required to initiate or expand business operations effectively. It ensures the organization has sufficient funds for both long-term asset acquisition and day-to-day functional expenses." delay={0.1} icon={<Search className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Source of Funds" tooltip="Managers must identify and select the best mix of internal and external funding options, such as equity, debt, or retained earnings. The goal is to choose sources that offer the necessary capital at the most favorable terms and lowest risk." delay={0.2} icon={<Landmark className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Financial Analysis" tooltip="This involves evaluating a company’s performance and stability by interpreting financial statements through tools like ratio analysis. It helps stakeholders understand the firm's profitability, liquidity, and overall economic health." delay={0.3} icon={<LineChart className="h-6 w-6 text-primary/80" />} />
            </div>
          </div>
          {/* Row 2 */}
          <div className="mx-auto w-full max-w-md">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer text="Optimal Capital" tooltip="This refers to finding the perfect balance between debt and equity that minimizes the company's cost of capital. A well-designed structure maximizes the firm’s market value while maintaining a manageable level of financial risk." delay={0.4} icon={<Scale className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Cost Volume Profit" tooltip="CVP analysis examines how changes in costs and sales volume affect a company's operating profit. It is primarily used to determine the break-even point where total revenues exactly equal total expenses." delay={0.5} icon={<PieChart className="h-6 w-6 text-primary/80" />} />
            </div>
          </div>
          {/* Row 3 */}
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer text="Profit Planning" tooltip="This function focuses on setting specific profit targets and creating detailed budgets to achieve those financial goals. It involves constant monitoring of actual results against the plan to correct any negative deviations." delay={0.6} icon={<Target className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Fixed Assets" tooltip="This area involves the strategic oversight of long-term investments like land, buildings, and machinery to ensure maximum utility. It focuses on the efficient maintenance, valuation, and eventual replacement of these high-value assets." delay={0.7} icon={<Building className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Project Evaluation" tooltip="This stage involves identifying potential business opportunities and conducting feasibility studies to determine their viability. Managers assess the technical, financial, and operational aspects of a project before committing resources." delay={0.8} icon={<ClipboardCheck className="h-6 w-6 text-primary/80" />} />
            </div>
          </div>
          {/* Row 4 */}
          <div className="mx-auto w-full max-w-md">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer text="Capital Budgeting" tooltip="Capital budgeting is the process of deciding which long-term investment projects will generate the highest returns for the firm. It uses techniques like Net Present Value (NPV) to rank and select projects that add the most value." delay={0.9} icon={<Calculator className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Working Capital Management" tooltip="This ensures the firm maintains enough short-term assets to cover its immediate liabilities and operational needs. Proper management balances the need for liquidity with the desire to keep funds productively invested." delay={1.0} icon={<Briefcase className="h-6 w-6 text-primary/80" />} />
            </div>
          </div>
          {/* Row 5 */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer text="Dividend Policies" tooltip="These policies determine what portion of net profits should be distributed to shareholders versus reinvested in the company. The decision must balance investor expectations for income with the firm's need for internal growth capital." delay={1.1} icon={<Coins className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Acquisition & Merger" tooltip="These are strategic moves to achieve rapid growth or synergy by combining with or purchasing other existing companies. The focus is on increasing market share, diversifying products, and creating greater value through consolidated operations." delay={1.2} icon={<Handshake className="h-6 w-6 text-primary/80" />} />
              <IconContainer text="Corporate Taxation" tooltip="This involves managing a company's tax liabilities through legal planning and compliance with government fiscal regulations. Efficient tax management ensures the firm meets its legal obligations while maximizing after-tax profits." delay={1.3} icon={<Receipt className="h-6 w-6 text-primary/80" />} />
            </div>
          </div>

          <Radar className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 scale-150" />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-48 px-10 md:px-16 lg:px-24 text-center bg-stone-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-20 pointer-events-none"></div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="font-headline text-4xl md:text-6xl sm:text-4xl lg:text-7xl mb-16 letter-spacing-cinematic leading-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >READY TO MASTER FINANCE.</motion.div>
          </h2>
          <p className="font-body text-outline max-w-xl mx-auto mb-20 text-xl leading-relaxed">
            Start your journey through interactive learning, powerful calculators, and real-world financial problems.
          </p>
          <div className="flex justify-center">
            <Link to="/modules/tvm">
              <button className="bg-primary text-on-primary px-24 py-8 font-label font-bold text-sm tracking-[0.3em] hover:bg-primary-container transition-all duration-500 rounded-none uppercase">
                BEGIN NOW
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
