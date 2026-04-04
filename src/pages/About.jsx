import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-gold/60 text-xs uppercase tracking-[0.4em] mb-4 font-[var(--font-heading)]">About</p>
        <h1 className="section-title text-3xl md:text-4xl mb-8">About FinanceHub</h1>

        <div className="space-y-8 text-dune-300 leading-relaxed">
          <div className="glass-card p-8">
            <h2 className="text-xl font-[var(--font-heading)] text-sand-200 mb-4 tracking-wide">The Vision</h2>
            <p>
              FinanceHub is a comprehensive Financial Management Learning Platform designed to bridge the gap between theoretical financial concepts and practical application. Built with interactive tools, visual learning, and real-world problem solving at its core.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-[var(--font-heading)] text-sand-200 mb-4 tracking-wide">What You'll Learn</h2>
            <ul className="space-y-3">
              {[
                'Time Value of Money — Present Value, Future Value, and Annuity calculations',
                'Cost of Capital — Debt, Equity, Preference Shares, and WACC analysis',
                'Leverage — Operating, Financial, and Combined Leverage with EBIT-EPS analysis',
                'Capital Structure — Net Income, NOI, and Modigliani-Miller theories',
                'Capital Budgeting — NPV, IRR, Payback Period, ARR, and Profitability Index',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-[var(--font-heading)] text-sand-200 mb-4 tracking-wide">Who Is This For?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '📚 Finance & MBA Students',
                '📊 Commerce & Economics Students',
                '🎯 Competitive Exam Aspirants',
                '🌱 Beginners & Self-Learners',
                '💼 Working Professionals',
                '🔬 Research Scholars',
              ].map((user, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg bg-dune-800/30">
                  {user}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-[var(--font-heading)] text-sand-200 mb-4 tracking-wide">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {['React.js', 'Tailwind CSS', 'Framer Motion', 'Chart.js', 'React Router'].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-lg border border-sand-800/20 text-sm text-sand-300 bg-dune-800/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center py-8">
            <div className="inline-flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-dune-900 text-2xl font-bold font-[var(--font-heading)] mb-4">
                AR
              </div>
              <h3 className="text-xl font-[var(--font-heading)] text-sand-100 tracking-wide">Abhinav Raj</h3>
              <p className="text-gold/70 text-sm font-[var(--font-heading)] tracking-wider">MBA F.T</p>
              <p className="text-dune-400 text-sm mt-2">Creator & Developer</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
