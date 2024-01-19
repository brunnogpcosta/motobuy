import React from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import Header from './components/Header/Header'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Header/>
      <AppRouter/>
    </div>
  )
}

export default App
