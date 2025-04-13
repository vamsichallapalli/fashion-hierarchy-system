import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';

/**
 * CategoryTree Component
 * 
 * This component displays a hierarchical tree structure of categories and subcategories.
 * It supports expanding/collapsing subcategories and allows actions like Add, Edit, and Delete.
 * 
 * Props:
 * - categories: Array of category objects to render.
 * - onAdd: Function to handle adding a subcategory.
 * - onEdit: Function to handle editing a category.
 * - onDelete: Function to handle deleting a category.
 * - level: Used internally to track nesting level (default is 0).
 */
const CategoryTree = ({ categories, onAdd, onEdit, onDelete, level = 0 }) => {

  // Track which categories are expanded (open)
  const [expanded, setExpanded] = useState({});

  // Toggle the expand/collapse state of a category by its ID
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Get all subcategories (children) of a given parent category
  const getChildCategories = (parentId) => {
    return categories.filter((cat) => cat.parent_id === parentId);
  };

  // Get all top-level categories (i.e., categories with no parent)
  const getRootCategories = () => {
    return categories.filter((cat) => !cat.parent_id);
  };

  // Render a single category and its children (if any)
  const renderCategory = (category) => {
    const children = getChildCategories(category._id); // Get child categories
    const hasChildren = children.length > 0;           // Check if it has children
    const isExpanded = expanded[category._id];          // Check if it's currently expanded

    return (
      <div key={category._id} className="ml-4">
        <div className="flex items-center gap-2 py-2">
          {/* Expand/collapse toggle */}
          <button
            data-testid={`expand-${category._id}`}
            onClick={() => toggleExpand(category._id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            ) : (
              // If no children, just leave space for the icon
              <span className="w-4" />
            )}
          </button>

          {/* Display category name */}
          <span className="flex-1">{category.name}</span>

          {/* Action buttons: Add, Edit, Delete */}
          <div className="flex gap-2">
            <button
              data-testid={`add-${category._id}`}
              onClick={() => onAdd(category._id)}
              className="p-1 hover:bg-gray-100 rounded text-green-600"
            >
              <Plus size={16} />
            </button>
            <button
              data-testid={`edit-${category._id}`}
              onClick={() => onEdit(category)}
              className="p-1 hover:bg-gray-100 rounded text-blue-600"
            >
              <Edit2 size={16} />
            </button>
            <button
              data-testid={`delete-${category._id}`}
              onClick={() => onDelete(category._id)}
              className="p-1 hover:bg-gray-100 rounded text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Render child categories if expanded */}
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Start rendering from the root categories */}
      {getRootCategories().map((category) => renderCategory(category))}
    </div>
  );
};

export default CategoryTree;
