import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpensesApp from './ExpensesApp';

test('renders learn react link', () => {
    render(<ExpensesApp />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
