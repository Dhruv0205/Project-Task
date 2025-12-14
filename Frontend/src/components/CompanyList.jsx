import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyAPI } from '../services/api';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm, cityFilter, sortBy]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (cityFilter) params.city = cityFilter;
      if (sortBy) params.sortBy = sortBy;
      const response = await companyAPI.getAll(params);
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-list-container">
      <div className="filters-section">
        <input type="text" placeholder="Search companies..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        <input type="text" placeholder="Filter by city..." value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)} className="filter-input" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="">Sort by...</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="reviews">Most Reviews</option>
        </select>
      </div>
      {loading ? <div className="loading">Loading companies...</div> :
        companies.length === 0 ? <div className="no-results">No companies found</div> :
        <div className="companies-grid">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} 
              onClick={() => navigate(`/company/${company._id}`)} />
          ))}
        </div>
      }
    </div>
  );
};

export default CompanyList;