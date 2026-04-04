import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import CalculatorLayout from '../../components/ui/CalculatorLayout';
import Quiz from '../../components/ui/Quiz';
import { npv, irr, paybackPeriod, postPaybackProfitability, averageRateOfReturn, profitabilityIndex, formatCurrency, formatPercent, formatNumber } from '../../utils/financial';
import quizData from '../../data/quizData';

export default function CapitalBudgetingPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [calcType, setCalcType] = useState('npv');

  // Shared
  const [investment, setInvestment] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [cashFlowInputs, setCashFlowInputs] = useState(['', '', '', '', '']);
  const [calcResult, setCalcResult] = useState(null);

  // ARR extra
  const [arrProfit, setArrProfit] = useState('');
  const [arrSalvage, setArrSalvage] = useState('');

  const updateCashFlow = (idx, value) => {
    const newCFs = [...cashFlowInputs];
    newCFs[idx] = value;
    setCashFlowInputs(newCFs);
  };

  const addCashFlow = () => setCashFlowInputs([...cashFlowInputs, '']);
  const removeCashFlow = () => {
    if (cashFlowInputs.length > 1) setCashFlowInputs(cashFlowInputs.slice(0, -1));
  };

  const getCashFlows = () => cashFlowInputs.map(Number).filter(v => !isNaN(v));

  const calculateNPV = () => {
    const cfs = getCashFlows();
    const result = npv(Number(investment), cfs, Number(discountRate));
    const pi = profitabilityIndex(Number(investment), cfs, Number(discountRate));
    setCalcResult([
      { label: 'NPV', value: formatCurrency(result), highlight: result >= 0 ? 'positive' : 'negative' },
      { label: 'Decision', value: result >= 0 ? '✓ Accept — NPV is positive' : '✗ Reject — NPV is negative' },
      { label: 'PI', value: formatNumber(pi) },
      { label: 'Total Cash Inflows', value: formatCurrency(cfs.reduce((s, c) => s + c, 0)) },
    ]);
  };

  const calculateIRR = () => {
    const cfs = getCashFlows();
    const result = irr(Number(investment), cfs);
    const dr = Number(discountRate) || 0;
    setCalcResult([
      { label: 'IRR', value: formatPercent(result), highlight: 'positive' },
      { label: 'Required Rate', value: formatPercent(dr) },
      { label: 'Decision', value: result >= dr ? '✓ Accept — IRR > Required Rate' : '✗ Reject — IRR < Required Rate' },
    ]);
  };

  const calculatePayback = () => {
    const cfs = getCashFlows();
    const pb = paybackPeriod(Number(investment), cfs);
    const ppb = postPaybackProfitability(Number(investment), cfs);
    setCalcResult([
      { label: 'Payback Period', value: pb !== null ? `${formatNumber(pb)} years` : 'Not recovered', highlight: pb !== null ? 'positive' : 'negative' },
      { label: 'Post-Payback Surplus', value: formatCurrency(ppb.surplus) },
      { label: 'Post-Payback Index', value: formatNumber(ppb.index) },
      { label: 'Total Cash Inflow', value: formatCurrency(cfs.reduce((s, c) => s + c, 0)) },
    ]);
  };

  const calculateARR = () => {
    const result = averageRateOfReturn(Number(arrProfit), Number(investment), Number(arrSalvage));
    setCalcResult([
      { label: 'ARR', value: formatPercent(result), highlight: 'positive' },
      { label: 'Average Investment', value: formatCurrency((Number(investment) + Number(arrSalvage)) / 2) },
      { label: 'Average Annual Profit', value: formatCurrency(Number(arrProfit)) },
    ]);
  };

  const calculatePI = () => {
    const cfs = getCashFlows();
    const pi = profitabilityIndex(Number(investment), cfs, Number(discountRate));
    const npvVal = npv(Number(investment), cfs, Number(discountRate));
    setCalcResult([
      { label: 'Profitability Index', value: formatNumber(pi), highlight: pi >= 1 ? 'positive' : 'negative' },
      { label: 'NPV', value: formatCurrency(npvVal), highlight: npvVal >= 0 ? 'positive' : 'negative' },
      { label: 'Decision', value: pi >= 1 ? '✓ Accept — PI ≥ 1' : '✗ Reject — PI < 1' },
    ]);
  };

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'quiz', label: 'Quiz' },
  ];

  const CashFlowEditor = () => (
    <div className="space-y-2">
      <label className="text-sm text-sand-300 block mb-1">Cash Flows (per year)</label>
      {cashFlowInputs.map((cf, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="text-xs text-dune-400 w-16">Year {idx + 1}</span>
          <input
            type="number"
            value={cf}
            onChange={(e) => updateCashFlow(idx, e.target.value)}
            className="calc-input"
            placeholder="e.g. 30000"
          />
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <button onClick={addCashFlow} className="text-xs text-gold hover:text-gold-light px-3 py-1.5 border border-sand-800/20 rounded-lg transition-colors">+ Add Year</button>
        {cashFlowInputs.length > 1 && (
          <button onClick={removeCashFlow} className="text-xs text-dune-400 hover:text-red-400 px-3 py-1.5 border border-sand-800/20 rounded-lg transition-colors">− Remove</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="breadcrumb">
          <Link to="/modules">Modules</Link><span>/</span><span className="text-sand-200">Capital Budgeting</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">📊</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 05</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Capital Budgeting</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">Decision-making tools for evaluating long-term investment projects — NPV, IRR, Payback, ARR, and Profitability Index.</p>

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
              <h2>What is Capital Budgeting?</h2>
              <p>Capital budgeting is the process of evaluating and selecting long-term investments. These decisions involve large expenditures and affect a firm's future for years, making them critical strategic choices.</p>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>1. Net Present Value (NPV)</h2>
              <p>The gold standard of capital budgeting. NPV is the difference between the present value of cash inflows and the initial investment.</p>
              <FormulaDisplay title="NPV Formula" formula="NPV = Σ[CFₜ / (1+r)ᵗ] − Initial Investment" variables={[
                { symbol: 'CFₜ', description: 'Cash flow in year t' },
                { symbol: 'r', description: 'Discount rate (required rate of return)' },
                { symbol: 't', description: 'Time period' },
              ]} />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Decision Rule</h4>
                <p className="text-dune-300 text-sm">NPV &gt; 0 → <span className="text-green-400">Accept</span> | NPV &lt; 0 → <span className="text-red-400">Reject</span> | NPV = 0 → Indifferent</p>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>2. Internal Rate of Return (IRR)</h2>
              <p>The discount rate that makes NPV equal to zero. If IRR exceeds the required rate of return, the project is acceptable.</p>
              <FormulaDisplay title="IRR Condition" formula="0 = Σ[CFₜ / (1+IRR)ᵗ] − Initial Investment" variables={[
                { symbol: 'IRR', description: 'Rate where NPV = 0' },
              ]} />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Decision Rule</h4>
                <p className="text-dune-300 text-sm">IRR &gt; Required Rate → <span className="text-green-400">Accept</span> | IRR &lt; Required Rate → <span className="text-red-400">Reject</span></p>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>3. Payback Period</h2>
              <p>The time required to recover the initial investment from cash inflows. Simple but ignores time value of money.</p>
              <FormulaDisplay title="Payback Period" formula="Payback = Year before full recovery + (Unrecovered cost / Cash flow in recovery year)" variables={[]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>4. Post Payback Profitability Method</h2>
              <p>Measures the surplus earned after the payback period is complete, overcoming the limitation that payback ignores returns beyond recovery.</p>
              <FormulaDisplay title="Post Payback Profitability" formula="Post Payback Surplus = Total Cash Inflows − Initial Investment" variables={[]} />
              <FormulaDisplay title="Post Payback Profitability Index" formula="PPPI = Surplus / Initial Investment" variables={[]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>5. Average Rate of Return (ARR)</h2>
              <p>Measures profitability as a percentage of the average investment. Also called Accounting Rate of Return.</p>
              <FormulaDisplay title="ARR Formula" formula="ARR = (Average Annual Profit / Average Investment) × 100" variables={[
                { symbol: 'Average Investment', description: '(Initial Investment + Salvage Value) / 2' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>6. Profitability Index (PI)</h2>
              <p>The ratio of PV of cash inflows to the initial investment. A PI greater than 1 indicates a profitable project.</p>
              <FormulaDisplay title="PI Formula" formula="PI = PV of Cash Inflows / Initial Investment" variables={[]} />
              <div className="glass-card p-6 mt-4">
                <h4 className="text-gold text-sm font-[var(--font-heading)] tracking-wider uppercase mb-3">Decision Rule</h4>
                <p className="text-dune-300 text-sm">PI &gt; 1 → <span className="text-green-400">Accept</span> | PI &lt; 1 → <span className="text-red-400">Reject</span></p>
              </div>
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Try the interactive calculators or test your knowledge.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setActiveTab('calculator')} className="btn-primary !py-2.5 !px-6 !text-xs">Try Calculator</button>
                <button onClick={() => setActiveTab('quiz')} className="btn-secondary !py-2.5 !px-6 !text-xs">Take Quiz</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-fit flex-wrap">
              {[
                { id: 'npv', label: 'NPV' },
                { id: 'irr', label: 'IRR' },
                { id: 'payback', label: 'Payback' },
                { id: 'arr', label: 'ARR' },
                { id: 'pi', label: 'PI' },
              ].map((ct) => (
                <button key={ct.id} onClick={() => { setCalcType(ct.id); setCalcResult(null); }} className={`px-4 py-2 rounded-lg text-sm transition-all ${calcType === ct.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
                  {ct.label}
                </button>
              ))}
            </div>

            {calcType === 'arr' ? (
              <CalculatorLayout
                title="Average Rate of Return (ARR)"
                description="Calculate the accounting rate of return on average investment."
                inputs={[
                  { label: 'Initial Investment', unit: '₹', value: investment, onChange: setInvestment, placeholder: 'e.g. 100000' },
                  { label: 'Average Annual Profit', unit: '₹', value: arrProfit, onChange: setArrProfit, placeholder: 'e.g. 20000' },
                  { label: 'Salvage Value', unit: '₹', value: arrSalvage, onChange: setArrSalvage, placeholder: 'e.g. 10000' },
                ]}
                onCalculate={calculateARR}
                results={calcResult}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6 md:p-8 space-y-4">
                  <h3 className="text-xl font-[var(--font-heading)] text-gold tracking-wide">
                    {calcType === 'npv' ? 'NPV Calculator' : calcType === 'irr' ? 'IRR Calculator' : calcType === 'payback' ? 'Payback Period Calculator' : 'Profitability Index Calculator'}
                  </h3>

                  <div>
                    <label className="text-sm text-sand-300 block mb-1.5">Initial Investment (₹)</label>
                    <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} className="calc-input" placeholder="e.g. 100000" />
                  </div>

                  {(calcType === 'npv' || calcType === 'pi') && (
                    <div>
                      <label className="text-sm text-sand-300 block mb-1.5">Discount Rate (%)</label>
                      <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} className="calc-input" placeholder="e.g. 10" />
                    </div>
                  )}
                  {calcType === 'irr' && (
                    <div>
                      <label className="text-sm text-sand-300 block mb-1.5">Required Rate of Return (%)</label>
                      <input type="number" value={discountRate} onChange={(e) => setDiscountRate(e.target.value)} className="calc-input" placeholder="e.g. 10" />
                    </div>
                  )}

                  <CashFlowEditor />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calcType === 'npv' ? calculateNPV : calcType === 'irr' ? calculateIRR : calcType === 'payback' ? calculatePayback : calculatePI}
                    className="btn-primary w-full justify-center mt-4"
                  >
                    Calculate
                  </motion.button>
                </div>

                {calcResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="result-display h-fit">
                    <h4 className="text-sm text-dune-400 uppercase tracking-wider mb-4 font-[var(--font-heading)]">Results</h4>
                    <div className="space-y-4">
                      {calcResult.map((r, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2 border-b border-sand-800/10 last:border-0">
                          <span className="text-sand-300 text-sm">{r.label}</span>
                          <span className={`text-lg font-bold font-mono ${
                            r.highlight === 'positive' ? 'text-green-400' : r.highlight === 'negative' ? 'text-red-400' : 'text-gold'
                          }`}>{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.capitalBudgeting} moduleTitle="Capital Budgeting" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
