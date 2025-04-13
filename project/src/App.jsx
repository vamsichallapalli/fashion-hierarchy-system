/**
 * App.jsx
 * 
 * This is the main component of the Category Management UI.
 * 
 * It handles:
 * - Fetching fashion categories from the backend using an API
 * - Displaying them in a hierarchical tree structure using `CategoryTree`
 * - Providing functionality to add, edit, or delete categories using a modal (`CategoryModal`)
 * - Supporting both root and sub-category management
 * - Managing loading and error states during API calls
 */

import React, { useState, useEffect } from 'react';
import { api } from './lib/api'; // API methods for CRUD operations
import CategoryTree from './components/CategoryTree'; // Component to display nested categories
import CategoryModal from './components/CategoryModal'; // Modal component for Add/Edit category
import { Plus } from 'lucide-react'; // Icon for the Add button

function App() {
  // State to manage category data
  const [categories, setCategories] = useState([]);

  // Modal visibility control
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stores the category being edited
  const [editCategory, setEditCategory] = useState(null);

  // Stores the parent ID when adding a subcategory
  const [selectedParentId, setSelectedParentId] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      console.log("data", data);
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on initial render
  useEffect(() => {
    fetchCategories();
  }, []);

  // Open modal to add a new root or subcategory
  const handleAdd = (parentId = null) => {
    setEditCategory(null); // Reset edit mode
    setSelectedParentId(parentId); // Set parent ID if adding subcategory
    setIsModalOpen(true); // Open the modal
  };

  // Open modal to edit existing category
  const handleEdit = (category) => {
    setEditCategory(category);
    setSelectedParentId(null); // Clear selected parent ID
    setIsModalOpen(true);
  };

  // Delete a category after confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.deleteCategory(id);
      await fetchCategories(); // Refresh category list
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle form submit for add/edit
  const handleSubmit = async (formData) => {
    try {
      if (editCategory) {
        // Update existing category
        await api.updateCategory(editCategory._id, formData);
      } else {
        // Create new category
        await api.createCategory(formData);
      }

      // Refresh categories and close modal
      await fetchCategories();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Show loading state until data is fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header with title and Add Root Category button */}
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Fashion Categories</h1>
            <button
              onClick={() => handleAdd()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Root Category
            </button>
          </div>

          {/* Show error if any */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 border-b">
              Error: {error}
            </div>
          )}

          {/* Tree view of categories */}
          <CategoryTree
            categories={categories}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modal for adding/editing categories */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditCategory(null);
          setSelectedParentId(null);
        }}
        onSubmit={handleSubmit}
        categories={categories.filter(c => !editCategory || c._id !== editCategory._id)} // Avoid selecting itself as parent
        editCategory={editCategory}
        parentId={selectedParentId}
      />
    </div>
  );
}

export default App;
