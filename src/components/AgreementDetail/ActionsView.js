import React from 'react';

function ActionsView({ actions }) {
  return (
    <div className="actions-container">
      <div className="pending-actions">
        <h3>Pending Actions</h3>
        {actions.map((action, index) => (
          <div key={index} className="action-item">
            <span className="action-type">{action.type}</span>
            <span className="action-due">Due: {action.dueDate}</span>
            <button className="action-button">Complete Action</button>
          </div>
        ))}
      </div>
    </div>
  );
}
