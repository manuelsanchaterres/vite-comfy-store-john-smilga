import React, { useEffect, useContext, useReducer, useState } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = () => {

  let cart = localStorage.getItem('cart');

  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))

  } else {

    return []

  }


}


const initialState = {

  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer,initialState)
  const [checkoutButtonClicked, setCheckoutButtonClicked] = useState(false)


  useEffect(() => {

    dispatch({type: COUNT_CART_TOTALS})

    localStorage.setItem('cart', JSON.stringify(state.cart))

  }, [state.cart])



  const addToCart = (id, color, amount, product) => {

    dispatch({type: ADD_TO_CART, payload: {id, color, amount, product} })

  }

  // remove item

  const removeItem = (id) => {

    dispatch({type: REMOVE_CART_ITEM, payload: id})

  }

  // toggle amount

  const toggleAmount = (productInfo) => {

    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: productInfo})

  }

  // clear cart

  const clearCart = () => {

    dispatch({type: CLEAR_CART})

  }



  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, clearCart, toggleAmount, checkoutButtonClicked, setCheckoutButtonClicked}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
