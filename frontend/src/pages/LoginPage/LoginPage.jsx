import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import './LoginPage.css';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await login(form);

      // Redirect based on role
      if (user.role === 'student') {
        window.location.href = '/student/dashboard';
      } else if (user.role === 'instructor') {
        window.location.href = '/instructor/dashboard';
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* ✅ Optional logo */}
        <div className="auth-header">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to continue your learning journey</p>
        </div>

        {error && <p className="error">{error}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
