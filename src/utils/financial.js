// ===== FINANCIAL UTILITY FUNCTIONS =====

// ---------- TIME VALUE OF MONEY ----------

export function futureValue(pv, rate, periods) {
  return pv * Math.pow(1 + rate / 100, periods);
}

export function presentValue(fv, rate, periods) {
  return fv / Math.pow(1 + rate / 100, periods);
}

export function annuityPV(pmt, rate, periods) {
  const r = rate / 100;
  if (r === 0) return pmt * periods;
  return pmt * ((1 - Math.pow(1 + r, -periods)) / r);
}

export function annuityFV(pmt, rate, periods) {
  const r = rate / 100;
  if (r === 0) return pmt * periods;
  return pmt * ((Math.pow(1 + r, periods) - 1) / r);
}

// ---------- COST OF CAPITAL ----------

export function costOfDebtIrredeemable(interestRate, taxRate) {
  return interestRate * (1 - taxRate / 100);
}

export function costOfDebtRedeemable(faceValue, marketPrice, couponRate, years, taxRate) {
  const annualInterest = faceValue * (couponRate / 100) * (1 - taxRate / 100);
  const amortization = (faceValue - marketPrice) / years;
  const avgInvestment = (faceValue + marketPrice) / 2;
  return ((annualInterest + amortization) / avgInvestment) * 100;
}

export function costOfPreferenceShares(dividend, marketPrice, flotationCost = 0) {
  const netProceeds = marketPrice - flotationCost;
  return (dividend / netProceeds) * 100;
}

export function costOfEquityDividendModel(currentDividend, marketPrice, growthRate) {
  return ((currentDividend / marketPrice) + growthRate / 100) * 100;
}

export function costOfEquityGordon(nextDividend, marketPrice, growthRate) {
  return ((nextDividend / marketPrice) + growthRate / 100) * 100;
}

export function costOfEquityCAPM(riskFreeRate, beta, marketReturn) {
  return riskFreeRate + beta * (marketReturn - riskFreeRate);
}

export function costOfRetainedEarnings(ke, taxRate = 0, flotationCost = 0) {
  return ke * (1 - taxRate / 100) * (1 - flotationCost / 100);
}

export function wacc(components) {
  // components: [{cost, weight}]
  let totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  return components.reduce((sum, c) => sum + (c.cost * c.weight / totalWeight), 0);
}

// ---------- LEVERAGE ----------

export function operatingLeverage(contribution, ebit) {
  if (ebit === 0) return Infinity;
  return contribution / ebit;
}

export function financialLeverage(ebit, interest) {
  const ebt = ebit - interest;
  if (ebt === 0) return Infinity;
  return ebit / ebt;
}

export function combinedLeverage(dol, dfl) {
  return dol * dfl;
}

export function ebitEPSIndifferencePoint(plan1, plan2) {
  // plan: { shares, interestExpense, taxRate }
  // (EBIT - I1)(1-T)/N1 = (EBIT - I2)(1-T)/N2
  // EBIT(N2 - N1) = I1*N2 - I2*N1
  const { shares: n1, interestExpense: i1 } = plan1;
  const { shares: n2, interestExpense: i2 } = plan2;
  if (n2 === n1) return null;
  return (i1 * n2 - i2 * n1) / (n2 - n1);
}

export function calculateEPS(ebit, interest, taxRate, shares) {
  const ebt = ebit - interest;
  const tax = ebt * (taxRate / 100);
  const eat = ebt - tax;
  return eat / shares;
}

// ---------- CAPITAL BUDGETING ----------

export function npv(initialInvestment, cashFlows, discountRate) {
  const r = discountRate / 100;
  let pvCashFlows = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    pvCashFlows += cashFlows[i] / Math.pow(1 + r, i + 1);
  }
  return pvCashFlows - initialInvestment;
}

export function irr(initialInvestment, cashFlows, guess = 10) {
  let rate = guess / 100;
  const maxIterations = 1000;
  const tolerance = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    let npvValue = -initialInvestment;
    let derivative = 0;
    for (let j = 0; j < cashFlows.length; j++) {
      const factor = Math.pow(1 + rate, j + 1);
      npvValue += cashFlows[j] / factor;
      derivative -= (j + 1) * cashFlows[j] / Math.pow(1 + rate, j + 2);
    }
    if (Math.abs(npvValue) < tolerance) break;
    if (derivative === 0) break;
    rate = rate - npvValue / derivative;
  }
  return rate * 100;
}

export function paybackPeriod(initialInvestment, cashFlows) {
  let cumulative = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    cumulative += cashFlows[i];
    if (cumulative >= initialInvestment) {
      const excess = cumulative - initialInvestment;
      return i + 1 - excess / cashFlows[i];
    }
  }
  return null; // Investment not recovered
}

export function postPaybackProfitability(initialInvestment, cashFlows) {
  const pbPeriod = paybackPeriod(initialInvestment, cashFlows);
  if (pbPeriod === null) return { surplus: 0, index: 0 };
  const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf, 0);
  const surplus = totalCashFlow - initialInvestment;
  return {
    surplus,
    index: surplus / initialInvestment,
    paybackPeriod: pbPeriod
  };
}

export function averageRateOfReturn(averageProfit, initialInvestment, salvageValue = 0) {
  const avgInvestment = (initialInvestment + salvageValue) / 2;
  return (averageProfit / avgInvestment) * 100;
}

export function profitabilityIndex(initialInvestment, cashFlows, discountRate) {
  const r = discountRate / 100;
  let pvCashFlows = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    pvCashFlows += cashFlows[i] / Math.pow(1 + r, i + 1);
  }
  return pvCashFlows / initialInvestment;
}

// ---------- FORMATTERS ----------

export function formatCurrency(value, currency = '₹') {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
  return `${value < 0 ? '-' : ''}${currency}${formatted}`;
}

export function formatPercent(value) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return Number(value).toFixed(decimals);
}
