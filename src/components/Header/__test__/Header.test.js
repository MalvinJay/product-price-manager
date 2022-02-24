import React from 'react';
import Header from '../Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

it('renders same text passed into title prop', () => {
  render(<Header title="Price Manager" />);
  const HeadingElement = screen.getByText(/Price Manager/);
  expect(HeadingElement).toBeInTheDocument();
})

// it('should render same text passed into title prop', async () => {
//   render(<Header title="Price Manager" />);
//   const HeadingElement = screen.getByTestId("header-1");
//   expect(HeadingElement).toBeInTheDocument();
// })

// it('should show the same text passed into title prop', async () => {
//   render(<Header title="Price Manager" />);
//   const HeadingElement = screen.getByRole("heading");
//   expect(HeadingElement).toBeInTheDocument();
// })

// it('should show all the headings in the file', async () => {
//   render(<Header title="Price Manager" />);
//   const HeadingElements = screen.getAllByRole("heading");
//   expect(HeadingElements.length).toBe(2);
// })

