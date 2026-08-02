import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Token generate karne ka function
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check karo email already exist karta hai?
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // User banao
    const user = await User.create({ name, email, password })

    // Token banao
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // User dhundo
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Password check karo
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Token banao
    const token = generateToken(user._id)

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}