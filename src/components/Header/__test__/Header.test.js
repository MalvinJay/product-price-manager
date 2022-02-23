import React from 'react';
import Header from '../Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders the title properly', () => {
  render(<Header title="Price Manager" />);
  const HeadingElement = screen.getByText(/Price Manager/);
  expect(HeadingElement).toBeInTheDocument();
})