import { useState, useEffect } from 'react';
import { reviewAPI } from '../services/api';
import ReviewCard from './ReviewCard';

const ReviewList = ({ companyId, averageRating, totalReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [companyId, sortBy]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = {};
      if (sortBy) params.sortBy = sortBy;
      const response = await reviewAPI.getByCompany(companyId, params);
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await reviewAPI.like(reviewId);
      setReviews(reviews.map(review => 
        review._id === reviewId ? { ...review, likes: review.likes + 1 } : review
      ));
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i} className={i < rating ? 'star filled' : 'star empty'}>
        {i < rating ? '★' : '☆'}</span>);
    }
    return stars;
  };

  return (
    <div className="review-list-container">
      <div className="reviews-header">
        <div className="average-rating-section">
          <h3>Customer Reviews</h3>
          <div className="average-rating">
            <div className="rating-number">{averageRating.toFixed(1)}</div>
            <div className="rating-stars">{renderStars(Math.round(averageRating))}</div>
            <div className="total-reviews">Based on {totalReviews} reviews</div>
          </div>
        </div>
        <div className="sort-section">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="">Most Recent</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
            <option value="likes">Most Liked</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {loading ? <div className="loading">Loading reviews...</div> :
        reviews.length === 0 ? <div className="no-reviews">No reviews yet. Be the first to review!</div> :
        <div className="reviews-list">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} onLike={() => handleLike(review._id)} />
          ))}
        </div>
      }
    </div>
  );
};

export default ReviewList;