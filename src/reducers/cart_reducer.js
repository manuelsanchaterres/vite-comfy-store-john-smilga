import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  let tempCart = [...state.cart]

  if (action.type === ADD_TO_CART) {

    const {id, color, amount, product} = action.payload

    // console.log(product);

    /* if item already on cart array means no new cart item */

    if (tempCart) {

      const tempItem = tempCart.find((cartItem) => cartItem.id === id + color)

      if (tempItem) {

        // update existing cart item

        const tempCart = state.cart.map((cartItem) => {

          if (cartItem.id === id + color) {

            let newAmount = cartItem.amount + amount

            if (newAmount > cartItem.max) {

              newAmount = cartItem.max

            }

            return {...cartItem, amount: newAmount}

          } else {

            return cartItem
            
          }


        })

        return {...state, cart: tempCart}

      } else {

        const newItem = {

          id: id+color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,

        }

        return {...state, cart: [...tempCart, newItem]}

  
      }

    } else {

      const newItem = {

        id: id+color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,

      }


      return {...state, cart: [...tempCart, newItem]}

    }

  }

  if (action.type === REMOVE_CART_ITEM) {


    const newTempCart = tempCart.filter((tempCartItem) => tempCartItem.id !== action.payload)

    return {...state, cart: newTempCart}

  }

  if (action.type === CLEAR_CART) {

    return {...state, cart: []}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
