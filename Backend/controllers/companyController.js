const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  try {
    const { companyName, location, foundedOn, city, logo, description } = req.body;
    const company = await Company.create({
      companyName, location, foundedOn, city, logo, description
    });
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const { search, city, location, sortBy } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    if (city) query.city = { $regex: city, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    let sortOption = { createdAt: -1 };
    if (sortBy === 'name') sortOption = { companyName: 1 };
    if (sortBy === 'rating') sortOption = { averageRating: -1 };
    if (sortBy === 'reviews') sortOption = { totalReviews: -1 };

    const companies = await Company.find(query).sort(sortOption);
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, 
      { new: true, runValidators: true });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    res.status(200).json({ success: true, message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};