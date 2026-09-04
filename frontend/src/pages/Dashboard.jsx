import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import ApplicationTable from '../components/ApplicationTable';
import ConfirmDialog from '../components/ConfirmDialog';
import applicationService from '../services/applicationService';
import { Briefcase, Clock, CalendarCheck, CheckCircle2, XCircle, ArrowRight, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviews: 0,
    rejected: 0,
    selected: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, appsData] = await Promise.all([
        applicationService.getStats(),
        applicationService.getAllApplications(),
      ]);

      setStats(statsData);
      setRecentApplications(appsData.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load dashboard data. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deletingApp) return;
    try {
      await applicationService.deleteApplication(deletingApp.id);
      setDeletingApp(null);
      fetchData();
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application.');
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Overview Dashboard</h1>
          <p className="page-subtitle">Track, manage, and accelerate your job search application pipeline.</p>
        </div>
        <Link to="/applications/new" className="btn btn-primary">
          <PlusCircle size={16} />
          Add New Application
        </Link>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Applications"
          value={stats.total}
          icon={<Briefcase size={22} />}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <StatCard
          title="Interviews"
          value={stats.interviews}
          icon={<CalendarCheck size={22} />}
          iconBg="#fff7ed"
          iconColor="#c2410c"
        />
        <StatCard
          title="Selected"
          value={stats.selected}
          icon={<CheckCircle2 size={22} />}
          iconBg="#f0fdf4"
          iconColor="#15803d"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<XCircle size={22} />}
          iconBg="#fef2f2"
          iconColor="#b91c1c"
        />
      </div>

      {/* Recent Applications Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Recent Applications</h2>
          <Link to="/applications" className="btn btn-secondary btn-sm">
            View All Applications
            <ArrowRight size={14} />
          </Link>
        </div>

        <ApplicationTable
          applications={recentApplications}
          onDeleteClick={(app) => setDeletingApp(app)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deletingApp)}
        title="Delete Job Application"
        message={`Are you sure you want to delete the application for "${deletingApp?.companyName} - ${deletingApp?.position}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingApp(null)}
      />
    </div>
  );
};

export default Dashboard;
