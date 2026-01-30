import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutForm({user,setUser}) {
  const navigate = useNavigate();

  const handleLogout = () => {
     const DataUser={
      email:user.email,
      name:user.username,
      password:user.password,
      isLogin:false
    }

    setUser(DataUser)
    localStorage.setItem("user",JSON.stringify(DataUser));

    // تحويل لصفحة login
    navigate("/logIn");
  };

  return (
    <div className="logout-container">
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} className="logout-btn">
        Log Out
      </button>
    </div>
  );
}
