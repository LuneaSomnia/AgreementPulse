import React, { useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import { initiateRenewal } from '../services/docusignAPI';

function RenewalForm({ agreement }) {
  const [formData, setFormData] = useState({
    renewalTerm: '',
    adjustments: '',
    effectiveDate: '',
    renewalType: 'automatic'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await initiateRenewal(agreement.id, formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="renewal-form">
      <FormControl fullWidth margin="normal">
        <Select
          value={formData.renewalType}
          onChange={(e) => setFormData({...formData, renewalType: e.target.value})}
        >
          <MenuItem value="automatic">Automatic Renewal</MenuItem>
          <MenuItem value="manual">Manual Renewal</MenuItem>
          <MenuItem value="renegotiation">Renegotiation</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Renewal Term"
        value={formData.renewalTerm}
        onChange={(e) => setFormData({...formData, renewalTerm: e.target.value})}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Effective Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.effectiveDate}
        onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Renewal
      </Button>
    </form>
  );
}

export default RenewalForm;
