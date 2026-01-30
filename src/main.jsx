import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser';
import './index.css'
import App from './App.jsx'

// تفعيل الخدمة باستخدام الـ Public Key الخاص بك
// ستجده في حسابك على EmailJS في قسم Account -> Public Key
emailjs.init("vIcvKHCGQmkgKor6m"); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)