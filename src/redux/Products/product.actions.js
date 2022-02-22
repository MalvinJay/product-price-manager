import { GET_PRODUCTS } from './product.types';

export const getProducts = (list=[]) => async (dispatch) => {
    // 1. Get cached version of products
    let localList;

    if (localStorage.getItem('lc_list')) localList = JSON.parse(localStorage.getItem('lc_list'));

    // 2. normalize the list with the ids
    let normalizedList = [];

    const normalizePrices = (list=[]) => {  // Returns a normalized price list
        let prices_accumulator = [];
        let prices_ids = list.map(el => el.id);
        console.log('prices_ids:', prices_ids);
        let max_id = Math.max(...prices_ids);

        list.forEach((_item) => {
            let indexOfReOccur = prices_accumulator.findIndex(_el => _item.id === _el.id);
            console.log('indexOfReOccur:', indexOfReOccur);

            // Check if ids are same, then return the array
            if (indexOfReOccur >= 0) {
                console.log('prices_accumulator[indexOfReOccur]:', prices_accumulator[indexOfReOccur]);

                if (prices_accumulator[indexOfReOccur].price !== _item.price) {
                    prices_accumulator.push(
                        {
                            id: max_id + 1,
                            ..._item
                        }
                    );

                    max_id += 1;
                }
            } else {
                prices_accumulator.push(_item)
            }
        });

        console.log('Final prices_accumulator:', prices_accumulator);

        return prices_accumulator;
    };

    if (!localList) {
        localStorage.setItem('lc_list', JSON.stringify(list));
        normalizedList = list;
    } else {
        console.log('Initial local List:', localList);

        // Normalize clustured list from cached local version
        localList.forEach((el) => {
            let recurr = list.find((item) => item.id === el.id);

            if (recurr) {
                normalizedList.push({
                    ...el,
                    prices: normalizePrices([...el.prices, ...recurr?.prices], recurr)
                })
            } else {
                normalizedList.push(el);
            }
        });
        
        console.log('Normalized List:', normalizedList);
        // normalizedList = normalizedList || list; // Fallback to list coming from data source
    }

    return new Promise((resolve) => {
        // save to local
        localStorage.setItem('lc_list', JSON.stringify(normalizedList));  

        dispatch({
            type: GET_PRODUCTS,
            payload: normalizedList
        });

        resolve(normalizedList);
    });
};

export const createProduct = (product) => (dispatch) => {
    return new Promise((resolve) => {
        // 1. Get cached version of products
        let localList = [];

        if (localStorage.getItem('lc_list')) {
            localList = JSON.parse(localStorage.getItem('lc_list')); 
            localList.push(product);
        } else {
            localList.push(product)
        }

        // save to local
        localStorage.setItem('lc_list', JSON.stringify(localList));  

        // dispatch to redux store
        dispatch({
            type: GET_PRODUCTS,
            payload: localList
        });     
        
        resolve(localList);
    })
};

export const updateProduct = (product) => async (dispatch) => {
    return new Promise((resolve) => {

        console.log('Updating product:', product);

        // 1. Get cached version of products
        let localList;

        if (localStorage.getItem('lc_list')) {
            localList = JSON.parse(localStorage.getItem('lc_list')); 

            localList = localList.map((el) => {
                if (el.id === product.id) return product;
                else return el
            })
        } else {
            localList = [product]
        }

        // save to local
        localStorage.setItem('lc_list', JSON.stringify(localList));  

        // dispatch to redux store
        dispatch({
            type: GET_PRODUCTS,
            payload: localList
        });

        resolve(localList);
    });    
};

export const deleteProduct = (productID) => (dispatch) => {
    return new Promise((resolve) => {
        let localList;
        let UpdatedProduct = [];

        if (localStorage.getItem('lc_list')) {
            localList = JSON.parse(localStorage.getItem('lc_list')); 
            UpdatedProduct = localList.filter((el) => el.id !== productID);
            
            // save to local
            localStorage.setItem('lc_list', JSON.stringify(UpdatedProduct));  

            // dispatch to redux store
            dispatch({
                type: GET_PRODUCTS,
                payload: UpdatedProduct
            })
        } else {
            localStorage.setItem('lc_list', JSON.stringify(UpdatedProduct));

            dispatch({
                type: GET_PRODUCTS,
                payload: UpdatedProduct
            })      
        };

        resolve(UpdatedProduct);
    });
};
