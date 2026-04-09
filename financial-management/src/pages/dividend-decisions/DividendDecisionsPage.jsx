import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import CalculatorLayout from '../../components/ui/CalculatorLayout';
import Quiz from '../../components/ui/Quiz';
import { walterModel, getWalterComparison, formatCurrency, formatPercent } from '../../utils/financial';
import quizData from '../../data/quizData';

export default function DividendDecisionsPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [calcType, setCalcType] = useState('single');

  // Single Calculator State
  const [sE, setSE] = useState('10');
  const [sD, setSD] = useState('5');
  const [sR, setSR] = useState('15');
  const [sK, setSK] = useState('10');
  const [singleResult, setSingleResult] = useState(null);

  // Comparison Calculator State
  const [cE, setCE] = useState('70');
  const [cK, setCK] = useState('9');
  const [cRg, setCRg] = useState('10');
  const [cRc, setCRc] = useState('9');
  const [cRd, setCRd] = useState('8');
  const [comparisonResults, setComparisonResults] = useState(null);

  const calculateSingle = () => {
    const result = walterModel(Number(sD), Number(sE), Number(sR), Number(sK));
    setSingleResult([
      { label: 'Market Price per Share (P)', value: formatCurrency(result), highlight: 'positive' },
      { label: 'Dividend Payout Ratio', value: formatPercent((Number(sD) / Number(sE)) * 100) },
      { label: 'Retention Ratio', value: formatPercent((1 - Number(sD) / Number(sE)) * 100) },
      {
        label: 'Policy Analysis',
        value: Number(sR) > Number(sK) ? 'Growth Firm (r > k)' : Number(sR) < Number(sK) ? 'Declining Firm (r < k)' : 'Constant Firm (r = k)'
      },
    ]);
  };

  const calculateComparison = () => {
    const results = getWalterComparison(Number(cE), Number(cK), Number(cRg), Number(cRc), Number(cRd));
    setComparisonResults(results);
  };

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/modules">Modules</Link>
          <span>/</span>
          <span className="text-sand-200">Dividend Decisions</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">📘</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 06</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Dividend Decisions</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">
          Understanding the balance between distributing profits to shareholders and retaining them for future growth.
        </p>

        {/* Tabs */}
        <div className="w-full max-w-full overflow-x-auto scrollbar-hide mb-8 select-none">
          <div id="calculator-section" style={{ scrollMarginTop: '120px' }} className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-gold/20 text-gold'
                  : 'text-dune-300 hover:text-sand-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="concept-section">
              <h2>Introduction</h2>
              <p>
                Dividend decision refers to <strong className="text-sand-200">how much profit a firm should distribute to shareholders and how much to retain</strong>. It is a trade-off between paying out cash to satisfy investors and keeping funds for reinvestment.
              </p>
              <div className="glass-card p-6 mt-4 inline-block">
                <p className="text-gold font-bold text-center">Profit = Dividend + Retained Earnings</p>
              </div>
              <ul className="list-disc list-inside text-dune-300 mt-4 space-y-2 text-sm">
                <li><strong className="text-sand-200">More Dividend:</strong> Higher investor satisfaction, less reinvestment.</li>
                <li><strong className="text-sand-200">More Retention:</strong> Higher growth potential, lower current income for shareholders.</li>
              </ul>
            </div>

            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Types of Dividend Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="glass-card p-6">
                  <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Stable Policy</h4>
                  <p className="text-dune-300 text-xs">Fixed dividend per share every year, building investor confidence.</p>
                </div>
                <div className="glass-card p-6">
                  <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Constant Payout</h4>
                  <p className="text-dune-300 text-xs">Fixed % of earnings paid as dividend regardless of profit fluctuations.</p>
                </div>
                <div className="glass-card p-6">
                  <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Residual Policy</h4>
                  <p className="text-dune-300 text-xs">Dividend paid only after all profitable investments are financed.</p>
                </div>
              </div>
            </div>

            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Walter's Approach (Relevance Theory)</h2>
              <p>
                James E. Walter argues that the dividend policy of a firm is <strong className="text-sand-200">relevant</strong> to its share price. He believes management can influence the market price of shares by changing the dividend policy.
              </p>
              <FormulaDisplay
                title="Walter's Model Formula"
                formula="P = [D + (r/k)(E-D)] / k"
                variables={[
                  { symbol: 'P', description: 'Market price per share' },
                  { symbol: 'D', description: 'Dividend per share' },
                  { symbol: 'E', description: 'Earnings per share' },
                  { symbol: 'r', description: 'Internal rate of return on investment' },
                  { symbol: 'k', description: 'Cost of capital (capitalization rate)' },
                ]}
              />
              <div className="glass-card p-6 mt-6 overflow-hidden">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-4 px-1">Decision Rule</h4>
                <div className="w-full overflow-x-auto rounded-lg border border-white/5 custom-scrollbar">
                  <table className="finance-table w-full min-w-[600px]">
                    <thead>
                      <tr>
                        <th>Condition (r vs k)</th>
                        <th>Firm Type</th>
                        <th>Optimal Policy</th>
                        <th>Relation P & D</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-sand-200 font-mono">r &gt; k</td>
                        <td>Growth Firm</td>
                        <td>0% Payout (Retain all)</td>
                        <td>Inverse (↑D → ↓P)</td>
                      </tr>
                      <tr>
                        <td className="text-sand-200 font-mono">r &lt; k</td>
                        <td>Declining Firm</td>
                        <td>100% Payout</td>
                        <td>Direct (↑D → ↑P)</td>
                      </tr>
                      <tr>
                        <td className="text-sand-200 font-mono">r = k</td>
                        <td>Constant Firm</td>
                        <td>Policy Irrelevant</td>
                        <td>No effect</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Explore the impact of different policies using our comparison tool.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setActiveTab('calculator');
                    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary !py-2.5 !px-6 !text-xs"
                >
                  Scenario Analysis
                </button>
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary !py-2.5 !px-6 !text-xs"
                >
                  Take Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-fit">
              {[
                { id: 'single', label: 'Single Solver' },
                { id: 'comparison', label: 'Scenario Analysis' },
              ].map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => setCalcType(ct.id)}
                  className={`px-5 py-2 rounded-lg text-sm transition-all ${calcType === ct.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'
                    }`}
                >
                  {ct.label}
                </button>
              ))}
            </div>

            {calcType === 'single' && (
              <CalculatorLayout
                title="Walter Model Solver"
                description="Calculate share price for a specific dividend policy."
                inputs={[
                  { label: 'Earnings per Share (E)', unit: '₹', value: sE, onChange: setSE, placeholder: 'e.g. 10' },
                  { label: 'Dividend per Share (D)', unit: '₹', value: sD, onChange: setSD, placeholder: 'e.g. 5' },
                  { label: 'Return on Investment (r)', unit: '%', value: sR, onChange: setSR, placeholder: 'e.g. 15' },
                  { label: 'Cost of Capital (k)', unit: '%', value: sK, onChange: setSK, placeholder: 'e.g. 10' },
                ]}
                onCalculate={calculateSingle}
                results={singleResult}
              />
            )}

            {calcType === 'comparison' && (
              <div className="space-y-8">
                <div className="glass-card p-6 md:p-10">
                  <h3 className="text-xl font-[var(--font-heading)] text-sand-100 tracking-wide mb-2">Multi-Firm Comparison</h3>
                  <p className="text-dune-400 text-sm mb-8">Compare share prices for different types of firms across various payout ratios.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-outline">EPS (E)</label>
                      <input type="number" value={cE} onChange={(e) => setCE(e.target.value)} className="w-full bg-surface-container-high border-b border-white/10 p-3 text-sand-100 focus:border-gold outline-none transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-outline">Cost of Capital (k %)</label>
                      <input type="number" value={cK} onChange={(e) => setCK(e.target.value)} className="w-full bg-surface-container-high border-b border-white/10 p-3 text-sand-100 focus:border-gold outline-none transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-outline">r for Growth Firm (%)</label>
                      <input type="number" value={cRg} onChange={(e) => setCRg(e.target.value)} className="w-full bg-surface-container-high border-b border-white/10 p-3 text-sand-100 focus:border-gold outline-none transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-outline">r for Constant Firm (%)</label>
                      <input type="number" value={cRc} onChange={(e) => setCRc(e.target.value)} className="w-full bg-surface-container-high border-b border-white/10 p-3 text-sand-100 focus:border-gold outline-none transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-outline">r for Declining Firm (%)</label>
                      <input type="number" value={cRd} onChange={(e) => setCRd(e.target.value)} className="w-full bg-surface-container-high border-b border-white/10 p-3 text-sand-100 focus:border-gold outline-none transition-colors" />
                    </div>
                  </div>

                  <button onClick={calculateComparison} className="w-full bg-gold text-dune-900 font-label font-bold text-xs tracking-[0.2em] py-5 uppercase hover:bg-gold-light transition-all">
                    Generate Comparison Table
                  </button>

                  {comparisonResults && (
                    <div className="mt-12">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-gold text-xs uppercase tracking-widest">Comparison Results</h4>
                        <div className="flex items-center gap-2 md:hidden">
                          <span className="material-symbols-outlined text-xs text-dune-400">swipe</span>
                          <span className="text-[10px] text-dune-400 uppercase tracking-tighter">Scroll to view more</span>
                        </div>
                      </div>
                      <div className="w-full overflow-x-auto rounded-lg border border-white/5 pb-2 custom-scrollbar">
                        <table className="finance-table w-full text-center min-w-[800px]">
                        <thead>
                          <tr>
                            <th>Payout %</th>
                            <th>Dividend (₹)</th>
                            <th>Growth Firm (r={cRg}%)</th>
                            <th>Constant Firm (r={cRc}%)</th>
                            <th>Declining Firm (r={cRd}%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonResults.map((row, idx) => (
                            <tr key={idx}>
                              <td className="font-mono text-sand-200">{row.payout}%</td>
                              <td>{formatCurrency(row.dividend)}</td>
                              <td className={`${row.payout === 0 && Number(cRg) > Number(cK) ? 'text-gold-light font-bold' : ''}`}>
                                {formatCurrency(row.growth)}
                              </td>
                              <td>{formatCurrency(row.constant)}</td>
                              <td className={`${row.payout === 100 && Number(cRd) < Number(cK) ? 'text-gold-light font-bold' : ''}`}>
                                {formatCurrency(row.declining)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div>
                    </div>
                  )}
                </div>

                {comparisonResults && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 border-l-2 border-gold/40">
                      <h4 className="text-gold text-xs uppercase tracking-widest mb-2">Growth Interpretation</h4>
                      <p className="text-dune-300 text-sm italic">
                        Since r &gt; k ({cRg}% &gt; {cK}%), price is highest when <strong>Dividend = 0</strong>. Retention is the best policy.
                      </p>
                    </div>
                    <div className="glass-card p-6 border-l-2 border-outline/40">
                      <h4 className="text-sand-100 text-xs uppercase tracking-widest mb-2">Constant Interpretation</h4>
                      <p className="text-dune-300 text-sm italic">
                        Since r = k ({cRc}% = {cK}%), price remains the same. Dividend policy is <strong>irrelevant</strong>.
                      </p>
                    </div>
                    <div className="glass-card p-6 border-l-2 border-gold/40">
                      <h4 className="text-gold text-xs uppercase tracking-widest mb-2">Declining Interpretation</h4>
                      <p className="text-dune-300 text-sm italic">
                        Since r &lt; k ({cRd}% &lt; {cK}%), price is highest when <strong>Dividend = {formatCurrency(Number(cE))}</strong> (100% Payout).
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.dividendDecisions} moduleTitle="Dividend Decisions" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
