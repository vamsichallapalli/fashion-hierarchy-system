// routes/categoryRoutes.js

// Import express to create our router
import express from 'express';

// Import controller functions to handle each category-related action
import {
  getAllCategories,  // Get the list of all categories
  createCategory,    // Add a new category
  updateCategory,    // Edit an existing category
  deleteCategory     // Remove a category
} from '../controllers/categoryController.js';

// Create a new Express router
const router = express.Router();

/**
 * GET /
 * Fetch all categories.
 * This will return an array of all categories from the database.
 */
router.get('/', getAllCategories);

/**
 * POST /
 * Create a new category.
 * Expects category data (name and optional parent_id) in the request body.
 */
router.post('/', createCategory);

/**
 * PUT /:id
 * Update a category by its ID.
 * Sends the updated name and/or parent_id in the request body.
 */
router.put('/:id', updateCategory);

/**
 * DELETE /:id
 * Delete a category by its ID.
 * Will fail if the category has any child categories.
 */
router.delete('/:id', deleteCategory);

// Export the router to be used in our main server file
export default router;
