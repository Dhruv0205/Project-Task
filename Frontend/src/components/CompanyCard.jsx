const CompanyCard = ({ company, onClick }) => {
  const formatDate = (date) => new Date(date).getFullYear();
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<span key={i} className="star filled">★</span>);
      else if (i === fullStars && hasHalfStar) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star empty">☆</span>);
    }
    return stars;
  };

  return (
    <div className="company-card" onClick={onClick}>
      <div className="company-card-header">
        {company.logo ? 
          <img src={company.logo} alt={company.companyName} className="company-logo" /> :
          <div className="company-logo-placeholder">{company.companyName.charAt(0).toUpperCase()}</div>
        }
      </div>
      <div className="company-card-body">
        <h3 className="company-name">{company.companyName}</h3>
        <div className="company-info">
          <p className="company-location"><span className="icon">📍</span>{company.city}, {company.location}</p>
          <p className="company-founded"><span className="icon">📅</span>Founded: {formatDate(company.foundedOn)}</p>
        </div>
        {company.description && (
          <p className="company-description">
            {company.description.substring(0, 100)}{company.description.length > 100 ? '...' : ''}
          </p>
        )}
        <div className="company-rating">
          <div className="stars">{renderStars(company.averageRating)}</div>
          <span className="rating-value">{company.averageRating.toFixed(1)} ({company.totalReviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;