// src/pages/RegisterPage/RegisterStudentPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import './RegisterPage.css';

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    matricNumber: '',
    level: '',
    department: '',
    role: 'student',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = await register(form);
      if (user.role === 'student') navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className='subtitle'>Student Registration</h2>
        <p className="subtitle">Create your student account</p>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="matricNumber"
          placeholder="Matric Number"
          value={form.matricNumber}
          onChange={handleChange}
          required
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
          required
          className=''
        >
          <option value="">Select Level</option>
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
          <option value="500">500 Level</option>
        </select>
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
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

        <button type="submit" className="btn">Register</button>
        <p className="login-link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterStudentPage;
