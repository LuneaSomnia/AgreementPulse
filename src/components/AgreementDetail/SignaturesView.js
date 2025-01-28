import React from 'react';

function SignaturesView({ status, signatures }) {
  return (
    <div className="signatures-container">
      <div className="signature-status">
        <h3>Overall Status: {status}</h3>
        <div className="signature-metrics">
          <div className="metric">
            <span>Required:</span> {signatures.required}
          </div>
          <div className="metric">
            <span>Collected:</span> {signatures.collected}
          </div>
          <div className="metric">
            <span>Pending:</span> {signatures.pending}
          </div>
        </div>
      </div>

      <div className="signature-history">
        <h3>Signature History</h3>
        {signatures.history?.map((sign, index) => (
          <div key={index} className="signature-entry">
            <p><strong>{sign.name}</strong> ({sign.role})</p>
            <p>Signed on: {sign.date}</p>
            <span className={`status ${sign.status}`}>{sign.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
