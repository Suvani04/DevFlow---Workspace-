import  { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/index'
import Landing from './pages/landing'
import Onboarding from './pages/Onboarding/index'


function App(){
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/landing" element={<Landing />}/>      
      <Route path="/onboarding" element={<Onboarding />}/>      

     </Routes>
    </BrowserRouter>
  )
}
export default App