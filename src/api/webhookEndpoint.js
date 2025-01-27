import express from 'express';
import crypto from 'crypto';
import webhookHandler from '../services/webhookHandler';
import { DOCUSIGN_CONFIG } from '../config/docusign';

const router = express.Router();

// Middleware to validate DocuSign webhook authenticity
const validateWebhook = (req, res, next) => {
  try {
    // Get the signature from headers
    const signature = req.headers['x-docusign-signature-1'];
    if (!signature) {
      return res.status(401).json({ error: 'Missing signature' });
    }

    // Get raw body
    const rawBody = req.rawBody;
    if (!rawBody) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    // Validate HMAC
    const hmac = crypto.createHmac('sha256', DOCUSIGN_CONFIG.webhookSecret);
    hmac.update(rawBody);
    const calculatedSignature = hmac.digest('base64');

    if (signature !== calculatedSignature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
  } catch (error) {
    console.error('Webhook validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to parse raw body for signature validation
const rawBodyParser = (req, res, next) => {
  let data = '';
  req.setEncoding('utf8');

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    req.rawBody = data;
    next();
  });
};

// Webhook endpoint
router.post('/docusign/webhooks',
  rawBodyParser,
  validateWebhook,
  async (req, res) => {
    try {
      const event = JSON.parse(req.rawBody);
      
      // Validate event structure
      if (!event || !event.event || !event.data) {
        return res.status(400).json({ error: 'Invalid event format' });
      }

      // Process the webhook event
      await webhookHandler.handleWebhook(event);

      // Return success response
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
