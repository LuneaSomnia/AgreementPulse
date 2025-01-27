// src/services/docusignAPI.js
import axios from 'axios';
import DOCUSIGN_CONFIG from '../config/docusign';

const api = axios.create({
  baseURL: DOCUSIGN_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchAgreements = async () => {
  try {
    const response = await api.get('/agreements', {
      headers: { Authorization: `Bearer ${localStorage.getItem('docusign_token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching agreements:', error);
    throw error;
  }
};

export const getAgreementHealth = async (agreementId) => {
  try {
    const [signatures, compliance, history] = await Promise.all([
      api.get(`/agreements/${agreementId}/signatures`),
      api.get(`/agreements/${agreementId}/compliance`),
      api.get(`/agreements/${agreementId}/history`)
    ]);
    
    return calculateHealthScore(signatures.data, compliance.data, history.data);
  } catch (error) {
    console.error('Error fetching agreement health:', error);
    throw error;
  }
};

export const initiateRenewal = async (agreementId, renewalData) => {
  try {
    const response = await api.post(`/agreements/${agreementId}/renewals`, renewalData);
    return response.data;
  } catch (error) {
    console.error('Error initiating renewal:', error);
    throw error;
  }
};
