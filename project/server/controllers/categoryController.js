// controllers/categoryController.js
import Category from '../models/Category.js';

/**
 * Fetch all categories from the database.
 * Categories are sorted by their creation time (oldest first).
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new category.
 * Accepts 'name' and optional 'parent_id' from the request body.
 * Saves the new category to the database and returns it.
 */
export const createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      parent_id: req.body.parent_id || null // If no parent_id is provided, it defaults to null (i.e., top-level category)
    });

    const newCategory = await category.save(); // Save the category to the database
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update an existing category.
 * Finds the category by ID from the route param, then updates its name and parent_id.
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Get the category by ID
    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); // If not found, return error
    }

    // Update category fields
    category.name = req.body.name;
    category.parent_id = req.body.parent_id || null;

    const updatedCategory = await category.save(); // Save changes
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a category by ID.
 * Prevents deletion if the category has child categories.
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Find the category to delete
    if (!category) {
      return res.status(404).json({ message: 'Category not found' }); // If not found, return error
    }

    // Check if the category has child categories
    const children = await Category.find({ parent_id: req.params.id });
    if (children.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category with children' }); // Prevent deletion
    }

    await category.deleteOne(); // Delete the category
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
