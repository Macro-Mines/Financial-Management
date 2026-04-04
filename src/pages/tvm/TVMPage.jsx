import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import CalculatorLayout from '../../components/ui/CalculatorLayout';
import Quiz from '../../components/ui/Quiz';
import { futureValue, presentValue, annuityPV, annuityFV, formatCurrency } from '../../utils/financial';
import quizData from '../../data/quizData';

export default function TVMPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [calcType, setCalcType] = useState('fv');

  // FV Calculator
  const [fvPV, setFvPV] = useState('');
  const [fvRate, setFvRate] = useState('');
  const [fvPeriods, setFvPeriods] = useState('');
  const [fvResult, setFvResult] = useState(null);

  // PV Calculator
  const [pvFV, setPvFV] = useState('');
  const [pvRate, setPvRate] = useState('');
  const [pvPeriods, setPvPeriods] = useState('');
  const [pvResult, setPvResult] = useState(null);

  // Annuity Calculator
  const [annPMT, setAnnPMT] = useState('');
  const [annRate, setAnnRate] = useState('');
  const [annPeriods, setAnnPeriods] = useState('');
  const [annType, setAnnType] = useState('pv');
  const [annResult, setAnnResult] = useState(null);

  const calculateFV = () => {
    const result = futureValue(Number(fvPV), Number(fvRate), Number(fvPeriods));
    setFvResult([
      { label: 'Future Value', value: formatCurrency(result), highlight: 'positive' },
      { label: 'Interest Earned', value: formatCurrency(result - Number(fvPV)) },
      { label: 'Total Periods', value: fvPeriods },
    ]);
  };

  const calculatePV = () => {
    const result = presentValue(Number(pvFV), Number(pvRate), Number(pvPeriods));
    setPvResult([
      { label: 'Present Value', value: formatCurrency(result), highlight: 'positive' },
      { label: 'Discount Amount', value: formatCurrency(Number(pvFV) - result) },
      { label: 'Total Periods', value: pvPeriods },
    ]);
  };

  const calculateAnnuity = () => {
    const result = annType === 'pv'
      ? annuityPV(Number(annPMT), Number(annRate), Number(annPeriods))
      : annuityFV(Number(annPMT), Number(annRate), Number(annPeriods));
    setAnnResult([
      { label: annType === 'pv' ? 'Present Value of Annuity' : 'Future Value of Annuity', value: formatCurrency(result), highlight: 'positive' },
      { label: 'Total Payments', value: formatCurrency(Number(annPMT) * Number(annPeriods)) },
      { label: annType === 'pv' ? 'Total Discount' : 'Total Interest', value: formatCurrency(Math.abs(Number(annPMT) * Number(annPeriods) - result)) },
    ]);
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
          <span className="text-sand-200">Time Value of Money</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">⏳</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 01</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Time Value of Money</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">
          The foundation of all financial decision-making — understanding how the value of money changes over time.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-dune-800/50 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gold/20 text-gold'
                  : 'text-dune-300 hover:text-sand-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="concept-section">
              <h2>What is Time Value of Money?</h2>
              <p>
                The Time Value of Money (TVM) is one of the most fundamental concepts in finance. It states that a sum of money available today is worth more than the same sum in the future due to its potential earning capacity. This core principle underlies all financial decisions — from personal savings to corporate investment analysis.
              </p>
              <p className="mt-3">
                The two key reasons money has time value are: <strong className="text-sand-200">earning potential</strong> (money can be invested to earn returns) and <strong className="text-sand-200">inflation</strong> (purchasing power decreases over time).
              </p>
            </div>

            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Future Value (FV)</h2>
              <p>
                Future Value tells us what a current sum of money will be worth at a specified date in the future, given a certain rate of return. It's the process of <strong className="text-sand-200">compounding</strong>.
              </p>
              <FormulaDisplay
                title="Future Value Formula"
                formula="FV = PV × (1 + r)ⁿ"
                variables={[
                  { symbol: 'FV', description: 'Future Value' },
                  { symbol: 'PV', description: 'Present Value (initial investment)' },
                  { symbol: 'r', description: 'Interest rate per period (as decimal)' },
                  { symbol: 'n', description: 'Number of compounding periods' },
                ]}
              />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Example</h4>
                <p className="text-dune-300 text-sm">
                  If you invest <span className="text-sand-200">₹10,000</span> at <span className="text-sand-200">10% per annum</span> for <span className="text-sand-200">3 years</span>:
                </p>
                <p className="text-sand-200 mt-2 font-mono text-sm">
                  FV = 10,000 × (1 + 0.10)³ = 10,000 × 1.331 = <span className="text-gold font-bold">₹13,310</span>
                </p>
              </div>
            </div>

            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Present Value (PV)</h2>
              <p>
                Present Value is the current worth of a future sum of money. It's the reverse of compounding — the process of <strong className="text-sand-200">discounting</strong>. PV helps answer: "How much is a future amount worth today?"
              </p>
              <FormulaDisplay
                title="Present Value Formula"
                formula="PV = FV / (1 + r)ⁿ"
                variables={[
                  { symbol: 'PV', description: 'Present Value' },
                  { symbol: 'FV', description: 'Future Value' },
                  { symbol: 'r', description: 'Discount rate per period' },
                  { symbol: 'n', description: 'Number of periods' },
                ]}
              />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Example</h4>
                <p className="text-dune-300 text-sm">
                  What is the present value of <span className="text-sand-200">₹50,000</span> to be received after <span className="text-sand-200">5 years</span> at <span className="text-sand-200">12%</span> discount rate?
                </p>
                <p className="text-sand-200 mt-2 font-mono text-sm">
                  PV = 50,000 / (1.12)⁵ = 50,000 / 1.7623 = <span className="text-gold font-bold">₹28,371.34</span>
                </p>
              </div>
            </div>

            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Annuities</h2>
              <p>
                An annuity is a series of equal payments made at regular intervals. Annuities are common in loans (EMIs), insurance, pension plans, and savings schemes. There are two main types:
              </p>
              <ul className="list-disc list-inside text-dune-300 mt-3 space-y-1 text-sm">
                <li><strong className="text-sand-200">Ordinary Annuity</strong> — Payments at the end of each period</li>
                <li><strong className="text-sand-200">Annuity Due</strong> — Payments at the beginning of each period</li>
              </ul>
              <FormulaDisplay
                title="Present Value of Annuity"
                formula="PV = PMT × [(1 - (1+r)⁻ⁿ) / r]"
                variables={[
                  { symbol: 'PMT', description: 'Payment per period' },
                  { symbol: 'r', description: 'Interest rate per period' },
                  { symbol: 'n', description: 'Total number of periods' },
                ]}
              />
              <FormulaDisplay
                title="Future Value of Annuity"
                formula="FV = PMT × [((1+r)ⁿ - 1) / r]"
                variables={[
                  { symbol: 'PMT', description: 'Payment per period' },
                  { symbol: 'r', description: 'Interest rate per period' },
                  { symbol: 'n', description: 'Total number of periods' },
                ]}
              />
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Ready to practice? Try the calculator or test your knowledge.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setActiveTab('calculator')} className="btn-primary !py-2.5 !px-6 !text-xs">Try Calculator</button>
                <button onClick={() => setActiveTab('quiz')} className="btn-secondary !py-2.5 !px-6 !text-xs">Take Quiz</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-fit">
              {[
                { id: 'fv', label: 'Future Value' },
                { id: 'pv', label: 'Present Value' },
                { id: 'annuity', label: 'Annuity' },
              ].map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => setCalcType(ct.id)}
                  className={`px-5 py-2 rounded-lg text-sm transition-all ${
                    calcType === ct.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'
                  }`}
                >
                  {ct.label}
                </button>
              ))}
            </div>

            {calcType === 'fv' && (
              <CalculatorLayout
                title="Future Value Calculator"
                description="Calculate the future value of a present sum at a given interest rate."
                inputs={[
                  { label: 'Present Value', unit: '₹', value: fvPV, onChange: setFvPV, placeholder: 'e.g. 10000' },
                  { label: 'Annual Interest Rate', unit: '%', value: fvRate, onChange: setFvRate, placeholder: 'e.g. 10' },
                  { label: 'Number of Years', value: fvPeriods, onChange: setFvPeriods, placeholder: 'e.g. 5' },
                ]}
                onCalculate={calculateFV}
                results={fvResult}
              />
            )}

            {calcType === 'pv' && (
              <CalculatorLayout
                title="Present Value Calculator"
                description="Calculate the present value of a future sum at a given discount rate."
                inputs={[
                  { label: 'Future Value', unit: '₹', value: pvFV, onChange: setPvFV, placeholder: 'e.g. 50000' },
                  { label: 'Discount Rate', unit: '%', value: pvRate, onChange: setPvRate, placeholder: 'e.g. 12' },
                  { label: 'Number of Years', value: pvPeriods, onChange: setPvPeriods, placeholder: 'e.g. 5' },
                ]}
                onCalculate={calculatePV}
                results={pvResult}
              />
            )}

            {calcType === 'annuity' && (
              <div>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setAnnType('pv')}
                    className={`px-4 py-2 rounded-lg text-xs border transition-all ${
                      annType === 'pv' ? 'border-gold text-gold bg-gold/10' : 'border-sand-800/20 text-dune-400'
                    }`}
                  >
                    PV of Annuity
                  </button>
                  <button
                    onClick={() => setAnnType('fv')}
                    className={`px-4 py-2 rounded-lg text-xs border transition-all ${
                      annType === 'fv' ? 'border-gold text-gold bg-gold/10' : 'border-sand-800/20 text-dune-400'
                    }`}
                  >
                    FV of Annuity
                  </button>
                </div>
                <CalculatorLayout
                  title={annType === 'pv' ? 'Present Value of Annuity' : 'Future Value of Annuity'}
                  description={annType === 'pv' ? 'Calculate the present value of a series of equal periodic payments.' : 'Calculate the future value of a series of equal periodic payments.'}
                  inputs={[
                    { label: 'Payment per Period', unit: '₹', value: annPMT, onChange: setAnnPMT, placeholder: 'e.g. 5000' },
                    { label: 'Interest Rate', unit: '%', value: annRate, onChange: setAnnRate, placeholder: 'e.g. 8' },
                    { label: 'Number of Periods', value: annPeriods, onChange: setAnnPeriods, placeholder: 'e.g. 10' },
                  ]}
                  onCalculate={calculateAnnuity}
                  results={annResult}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.tvm} moduleTitle="Time Value of Money" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
