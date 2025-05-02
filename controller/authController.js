const db = require('../config/database');
const { sendEmail } = require('../utils/email');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await db.query('UPDATE users SET otp = ?, otp_verified = "false" WHERE email = ?', [otp, email]);

    await sendEmail(
      email,
      'Password Reset OTP',
      `Your OTP is: ${otp}`,
      `<h1>Password Reset OTP</h1><p>Your OTP is: <strong>${otp}</strong></p>`
    );

    return res.send({
      status: true,
      message: "OTP sent successfully"
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    return res.status(500).send({
      status: false,
      message: "Error processing request"
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp]);
    
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Invalid OTP"
      });
    }

    // Update OTP verification status
    await db.query('UPDATE users SET otp_verified = "true" WHERE email = ?', [email]);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return res.send({
      status: true,
      message: "OTP verified successfully",
      token
    });
  } catch (err) {
    console.error("Error in verifyOtp:", err);
    return res.status(500).send({
      status: false,
      message: "Error processing request"
    });
  }
};

exports.changeNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  
  try {
    // Check if OTP is verified
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user || user[0].otp_verified !== "true") {
      return res.status(400).send({
        status: false,
        message: "OTP not verified. Please verify OTP first."
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and reset OTP fields
    await db.query(
      'UPDATE users SET password = ?, otp = NULL, otp_verified = "false" WHERE email = ?',
      [hashedPassword, email]
    );
    
    return res.send({
      status: true,
      message: "Password changed successfully"
    });
  } catch (err) {
    console.error("Error in changeNewPassword:", err);
    return res.status(500).send({
      status: false,
      message: "Error processing request"
    });
  }
}; 