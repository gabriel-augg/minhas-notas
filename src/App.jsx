import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'

import Header from './components/Header'
import AppRoutes from './routes'
import Footer from "./components/Footer"
import { NoteProvider } from './contexts/NoteContext'


function App() {

  return (
    <Router>
      <UserProvider>
        <NoteProvider>
          <Header/>
            <AppRoutes/>
          <Footer/>
        </NoteProvider>
      </UserProvider>
    </Router>
  )
}

export default App
