import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompanyDetails from './pages/CompanyDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;