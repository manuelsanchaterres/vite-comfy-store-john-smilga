import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
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
import { useProductsContext } from './products_context'
import { productsSortingMethods } from '../utils/constants'


const selectedMethod = productsSortingMethods.find((productsSortingMethod) => productsSortingMethod.defaultValue === true)

const initialState = {

  filtered_products: [],
  all_products:[],
  grid_view: true,
  sort: selectedMethod.value,
  filters: {

    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    actual_price: 0,
    shipping: false,

  },

}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  const {products} = useProductsContext()

  const[state, dispatch] = useReducer(reducer, initialState)

  // console.log(state.filtered_products);

  useEffect(() => {

    dispatch({type: LOAD_PRODUCTS, payload: products})

  }, [products])

  useEffect(() => {

    dispatch({type: FILTER_PRODUCTS})
    dispatch({type: SORT_PRODUCTS})
  }, [products, state.sort, state.filters])


  const setView = (gridview) => {

    if (gridview === true) {

      dispatch({type: SET_GRIDVIEW})

    } else {

      dispatch({type: SET_LISTVIEW})

    }

  }

  const updateSort = (e) => {

    dispatch({type: UPDATE_SORT, payload: e.target.value })

  }

  const updateFilters = (e) => {

    let name = e.target.name
    let value = e.target.value

    if (name === 'shipping') {

      value = e.target.checked

    }

    // console.log(name, value);


    dispatch({type: UPDATE_FILTERS, payload: {name, value }})


  }

  const clearFilters = (e) => {

    e.preventDefault()

    dispatch({type: CLEAR_FILTERS})


  }

  return (
    <FilterContext.Provider value={{...state, setView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
