import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductsProvider } from './context/products_context.jsx'
import { FilterProvider } from './context/filter_context.jsx'
import { CartProvider } from './context/cart_context.jsx'
import { UserProvider } from './context/user_context.jsx'
import { Auth0Context } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProductsProvider>
      
      <FilterProvider>

        <App />

      </FilterProvider>

    </ProductsProvider>
    
  </React.StrictMode>,
)
