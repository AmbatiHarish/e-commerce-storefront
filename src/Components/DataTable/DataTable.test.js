import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

describe('DataTable Component', () => {
    const mockData = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 200 },
    ];

    const mockColumns = [
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price' },
    ];

    const mockActions = [
        {
            label: 'Edit',
            className: 'edit-button',
            onClick: jest.fn(),
        },
        {
            label: 'Delete',
            className: 'delete-button',
            onClick: jest.fn(),
        },
    ];

    test('renders the DataTable with columns and rows', () => {
        render(<DataTable data={mockData} columns={mockColumns} actions={[]} />);

        // Check if column headers are rendered
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();

        // Check if data rows are rendered
        expect(screen.getByText('Product A')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('Product B')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
    });

    test('renders actions if provided', () => {
        render(<DataTable data={mockData} columns={mockColumns} actions={mockActions} />);

        // Check if action buttons are rendered
        const editButtons = screen.getAllByText('Edit');
        const deleteButtons = screen.getAllByText('Delete');

        expect(editButtons).toHaveLength(2); // Two rows, two edit buttons
        expect(deleteButtons).toHaveLength(2); // Two rows, two delete buttons
    });

    test('calls action handlers when action buttons are clicked', () => {
        render(<DataTable data={mockData} columns={mockColumns} actions={mockActions} />);

        const editButtons = screen.getAllByText('Edit');
        const deleteButtons = screen.getAllByText('Delete');

        // Simulate clicks
        fireEvent.click(editButtons[0]);
        fireEvent.click(deleteButtons[1]);

        // Assert that mock handlers were called
        expect(mockActions[0].onClick).toHaveBeenCalledWith(mockData[0]); // Edit action called with first row
        expect(mockActions[1].onClick).toHaveBeenCalledWith(mockData[1]); // Delete action called with second row
    });

    test('does not render action column if no actions are provided', () => {
        render(<DataTable data={mockData} columns={mockColumns} actions={[]} />);

        // Check that no actions column is rendered
        const actionsColumn = screen.queryByText('Actions');
        expect(actionsColumn).not.toBeInTheDocument();
    });

    test('renders an empty table when data is empty', () => {
        render(<DataTable data={[]} columns={mockColumns} actions={[]} />);

        // Ensure no rows are rendered
        expect(screen.queryByText('Product A')).not.toBeInTheDocument();
        expect(screen.queryByText('Product B')).not.toBeInTheDocument();

        // Check that table headers are still rendered
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Price')).toBeInTheDocument();
    });
});
