import React from 'react';
import { Clock, Calendar, CheckCircle2, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getBadgeConfig = (statusKey) => {
    switch (statusKey) {
      case 'APPLIED':
        return {
          label: 'Applied',
          className: 'applied',
          icon: <Clock size={13} />,
        };
      case 'INTERVIEW':
        return {
          label: 'Interview',
          className: 'interview',
          icon: <Calendar size={13} />,
        };
      case 'SELECTED':
        return {
          label: 'Selected',
          className: 'selected',
          icon: <CheckCircle2 size={13} />,
        };
      case 'REJECTED':
        return {
          label: 'Rejected',
          className: 'rejected',
          icon: <XCircle size={13} />,
        };
      default:
        return {
          label: statusKey || 'Unknown',
          className: 'applied',
          icon: <Clock size={13} />,
        };
    }
  };

  const config = getBadgeConfig(status);

  return (
    <span className={`status-badge ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;
