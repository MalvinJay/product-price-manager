import { combineReducers } from 'redux';
import productsReducer from './Products/product.reducer';

const rootReducer = combineReducers({
    products: productsReducer,
});

export default rootReducer;