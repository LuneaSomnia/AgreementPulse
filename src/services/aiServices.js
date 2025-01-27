// Pre-trained weights for a simple logistic regression model
const PRE_TRAINED_WEIGHTS = {
  daysUntilExpiration: 0.15,
  historicalRenewalRate: 0.25,
  customerEngagementScore: 0.20,
  agreementValue: 0.15,
  complianceScore: 0.25
};

export const predictRenewalLikelihood = (agreementData) => {
  // Normalize input values
  const normalizedData = {
    daysUntilExpiration: normalizeValue(agreementData.daysUntilExpiration, 0, 365),
    historicalRenewalRate: normalizeValue(agreementData.historicalRenewalRate, 0, 100),
    customerEngagementScore: normalizeValue(agreementData.customerEngagementScore, 0, 100),
    agreementValue: normalizeValue(agreementData.agreementValue, 0, 1000000),
    complianceScore: normalizeValue(agreementData.complianceScore, 0, 100)
  };

  // Calculate weighted sum
  let score = Object.keys(PRE_TRAINED_WEIGHTS).reduce((acc, feature) => {
    return acc + (normalizedData[feature] * PRE_TRAINED_WEIGHTS[feature]);
  }, 0);

  // Apply sigmoid function to get probability
  const probability = 1 / (1 + Math.exp(-score));
  
  return {
    renewalLikelihood: Math.round(probability * 100),
    confidence: calculateConfidence(probability)
  };
};

function normalizeValue(value, min, max) {
  return (value - min) / (max - min);
}

function calculateConfidence(probability) {
  // Calculate confidence based on distance from 0.5
  return Math.round(Math.abs(probability - 0.5) * 200);
}

export const getAgreementHealth = (agreement) => {
  const factors = {
    daysUntilExpiration: agreement.daysUntilExpiration,
    complianceScore: agreement.complianceScore || 100,
    renewalLikelihood: predictRenewalLikelihood(agreement).renewalLikelihood
  };

  // Calculate weighted health score
  const healthScore = (
    factors.daysUntilExpiration * 0.3 +
    factors.complianceScore * 0.4 +
    factors.renewalLikelihood * 0.3
  );

  return Math.round(healthScore);
};
