import axios from 'axios';
import { DOCUSIGN_CONFIG } from '../config/docusign';
import mlModel from './mlModel';

class DocuSignService {
  constructor() {
    this.baseUrl = DOCUSIGN_CONFIG.apiUrl;
    this.accessToken = null;
    this.accountId = DOCUSIGN_CONFIG.accountId;
  }

  async initialize() {
    try {
      const response = await axios.post(
        `${DOCUSIGN_CONFIG.authServer}/oauth/token`,
        {
          grant_type: 'client_credentials',
          client_id: DOCUSIGN_CONFIG.integrationKey,
          scope: DOCUSIGN_CONFIG.scopes.join(' ')
        }
      );
      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('DocuSign authentication failed:', error);
      throw error;
    }
  }

  async fetchAgreements(filters = {}) {
    if (!this.accessToken) await this.initialize();
    
    const defaultParams = {
      from_date: '2024-01-01',
      include: 'recipients,documents,custom_fields',
      status: filters.status || 'any'
    };
    
    try {
      const response = await axios.get(
        `${this.baseUrl}/accounts/${this.accountId}/envelopes`,
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` },
          params: { ...defaultParams, ...filters }
        }
      );
      
      const agreements = await this.transformAgreements(response.data.envelopes);
      return this.enrichWithAnalytics(agreements);
    } catch (error) {
      console.error('Error fetching agreements:', error);
      throw error;
    }
  }

  async getDocumentContent(envelopeId, documentId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/accounts/${this.accountId}/envelopes/${envelopeId}/documents/${documentId}`,
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` },
          responseType: 'blob'
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching document content:', error);
      throw error;
    }
  }

  async transformAgreements(envelopes) {
    return Promise.all(envelopes.map(async envelope => {
      const customFields = this.extractCustomFields(envelope);
      const historicalData = await this.fetchHistoricalData(envelope.envelopeId);
      
      return {
        id: envelope.envelopeId,
        title: envelope.emailSubject,
        status: envelope.status,
        created: envelope.createdDateTime,
        expirationDate: envelope.expirationDateTime,
        signers: envelope.recipients.signers,
        documents: envelope.documents,
        customFields,
        historicalData,
        customerEngagementScore: this.calculateEngagementScore(envelope),
        complianceScore: this.calculateComplianceScore(envelope)
      };
    }));
  }

  async enrichWithAnalytics(agreements) {
    return Promise.all(agreements.map(async agreement => {
      const mlData = {
        daysUntilExpiration: this.calculateDaysUntilExpiration(agreement.expirationDate),
        historicalRenewalRate: agreement.historicalData.renewalRate,
        agreementValue: agreement.customFields.agreementValue,
        customerEngagementScore: agreement.customerEngagementScore,
        complianceScore: agreement.complianceScore,
        responseTime: this.calculateResponseTime(agreement),
        pastRenewals: agreement.historicalData.pastRenewals,
        paymentHistory: agreement.historicalData.paymentScore,
        usageScore: agreement.historicalData.usageScore
      };

      const prediction = await mlModel.predict(mlData);
      
      return {
        ...agreement,
        renewalPrediction: prediction,
        healthScore: this.calculateHealthScore(agreement, prediction)
      };
    }));
  }

  calculateEngagementScore(envelope) {
    const factors = {
      responseTime: this.calculateResponseTime(envelope),
      completionRate: envelope.status === 'completed' ? 1 : 0,
      signerEngagement: this.calculateSignerEngagement(envelope.recipients.signers)
    };
    
    return Object.values(factors).reduce((sum, score) => sum + score, 0) / 
           Object.keys(factors).length * 100;
  }

  calculateHealthScore(agreement, prediction) {
    const weights = {
      renewalLikelihood: 0.3,
      complianceScore: 0.3,
      engagementScore: 0.2,
      daysUntilExpiration: 0.2
    };

    const daysUntilExpiration = this.calculateDaysUntilExpiration(agreement.expirationDate);
    const expirationScore = Math.min(100, (daysUntilExpiration / 30) * 100);

    return Math.round(
      prediction.renewalLikelihood * weights.renewalLikelihood +
      agreement.complianceScore * weights.complianceScore +
      agreement.customerEngagementScore * weights.engagementScore +
      expirationScore * weights.daysUntilExpiration
    );
  }

  // Helper methods
  calculateDaysUntilExpiration(expirationDate) {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return Math.max(0, Math.ceil((expiration - today) / (1000 * 60 * 60 * 24)));
  }

  calculateResponseTime(envelope) {
    if (!envelope.sentDateTime || !envelope.respondedDateTime) return 0;
    const sent = new Date(envelope.sentDateTime);
    const responded = new Date(envelope.respondedDateTime);
    return Math.ceil((responded - sent) / (1000 * 60 * 60 * 24));
  }

  calculateSignerEngagement(signers) {
    if (!signers?.length) return 0;
    const signedCount = signers.filter(signer => signer.status === 'completed').length;
    return signedCount / signers.length;
  }

  extractCustomFields(envelope) {
    const fields = {};
    envelope.customFields?.textCustomFields?.forEach(field => {
      fields[field.name] = field.value;
    });
    return fields;
  }

  async fetchHistoricalData(envelopeId) {
    // In a real implementation, this would fetch from your historical database
    return {
      renewalRate: 85,
      pastRenewals: 3,
      paymentScore: 0.95,
      usageScore: 0.88
    };
  }
}

export default new DocuSignService();
