
import React from 'react'
import { Link } from 'react-router-dom'
function Home({user}) {
    

    
  return (
    <div className="auth-links">
        {!user?.isLogin?
        <>
            
            <Link to={'/logIn'}>logIn</Link>
            <Link to={'/signUp'}>signUp</Link>
        </>
        :
             <Link to={'/logOut'}>logOut</Link>
        }
      


    </div>
  )
}

export default Home
