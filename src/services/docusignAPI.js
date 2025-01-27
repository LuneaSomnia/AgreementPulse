import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_DOCUSIGN_API_URL;

export const fetchAgreements = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agreements`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('docusign_token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching agreements:', error);
    throw error;
  }
};

export const getAgreementHealth = async (agreementId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agreements/${agreementId}/health`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agreement health:', error);
    throw error;
  }
};
