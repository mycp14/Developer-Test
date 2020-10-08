const initialState = {
    products: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestProducts: () => async (dispatch, getState) => {

        const url = 'api/Product/Products';
        const response = await fetch(url);
        const products = await response.json();
        dispatch({ type: 'FETCH_PRODUCTS', products });
    },
    saveProduct: product => async (dispatch, getState) => {

        const url = 'api/Product/SaveProduct';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(product)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_PRODUCT', product });
    },
    deleteProduct: productId => async (dispatch, getState) => {
        const url = 'api/Product/DeleteProduct/' + productId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_PRODUCT', productId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_PRODUCTS': {
            return {
                ...state,
                products: action.products,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_PRODUCT': {
            return {
                ...state,
                products: Object.assign({}, action.product),
                forceReload: true
            }
        }
        case 'DELETE_PRODUCT': {
            return {
                ...state,
                productId: action.productId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};