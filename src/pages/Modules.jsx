import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const modules = [
  {
    number: '01', title: 'Time Value of Money', path: '/modules/tvm', icon: '⏳',
    desc: 'Learn Present Value, Future Value, and Annuity calculations — the bedrock of financial analysis.',
    topics: ['Present Value', 'Future Value', 'Annuities'],
    calculators: ['PV Calculator', 'FV Calculator', 'Annuity Calculator'],
  },
  {
    number: '02', title: 'Cost of Capital', path: '/modules/cost-of-capital', icon: '💰',
    desc: 'Understand cost of debt, equity, preference shares, retained earnings, and WACC.',
    topics: ['Cost of Debt', 'Cost of Preference Shares', 'Cost of Equity', 'WACC'],
    calculators: ['Cost of Debt Calculator', 'CAPM Calculator', 'WACC Calculator'],
  },
  {
    number: '03', title: 'Leverage', path: '/modules/leverage', icon: '⚖️',
    desc: 'Explore operating, financial, and combined leverage with EBIT-EPS analysis.',
    topics: ['Operating Leverage', 'Financial Leverage', 'Combined Leverage', 'EBIT-EPS Analysis'],
    calculators: ['Leverage Calculator', 'EBIT-EPS Chart'],
  },
  {
    number: '04', title: 'Capital Structure', path: '/modules/capital-structure', icon: '🏗️',
    desc: 'Study NI Approach, NOI Approach, and Modigliani-Miller theorem on capital structure.',
    topics: ['Net Income Approach', 'Net Operating Income', 'Modigliani-Miller Theory'],
    calculators: [],
  },
  {
    number: '05', title: 'Capital Budgeting', path: '/modules/capital-budgeting', icon: '📊',
    desc: 'Master NPV, IRR, Payback Period, ARR, Post Payback, and Profitability Index.',
    topics: ['NPV', 'IRR', 'Payback Period', 'ARR', 'Post Payback', 'Profitability Index'],
    calculators: ['NPV Calculator', 'IRR Calculator', 'Payback Calculator'],
  },
];

export default function Modules() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gold/60 text-xs uppercase tracking-[0.4em] mb-4 font-[var(--font-heading)]">Learning Path</p>
        <h1 className="section-title text-3xl md:text-4xl mb-4">All Modules</h1>
        <p className="text-dune-300 max-w-2xl mb-12">
          Five comprehensive modules covering the core pillars of financial management. Each module includes concept explanations, interactive calculators, and practice quizzes.
        </p>
      </motion.div>

      <div className="space-y-8">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
          >
            <Link to={mod.path} className="block module-card group">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex items-center gap-4 md:w-16 shrink-0">
                  <span className="text-4xl">{mod.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-dune-500 font-[var(--font-heading)] text-xs tracking-widest">{mod.number}</span>
                    <h2 className="text-xl md:text-2xl font-[var(--font-heading)] text-sand-100 group-hover:text-gold transition-colors tracking-wide">
                      {mod.title}
                    </h2>
                  </div>
                  <p className="text-dune-300 text-sm mb-4 leading-relaxed max-w-2xl">{mod.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mod.topics.map((topic) => (
                      <span key={topic} className="text-xs px-3 py-1 rounded-full border border-sand-800/20 text-dune-400">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {mod.calculators.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-gold/60">
                      <span>🧮</span>
                      <span>{mod.calculators.join(' · ')}</span>
                    </div>
                  )}
                </div>
                <div className="hidden md:flex items-center text-dune-400 group-hover:text-gold transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
