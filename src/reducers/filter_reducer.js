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
import { formatPrice } from '../utils/helpers';

const filter_reducer = (state, action) => {

  if (action.type === LOAD_PRODUCTS) {

    let maxPrice = action.payload.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)

    return {...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: {...state.filters, max_price: maxPrice, price: maxPrice }}

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


  } else if (action.type === UPDATE_FILTERS) {


    return {...state, filters: {...state.filters, [action.payload.name]: action.payload.value}, activeFilter: action.payload.name}

  } else if (action.type === FILTER_PRODUCTS) {

    let filteredProducts = [...state.all_products]

    if (state.activeFilter === 'text') {

      if (state.filters[state.activeFilter] === "") {

        return {...state, filtered_products: state.all_products}

      }

      filteredProducts = filteredProducts.filter((filteredProduct) => filteredProduct.name.includes(state.filters[state.activeFilter]))

      return {...state, filtered_products: filteredProducts}

    } else if (state.activeFilter === 'category') {

      if (state.filters[state.activeFilter] === "all") {

        return {...state, filtered_products: state.filtered_products}

      }

      filteredProducts = filteredProducts.filter((filteredProduct) => filteredProduct.category === state.filters.category)

      return {...state, filtered_products: filteredProducts}

    } else if (state.activeFilter === 'company') {

      if (state.filters[state.activeFilter] === "all") {

        return {...state}

      }

      filteredProducts = filteredProducts.filter((filteredProduct) => filteredProduct.company === state.filters.company)

      return {...state, filtered_products: filteredProducts}

    } else if (state.activeFilter === 'color') {

      if (state.filters[state.activeFilter] === "all") {

        return {...state, filtered_products: state.filtered_products}

      }

      
      filteredProducts = filteredProducts.filter((filteredProduct) => filteredProduct.company === state.filters.company)

      return {...state, filtered_products: filteredProducts}

    }




  }

  return {...state}

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
