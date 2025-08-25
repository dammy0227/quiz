// controllers/authController.js
import User from '../models/User.js';
import { isValidEmail, isStrongPassword, isNotEmpty } from '../utils/validator.js';
import { hashPassword, comparePassword } from '../utils/encryption.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: env.TOKEN_EXPIRES_IN });
};

// Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!isNotEmpty(name) || !isNotEmpty(email) || !isNotEmpty(password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 chars, include uppercase, lowercase, and number' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (error) {
    next(error);
  }
};

// Logout (client should remove token)
export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
