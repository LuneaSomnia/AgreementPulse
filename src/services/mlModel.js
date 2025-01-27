import * as tf from '@tensorflow/tfjs';

class RenewalPredictionModel {
  constructor() {
    this.model = null;
    this.featureNames = [
      'daysUntilExpiration',
      'historicalRenewalRate',
      'agreementValue',
      'customerEngagementScore',
      'complianceScore',
      'responseTime',
      'pastRenewals',
      'paymentHistory',
      'usageScore'
    ];
    
    // Pre-trained weights for quick deployment
    this.preTrainedWeights = {
      daysUntilExpiration: 0.15,
      historicalRenewalRate: 0.25,
      agreementValue: 0.10,
      customerEngagementScore: 0.20,
      complianceScore: 0.15,
      responseTime: 0.05,
      pastRenewals: 0.05,
      paymentHistory: 0.03,
      usageScore: 0.02
    };
  }

  async initialize() {
    // For immediate deployment, use simple logistic regression
    // This can be replaced with a proper trained model later
    this.model = {
      predict: (features) => {
        const weightedSum = Object.keys(this.preTrainedWeights)
          .reduce((sum, feature, index) => {
            return sum + (features[index] * this.preTrainedWeights[feature]);
          }, 0);
        
        // Sigmoid activation
        return 1 / (1 + Math.exp(-weightedSum));
      }
    };
  }

  preprocessFeatures(agreementData) {
    // Normalize features to [0,1] range
    return this.featureNames.map(name => {
      const value = agreementData[name] || 0;
      switch(name) {
        case 'daysUntilExpiration':
          return Math.min(value, 365) / 365;
        case 'historicalRenewalRate':
        case 'customerEngagementScore':
        case 'complianceScore':
        case 'usageScore':
          return value / 100;
        case 'agreementValue':
          return Math.min(value, 1000000) / 1000000;
        case 'responseTime':
          return Math.min(value, 30) / 30;
        case 'pastRenewals':
          return Math.min(value, 10) / 10;
        case 'paymentHistory':
          return value; // Assuming already normalized
        default:
          return value;
      }
    });
  }

  async predict(agreementData) {
    if (!this.model) {
      await this.initialize();
    }

    const features = this.preprocessFeatures(agreementData);
    const prediction = this.model.predict(features);

    return {
      renewalLikelihood: Math.round(prediction * 100),
      confidence: this.calculateConfidence(prediction),
      contributingFactors: this.getContributingFactors(features)
    };
  }

  calculateConfidence(prediction) {
    // Distance from decision boundary (0.5)
    return Math.round(Math.abs(prediction - 0.5) * 200);
  }

  getContributingFactors(features) {
    return this.featureNames.map((name, index) => ({
      name,
      impact: features[index] * this.preTrainedWeights[name]
    }))
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3); // Top 3 factors
  }
}

export default new RenewalPredictionModel();
