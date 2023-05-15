// domain/.netlify/functions/products

const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node')

const airtable = new Airtable({apiKey: process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS__API_TOKEN}).
base(process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS_BASE).table(process.env.VITE_AIRTABLE_ECOMMERCE_PRODUCTS_TABLE)


exports.handler = async (event,  context, cb) => {


    try {

        const response = await airtable.list({maxRecords: 200})
        console.log('######');
        console.log(response.records);
        console.log('######');

        const products = response.records.map((product) => {

            const {id, fields} = product;

            const {name, featured, price, colors, company, description, category, shipping, images,} = fields;

            const {url} = images[0];

            return {

                id,

                name, 
                
                featured, 
                
                price, 
                
                colors, 
                
                company, 
                
                description, 
                
                category, 
                
                shipping, 
                
                image: url


            }
        })

        return {

            statusCode: 200,
            body: JSON.stringify(products),
    
        }
    
        
    } catch (error) {


        return {

            statusCode: 500,
            body: 'there was an error',
    
        }

        
    }


}


