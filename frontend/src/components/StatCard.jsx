import React from 'react';

const StatCard = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-info">
        <h3>{title}</h3>
        <div className="stat-card-value">{value !== undefined && value !== null ? value : 0}</div>
      </div>
      <div className="stat-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
