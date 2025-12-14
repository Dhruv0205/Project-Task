import { useState } from 'react';
import { companyAPI } from '../services/api';

const CompanyForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '', location: '', foundedOn: '', city: '', logo: '', description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await companyAPI.create(formData);
      alert('Company added successfully!');
      setFormData({ companyName: '', location: '', foundedOn: '', city: '', logo: '', description: '' });
      if (onSuccess) onSuccess(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-form-container">
      <h2>Add New Company</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="company-form">
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input type="text" id="companyName" name="companyName" value={formData.companyName}
            onChange={handleChange} required placeholder="Enter company name" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input type="text" id="location" name="location" value={formData.location}
            onChange={handleChange} required placeholder="Enter location" />
        </div>
        <div className="form-group">
          <label htmlFor="foundedOn">Founded On *</label>
          <input type="date" id="foundedOn" name="foundedOn" value={formData.foundedOn}
            onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input type="text" id="city" name="city" value={formData.city}
            onChange={handleChange} required placeholder="Enter city" />
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo URL (optional)</label>
          <input type="url" id="logo" name="logo" value={formData.logo}
            onChange={handleChange} placeholder="Enter logo URL" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea id="description" name="description" value={formData.description}
            onChange={handleChange} rows="4" placeholder="Enter company description" />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Company'}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;