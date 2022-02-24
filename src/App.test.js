import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const MockApp = () => (
  <Provider store={store}><App /></Provider>
);

it('renders Add Product button', () => {
  render(<MockApp />);
  const AddProductButton = screen.getByText(/Add Product/);
  expect(AddProductButton).toBeInTheDocument();
})