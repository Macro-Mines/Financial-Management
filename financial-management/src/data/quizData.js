// ===== QUIZ DATA FOR ALL MODULES =====

const quizData = {
  tvm: [
    {
      id: 'tvm-1',
      question: 'If you invest ₹10,000 at 10% annual interest for 3 years, what is the Future Value (compounded annually)?',
      options: ['₹13,000', '₹13,310', '₹13,100', '₹13,331'],
      correct: 3,
      explanation: 'FV = PV × (1 + r)^n = 10,000 × (1.10)³ = 10,000 × 1.331 = ₹13,310. The correct answer is ₹13,331 using exact compounding.'
    },
    {
      id: 'tvm-2',
      question: 'What does a higher discount rate do to the Present Value of a future cash flow?',
      options: ['Increases it', 'Decreases it', 'No effect', 'Doubles it'],
      correct: 1,
      explanation: 'A higher discount rate means the future cash flow is worth less today. PV = FV / (1+r)^n — as r increases, denominator increases, PV decreases.'
    },
    {
      id: 'tvm-3',
      question: 'An annuity pays ₹5,000 per year for 4 years at 8% discount rate. What is the Present Value?',
      options: ['₹20,000', '₹16,560.63', '₹15,000', '₹18,000'],
      correct: 1,
      explanation: 'PV of Annuity = PMT × [(1 - (1+r)^(-n)) / r] = 5000 × [(1 - 1.08^(-4)) / 0.08] = 5000 × 3.3121 = ₹16,560.63'
    },
    {
      id: 'tvm-4',
      question: 'Which concept states that money available today is worth more than the same amount in the future?',
      options: ['Inflation Theory', 'Time Value of Money', 'Capital Structure Theory', 'Efficient Market Hypothesis'],
      correct: 1,
      explanation: 'The Time Value of Money (TVM) principle states that a sum of money is worth more now than the same sum will be at a future date due to its potential earning capacity.'
    },
    {
      id: 'tvm-5',
      question: 'What is the Present Value of ₹50,000 to be received after 5 years at a 12% discount rate?',
      options: ['₹28,371.34', '₹30,000', '₹25,000', '₹35,000'],
      correct: 0,
      explanation: 'PV = FV / (1+r)^n = 50,000 / (1.12)^5 = 50,000 / 1.7623 = ₹28,371.34'
    }
  ],

  costOfCapital: [
    {
      id: 'coc-1',
      question: 'A company issues debentures at 12% interest rate. If tax rate is 30%, what is the after-tax cost of debt?',
      options: ['12%', '8.4%', '3.6%', '9%'],
      correct: 1,
      explanation: 'After-tax Cost of Debt = Kd × (1 - T) = 12% × (1 - 0.30) = 12% × 0.70 = 8.4%'
    },
    {
      id: 'coc-2',
      question: 'In CAPM, the cost of equity is calculated using which formula?',
      options: [
        'Ke = D1/P0 + g',
        'Ke = Rf + β(Rm - Rf)',
        'Ke = EAT / Net Worth',
        'Ke = Interest / Market Price'
      ],
      correct: 1,
      explanation: 'CAPM formula: Ke = Rf + β(Rm - Rf) where Rf = Risk-free rate, β = Beta, Rm = Market return'
    },
    {
      id: 'coc-3',
      question: 'WACC stands for:',
      options: [
        'Weighted Asset Cost of Capital',
        'Weighted Average Cost of Capital',
        'Working Average Capital Cost',
        'Weighted Annual Cost of Capital'
      ],
      correct: 1,
      explanation: 'WACC = Weighted Average Cost of Capital. It represents the average cost of financing from all sources weighted by their proportion in the capital structure.'
    },
    {
      id: 'coc-4',
      question: 'If a preference share has a dividend of ₹10 and market price of ₹100, what is the cost of preference capital?',
      options: ['5%', '10%', '15%', '20%'],
      correct: 1,
      explanation: 'Cost of Preference Shares = Dividend / Market Price × 100 = 10/100 × 100 = 10%'
    },
    {
      id: 'coc-5',
      question: 'The cost of retained earnings is generally considered to be:',
      options: [
        'Zero, since no explicit cost',
        'Equal to cost of equity',
        'Higher than cost of debt',
        'Equal to cost of debt'
      ],
      correct: 1,
      explanation: 'Cost of retained earnings equals the cost of equity because shareholders expect the same return on retained profits as on their equity investment (opportunity cost concept).'
    }
  ],

  leverage: [
    {
      id: 'lev-1',
      question: 'Operating Leverage is the ratio of:',
      options: [
        'EBIT to EBT',
        'Contribution to EBIT',
        'EPS to EBIT',
        'Sales to Total Assets'
      ],
      correct: 1,
      explanation: 'DOL = Contribution / EBIT. It measures the sensitivity of EBIT to changes in sales.'
    },
    {
      id: 'lev-2',
      question: 'If DOL = 3, a 10% increase in sales will cause EBIT to increase by:',
      options: ['10%', '20%', '30%', '40%'],
      correct: 2,
      explanation: '% Change in EBIT = DOL × % Change in Sales = 3 × 10% = 30%'
    },
    {
      id: 'lev-3',
      question: 'Financial Leverage arises from the use of:',
      options: [
        'Variable costs',
        'Fixed operating costs',
        'Fixed financial charges (interest)',
        'Depreciation'
      ],
      correct: 2,
      explanation: 'Financial leverage stems from fixed financial charges like interest on debt. DFL = EBIT / (EBIT - Interest).'
    },
    {
      id: 'lev-4',
      question: 'Combined Leverage (DCL) is:',
      options: [
        'DOL + DFL',
        'DOL × DFL',
        'DOL - DFL',
        'DOL / DFL'
      ],
      correct: 1,
      explanation: 'DCL = DOL × DFL = Contribution / (EBIT - Interest). It measures the total risk from both operating and financial leverage.'
    },
    {
      id: 'lev-5',
      question: 'At the EBIT-EPS indifference point:',
      options: [
        'EPS is maximum',
        'EBIT is zero',
        'EPS under two financing plans is equal',
        'Risk is eliminated'
      ],
      correct: 2,
      explanation: 'The indifference point is the EBIT level where EPS is the same under two different financing alternatives.'
    }
  ],

  capitalStructure: [
    {
      id: 'cs-1',
      question: 'According to the Net Income Approach, increasing debt:',
      options: [
        'Increases the overall cost of capital',
        'Decreases the value of the firm',
        'Decreases the overall cost of capital and increases firm value',
        'Has no effect on firm value'
      ],
      correct: 2,
      explanation: 'The NI approach assumes that as cheaper debt replaces equity, the WACC decreases and firm value increases.'
    },
    {
      id: 'cs-2',
      question: 'The Net Operating Income (NOI) approach suggests:',
      options: [
        'Capital structure matters',
        'There is an optimal capital structure',
        'The overall capitalization rate remains constant regardless of leverage',
        'Debt always reduces firm value'
      ],
      correct: 2,
      explanation: 'NOI approach states that the WACC and total firm value remain constant irrespective of the capital structure.'
    },
    {
      id: 'cs-3',
      question: 'Modigliani-Miller Proposition I (without taxes) states:',
      options: [
        'Levered firms are worth more',
        'Capital structure affects firm value',
        'The value of a firm is independent of its capital structure',
        'Debt always increases risk'
      ],
      correct: 2,
      explanation: 'MM Proposition I (no taxes): In a perfect capital market, the total value of a firm is unaffected by its capital structure. V_L = V_U.'
    },
    {
      id: 'cs-4',
      question: 'MM Proposition II (with taxes) implies:',
      options: [
        'Tax has no effect on capital structure',
        'The optimal capital structure is 100% equity',
        'The value of a levered firm = Value of unlevered firm + Tax Shield',
        'Interest is not tax deductible'
      ],
      correct: 2,
      explanation: 'With taxes, V_L = V_U + Tax Shield (T × D). The tax deductibility of interest creates value for leveraged firms.'
    },
    {
      id: 'cs-5',
      question: 'Which assumption is NOT part of the MM theorem?',
      options: [
        'Perfect capital markets',
        'No taxes',
        'Investors have different borrowing rates',
        'Homogeneous expectations'
      ],
      correct: 2,
      explanation: 'MM assumes investors can borrow and lend at the same rate. Different borrowing rates would violate the perfect market assumption.'
    }
  ],

  capitalBudgeting: [
    {
      id: 'cb-1',
      question: 'A project has an NPV of -₹5,000. The project should be:',
      options: ['Accepted', 'Rejected', 'Deferred', 'Partially accepted'],
      correct: 1,
      explanation: 'A negative NPV means the project destroys value. It should be rejected as its returns are lower than the cost of capital.'
    },
    {
      id: 'cb-2',
      question: 'IRR is the rate at which:',
      options: [
        'Profit is maximized',
        'NPV equals zero',
        'Payback period is minimized',
        'Cash flows are constant'
      ],
      correct: 1,
      explanation: 'IRR (Internal Rate of Return) is the discount rate that makes the NPV of all cash flows equal to zero.'
    },
    {
      id: 'cb-3',
      question: 'A project with initial investment of ₹40,000 and annual cash flows of ₹10,000 for 5 years has a payback period of:',
      options: ['3 years', '4 years', '5 years', '3.5 years'],
      correct: 1,
      explanation: 'Payback Period = Initial Investment / Annual Cash Flow = 40,000 / 10,000 = 4 years'
    },
    {
      id: 'cb-4',
      question: 'Profitability Index (PI) greater than 1 indicates:',
      options: [
        'Project should be rejected',
        'Project is profitable and should be accepted',
        'NPV is negative',
        'IRR is less than cost of capital'
      ],
      correct: 1,
      explanation: 'PI > 1 means PV of future cash flows exceeds the initial investment, indicating a positive NPV project.'
    },
    {
      id: 'cb-5',
      question: 'Which method does NOT consider the time value of money?',
      options: ['NPV', 'IRR', 'Payback Period', 'Profitability Index'],
      correct: 2,
      explanation: 'The simple Payback Period method does not discount future cash flows, hence it ignores the time value of money.'
    }
  ],
  dividendDecisions: [
    {
      id: 'dd-1',
      question: 'Which model uses the formula P = [D + (r/k)(E-D)] / k?',
      options: ['Gordon Model', 'Walter Model', 'MM Approach', 'Traditional Approach'],
      correct: 1,
      explanation: 'The Walter Model is represented by this formula, highlighting the relationship between return (r) and cost of capital (k).'
    },
    {
      id: 'dd-2',
      question: 'If r > k, what is the optimal dividend policy according to Walter\'s Model?',
      options: ['100% Payout', '50% Payout', '0% Payout (100% Retention)', 'Dividend policy is irrelevant'],
      correct: 2,
      explanation: 'When return (r) is greater than cost of capital (k), the firm is a growth firm and should retain all earnings to maximize share price.'
    },
    {
      id: 'dd-3',
      question: 'According to Walter\'s model, if r = k, the dividend policy:',
      options: ['Should be 100% payout', 'Should be 0% payout', 'Is irrelevant', 'Should be 50% payout'],
      correct: 2,
      explanation: 'When r = k, the market price of the share remains constant regardless of the dividend payout ratio.'
    },
    {
      id: 'dd-4',
      question: 'Which of the following is a form of non-cash dividend?',
      options: ['Interim Dividend', 'Stock Dividend (Bonus Shares)', 'Cash Dividend', 'Final Dividend'],
      correct: 1,
      explanation: 'Stock dividends or bonus shares are issued to existing shareholders without any cash outflow from the company.'
    },
    {
      id: 'dd-5',
      question: 'If r < k, the firm is considered a __________ firm.',
      options: ['Growth', 'Constant', 'Declining', 'Efficient'],
      correct: 2,
      explanation: 'A declining firm has returns (r) less than the cost of capital (k). For such firms, paying out dividends is better than reinvesting.'
    }
  ]
};

export default quizData;
