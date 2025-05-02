const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    // Check if user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log("existingUser",existingUser);
    
    if (existingUser.length) {
      return res.status(400).send({
        status: false,
        message: "User already exists"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const [result] = await db.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).send({
      status: true,
      message: "User registered successfully",
      data: {
        id: result.insertId,
        email,
        name,
        token
      }
    });
  } catch (err) {
    console.error("Error in user registration:", err);
    return res.status(500).send({
      status: false,
      message: "Error processing request"
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found"
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).send({
        status: false,
        message: "Invalid password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return res.send({
      status: true,
      message: "Login successful",
      data: {
        ...userWithoutPassword,
        token
      }
    });
  } catch (err) {
    console.error("Error in user login:", err);
    return res.status(500).send({
      status: false,
      message: "Error processing request"
    });
  }
}; 