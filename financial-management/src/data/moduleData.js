export const modules = [
  {
    number: '01', 
    total: '06',
    title: 'Time Value of Money', 
    path: '/modules/tvm', 
    icon: 'hourglass_empty',
    desc: 'Learn Present Value, Future Value, and Annuity calculations — the bedrock of financial analysis.',
    topics: ['Present Value', 'Future Value', 'Annuities'],
    calculators: [
      { name: 'PV Calculator', icon: 'calculate' },
      { name: 'FV Calculator', icon: 'calculate' },
      { name: 'Annuity Calculator', icon: 'calculate' }
    ],
  },
  {
    number: '02', 
    total: '06',
    title: 'Cost of Capital', 
    path: '/modules/cost-of-capital', 
    icon: 'monetization_on',
    desc: 'Understand cost of debt, equity, preference shares, retained earnings, and WACC.',
    topics: ['Cost of Debt', 'Cost of Preference Shares', 'Cost of Equity', 'WACC'],
    calculators: [
      { name: 'Cost of Debt Calculator', icon: 'analytics' },
      { name: 'CAPM Calculator', icon: 'analytics' },
      { name: 'WACC Calculator', icon: 'analytics' }
    ],
  },
  {
    number: '03', 
    total: '06',
    title: 'Leverage', 
    path: '/modules/leverage', 
    icon: 'balance',
    desc: 'Explore operating, financial, and combined leverage with EBIT-EPS analysis.',
    topics: ['Operating Leverage', 'Financial Leverage', 'Combined Leverage', 'EBIT-EPS Analysis'],
    calculators: [
      { name: 'Leverage Calculator', icon: 'balance' },
      { name: 'EBIT-EPS Chart', icon: 'show_chart' }
    ],
  },
  {
    number: '04', 
    total: '06',
    title: 'Capital Structure', 
    path: '/modules/capital-structure', 
    icon: 'account_tree',
    desc: 'Study NI Approach, NOI Approach, and Modigliani-Miller theorem on capital structure.',
    topics: ['Net Income Approach', 'Net Operating Income', 'Modigliani-Miller Theory'],
    calculators: [],
  },
  {
    number: '05', 
    total: '06',
    title: 'Capital Budgeting', 
    path: '/modules/capital-budgeting', 
    icon: 'assessment',
    desc: 'Master NPV, IRR, Payback Period, ARR, Post Payback, and Profitability Index.',
    topics: ['NPV', 'IRR', 'Payback Period', 'ARR', 'Post Payback', 'Profitability Index'],
    calculators: [
      { name: 'NPV Calculator', icon: 'data_exploration' },
      { name: 'IRR Calculator', icon: 'data_exploration' },
      { name: 'Payback Calculator', icon: 'data_exploration' }
    ],
  },
  {
    number: '06', 
    total: '06',
    title: 'Dividend Decisions', 
    path: '/modules/dividend-decisions', 
    icon: 'payments',
    desc: 'Explore Walter and Gordon models to understand how dividend policy impacts share price.',
    topics: ['Walter Model', 'Gordon Model', 'Stable Policy', 'Case Study'],
    calculators: [
      { name: 'Walter Model Solver', icon: 'calculate' },
      { name: 'Scenario Analysis', icon: 'analytics' }
    ],
  },
];
