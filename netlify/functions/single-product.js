// domain/.netlify/functions/single-product


const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node')

const airtable = new Airtable({apiKey: process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS__API_TOKEN}).
base(process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS_BASE).table(process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS_TABLE)


exports.handler = async (event,  context, cb) => {

    const {id} = event.queryStringParameters

    if (id) {

        try {

            let product = await airtable.retrieve(id);
            console.log('######');
            console.log(product);
            console.log('######');

            if (product.error) {

                return {

                    statusCode: 404,
                    body: `No product with id: ${id}`,
            
                }
    
            }

            product = {id: product.id, ...product.fields}


            return {

                statusCode: 200,
                body: JSON.stringify(product),
        
            }
    
            
        } catch (error) {

            return {

                statusCode: 500,
                body: 'server error',
        
            }
    
            
        }

    

    }

    return {

        statusCode: 400,
        body: 'Please provide product id',

    }


}




