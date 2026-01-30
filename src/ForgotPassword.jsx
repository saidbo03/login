import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    

    const templateParams = {
    email: email, 
    link: `https://saidbo03.github.io/login/reset-password?email=${email}`
    };

    // 2. إرسال الإيميل عبر EmailJS
    // استبدل IDs بالقيم الخاصة بك من داشبورد EmailJS
    emailjs.send(
      'service_4knl1s2', 
      'template_t1vrvxy', 
      templateParams, 
      'vIcvKHCGQmkgKor6m'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus({ type: 'success', msg: 'تم إرسال رابط استعادة كلمة المرور إلى بريدك!' });
      setLoading(false);
    })
    .catch((err) => {
      console.error('FAILED...', err);
      setStatus({ type: 'error', msg: 'حدث خطأ أثناء الإرسال، حاول مجدداً.' });
      setLoading(false);
    });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSendEmail} style={styles.form}>
        <h2 style={{ textAlign: 'center' }}>استعادة الحساب</h2>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.
        </p>
        
        {status.msg && (
          <p style={{ 
            color: status.type === 'success' ? 'green' : 'red',
            padding: '10px',
            backgroundColor: status.type === 'success' ? '#e6fffa' : '#fff5f5',
            borderRadius: '5px'
          }}>
            {status.msg}
          </p>
        )}

        <div style={styles.inputGroup}>
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="example@mail.com"
            required
          />
        </div>

        <button 
          type="submit" 
          style={{...styles.button, backgroundColor: loading ? '#ccc' : '#007bff'}} 
          disabled={loading}
        >
          {loading ? 'جاري الإرسال...' : 'إرسال الرابط'}
        </button>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <Link to="/login" style={{ fontSize: '14px', textDecoration: 'none', color: '#007bff' }}>
            العودة لتسجيل الدخول
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
  form: { padding: '30px', border: '1px solid #ddd', borderRadius: '12px', width: '380px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '20px' },
  input: { width: '100%', padding: '12px', marginTop: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }
};

export default ForgotPassword;