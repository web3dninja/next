export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  functionality: ['bug', 'error', 'crash', 'broken', 'fail', 'not working', 'issue'],
  performance: ['lag', 'slow', 'freeze', 'performance', 'loading', 'delay'],
  ux: ['ux', 'ui', 'confusing', 'hard', 'layout', 'bad design'],
  pricing: ['expensive', 'overpriced', 'not worth', 'too much'],
  support: ['support', 'help', 'customer service', 'response'],
  feature: ['feature', 'add', 'wish', 'missing'],
};

export const CATEGORY_WEIGHTS: Record<string, number> = {
  functionality: 1.5,
  performance: 1.3,
  ux: 1.2,
  pricing: 1.1,
  support: 1.1,
  feature: 0.8,
  emotion: 1.0,
};

