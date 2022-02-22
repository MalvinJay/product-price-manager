import { GET_PRODUCTS, UPDATE_PRODUCT } from "./product.types";

const INITIAL_STATE = {
  products: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
