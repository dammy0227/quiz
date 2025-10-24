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

// ============================
// REGISTER NEW USER
// ============================
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, matricNumber, level, department } = req.body;

    // Validate required fields
    if (!isNotEmpty(name) || !isNotEmpty(email) || !isNotEmpty(password) || !isNotEmpty(role)) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number',
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Check existing matric number (for students only)
    if (role === 'student' && isNotEmpty(matricNumber)) {
      const existingMatric = await User.findOne({ matricNumber });
      if (existingMatric) {
        return res.status(400).json({ message: 'Matric number already registered' });
      }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create new user
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      matricNumber: role === 'student' ? matricNumber : undefined,
      level: role === 'student' ? level : undefined,
      department: role === 'student' ? department : undefined,
    });

    // Return response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      matricNumber: user.matricNumber,
      level: user.level,
      department: user.department,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// LOGIN USER (MATRIC + PASSWORD)
// ============================
export const login = async (req, res, next) => {
  try {
    const { matricNumber, password } = req.body;

    if (!isNotEmpty(matricNumber) || !isNotEmpty(password)) {
      return res.status(400).json({ message: 'Matric number and password are required' });
    }

    // Find user by matric number
    const user = await User.findOne({ matricNumber });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return success response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      matricNumber: user.matricNumber,
      level: user.level,
      department: user.department,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    next(error);
  }
};

// ============================
// LOGOUT (client removes token)
// ============================
export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
