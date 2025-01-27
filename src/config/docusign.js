const DOCUSIGN_CONFIG = {
  apiUrl: process.env.REACT_APP_API_URL || 'https://demo.docusign.net/restapi/v2.1',
  integrationKey: process.env.REACT_APP_DOCUSIGN_INTEGRATION_KEY,
  accountId: process.env.REACT_APP_DOCUSIGN_ACCOUNT_ID,
  userId: process.env.REACT_APP_DOCUSIGN_USER_ID,
  authServer: 'https://account-d.docusign.com',
  scopes: [
    'signature',
    'impersonation',
    'extended',
  ],
};

export default DOCUSIGN_CONFIG;
