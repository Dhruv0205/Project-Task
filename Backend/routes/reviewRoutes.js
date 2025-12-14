const express = require('express');
const router = express.Router();
const {
  createReview,
  getCompanyReviews,
  getReview,
  likeReview,
  deleteReview
} = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/company/:companyId', getCompanyReviews);
router.get('/:id', getReview);
router.put('/:id/like', likeReview);
router.delete('/:id', deleteReview);

module.exports = router;