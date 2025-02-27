import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    name:"",
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify(data.user)); 
        localStorage.setItem('isAuthenticated', true); 

        navigate('/login'); 
      } else {
        setMessage(data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error logging in. Try again.');
    }finally{
        setLoading(false)
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
        <h1>SignUp</h1>
        <form className="auth-text" style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }} onSubmit={handleSubmit}>
        <input type="text"  name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email"  name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password"  name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button style={{ backgroundColor: 'black', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: 10 }} type="submit">
            {loading ? 'Loading...' : 'SignUp'}
          </button>
          {message && <p style={{color:'tomato'}}>{message}</p>}
          <a href="/login" style={{ color: 'black', textDecoration: 'none' }}> have an account? Sign in here</a>
        </form>
      </div>
    </div>
  );
}
