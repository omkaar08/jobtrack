import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ApplicationTable from '../components/ApplicationTable';
import ConfirmDialog from '../components/ConfirmDialog';
import applicationService from '../services/applicationService';
import { Search, Filter, PlusCircle, RefreshCw } from 'lucide-react';

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'ALL');

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getAllApplications(searchTerm, statusFilter);
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Unable to load applications. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, statusFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateQueryParams(val, statusFilter);
  };

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
    updateQueryParams(searchTerm, val);
  };

  const updateQueryParams = (search, status) => {
    const params = {};
    if (search) params.search = search;
    if (status && status !== 'ALL') params.status = status;
    setSearchParams(params);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingApp) return;
    try {
      await applicationService.deleteApplication(deletingApp.id);
      setDeletingApp(null);
      fetchApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Job Applications</h1>
          <p className="page-subtitle">View, search, and filter all your recorded job applications.</p>
        </div>
        <Link to="/applications/new" className="btn btn-primary">
          <PlusCircle size={16} />
          Add Application
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by company name or position..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="input-field"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="filter-select"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {(searchTerm || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
              setSearchParams({});
            }}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={14} />
            Reset Filters
          </button>
        )}
      </div>

      {error && <div className="alert-error">{error}</div>}

      {/* Main Table View */}
      <div className="card">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching applications...</p>
          </div>
        ) : (
          <ApplicationTable
            applications={applications}
            onDeleteClick={(app) => setDeletingApp(app)}
          />
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingApp)}
        title="Delete Application"
        message={`Are you sure you want to delete the job application for "${deletingApp?.companyName} - ${deletingApp?.position}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingApp(null)}
      />
    </div>
  );
};

export default Applications;
