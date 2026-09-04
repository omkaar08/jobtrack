import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import applicationService from '../services/applicationService';
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  Edit,
  Trash2,
  ArrowLeft,
  Clock,
  FileText,
} from 'lucide-react';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await applicationService.getApplicationById(id);
        setApplication(data);
      } catch (err) {
        console.error('Error fetching application details:', err);
        setError('Job application not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await applicationService.deleteApplication(id);
      navigate('/applications');
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading application details...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="alert-error">{error || 'Application not found.'}</div>
        <Link to="/applications" className="btn btn-secondary">
          <ArrowLeft size={16} />
          Back to Applications List
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/applications" className="btn btn-secondary btn-sm">
          <ArrowLeft size={14} />
          Back to Applications
        </Link>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {application.companyName}
              </h1>
              <StatusBadge status={application.status} />
            </div>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {application.position}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <Link to={`/applications/${application.id}/edit`} className="btn btn-primary">
              <Edit size={16} />
              Edit
            </Link>
            <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div className="detail-item">
            <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} />
              Location
            </div>
            <div className="detail-value">{application.location || 'Not Specified'}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} />
              Applied Date
            </div>
            <div className="detail-value">{formatDate(application.appliedDate)}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} />
              Interview Date
            </div>
            <div className="detail-value">
              {application.interviewDate ? (
                <span style={{ color: '#c2410c', fontWeight: 600 }}>
                  {formatDate(application.interviewDate)}
                </span>
              ) : (
                'Not Scheduled'
              )}
            </div>
          </div>
        </div>

        {/* Job URL */}
        {application.jobUrl && (
          <div className="detail-item" style={{ marginBottom: '1.75rem' }}>
            <div className="detail-label">Job Post URL</div>
            <div className="detail-value">
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', wordBreak: 'break-all' }}
              >
                {application.jobUrl}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="detail-item" style={{ marginBottom: '1.5rem' }}>
          <div className="detail-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <FileText size={14} />
            Notes & Comments
          </div>
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            {application.notes || 'No notes added for this job application.'}
          </div>
        </div>
      </div>

      {/* Modal Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        title="Delete Job Application"
        message={`Are you sure you want to permanently delete the application for "${application.companyName} - ${application.position}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default ApplicationDetails;
