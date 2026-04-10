import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormulaDisplay from '../../components/ui/FormulaDisplay';
import CalculatorLayout from '../../components/ui/CalculatorLayout';
import Quiz from '../../components/ui/Quiz';
import { costOfDebtIrredeemable, costOfDebtRedeemable, costOfPreferenceShares, costOfEquityDividendModel, costOfEquityCAPM, costOfRetainedEarnings, wacc, formatPercent, formatCurrency } from '../../utils/financial';
import quizData from '../../data/quizData';

export default function CostOfCapitalPage() {
  const [activeTab, setActiveTab] = useState('learn');
  const [calcType, setCalcType] = useState('debt');

  // Cost of Debt
  const [debtType, setDebtType] = useState('irredeemable');
  const [debtInterest, setDebtInterest] = useState('');
  const [debtTax, setDebtTax] = useState('');
  const [debtFace, setDebtFace] = useState('');
  const [debtMarket, setDebtMarket] = useState('');
  const [debtNP, setDebtNP] = useState('');
  const [debtYears, setDebtYears] = useState('');
  const [debtResult, setDebtResult] = useState(null);

  // Cost of Equity
  const [eqMethod, setEqMethod] = useState('dividend');
  const [eqDividend, setEqDividend] = useState('');
  const [eqPrice, setEqPrice] = useState('');
  const [eqGrowth, setEqGrowth] = useState('');
  const [eqRf, setEqRf] = useState('');
  const [eqBeta, setEqBeta] = useState('');
  const [eqRm, setEqRm] = useState('');
  const [eqResult, setEqResult] = useState(null);

  // WACC
  const [waccDebt, setWaccDebt] = useState('');
  const [waccDebtW, setWaccDebtW] = useState('');
  const [waccEquity, setWaccEquity] = useState('');
  const [waccEquityW, setWaccEquityW] = useState('');
  const [waccPref, setWaccPref] = useState('');
  const [waccPrefW, setWaccPrefW] = useState('');
  const [waccResult, setWaccResult] = useState(null);

  const calculateDebt = () => {
    let result;
    if (debtType === 'irredeemable') {
      // Kd = (I * (1-t)) / NP
      result = costOfDebtIrredeemable(Number(debtInterest), Number(debtNP), Number(debtTax));
      setDebtResult([
        { label: 'After-tax Cost of Debt (Kd)', value: formatPercent(result), highlight: 'positive' },
        { label: 'Annual Interest (I)', value: formatCurrency(Number(debtInterest)) },
        { label: 'Net Proceeds (NP)', value: formatCurrency(Number(debtNP)) },
        { label: 'Tax Shield', value: formatPercent(Number(debtInterest) - (Number(debtInterest) * (1 - Number(debtTax) / 100))) },
      ]);
    } else {
      result = costOfDebtRedeemable(Number(debtFace), Number(debtMarket), Number(debtInterest), Number(debtYears), Number(debtTax));
      setDebtResult([
        { label: 'Cost of Redeemable Debt', value: formatPercent(result), highlight: 'positive' },
        { label: 'Face Value', value: formatCurrency(Number(debtFace)) },
        { label: 'Market Price', value: formatCurrency(Number(debtMarket)) },
      ]);
    }
  };

  const calculateEquity = () => {
    let result;
    if (eqMethod === 'dividend') {
      result = costOfEquityDividendModel(Number(eqDividend), Number(eqPrice), Number(eqGrowth));
      setEqResult([
        { label: 'Cost of Equity (Dividend Model)', value: formatPercent(result), highlight: 'positive' },
        { label: 'Dividend Yield', value: formatPercent((Number(eqDividend) / Number(eqPrice)) * 100) },
        { label: 'Growth Rate', value: formatPercent(Number(eqGrowth)) },
      ]);
    } else {
      result = costOfEquityCAPM(Number(eqRf), Number(eqBeta), Number(eqRm));
      setEqResult([
        { label: 'Cost of Equity (CAPM)', value: formatPercent(result), highlight: 'positive' },
        { label: 'Risk Premium', value: formatPercent(Number(eqBeta) * (Number(eqRm) - Number(eqRf))) },
        { label: 'Beta (β)', value: eqBeta },
      ]);
    }
  };

  const calculateWACC = () => {
    const components = [];
    if (waccDebt && waccDebtW) components.push({ cost: Number(waccDebt), weight: Number(waccDebtW) });
    if (waccEquity && waccEquityW) components.push({ cost: Number(waccEquity), weight: Number(waccEquityW) });
    if (waccPref && waccPrefW) components.push({ cost: Number(waccPref), weight: Number(waccPrefW) });
    const result = wacc(components);
    const totalWeight = components.reduce((s, c) => s + c.weight, 0);
    setWaccResult([
      { label: 'WACC', value: formatPercent(result), highlight: 'positive' },
      { label: 'Total Weight', value: `${totalWeight}%` },
      ...components.map((c, i) => ({
        label: ['Debt', 'Equity', 'Preference'][i] + ' Contribution',
        value: formatPercent(c.cost * c.weight / totalWeight),
      })),
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
        <div className="breadcrumb">
          <Link to="/modules">Modules</Link><span>/</span><span className="text-sand-200">Cost of Capital</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">💰</span>
          <div>
            <p className="text-gold/60 text-xs uppercase tracking-[0.3em] font-[var(--font-heading)]">Module 02</p>
            <h1 className="text-3xl md:text-4xl font-[var(--font-heading)] text-sand-100 tracking-wide">Cost of Capital</h1>
          </div>
        </div>
        <p className="text-dune-300 mb-8 max-w-2xl">Understanding the true cost of different sources of funds — debt, equity, preference shares, and the weighted average.</p>

        <div id="calculator-section" style={{ scrollMarginTop: '120px' }} className="flex gap-1 mb-8 p-1 bg-dune-800/50 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="concept-section">
              <h2>Meaning of Cost of Capital</h2>
              <p>Cost of capital is the return expected by the providers of capital (i.e. shareholders, lenders and the debt-holders) to the business as a compensation for their contribution to the total capital. It is also known as <strong>'cut-off' rate, 'hurdle rate', 'minimum rate of return'</strong> etc.</p>
              <div className="mt-4 glass-card p-4">
                <p className="text-gold font-medium mb-2">Used as a benchmark for:</p>
                <ul className="list-disc list-inside text-dune-300 space-y-1">
                  <li>Framing debt policy of a firm.</li>
                  <li>Taking Capital budgeting decisions.</li>
                </ul>
              </div>
            </div>

            <div className="concept-section">
              <h2>Significance of the Cost of Capital</h2>
              <p>The correct cost of capital helps in the following decision making:</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-dune-800/30 rounded-lg border border-gold/10">
                  <h4 className="text-gold mb-1">Investment Options</h4>
                  <p className="text-xs text-dune-400">Evaluating opportunities by discounting benefits with relevant cost.</p>
                </div>
                <div className="p-4 bg-dune-800/30 rounded-lg border border-gold/10">
                  <h4 className="text-gold mb-1">Financing Decisions</h4>
                  <p className="text-xs text-dune-400">Choosing sources with lower cost while considering risk and control.</p>
                </div>
                <div className="p-4 bg-dune-800/30 rounded-lg border border-gold/10">
                  <h4 className="text-gold mb-1">Credit Policy</h4>
                  <p className="text-xs text-dune-400">Appraising credit periods by comparing costs against earned benefits.</p>
                </div>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Cost of Long Term Debt</h2>
              <p>External borrowings do not confer ownership. Long term debt includes loans from financial institutions, debentures, or bonds.</p>
              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <span className="text-gold">•</span>
                  <p className="text-sm"><span className="text-sand-100 font-medium">Face Value:</span> The denominated value on which interest is calculated.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-gold">•</span>
                  <p className="text-sm"><span className="text-sand-100 font-medium">Coupon Rate:</span> Fixed interest rate applied to face value.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-gold">•</span>
                  <p className="text-sm"><span className="text-sand-100 font-medium">Maturity Period:</span> Fixed period for redemption (infinite for irredeemable).</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-gold">•</span>
                  <p className="text-sm"><span className="text-sand-100 font-medium">Tax Shield:</span> Interest is tax-deductible, reducing effective liability.</p>
                </div>
              </div>
            </div>

            <div className="concept-section">
              <h2>Cost of Debt (Kd)</h2>
              <p>Calculated after-tax to reflect the actual cost to the firm.</p>
              <FormulaDisplay title="Irredeemable Debt" formula="Kd = [I(1 - T)] / NP" variables={[
                { symbol: 'Kd', description: 'After-tax cost of debt' },
                { symbol: 'I', description: 'Annual interest payment' },
                { symbol: 'T', description: 'Tax rate' },
                { symbol: 'NP', description: 'Net proceeds (Issue price - flotation cost)' },
              ]} />
              
              <FormulaDisplay title="Redeemable Debt (Approximation Method)" formula="Kd = [I(1-T) + (RV-NP)/n] / [(RV+NP)/2]" variables={[
                { symbol: 'I', description: 'Annual interest' },
                { symbol: 'T', description: 'Tax rate' },
                { symbol: 'RV', description: 'Redemption value' },
                { symbol: 'NP', description: 'Net proceeds' },
                { symbol: 'n', description: 'Years to maturity' },
              ]} />

              <div className="mt-6 bg-gold/5 p-4 rounded-lg border border-gold/10">
                <h4 className="text-gold text-sm font-medium mb-2">YTM Approach (Present Value Method)</h4>
                <p className="text-xs text-dune-300">A superior method calculating the Internal Rate of Return (IRR) at which the current price equals the present value of all future cash flows (interest and redemption).</p>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Cost of Preference Shares (Kp)</h2>
              <p>Preference shares carry a fixed dividend. Unlike debt, preference dividends are not tax-deductible.</p>
              <FormulaDisplay title="Cost of Preference Capital" formula="Kp = Dividend / Net Proceeds × 100" variables={[
                { symbol: 'Kp', description: 'Cost of preference shares' },
                { symbol: 'Dividend', description: 'Annual preference dividend' },
                { symbol: 'Net Proceeds', description: 'Market price minus flotation cost' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Cost of Equity (Ke)</h2>
              <p>The return required by equity shareholders. There are several approaches to its estimation:</p>

              <FormulaDisplay title="Dividend Discount Model (Gordon's Model)" formula="Ke = (D₁ / P₀) + g" variables={[
                { symbol: 'D₁', description: 'Expected dividend (or current dividend)' },
                { symbol: 'P₀', description: 'Current market price' },
                { symbol: 'g', description: 'Growth rate of dividends' },
              ]} />

              <FormulaDisplay title="Earning/Price Approach" formula="Ke = E / P" variables={[
                { symbol: 'E', description: 'Current earnings per share (EPS)' },
                { symbol: 'P', description: 'Market share price' },
              ]} />

              <FormulaDisplay title="Growth Rate Estimation (Gordon's model)" formula="g = b × r" variables={[
                { symbol: 'b', description: 'Retention ratio' },
                { symbol: 'r', description: 'Rate of return on investment' },
              ]} />

              <FormulaDisplay title="Capital Asset Pricing Model (CAPM)" formula="Ke = Rf + β(Rm - Rf)" variables={[
                { symbol: 'Rf', description: 'Risk-free rate of return' },
                { symbol: 'β', description: 'Beta coefficient (systematic risk)' },
                { symbol: 'Rm', description: 'Expected market return' },
              ]} />
              
              <div className="mt-4 glass-card p-4">
                <h4 className="text-gold text-sm font-medium mb-1">Realized Yield Approach</h4>
                <p className="text-xs text-dune-400">Computes cost based on past records of dividends actually realized by shareholders. Assumes past trends will continue.</p>
              </div>
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Cost of Retained Earnings (Kr)</h2>
              <p>Implicit cost of dividends foregone. Cost is usually equal to Ke, but adjusted for personal tax and flotation costs if applicable.</p>
              <FormulaDisplay title="Adjusted Cost of Retained Earnings" formula="Kr = Ke (1 - tp)(1 - f)" variables={[
                { symbol: 'tp', description: 'Rate of personal tax on dividend' },
                { symbol: 'f', description: 'Rate of flotation cost' },
              ]} />
            </div>
            <div className="dune-divider" />

            <div className="concept-section">
              <h2>Weighted Average Cost of Capital (WACC)</h2>
              <p>The overall cost of capital, weighted by the proportion of each source of financing.</p>
              <div className="bg-sand-800/10 border-l-2 border-gold p-4 mb-4">
                <p className="text-xs text-sand-200 uppercase tracking-wider font-bold mb-2">Choice of Weights:</p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-xs text-dune-300"><strong>Book Value (BV):</strong> Operationally easy, includes reserves/surplus.</p>
                  <p className="text-xs text-dune-300"><strong>Market Value (MV):</strong> Preferable; reflects current conditions and risk.</p>
                </div>
              </div>
              <FormulaDisplay title="WACC Formula" formula="WACC = (Wd × Kd) + (We × Ke) + (Wp × Kp)" variables={[
                { symbol: 'W', description: 'Weights of Debt, Equity, Preference' },
                { symbol: 'K', description: 'Individual costs of components' },
              ]} />
            </div>

            <div className="glass-card p-6 text-center">
              <p className="text-dune-300 mb-4">Ready to calculate? Try the calculator or test your knowledge.</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => {
                    setActiveTab('calculator');
                    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="btn-primary !py-2.5 !px-6 !text-xs"
                >
                  Try Calculator
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

        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex gap-1 p-1 bg-dune-800/50 rounded-xl w-fit flex-wrap">
              {[{ id: 'debt', label: 'Cost of Debt' }, { id: 'equity', label: 'Cost of Equity' }, { id: 'wacc', label: 'WACC' }].map((ct) => (
                <button key={ct.id} onClick={() => setCalcType(ct.id)} className={`px-5 py-2 rounded-lg text-sm transition-all ${calcType === ct.id ? 'bg-gold/20 text-gold' : 'text-dune-300 hover:text-sand-200'}`}>
                  {ct.label}
                </button>
              ))}
            </div>

            {calcType === 'debt' && (
              <div>
                <div className="flex gap-3 mb-4">
                  {[{ id: 'irredeemable', label: 'Irredeemable' }, { id: 'redeemable', label: 'Redeemable' }].map((t) => (
                    <button key={t.id} onClick={() => setDebtType(t.id)} className={`px-4 py-2 rounded-lg text-xs border transition-all ${debtType === t.id ? 'border-gold text-gold bg-gold/10' : 'border-sand-800/20 text-dune-400'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <CalculatorLayout
                  title={`Cost of ${debtType === 'irredeemable' ? 'Irredeemable' : 'Redeemable'} Debt`}
                  inputs={debtType === 'irredeemable' ? [
                    { label: 'Annual Interest (I)', unit: '₹', value: debtInterest, onChange: setDebtInterest, placeholder: 'e.g. 12' },
                    { label: 'Net Proceeds (NP)', unit: '₹', value: debtNP, onChange: setDebtNP, placeholder: 'e.g. 94' },
                    { label: 'Tax Rate', unit: '%', value: debtTax, onChange: setDebtTax, placeholder: 'e.g. 35' },
                  ] : [
                    { label: 'Face Value', unit: '₹', value: debtFace, onChange: setDebtFace, placeholder: 'e.g. 1000' },
                    { label: 'Market Price', unit: '₹', value: debtMarket, onChange: setDebtMarket, placeholder: 'e.g. 950' },
                    { label: 'Coupon Rate', unit: '%', value: debtInterest, onChange: setDebtInterest, placeholder: 'e.g. 10' },
                    { label: 'Years to Maturity', value: debtYears, onChange: setDebtYears, placeholder: 'e.g. 5' },
                    { label: 'Tax Rate', unit: '%', value: debtTax, onChange: setDebtTax, placeholder: 'e.g. 30' },
                  ]}
                  onCalculate={calculateDebt}
                  results={debtResult}
                />
              </div>
            )}

            {calcType === 'equity' && (
              <div>
                <div className="flex gap-3 mb-4">
                  {[{ id: 'dividend', label: 'Dividend Model' }, { id: 'capm', label: 'CAPM' }].map((t) => (
                    <button key={t.id} onClick={() => setEqMethod(t.id)} className={`px-4 py-2 rounded-lg text-xs border transition-all ${eqMethod === t.id ? 'border-gold text-gold bg-gold/10' : 'border-sand-800/20 text-dune-400'}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <CalculatorLayout
                  title={eqMethod === 'dividend' ? 'Cost of Equity — Dividend Model' : 'Cost of Equity — CAPM'}
                  inputs={eqMethod === 'dividend' ? [
                    { label: 'Current Dividend (D₁)', unit: '₹', value: eqDividend, onChange: setEqDividend, placeholder: 'e.g. 5' },
                    { label: 'Market Price (P₀)', unit: '₹', value: eqPrice, onChange: setEqPrice, placeholder: 'e.g. 100' },
                    { label: 'Growth Rate (g)', unit: '%', value: eqGrowth, onChange: setEqGrowth, placeholder: 'e.g. 5' },
                  ] : [
                    { label: 'Risk-Free Rate (Rf)', unit: '%', value: eqRf, onChange: setEqRf, placeholder: 'e.g. 6' },
                    { label: 'Beta (β)', value: eqBeta, onChange: setEqBeta, placeholder: 'e.g. 1.2', step: '0.01' },
                    { label: 'Market Return (Rm)', unit: '%', value: eqRm, onChange: setEqRm, placeholder: 'e.g. 14' },
                  ]}
                  onCalculate={calculateEquity}
                  results={eqResult}
                />
              </div>
            )}

            {calcType === 'wacc' && (
              <CalculatorLayout
                title="WACC Calculator"
                description="Enter the cost and weight for each source of capital."
                inputs={[
                  { label: 'Cost of Debt (after-tax)', unit: '%', value: waccDebt, onChange: setWaccDebt, placeholder: 'e.g. 8' },
                  { label: 'Debt Weight', unit: '%', value: waccDebtW, onChange: setWaccDebtW, placeholder: 'e.g. 40' },
                  { label: 'Cost of Equity', unit: '%', value: waccEquity, onChange: setWaccEquity, placeholder: 'e.g. 15' },
                  { label: 'Equity Weight', unit: '%', value: waccEquityW, onChange: setWaccEquityW, placeholder: 'e.g. 50' },
                  { label: 'Cost of Pref. Shares (optional)', unit: '%', value: waccPref, onChange: setWaccPref, placeholder: 'e.g. 10' },
                  { label: 'Pref. Shares Weight', unit: '%', value: waccPrefW, onChange: setWaccPrefW, placeholder: 'e.g. 10' },
                ]}
                onCalculate={calculateWACC}
                results={waccResult}
              />
            )}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Quiz questions={quizData.costOfCapital} moduleTitle="Cost of Capital" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
