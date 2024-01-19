import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../containers/HomePage/HomePage'
import Checkout from '../containers/CheckoutPage/CheckoutPage'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
