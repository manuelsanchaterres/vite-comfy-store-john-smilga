import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {HomePage, SingleProductPage, CartPage, CheckoutPage, ErrorPage, AboutPage, ProductsPage, PrivateRoute} from './pages'
import AllPagesSharedLayout from './sharedlayouts/AllPagesSharedLayout'
import { useUserContext } from './context/user_context'

const App = () => {


  return (     
  
  
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<AllPagesSharedLayout />}>

          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            } />


          <Route path="*" element={<ErrorPage />} />

        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App
