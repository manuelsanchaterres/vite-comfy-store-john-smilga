import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if (action.type === LOAD_PRODUCTS) {

    return {...state, all_products: [...action.payload], filtered_products: [...action.payload]}

  } else if (action.type === SET_GRIDVIEW) {

    return {...state, grid_view: true}

  } else if (action.type === SET_LISTVIEW) {

    return {...state, grid_view: false}

  } else if (action.type === UPDATE_SORT) {

    return {...state, sort: action.payload}

  } else if (action.type === SORT_PRODUCTS) {

    let sortedProducts = [...state.filtered_products]
    
    if (state.sort === "price-lowest") {

      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);

      return {...state, filtered_products: sortedProducts}

    } else if (state.sort === "price-highest") {

      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);

      return {...state, filtered_products: sortedProducts}

    } else if (state.sort === "name-a") {

      sortedProducts = sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

      return {...state, filtered_products: sortedProducts}
      
    } else if (state.sort === "name-z") {

      sortedProducts = sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

      return {...state, filtered_products: sortedProducts}
      
    }

  }

  return {...state}

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
