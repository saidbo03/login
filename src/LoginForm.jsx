import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const LoginForm = ({user,setUser}) => {

  const navigate=useNavigate()
  // تعريف الحالة للمدخلات
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  // تحديث الحالة عند الكتابة
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // معالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // تحقق بسيط (يمكنك استبداله بطلب API)
    if (formData.email === "" || formData.password === "") {
      setError("يرجى ملء جميع الحقول");
      return;
    }

    
    if(formData.email === user.email && formData.password === user.password){
      console.log("بيانات تسجيل الدخول المرسلة:", formData);
       const DataUser={
        email:user.email,
        name:user.username,
        password:user.password,
        isLogin:true
      }
      setUser(DataUser)
      localStorage.setItem("user",JSON.stringify(DataUser));

      // تحويل لصفحة home
      navigate("/");
    }else{
      console.log("بيانات فيها مشكل ");
    }
  };
  

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>تسجيل الدخول</h2>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>كلمة المرور:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
              <Link to="/forgot-password" style={{ fontSize: '12px', color: '#007bff', textDecoration: 'none' }}>
                نسيت كلمة المرور؟
              </Link>
            </div>
        </div>


        <button type="submit" style={styles.button}>دخول</button>
        <p>Don't have an account? <Link to={'/signUp'}>Sign Up</Link></p>

      </form>

    </div>
  );
};

// تنسيقات بسيطة
const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  form: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '300px' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px', marginTop: '5px' },
  button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default LoginForm;