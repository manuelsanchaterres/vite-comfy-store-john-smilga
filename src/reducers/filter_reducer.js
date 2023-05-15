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
import { useProductsContext } from '../context/products_context'
import { products_url as url, single_product_url as singleurl } from '../utils/constants'


const filter_reducer = (state, action) => {


  if (action.type === LOAD_PRODUCTS) {

    let maxPrice = action.payload.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)


    return {...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: {...state.filters, max_price: maxPrice, actual_price: maxPrice }}

  } 
  
  else if (action.type === SET_GRIDVIEW) {

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


    return {...state, filters: {...state.filters, [action.payload.name]: action.payload.value}}

  } else if (action.type === FILTER_PRODUCTS) {

    const {all_products} = state
    const {text, category, company, color, actual_price, shipping, stock} = state.filters

    let filteredProducts = [...all_products]

    // getMaxMinPrices(state, filteredProducts);

    if (text) {

      filteredProducts = filteredProducts.filter((filteredProduct) => {


        return filteredProduct.name.toLowerCase().includes(text)

      })
      
    } 
    
    if (category !== 'all') {

      filteredProducts = filteredProducts.filter((filteredProduct) => {

        return filteredProduct.category === category

      })

    } 
    
    if (company !== 'all') {


      filteredProducts = filteredProducts.filter((filteredProduct) => {

        return filteredProduct.company === company

      })

    } 
    if (color !== 'all') {

      filteredProducts = filteredProducts.filter((filteredProduct) => {

        return filteredProduct.colors.find((coloritem) => coloritem === color)

      })

    } 
    
    // price

    filteredProducts = filteredProducts.filter((filteredProduct) => {

      return filteredProduct.price <=  actual_price

    })
    
    if (shipping) {

      filteredProducts = filteredProducts.filter((filteredProduct) => {

        return filteredProduct.shipping === true

      })  



    }

    // if (stock) {


    //   filteredProducts = filteredProducts.map((filteredProduct) => {

    //     const {id} = filteredProduct

    //     fetchSingleProduct(`${singleurl}${id}`)

    //     console.log(filteredProduct);

    //   })  



    // }


    return {...state, filtered_products: filteredProducts}

  } 
  
  if (action.type === CLEAR_FILTERS) {

    return {...state, filters: {

      ...state.filters,

      text: "",
      company: "all",
      category: "all",
      color: "all",
      actual_price: state.filters.max_price,
      shipping: false,
  
    },
  }

  }

  return {...state}

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
