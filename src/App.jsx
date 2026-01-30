import React ,{ useState }from 'react'
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom'

import './App.css'
import Home from './home'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import LogOutForm from './LogOutForm'
import ForgotPassword  from './ForgotPassword'
import ResetPassword from './ResetPassword'
function App() {
  const [user,setUser]=useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  
  return (
    <div>
      <BrowserRouter basename="/login">
        <Routes>
          <Route path='/' element={<Home user={user}/>}/>
          <Route path='/logIn' element={<LoginForm user={user} setUser={setUser}/>}/>
          <Route path='/logOut' element={<LogOutForm user={user} setUser={setUser}/>}/>
          <Route path='/signUp' element={<SignUpForm setUser={setUser}/>}/>
          <Route path="/forgot-password" element={<ForgotPassword user={user} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
