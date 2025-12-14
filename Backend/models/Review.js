const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company ID is required']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  reviewText: {
    type: String,
    required: [true, 'Review text is required']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

reviewSchema.post('save', async function() {
  await this.constructor.updateCompanyRating(this.companyId);
});

reviewSchema.post('remove', async function() {
  await this.constructor.updateCompanyRating(this.companyId);
});

reviewSchema.statics.updateCompanyRating = async function(companyId) {
  const stats = await this.aggregate([
    { $match: { companyId: companyId } },
    {
      $group: {
        _id: '$companyId',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  const Company = mongoose.model('Company');
  
  if (stats.length > 0) {
    await Company.findByIdAndUpdate(companyId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews
    });
  } else {
    await Company.findByIdAndUpdate(companyId, {
      averageRating: 0,
      totalReviews: 0
    });
  }
};

module.exports = mongoose.model('Review', reviewSchema);