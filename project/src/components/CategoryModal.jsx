import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * CategoryModal Component
 * This modal handles both adding and editing categories.
 * It supports selecting a parent category to create nested category structures.
 */
const CategoryModal = ({ isOpen, onClose, onSubmit, categories, editCategory, parentId }) => {

  // Local state to manage form input fields
  const [name, setName] = useState('');
  const [selectedParentId, setSelectedParentId] = useState('');

  /**
   * Pre-fill form fields based on whether we are editing an existing category
   * or creating a new one (possibly as a subcategory).
   */
  useEffect(() => {
    if (editCategory) {
      // If editing, populate form with existing category data
      setName(editCategory.name);
      setSelectedParentId(editCategory.parent_id || '');
    } else {
      // If adding new category, start with empty fields or default parent
      setName('');
      setSelectedParentId(parentId || '');
    }
  }, [editCategory, parentId]);

  /**
   * Handle form submission
   * Pass the name and selected parent ID to the onSubmit callback
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ 
      name, 
      parent_id: selectedParentId || null // Null if root category
    });

    // Close the modal after submission
    onClose();
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* Modal content container */}
      <div className="bg-white rounded-lg p-6 w-96">
        
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editCategory ? 'Edit Category' : parentId ? 'Add Subcategory' : 'Add Root Category'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Form starts here */}
        <form onSubmit={handleSubmit}>

          {/* Input for Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* Dropdown for selecting Parent Category */}
          {(parentId || editCategory) && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {/* Option to make it a root category */}
                <option value="">None (Root Category)</option>

                {/* List of existing categories to choose as parent */}
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Action buttons: Cancel and Submit */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editCategory ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
