import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import Quiz from '../../components/ui/Quiz';
import quizData from '../../data/quizData';

export default function CapitalStructurePage() {
  const [activeTab, setActiveTab] = useState('learn');

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="breadcrumb">
          <Link to="/modules">Modules</Link><span>/</span><span className="text-sand-200">Capital Structure</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">🏗️</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 04</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Capital Structure</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">Theories on the optimal mix of debt and equity financing that minimizes cost and maximizes firm value.</p>

        <div className="flex gap-1 mb-8 p-1 bg-dune-800/50 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="concept-section">
              <h2>What is Capital Structure?</h2>
              <p>Capital structure refers to the mix of long-term debt and equity that a firm uses to finance its operations. The central question is: <strong className="text-sand-200">Does changing the debt-equity mix affect the total value of the firm?</strong></p>
              <p className="mt-3">There are three major theories that attempt to answer this question.</p>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>1. Net Income (NI) Approach</h2>
              <p>Proposed by David Durand, this approach assumes that increasing leverage (debt) <strong className="text-sand-200">always improves</strong> the value of a firm.</p>
              <div className="glass-card p-6 mt-4 space-y-3">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase">Key Assumptions</h4>
                <ul className="text-dune-300 text-sm space-y-2">
                  <li>• Cost of debt (Kd) is constant and less than cost of equity (Ke)</li>
                  <li>• Cost of equity (Ke) remains constant regardless of leverage</li>
                  <li>• As debt increases → WACC decreases → Firm value increases</li>
                  <li>• <strong className="text-sand-200">Optimal structure: 100% debt</strong> (theoretical)</li>
                </ul>
              </div>
              <FormulaDisplay title="Value of Firm (NI Approach)" formula="V = (Net Income / Ke) + Debt" variables={[
                { symbol: 'V', description: 'Total value of the firm' },
                { symbol: 'Ke', description: 'Cost of equity (constant)' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>2. Net Operating Income (NOI) Approach</h2>
              <p>Also by Durand, the NOI approach takes the opposite view — capital structure is <strong className="text-sand-200">irrelevant</strong> to firm value.</p>
              <div className="glass-card p-6 mt-4 space-y-3">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase">Key Assumptions</h4>
                <ul className="text-dune-300 text-sm space-y-2">
                  <li>• Overall capitalization rate (Ko / WACC) remains constant</li>
                  <li>• As debt increases, cost of equity increases proportionally</li>
                  <li>• The benefit of cheaper debt is exactly offset by increased equity risk</li>
                  <li>• <strong className="text-sand-200">No optimal capital structure exists</strong></li>
                </ul>
              </div>
              <FormulaDisplay title="Value of Firm (NOI Approach)" formula="V = NOI / Ko" variables={[
                { symbol: 'V', description: 'Total value of firm (constant)' },
                { symbol: 'NOI', description: 'Net Operating Income' },
                { symbol: 'Ko', description: 'Overall cost of capital (constant)' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>3. Modigliani-Miller (MM) Theory</h2>
              <p>The most influential capital structure theory. MM provided mathematical proof under two scenarios:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="glass-card p-6">
                  <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Proposition I — Without Taxes</h4>
                  <p className="text-dune-300 text-sm mb-3">In a perfect market with no taxes, the value of a levered firm equals the value of an unlevered firm.</p>
                  <div className="formula-box !text-base">V<sub>L</sub> = V<sub>U</sub></div>
                  <p className="text-dune-400 text-xs mt-2">Capital structure is irrelevant.</p>
                </div>
                <div className="glass-card p-6">
                  <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Proposition I — With Taxes</h4>
                  <p className="text-dune-300 text-sm mb-3">When taxes exist, debt creates a tax shield. The levered firm's value exceeds the unlevered firm's value.</p>
                  <div className="formula-box !text-base">V<sub>L</sub> = V<sub>U</sub> + (T × D)</div>
                  <p className="text-dune-400 text-xs mt-2">More debt → higher value (tax shield benefit).</p>
                </div>
              </div>

              <div className="glass-card p-6 mt-6">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">MM Assumptions</h4>
                <ul className="text-dune-300 text-sm space-y-1">
                  <li>• Perfect capital markets (no transaction costs)</li>
                  <li>• Investors can borrow at the same rate as firms</li>
                  <li>• Homogeneous expectations among investors</li>
                  <li>• No bankruptcy costs</li>
                  <li>• All earnings distributed as dividends</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Compare all three theories side by side or take the quiz.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setActiveTab('comparison')} className="btn-primary !py-2.5 !px-6 !text-xs">Comparison Table</button>
                <button onClick={() => setActiveTab('quiz')} className="btn-secondary !py-2.5 !px-6 !text-xs">Take Quiz</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'comparison' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-[var(--font-heading)] text-sand-100 tracking-wide mb-6">Theory Comparison</h3>
            <div className="overflow-x-auto rounded-xl">
              <table className="finance-table min-w-[700px]">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>NI Approach</th>
                    <th>NOI Approach</th>
                    <th>MM Theory</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Cost of Debt (Kd)', 'Constant', 'Constant', 'Constant'],
                    ['Cost of Equity (Ke)', 'Constant', 'Increases with leverage', 'Increases (Prop II)'],
                    ['WACC (Ko)', 'Decreases with debt', 'Constant', 'Without tax: Constant\nWith tax: Decreases'],
                    ['Optimal Structure', '100% Debt', 'No optimum exists', 'Without tax: None\nWith tax: Max debt'],
                    ['Firm Value', 'Increases with debt', 'Constant', 'Without tax: Constant\nWith tax: Increases'],
                    ['Key Factor', 'Cheap debt benefit', 'Risk offset', 'Tax shield'],
                    ['Practical Relevance', 'Low (unrealistic)', 'Moderate', 'High (foundational)'],
                  ].map(([aspect, ni, noi, mm], idx) => (
                    <tr key={idx}>
                      <td className="font-medium text-sand-200">{aspect}</td>
                      <td className="whitespace-pre-line">{ni}</td>
                      <td className="whitespace-pre-line">{noi}</td>
                      <td className="whitespace-pre-line">{mm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.capitalStructure} moduleTitle="Capital Structure" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
