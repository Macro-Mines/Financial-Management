import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import CalculatorLayout from '../../components/ui/CalculatorLayout';
import Quiz from '../../components/ui/Quiz';
import { operatingLeverage, financialLeverage, combinedLeverage, calculateEPS, formatNumber, formatCurrency } from '../../utils/financial';
import quizData from '../../data/quizData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function LeveragePage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [calcType, setCalcType] = useState('operating');

  // Operating Leverage
  const [olSales, setOlSales] = useState('');
  const [olVC, setOlVC] = useState('');
  const [olFC, setOlFC] = useState('');
  const [olResult, setOlResult] = useState(null);

  // Financial Leverage
  const [flEBIT, setFlEBIT] = useState('');
  const [flInterest, setFlInterest] = useState('');
  const [flResult, setFlResult] = useState(null);

  // EBIT-EPS Analysis
  const [plan1Shares, setPlan1Shares] = useState('100000');
  const [plan1Interest, setPlan1Interest] = useState('0');
  const [plan2Shares, setPlan2Shares] = useState('60000');
  const [plan2Interest, setPlan2Interest] = useState('200000');
  const [epsTaxRate, setEpsTaxRate] = useState('30');

  const calculateOL = () => {
    const sales = Number(olSales);
    const vc = Number(olVC);
    const fc = Number(olFC);
    const contribution = sales - vc;
    const ebit = contribution - fc;
    const dol = operatingLeverage(contribution, ebit);
    setOlResult([
      { label: 'Contribution', value: formatCurrency(contribution) },
      { label: 'EBIT', value: formatCurrency(ebit), highlight: ebit >= 0 ? 'positive' : 'negative' },
      { label: 'DOL', value: formatNumber(dol), highlight: 'positive' },
      { label: 'Interpretation', value: `${formatNumber(dol)}x magnification of sales change on EBIT` },
    ]);
  };

  const calculateFL = () => {
    const ebit = Number(flEBIT);
    const interest = Number(flInterest);
    const dfl = financialLeverage(ebit, interest);
    const ebt = ebit - interest;
    setFlResult([
      { label: 'EBT', value: formatCurrency(ebt), highlight: ebt >= 0 ? 'positive' : 'negative' },
      { label: 'DFL', value: formatNumber(dfl), highlight: 'positive' },
      { label: 'Interpretation', value: `${formatNumber(dfl)}x magnification of EBIT change on EPS` },
    ]);
  };

  // EBIT-EPS Chart Data
  const ebitEpsData = useMemo(() => {
    const n1 = Number(plan1Shares) || 1;
    const i1 = Number(plan1Interest) || 0;
    const n2 = Number(plan2Shares) || 1;
    const i2 = Number(plan2Interest) || 0;
    const tax = Number(epsTaxRate) || 0;

    // Indifference point
    let indifferenceEBIT = null;
    if (n1 !== n2) {
      indifferenceEBIT = (i1 * n2 - i2 * n1) / (n2 - n1);
    }

    const maxEBIT = Math.max(i1, i2, indifferenceEBIT || 0) * 2.5 || 500000;
    const ebitRange = [];
    for (let e = 0; e <= maxEBIT; e += maxEBIT / 20) {
      ebitRange.push(Math.round(e));
    }

    const plan1EPS = ebitRange.map(e => calculateEPS(e, i1, tax, n1));
    const plan2EPS = ebitRange.map(e => calculateEPS(e, i2, tax, n2));

    return {
      labels: ebitRange.map(e => (e / 1000).toFixed(0) + 'K'),
      datasets: [
        {
          label: 'Plan A (All Equity)',
          data: plan1EPS,
          borderColor: '#c9a96e',
          backgroundColor: 'rgba(201, 169, 110, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: 'Plan B (Debt + Equity)',
          data: plan2EPS,
          borderColor: '#d4883a',
          backgroundColor: 'rgba(212, 136, 58, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
      ],
      indifferenceEBIT,
    };
  }, [plan1Shares, plan1Interest, plan2Shares, plan2Interest, epsTaxRate]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#e2d1b3', font: { family: 'Inter' } } },
      tooltip: { backgroundColor: '#1a1a1a', titleColor: '#c9a96e', bodyColor: '#e2d1b3', borderColor: '#333', borderWidth: 1 },
    },
    scales: {
      x: { title: { display: true, text: 'EBIT (₹)', color: '#888' }, ticks: { color: '#888' }, grid: { color: 'rgba(201,169,110,0.05)' } },
      y: { title: { display: true, text: 'EPS (₹)', color: '#888' }, ticks: { color: '#888' }, grid: { color: 'rgba(201,169,110,0.05)' } },
    },
  };

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'ebit-eps', label: 'EBIT-EPS' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="breadcrumb">
          <Link to="/modules">Modules</Link><span>/</span><span className="text-sand-200">Leverage</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">⚖️</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 03</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Leverage</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">How fixed costs amplify the impact of changes in sales on a firm's earnings — operating, financial, and combined leverage.</p>

        <div className="flex gap-1 mb-8 p-1 bg-dune-800/50 rounded-xl w-fit flex-wrap">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="concept-section">
              <h2>What is Leverage?</h2>
              <p>Leverage refers to the use of fixed costs (operating or financial) to magnify the effects of changes in sales on a company's earnings. Higher leverage means higher risk but also potentially higher returns.</p>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Operating Leverage (DOL)</h2>
              <p>Measures the sensitivity of EBIT to changes in sales. A firm with high fixed operating costs has high operating leverage.</p>
              <FormulaDisplay title="Degree of Operating Leverage" formula="DOL = Contribution / EBIT" variables={[
                { symbol: 'Contribution', description: 'Sales - Variable Costs' },
                { symbol: 'EBIT', description: 'Earnings Before Interest & Tax' },
              ]} />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Interpretation</h4>
                <p className="text-dune-300 text-sm">If DOL = 3, a 10% increase in sales → 30% increase in EBIT. Works both ways — a decline in sales also magnifies EBIT decline.</p>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Financial Leverage (DFL)</h2>
              <p>Measures the sensitivity of EPS to changes in EBIT. Arises from the use of fixed-charge funds (debt).</p>
              <FormulaDisplay title="Degree of Financial Leverage" formula="DFL = EBIT / (EBIT - Interest)" variables={[
                { symbol: 'EBIT', description: 'Earnings Before Interest & Tax' },
                { symbol: 'Interest', description: 'Fixed interest charges on debt' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Combined Leverage (DCL)</h2>
              <p>The total effect of both operating and financial leverage. Measures the sensitivity of EPS to changes in sales.</p>
              <FormulaDisplay title="Degree of Combined Leverage" formula="DCL = DOL × DFL = Contribution / (EBIT - Interest)" variables={[]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>EBIT-EPS Analysis</h2>
              <p>A tool to evaluate different financing alternatives. The <strong className="text-sand-200">indifference point</strong> is the EBIT level where EPS is equal under two different plans.</p>
              <FormulaDisplay title="At Indifference Point" formula="(EBIT - I₁)(1-T) / N₁ = (EBIT - I₂)(1-T) / N₂" variables={[
                { symbol: 'I', description: 'Interest expense under each plan' },
                { symbol: 'N', description: 'Number of shares under each plan' },
                { symbol: 'T', description: 'Tax rate' },
              ]} />
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Explore the interactive EBIT-EPS chart or test your knowledge.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={() => setActiveTab('calculator')} className="btn-primary !py-2.5 !px-6 !text-xs">Try Calculator</button>
                <button onClick={() => setActiveTab('ebit-eps')} className="btn-secondary !py-2.5 !px-6 !text-xs">EBIT-EPS Chart</button>
                <button onClick={() => setActiveTab('quiz')} className="btn-secondary !py-2.5 !px-6 !text-xs">Take Quiz</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-fit">
              {[{ id: 'operating', label: 'Operating' }, { id: 'financial', label: 'Financial' }].map((ct) => (
                <button key={ct.id} onClick={() => setCalcType(ct.id)} className={`px-5 py-2 rounded-lg text-sm transition-all ${calcType === ct.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
                  {ct.label}
                </button>
              ))}
            </div>

            {calcType === 'operating' && (
              <CalculatorLayout
                title="Operating Leverage Calculator"
                inputs={[
                  { label: 'Sales', unit: '₹', value: olSales, onChange: setOlSales, placeholder: 'e.g. 500000' },
                  { label: 'Variable Costs', unit: '₹', value: olVC, onChange: setOlVC, placeholder: 'e.g. 300000' },
                  { label: 'Fixed Costs', unit: '₹', value: olFC, onChange: setOlFC, placeholder: 'e.g. 100000' },
                ]}
                onCalculate={calculateOL}
                results={olResult}
              />
            )}

            {calcType === 'financial' && (
              <CalculatorLayout
                title="Financial Leverage Calculator"
                inputs={[
                  { label: 'EBIT', unit: '₹', value: flEBIT, onChange: setFlEBIT, placeholder: 'e.g. 100000' },
                  { label: 'Interest Expense', unit: '₹', value: flInterest, onChange: setFlInterest, placeholder: 'e.g. 30000' },
                ]}
                onCalculate={calculateFL}
                results={flResult}
              />
            )}
          </motion.div>
        )}

        {activeTab === 'ebit-eps' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-xl font-[var(--font-heading)] text-sand-100 tracking-wide">EBIT-EPS Analysis</h3>
            <p className="text-dune-300 text-sm">Configure two financing plans to compare their EPS at different EBIT levels.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="glass-card p-6">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-4">Plan A (All Equity)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-sand-300 block mb-1">Number of Shares</label>
                    <input type="number" value={plan1Shares} onChange={(e) => setPlan1Shares(e.target.value)} className="calc-input" />
                  </div>
                  <div>
                    <label className="text-sm text-sand-300 block mb-1">Interest Expense (₹)</label>
                    <input type="number" value={plan1Interest} onChange={(e) => setPlan1Interest(e.target.value)} className="calc-input" />
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <h4 className="text-spice text-sm font-[var(--font-heading)] tracking-wider uppercase mb-4">Plan B (Debt + Equity)</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-sand-300 block mb-1">Number of Shares</label>
                    <input type="number" value={plan2Shares} onChange={(e) => setPlan2Shares(e.target.value)} className="calc-input" />
                  </div>
                  <div>
                    <label className="text-sm text-sand-300 block mb-1">Interest Expense (₹)</label>
                    <input type="number" value={plan2Interest} onChange={(e) => setPlan2Interest(e.target.value)} className="calc-input" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 w-fit">
              <label className="text-sm text-sand-300 block mb-1">Tax Rate (%)</label>
              <input type="number" value={epsTaxRate} onChange={(e) => setEpsTaxRate(e.target.value)} className="calc-input !w-32" />
            </div>

            {ebitEpsData.indifferenceEBIT !== null && ebitEpsData.indifferenceEBIT > 0 && (
              <div className="result-display max-w-md">
                <p className="text-sm text-dune-400 uppercase tracking-wider mb-1 font-[var(--font-heading)]">Indifference Point</p>
                <p className="text-2xl font-bold text-gold font-mono">{formatCurrency(ebitEpsData.indifferenceEBIT)}</p>
                <p className="text-sm text-dune-300 mt-2">At this EBIT level, EPS is equal under both plans.</p>
              </div>
            )}

            <div className="glass-card p-6">
              <Line data={ebitEpsData} options={chartOptions} />
            </div>
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.leverage} moduleTitle="Leverage" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
