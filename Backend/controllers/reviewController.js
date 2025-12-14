const Review = require('../models/Review');
const Company = require('../models/Company');

exports.createReview = async (req, res) => {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    const review = await Review.create({ companyId, fullName, subject, reviewText, rating });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getCompanyReviews = async (req, res) => {
  try {
    const { sortBy } = req.query;
    let sortOption = { createdAt: -1 };
    if (sortBy === 'rating-high') sortOption = { rating: -1 };
    if (sortBy === 'rating-low') sortOption = { rating: 1 };
    if (sortBy === 'likes') sortOption = { likes: -1 };
    if (sortBy === 'oldest') sortOption = { createdAt: 1 };

    const reviews = await Review.find({ companyId: req.params.companyId }).sort(sortOption);
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('companyId', 'companyName');
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, 
      { $inc: { likes: 1 } }, { new: true });
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    await review.remove();
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};