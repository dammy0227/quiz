// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import './LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();

  // Default to student login mode
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ matricNumber: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send only the required credentials depending on role
      const credentials =
        role === 'student'
          ? { matricNumber: form.matricNumber, password: form.password }
          : { email: form.email, password: form.password };

      const user = await login(credentials);

      // Redirect by role
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
        <div className="auth-header">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to continue your journey</p>
        </div>

        {/* Toggle between student and instructor */}
        <div className="toggle-role">
          <button
            type="button"
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student Login
          </button>
          <button
            type="button"
            className={role === 'instructor' ? 'active' : ''}
            onClick={() => setRole('instructor')}
          >
            Instructor Login
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Conditionally render form fields */}
        {role === 'student' ? (
          <input
            type="text"
            name="matricNumber"
            placeholder="Matric Number"
            value={form.matricNumber}
            onChange={handleChange}
            required
          />
        ) : (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        )}

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
