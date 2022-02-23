import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders Add Product button', () => {
  render(<Provider store={store}><App /></Provider>);
  const AddProductButton = screen.getByText(/Add Product/);
  expect(AddProductButton).toBeInTheDocument();
})