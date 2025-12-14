const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  foundedOn: {
    type: Date,
    required: [true, 'Founded date is required']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

companySchema.index({ companyName: 'text', location: 'text', city: 'text' });

module.exports = mongoose.model('Company', companySchema);