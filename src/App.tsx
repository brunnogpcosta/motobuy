import React from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ShoppingCartProvider } from './contexts/shoppingCart'

const App = (): JSX.Element => {
  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
       <ShoppingCartProvider>
          <Header />
          <AppRouter />
          <Footer />
        </ShoppingCartProvider>
      </QueryClientProvider>

    </div >
  )
}

export default App
