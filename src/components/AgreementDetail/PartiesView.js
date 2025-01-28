import React from 'react';

function PartiesView({ parties }) {
  return (
    <div className="parties-container">
      <div className="party-section">
        <h3>Provider Details</h3>
        <div className="party-info">
          <h4>{parties.provider.name}</h4>
          <p>{parties.provider.address}</p>
          {parties.provider.representatives.map(rep => (
            <div key={rep.email} className="representative">
              <p><strong>{rep.name}</strong> - {rep.role}</p>
              <p>Email: {rep.email}</p>
              <p>Phone: {rep.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="party-section">
        <h3>Client Details</h3>
        <div className="party-info">
          <h4>{parties.client.name}</h4>
          <p>{parties.client.address}</p>
          {parties.client.representatives.map(rep => (
            <div key={rep.email} className="representative">
              <p><strong>{rep.name}</strong> - {rep.role}</p>
              <p>Email: {rep.email}</p>
              <p>Phone: {rep.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
            }
