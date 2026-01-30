import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';


const SignUpForm = ({setUser}) => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // التحقق من تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة!");
      return;
    }

    if (formData.password.length < 6) {
      setError("يجب أن تكون كلمة المرور 6 أحرف على الأقل");
      return;
    }

    console.log("بيانات الحساب الجديد:", formData);

    const DataUser={
      email:formData.email,
      name:formData.username,
      password:formData.password,
      isLogin:true
    }
    setUser(DataUser)

    localStorage.setItem('user',JSON.stringify(DataUser))
    navigate('/')

    };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={{ textAlign: 'center' }}>إنشاء حساب جديد</h2>
        
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>اسم المستخدم:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.inputGroup}>
          <label>البريد الإلكتروني:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.inputGroup}>
          <label>كلمة المرور:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.inputGroup}>
          <label>تأكيد كلمة المرور:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={styles.input} required />
        </div>

        <button type="submit" style={styles.button}>تسجيل</button>
        <p>Already have an account? <Link to={'/logIn'}>Login</Link></p>

      </form>

    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '30px' },
  form: { padding: '25px', border: '1px solid #ddd', borderRadius: '10px', width: '350px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }
};

export default SignUpForm;