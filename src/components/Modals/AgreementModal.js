import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function AgreementModal({ agreement, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{agreement?.title}</DialogTitle>
      <DialogContent>
        <div className="agreement-details">
          <div className="detail-item">
            <span>Status:</span>
            <span>{agreement?.status}</span>
          </div>
          <div className="detail-item">
            <span>Health Score:</span>
            <span>{agreement?.healthScore}%</span>
          </div>
          {/* Add more agreement details */}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={() => handleRenewal(agreement)} color="primary">
          Initiate Renewal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default Login;// src/components/Header.js
export default Header;// src/components/AgreementList.js
export default AgreementList;// src/App.js
export default App;// src/index.js
export default App;
