import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companyAPI } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchCompanyDetails();
  }, [id, refreshKey]);

  const fetchCompanyDetails = async () => {
    setLoading(true);
    try {
      const response = await companyAPI.getById(id);
      setCompany(response.data.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
      alert('Failed to load company details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = () => {
    setShowReviewForm(false);
    setRefreshKey(prev => prev + 1);
  };

  const formatDate = (date) => new Date(date).getFullYear();

  if (loading) return <div className="loading">Loading company details...</div>;
  if (!company) return <div className="error">Company not found</div>;

  return (
    <div className="company-details-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Companies</button>
      <div className="company-header">
        <div className="company-main-info">
          {company.logo ? 
            <img src={company.logo} alt={company.companyName} className="company-logo-large" /> :
            <div className="company-logo-placeholder-large">{company.companyName.charAt(0).toUpperCase()}</div>
          }
          <div className="company-details">
            <h1>{company.companyName}</h1>
            <p className="company-location"><span className="icon">📍</span>{company.city}, {company.location}</p>
            <p className="company-founded"><span className="icon">📅</span>Founded in {formatDate(company.foundedOn)}</p>
            {company.description && <p className="company-description">{company.description}</p>}
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <div className="reviews-actions">
          <button className="add-review-btn" onClick={() => setShowReviewForm(!showReviewForm)}>
            {showReviewForm ? 'Cancel' : '+ Add Review'}
          </button>
        </div>
        {showReviewForm && <ReviewForm companyId={id} onSuccess={handleReviewAdded} />}
        <ReviewList key={refreshKey} companyId={id} averageRating={company.averageRating} 
          totalReviews={company.totalReviews} />
      </div>
    </div>
  );
};

export default CompanyDetails;