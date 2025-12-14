const ReviewCard = ({ review, onLike }) => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
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
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">{review.fullName.charAt(0).toUpperCase()}</div>
          <div className="reviewer-details">
            <h4 className="reviewer-name">{review.fullName}</h4>
            <p className="review-date">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="review-rating">{renderStars(review.rating)}</div>
      </div>
      <div className="review-body">
        <h5 className="review-subject">{review.subject}</h5>
        <p className="review-text">{review.reviewText}</p>
      </div>
      <div className="review-footer">
        <button className="like-btn" onClick={onLike}>
          <span className="like-icon">👍</span>
          <span className="like-count">{review.likes}</span>
        </button>
        <button className="share-btn">
          <span className="share-icon">🔗</span>Share
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;