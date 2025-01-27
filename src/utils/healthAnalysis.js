// src/utils/healthAnalysis.js
export const calculateHealthScore = (agreement) => {
  const weights = {
    daysUntilExpiration: 0.3,
    signatureStatus: 0.2,
    complianceScore: 0.2,
    renewalHistory: 0.15,
    engagementScore: 0.15
  };

  const scores = {
    daysUntilExpiration: calculateExpirationScore(agreement.expirationDate),
    signatureStatus: calculateSignatureScore(agreement.signatures),
    complianceScore: agreement.complianceScore || 0,
    renewalHistory: calculateRenewalHistoryScore(agreement.renewalHistory),
    engagementScore: agreement.customerEngagementScore || 0
  };

  return Object.entries(weights).reduce((total, [key, weight]) => {
    return total + (scores[key] * weight);
  }, 0);
};
