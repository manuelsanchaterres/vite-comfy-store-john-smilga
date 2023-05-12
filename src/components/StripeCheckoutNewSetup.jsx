import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const promise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_API_PUBLIC_KEY)


const CheckoutForm = () => {

  const {cart, total_amount, shipping_fee, clearCart} = useCartContext()
  const {myUser} = useUserContext()
  const navigate = useNavigate()

  // stripe stuff
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState("")
  const [disabled, setDisabled] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  // const cardStyle = {

  //   style: {
  //     base: {
  //       color: '#32325d',
  //       fontFamily: 'Arial, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#32325d',
  //       },
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //       iconColor: '#fa755a',
  //     },
  //   },
  // };

  const paymentElementOptions = {
      layout: "tabs"
    }
  

  const handleChange = async (event) => {}
  const handleSubmit = async (ev) => {}

  return (

    <Wrapper>


      <form id="payment-form" onSubmit={handleSubmit}>

        <LinkAuthenticationElement 
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <button disabled={processing || disabled || succeeded } id='submit'>

          <span id="button-text">

            {processing ? <div className='spinner' id='spinner'/> : 'Pay'}

          </span>

        </button>

        {/* Show any error that happens when processing the payment */}

        {error && <div className='card-error' role='alert'>{error}</div>}


        {/* Show a success message upon completion */}

        <p className={succeeded ? 'result-message': 'result-message hidden' }>

          Payment succeeded, see the result in your
          <a href={'https://dashboard.stripe.com/test/payments'}>Stripe dashboard</a>
          Refresh the page to pay again

        </p>

      </form>

   </Wrapper>      


  )

}


const StripeCheckout = () => {

  const [clientSecret, setClientSecret] = useState(import.meta.env.VITE_STRIPE_PAYMENT_API_PUBLIC_KEY)

  /* mode has to bee "test"  or "live" */

  const [mode, setMode] = useState("setup")

  const createPaymentIntent = async() => {
  
    // console.log('hello from stripe checkout');

  }

  useEffect(() => {

    createPaymentIntent()
    // eslint-disable-next-line
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    
    <Wrapper>
        
      {clientSecret && (

      <Elements  stripe={promise} options={options}>

        <CheckoutForm />

      </Elements>

      )}


    </Wrapper>


  )
}
const Wrapper = styled.section`
form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}


#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button:hover {
  filter: contrast(115%);
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
`

export default StripeCheckout
