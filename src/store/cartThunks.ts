import axios from 'axios';

import { Product } from 'models/Product';
import API_PATHS from '../constants/apiPaths';
import { addToCart, clearCart, removeFromCart } from './cartSlice';

export const addToCartThunk = (product: Product) => async (dispatch: any, getState: any) => {
  dispatch(addToCart(product));

  const {
    cart: { items },
  } = getState();

  await axios.put(
    `${API_PATHS.cart}/profile/cart`,
    { items },
    {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    }
  );
};

export const removeFromCartThunk = (product: Product) => async (dispatch: any, getState: any) => {
  dispatch(removeFromCart(product));

  const {
    cart: { items },
  } = getState();

  await axios.put(
    `${API_PATHS.cart}/profile/cart`,
    { items },
    {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    }
  );
};

export const clearCartThunk = () => async (dispatch: any, getState: any) => {
  dispatch(clearCart());

  const {
    cart: { items },
  } = getState();

  await axios.put(
    `${API_PATHS.cart}/profile/cart`,
    { items },
    {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    }
  );
};
