import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
categorySchema.index({ parent_id: 1 });
categorySchema.index({ name: 1 });

const Category = mongoose.model('Category', categorySchema);

export default Category;