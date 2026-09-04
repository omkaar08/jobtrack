import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import applicationService from '../services/applicationService';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await applicationService.getApplicationById(id);
        setInitialData(data);
      } catch (err) {
        console.error('Error fetching application for edit:', err);
        setErrorMessage('Failed to load application details for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await applicationService.updateApplication(id, formData);
      navigate(`/applications/${id}`);
    } catch (err) {
      console.error('Error updating job application:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Failed to update job application. Please verify form data.');
      }
    } finally {
      setIsSubmitting(false);
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

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Job Application</h1>
          <p className="page-subtitle">Update status, dates, or notes for {initialData?.companyName}.</p>
        </div>
      </div>

      {errorMessage && <div className="alert-error">{errorMessage}</div>}

      <div className="card">
        {initialData && (
          <ApplicationForm
            initialValues={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            buttonText="Update Application"
          />
        )}
      </div>
    </div>
  );
};

export default EditApplication;
