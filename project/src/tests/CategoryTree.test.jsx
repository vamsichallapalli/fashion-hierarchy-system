import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import CategoryTree from '../components/CategoryTree';

describe('CategoryTree', () => {
  const mockCategories = [
    { _id: '1', name: 'Women', parent_id: null },
    { _id: '2', name: 'Clothing', parent_id: '1' },
    { _id: '3', name: 'Dresses', parent_id: '2' },
    { _id: '4', name: 'Men', parent_id: null },
  ];

  const mockHandlers = {
    onAdd: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };



  it('renders root categories', () => {
    render(<CategoryTree categories={mockCategories} {...mockHandlers} />);
    expect(screen.getByText('Women')).toBeInTheDocument();
    expect(screen.getByText('Men')).toBeInTheDocument();
  });

  it('expands/collapses categories on click', () => {
    render(<CategoryTree categories={mockCategories} {...mockHandlers} />);
    const toggleButtons = screen.getAllByRole('button');

    // Expand Women
    const expandButton = toggleButtons.find((btn) => {
      const sibling = btn.nextSibling;
      return sibling && sibling.textContent === 'Women';
    });

    fireEvent.click(expandButton);
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('calls onAdd with correct parent ID', () => {
    const { getByTestId } = render(
      <CategoryTree categories={mockCategories} {...mockHandlers} />
    );
    
    const addButton = getByTestId('add-1');
    fireEvent.click(addButton);
    
    expect(mockHandlers.onAdd).toHaveBeenCalledWith('1');
  });

  
  it('calls onEdit with correct category', () => {
    const { getByTestId } = render(
      <CategoryTree categories={mockCategories} {...mockHandlers} />
    );
    
    const editButton = getByTestId('edit-1');
    fireEvent.click(editButton);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockCategories[0]);
  });

  it('calls onDelete with correct ID', () => {
    const { getByTestId } = render(
      <CategoryTree categories={mockCategories} {...mockHandlers} />
    );
    
    const deleteButton = getByTestId('delete-1');
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });
});
