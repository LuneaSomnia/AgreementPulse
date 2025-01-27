import docusignAPI from './docusignAPI';

class WebhookHandler {
  constructor() {
    this.eventHandlers = {
      'envelope-sent': this.handleEnvelopeSent.bind(this),
      'envelope-delivered': this.handleEnvelopeDelivered.bind(this),
      'envelope-completed': this.handleEnvelopeCompleted.bind(this),
      'envelope-declined': this.handleEnvelopeDeclined.bind(this),
      'recipient-completed': this.handleRecipientCompleted.bind(this)
    };
  }

  async handleWebhook(event) {
    const eventType = event.event;
    const handler = this.eventHandlers[eventType];
    
    if (handler) {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Error handling webhook event ${eventType}:`, error);
        throw error;
      }
    }
  }

  async handleEnvelopeSent(event) {
    const { envelopeId } = event;
    await docusignAPI.updateAgreementStatus(envelopeId, 'sent');
  }

  async handleEnvelopeDelivered(event) {
    const { envelopeId } = event;
    await docusignAPI.updateAgreementStatus(envelopeId, 'delivered');
  }

  async handleEnvelopeCompleted(event) {
    const { envelopeId } = event;
    await docusignAPI.updateAgreementStatus(envelopeId, 'completed');
    await docusignAPI.processCompletedAgreement(envelopeId);
  }

  async handleEnvelopeDeclined(event) {
    const { envelopeId } = event;
    await docusignAPI.updateAgreementStatus(envelopeId, 'declined');
    await docusignAPI.handleDeclinedAgreement(envelopeId);
  }

  async handleRecipientCompleted(event) {
    const { envelopeId, recipientId } = event;
    await docusignAPI.updateRecipientStatus(envelopeId, recipientId, 'completed');
  }
}

export default new 
