export const formatPrice = (number) => {
    return Intl.NumberFormat('en-US', {

        style:'currency',
        currency: 'EUR',
    }).format(number/100)


}


export const getUniqueValues = (data, type) => {

    let unique = data.map((item) => item[type])

    if (type === 'colors') {

        /* this flat() method is used to get an unique values array from an array of arrays */

        unique = unique.flat()

    }

    return ['all', ...new Set(unique)]

}

export const featuredProductStockCheck = (product) => {

    /*Check to confirm featured product to have more than 5 units of stock */

    if (product.stock < 5) {

        return {...product, featured: false }
        
    }

}


export const getMaxMinPrices = (state, filteredProducts) => {

    let maxPrice = filteredProducts.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)

    let minPrice = filteredProducts.map((product) => product.price)
    minPrice = Math.min(...minPrice)

    return {...state, max_price: maxPrice, min_price: minPrice, actual_price: maxPrice }

}
