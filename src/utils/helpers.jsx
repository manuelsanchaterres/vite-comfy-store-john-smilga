export const formatPrice = (number) => {
    return Intl.NumberFormat('en-US', {

        style:'currency',
        currency: 'EUR',
    }).format(number/100)


}

export const getUniqueValues = () => {}

export const featuredProductStockCheck = (product) => {

    /*Check to confirm featured product to have more than 5 units of stock */

    if (product.stock < 5) {

        return {...product, featured: false }
        
    }

}
