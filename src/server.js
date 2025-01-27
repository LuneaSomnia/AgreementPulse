const express = require('express');
const docusign = require('docusign-esign');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// DocuSign Configuration
const DOCUSIGN_INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
const DOCUSIGN_USER_ID = process.env.DOCUSIGN_USER_ID;
const DOCUSIGN_ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// JWT Token Generation
const generateJWTToken = async () => {
  const scopes = ['signature', 'impersonation'];
  const jwtLifeSec = 10 * 60; // 10 minutes
  const dsApi = new docusign.ApiClient();
  dsApi.setOAuthBasePath('account-d.docusign.com');
  
  try {
    const results = await dsApi.requestJWTUserToken(
      DOCUSIGN_INTEGRATION_KEY,
      DOCUSIGN_USER_ID,
      scopes,
      PRIVATE_KEY,
      jwtLifeSec
    );
    return results.body.access_token;
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw error;
  }
};

// Webhook Endpoint
app.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    console.log('Received webhook event:', event);
    
    // Validate webhook signature
    // Process envelope status changes
    
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

// Document Signing Route
app.post('/api/create-envelope', async (req, res) => {
  try {
    const accessToken = await generateJWTToken();
    const dsApi = new docusign.ApiClient();
    dsApi.setOAuthBasePath('account-d.docusign.com');
    dsApi.addDefaultHeader('Authorization', `Bearer ${accessToken}`);
    
    // Create and send envelope
    const envelopesApi = new docusign.EnvelopesApi(dsApi);
    // Implement envelope creation logic
    
    res.status(200).json({ message: 'Envelope created successfully' });
  } catch (error) {
    console.error('Error creating envelope:', error);
    res.status(500).json({ error: 'Failed to create envelope' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
