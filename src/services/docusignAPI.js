import axios from 'axios';
import { DOCUSIGN_CONFIG } from '../config/docusign';

class DocuSignService {
  constructor() {
    this.baseUrl = DOCUSIGN_CONFIG.apiUrl;
    this.accessToken = null;
  }

  async initialize() {
    try {
      // Get access token using DocuSign JWT Grant
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

  async fetchAgreements() {
    if (!this.accessToken) await this.initialize();
    
    try {
      const response = await axios.get(
        `${this.baseUrl}/accounts/${DOCUSIGN_CONFIG.accountId}/envelopes`,
        {
          headers: { 'Authorization': `Bearer ${this.accessToken}` },
          params: {
            from_date: '2024-01-01'
          }
        }
      );
      
      return this.transformAgreements(response.data.envelopes);
    } catch (error) {
      console.error('Error fetching agreements:', error);
      throw error;
    }
  }

  transformAgreements(envelopes) {
    return envelopes.map(envelope => ({
      id: envelope.envelopeId,
      title: envelope.emailSubject,
      status: envelope.status,
      created: envelope.createdDateTime,
      expirationDate: envelope.expirationDateTime,
      signers: envelope.recipients.signers,
      documents: envelope.documents,
      customerEngagementScore: this.calculateEngagementScore(envelope),
      complianceScore: this.calculateComplianceScore(envelope)
    }));
  }

  calculateEngagementScore(envelope) {
    // Implementation of engagement score calculation
    const factors = {
      responseTime: envelope.respondedDateTime ? 1 : 0,
      completionSpeed: envelope.completedDateTime ? 1 : 0,
      // Add more factors
    };
    
    return Object.values(factors).reduce((sum, score) => sum + score, 0) / Object.keys(factors).length * 100;
  }

  calculateComplianceScore(envelope) {
    // Implementation of compliance score calculation
    return 100; // Placeholder
  }
}

export default new DocuSignService();
