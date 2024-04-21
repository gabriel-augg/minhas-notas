import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import AppRoutes from './routes'
import Footer from "./components/Footer"

import './App.css'

function App() {

  return (
    <Router>
        <Header/>
        <AppRoutes/>
        <Footer/>
    </Router>
  )
}

export default App
