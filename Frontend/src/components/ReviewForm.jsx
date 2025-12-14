import { useState } from 'react';
import { reviewAPI } from '../services/api';

const ReviewForm = ({ companyId, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '', subject: '', reviewText: '', rating: 5
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
      const reviewData = { ...formData, companyId, rating: Number(formData.rating) };
      const response = await reviewAPI.create(reviewData);
      alert('Review submitted successfully!');
      setFormData({ fullName: '', subject: '', reviewText: '', rating: 5 });
      if (onSuccess) onSuccess(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Add Your Review</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName}
            onChange={handleChange} required placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input type="text" id="subject" name="subject" value={formData.subject}
            onChange={handleChange} required placeholder="Enter review subject" />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating *</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange} required>
            <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
            <option value="3">⭐⭐⭐ (3 - Average)</option>
            <option value="2">⭐⭐ (2 - Poor)</option>
            <option value="1">⭐ (1 - Terrible)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reviewText">Review *</label>
          <textarea id="reviewText" name="reviewText" value={formData.reviewText}
            onChange={handleChange} required rows="6" placeholder="Share your experience..." />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;