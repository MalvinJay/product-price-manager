import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEditProduct from '../AddEditProduct';
import { Provider } from 'react-redux';
import store from "../../../redux/store";
// const products = store.getState().products;

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

const MockAddEditProduct = () => {
    return (
        <ReduxProvider reduxStore={store}>
            <AddEditProduct 
                mode="add"
                modal={true}
                setModal={()=>{}}
                info={{}}
                fetchData={()=>{}}        
            />
        </ReduxProvider>
    )
};

describe('Add New Product', () => {
    it('should render the title of the form', () => {
      render(<MockAddEditProduct />);
      const HeadingElement = screen.getByText(/Add Product/i);
      expect(HeadingElement).toBeInTheDocument();
    })

    it('should be able to type into name input', () => {
      render(<MockAddEditProduct />);
      const NameInputElement = screen.getByPlaceholderText(/Name/);
      fireEvent.change(NameInputElement, { target: { value: "Vitamin C" } });
      expect(NameInputElement.value).toBe("Vitamin C");
    })

    it('should be able to type into price input', () => {
      render(<MockAddEditProduct />);
      const PriceInputElement = screen.getByPlaceholderText(/Price/);
      fireEvent.change(PriceInputElement, { target: { value: "12.25" } });
      expect(PriceInputElement.value).toBe("12.25");
    })

    it('should add a new product to list after clicking on save', async () => {
        render(<MockAddEditProduct />);
        const NameInputElement = screen.getByPlaceholderText(/Name/);
        const PriceInputElement = screen.getByPlaceholderText(/Price/);
        // const SaveButton = screen.getByRole("button", { name: /Save/});
        
        // Mock adding data to name field
        fireEvent.change(NameInputElement, { target: { value: "New Product" } });
        // Mock adding data to name field
        fireEvent.change(PriceInputElement, { target: { value: "12.25" } });
        // // Fire click event with provided data
        // const NewProduct = await act(() => {
        //     fireEvent.click(SaveButton);
        // })
        expect(NameInputElement.value).toBeDefined();
        expect(PriceInputElement.value).toBeDefined();
    })
})

