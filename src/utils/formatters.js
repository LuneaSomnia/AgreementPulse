import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('MMMM DD, YYYY');
};

export const calculateHealthScore = (agreement) => {
  const factors = {
    daysUntilExpiration: getDaysUntilExpiration(agreement.expirationDate),
    signatureStatus: getSignatureScore(agreement.signatures),
    complianceScore: agreement.complianceScore || 100
  };
  
  return calculateWeightedScore(factors);
};

export const calculateRenewalLikelihood = (agreement) => {
  // Implementation of renewal likelihood calculation
};
