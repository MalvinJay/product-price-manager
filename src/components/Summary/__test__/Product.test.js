import React from 'react';
import ProductMeta from '../ProductMeta';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Table List', () => {
    it('should render the correct amount of products', () => {
      render(<ProductMeta total={5} />);
      const ParagraphElement = screen.getByText(/5 products total/i);
      expect(ParagraphElement).toBeInTheDocument();
    })
    
    it('should render "product" when the number of products is one', () => {
      render(<ProductMeta total={1} />);
      const ParagraphElement = screen.getByText(/1 product total/i);
      expect(ParagraphElement).toBeInTheDocument();
    })
    
    it('should have invisible content', () => {
      render(<ProductMeta total={1} />);
      const ParagraphElement = screen.getByText(/1 product total/i);
      expect(ParagraphElement).not.toBeVisible();
    })
    
    // it('should have text content to be same as test', () => {
    //     render(<ProductMeta total={1} />);
    //     const ParagraphElement = screen.getByText(/1 product total/i);
    //     console.log('ParagraphElement.textContent:', typeof ParagraphElement.textContent)
    //     expect(ParagraphElement.textContent).toBeVisible("1 product total");
    // })
})

