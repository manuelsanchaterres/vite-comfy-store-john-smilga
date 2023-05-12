// domain/.netlify/functions/create-payment-intent

const env = require ('dotenv').config()

const stripe = require('stripe')(process.env.VITE_STRIPE_PAYMENT_API_SECRET_KEY)

exports.handler = async function (event,  context) {

    /* this condition is set to avoid bugs when directly accesing function from browser url bar */

    if (event.body) {

        const {cart, shipping_fee, total_amount} = JSON.parse(event.body)


        const calculateOrderAmount = () => {

            return shipping_fee + total_amount

        }


        try {


           const paymentIntent = await stripe.paymentIntents.create({

            amount: calculateOrderAmount(),
            currency: 'usd',

           })

           return {

            statusCode: 200,

            body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            
           }


        } catch (error) {
            
           return {

            statusCode: 500,

            body: JSON.stringify({msg: error.message})

           }


        }
    
    } else {

        return {

            statusCode: 200,
            body: 'Create Payment Intent'
    

        }

    }
}


