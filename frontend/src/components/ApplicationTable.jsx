import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Eye, Edit, Trash2, PlusCircle, MapPin, Calendar } from 'lucide-react';

const ApplicationTable = ({ applications = [], onDeleteClick, showActions = true }) => {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <PlusCircle size={48} strokeWidth={1.5} />
        </div>
        <h3 className="empty-title">No job applications found</h3>
        <p className="empty-desc">
          Start tracking your job search by adding your first application or clearing search filters.
        </p>
        <Link to="/applications/new" className="btn btn-primary">
          <PlusCircle size={16} />
          Add Application
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Interview Date</th>
            {showActions && <th style={{ textAlign: 'right' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.companyName}</td>
              <td style={{ fontWeight: 500 }}>{app.position}</td>
              <td style={{ color: 'var(--text-secondary)' }}>
                {app.location ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={13} color="var(--text-muted)" />
                    {app.location}
                  </span>
                ) : (
                  '-'
                )}
              </td>
              <td>
                <StatusBadge status={app.status} />
              </td>
              <td>{formatDate(app.appliedDate)}</td>
              <td>
                {app.interviewDate ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#c2410c' }}>
                    <Calendar size={13} />
                    {formatDate(app.interviewDate)}
                  </span>
                ) : (
                  '-'
                )}
              </td>
              {showActions && (
                <td style={{ textAlign: 'right' }}>
                  <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                    <Link
                      to={`/applications/${app.id}`}
                      className="btn btn-secondary btn-sm"
                      title="View Details"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                    <Link
                      to={`/applications/${app.id}/edit`}
                      className="btn btn-secondary btn-sm"
                      title="Edit Application"
                    >
                      <Edit size={14} />
                      Edit
                    </Link>
                    <button
                      onClick={() => onDeleteClick(app)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', borderColor: '#fecaca' }}
                      title="Delete Application"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
