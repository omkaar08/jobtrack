import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

const ApplicationForm = ({ initialValues = {}, onSubmit, isSubmitting = false, buttonText = 'Save Application' }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    location: '',
    status: 'APPLIED',
    appliedDate: new Date().toISOString().split('T')[0],
    interviewDate: '',
    jobUrl: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      setFormData({
        companyName: initialValues.companyName || '',
        position: initialValues.position || '',
        location: initialValues.location || '',
        status: initialValues.status || 'APPLIED',
        appliedDate: initialValues.appliedDate || new Date().toISOString().split('T')[0],
        interviewDate: initialValues.interviewDate || '',
        jobUrl: initialValues.jobUrl || '',
        notes: initialValues.notes || '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Job position is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    if (!formData.appliedDate) {
      newErrors.appliedDate = 'Applied date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      {/* Company Name */}
      <div className="form-group">
        <label className="form-label">
          Company Name <span className="required-star">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="e.g. TCS, Fujitsu, Accenture"
          className="form-control"
        />
        {errors.companyName && <span className="error-text">{errors.companyName}</span>}
      </div>

      {/* Position */}
      <div className="form-group">
        <label className="form-label">
          Job Position <span className="required-star">*</span>
        </label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="e.g. Java Developer, Data Engineer"
          className="form-control"
        />
        {errors.position && <span className="error-text">{errors.position}</span>}
      </div>

      {/* Location */}
      <div className="form-group">
        <label className="form-label">Location (Optional)</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Pune, Remote, Bangalore"
          className="form-control"
        />
      </div>

      {/* Application Status */}
      <div className="form-group">
        <label className="form-label">
          Application Status <span className="required-star">*</span>
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-control"
        >
          <option value="APPLIED">APPLIED</option>
          <option value="INTERVIEW">INTERVIEW</option>
          <option value="SELECTED">SELECTED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        {errors.status && <span className="error-text">{errors.status}</span>}
      </div>

      {/* Applied Date */}
      <div className="form-group">
        <label className="form-label">
          Applied Date <span className="required-star">*</span>
        </label>
        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          className="form-control"
        />
        {errors.appliedDate && <span className="error-text">{errors.appliedDate}</span>}
      </div>

      {/* Interview Date */}
      <div className="form-group">
        <label className="form-label">Interview Date (Optional)</label>
        <input
          type="date"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Job URL */}
      <div className="form-group full-width">
        <label className="form-label">Job Post URL (Optional)</label>
        <input
          type="url"
          name="jobUrl"
          value={formData.jobUrl}
          onChange={handleChange}
          placeholder="https://company.careers/job/1234"
          className="form-control"
        />
      </div>

      {/* Notes */}
      <div className="form-group full-width">
        <label className="form-label">Notes (Optional)</label>
        <textarea
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add details about rounds, interviewer names, key questions, or follow-ups..."
          className="form-control"
        ></textarea>
      </div>

      {/* Form Buttons */}
      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          <X size={16} />
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <Save size={16} />
          {isSubmitting ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
