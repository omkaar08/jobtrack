import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import applicationService from '../services/applicationService';

const AddApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await applicationService.createApplication(formData);
      navigate('/applications');
    } catch (err) {
      console.error('Error creating job application:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Failed to save job application. Please check input data.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add Job Application</h1>
          <p className="page-subtitle">Record details of a new job opportunity you applied for.</p>
        </div>
      </div>

      {errorMessage && <div className="alert-error">{errorMessage}</div>}

      <div className="card">
        <ApplicationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          buttonText="Save Application"
        />
      </div>
    </div>
  );
};

export default AddApplication;
