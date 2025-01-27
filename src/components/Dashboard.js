import React, { useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import AgreementList from './AgreementList';
import Insights from './Insights';
import Alerts from './Alerts';
import { mockAgreements } from '../services/mockData';

function Dashboard() {
  const [agreements, setAgreements] = useState(mockAgreements);

  useEffect(() => {
    // Use mock data instead of API call for now
    setAgreements(mockAgreements);
  }, []);

  return (
    <div className="dashboard">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alerts />
          </Grid>
          <Grid item xs={12} md={8}>
            <AgreementList agreements={agreements} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Insights agreements={agreements} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
