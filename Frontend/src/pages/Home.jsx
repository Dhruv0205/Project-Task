import { useState } from 'react';
import CompanyForm from '../components/CompanyForm';
import CompanyList from '../components/CompanyList';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCompanyAdded = () => {
    setShowForm(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Review&Rate</h1>
        <button className="add-company-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'View Companies' : '+ Add Company'}
        </button>
      </header>
      <main className="page-content">
        {showForm ? <CompanyForm onSuccess={handleCompanyAdded} /> : <CompanyList key={refreshKey} />}
      </main>
    </div>
  );
};

export default Home;