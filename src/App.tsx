import React from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header/>
      <AppRouter/>
      <Footer/>
    </div>
  )
}

export default App
