import React from 'react';

function TermsView({ terms }) {
  return (
    <div className="terms-container">
      <div className="term-group">
        <h3>Basic Terms</h3>
        <div className="term-item">
          <span>Duration:</span> {terms.duration}
        </div>
        <div className="term-item">
          <span>Start Date:</span> {terms.startDate}
        </div>
        <div className="term-item">
          <span>End Date:</span> {terms.endDate}
        </div>
        <div className="term-item">
          <span>Value:</span> {terms.value}
        </div>
      </div>

      <div className="term-group">
        <h3>Service Levels</h3>
        <div className="term-item">
          <span>Uptime:</span> {terms.serviceLevel.uptime}
        </div>
        <div className="term-item">
          <span>Response Time:</span> {terms.serviceLevel.responseTime}
        </div>
      </div>

      <div className="term-group">
        <h3>Termination Clauses</h3>
        <ul>
          {terms.terminationClauses.map((clause, index) => (
            <li key={index}>{clause}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
