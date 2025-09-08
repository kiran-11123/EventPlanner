
import './App.css'
import './index.css'
import { BrowserRouter , Route ,Routes} from 'react-router-dom'
import Home from './components/Start'
import HomePage from './components/Homepage'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Card from './components/Card'
import EventUpload from './components/EventUpload'
import Ticktes_buy from './components/Ticktes_buy'
import History from './components/History'
import Update from './components/Update'
import OTP from './components/OTP'
function App() {
 

  return (
    <BrowserRouter>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/card" element={<Card />} />
        <Route path="/eventupload" element={<EventUpload />} /> 
        <Route path="/payment" element={<Ticktes_buy />} />
        <Route path="/history" element={<History />} />
        <Route path="/update" element={<Update />} />
     
       </Routes>
    </BrowserRouter>
  )
}

export default App
