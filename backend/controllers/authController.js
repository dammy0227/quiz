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

    // Basic field validation
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

    // Check email uniqueness
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // If student, validate student-specific fields
    if (role === 'student') {
      if (!isNotEmpty(matricNumber) || !isNotEmpty(level) || !isNotEmpty(department)) {
        return res.status(400).json({
          message: 'Matric number, level, and department are required for student registration',
        });
      }

      const existingMatric = await User.findOne({ matricNumber });
      if (existingMatric) {
        return res.status(400).json({ message: 'Matric number already registered' });
      }
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user based on role
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      matricNumber: role === 'student' ? matricNumber : undefined,
      level: role === 'student' ? level : undefined,
      department: role === 'student' ? department : undefined,
    });

    // Return success
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
// LOGIN (STUDENT OR INSTRUCTOR)
// ============================
export const login = async (req, res, next) => {
  try {
    const { email, matricNumber, password } = req.body;

    // Must include password
    if (!isNotEmpty(password)) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Determine login type
    let user;

    if (isNotEmpty(matricNumber)) {
      // Student login
      user = await User.findOne({ matricNumber });
      if (!user || user.role !== 'student') {
        return res.status(401).json({ message: 'Invalid student credentials' });
      }
    } else if (isNotEmpty(email)) {
      // Instructor login
      user = await User.findOne({ email });
      if (!user || user.role !== 'instructor') {
        return res.status(401).json({ message: 'Invalid instructor credentials' });
      }
    } else {
      return res.status(400).json({ message: 'Email or matric number is required' });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
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
