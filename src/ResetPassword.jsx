import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = ({setUser}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // جلب الإيميل من الرابط (مثلاً: ?email=said@gmail.com)
  const emailFromUrl = searchParams.get('email');

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("كلمات المرور غير متطابقة!");
      return;
    }

    // جلب بيانات المستخدم من localStorage لتحديثها
    const savedUserData = localStorage.getItem('user');
    
    if (savedUserData) {
      let user = JSON.parse(savedUserData);

      // التأكد أن الإيميل في localStorage يطابق الإيميل في الرابط
      if (user.email === emailFromUrl) {
        user.password = passwords.newPassword; // تحديث كلمة المرور
        localStorage.setItem('user', JSON.stringify(user));
        const DataUser={
          email:user.email,
          name:user.username,
          password:user.password,
          isLogin:true
        }
        setUser(DataUser)
        setSuccess(true);
        setTimeout(() => navigate('/logIn'), 3000); // التوجيه لصفحة الدخول بعد 3 ثوانٍ
      } else {
        setError("خطأ في التحقق من الحساب.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>تعيين كلمة مرور جديدة</h2>
        <p style={{ fontSize: '14px' }}>الحساب: <strong>{emailFromUrl}</strong></p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>تم تغيير كلمة المرور بنجاح! سيتم تحويلك الآن...</p>}

        <div style={styles.inputGroup}>
          <label>كلمة المرور الجديدة:</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label>تأكيد كلمة المرور:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={success}>
          حفظ التغييرات
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  form: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '350px' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px', marginTop: '5px' },
  button: { width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ResetPassword;