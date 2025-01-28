import React from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box } from '@mui/material';

function AgreementDetail({ agreement, open, onClose }) {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {agreement.title}
        <span className={`status-badge ${agreement.healthIndicator}`}>
          {agreement.status}
        </span>
      </DialogTitle>
      <DialogContent>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          <Tab label="Parties" />
          <Tab label="Terms" />
          <Tab label="Signatures" />
          <Tab label="Actions" />
        </Tabs>
        
        <TabPanel value={currentTab} index={0}>
          <PartiesView parties={agreement.detailedView.parties} />
        </TabPanel>
        
        <TabPanel value={currentTab} index={1}>
          <TermsView terms={agreement.detailedView.terms} />
        </TabPanel>
        
        <TabPanel value={currentTab} index={2}>
          <SignaturesView 
            status={agreement.detailedView.signatureStatus}
            signatures={agreement.healthAnalysis.signatures} 
          />
        </TabPanel>
        
        <TabPanel value={currentTab} index={3}>
          <ActionsView actions={agreement.detailedView.pendingActions} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}

// Update AgreementList component to handle clicks
function AgreementList({ agreements }) {
  const [selectedAgreement, setSelectedAgreement] = React.useState(null);

  const handleAgreementClick = (agreement) => {
    setSelectedAgreement(agreement);
  };

  return (
    <>
      <div className="agreement-grid">
        {agreements.map(agreement => (
          <div 
            key={agreement.id} 
            className="agreement-card"
            onClick={() => handleAgreementClick(agreement)}
          >
            {/* Agreement card content */}
          </div>
        ))}
      </div>

      {selectedAgreement && (
        <AgreementDetail 
          agreement={selectedAgreement}
          open={Boolean(selectedAgreement)}
          onClose={() => setSelectedAgreement(null)}
        />
      )}
    </>
  );
}
