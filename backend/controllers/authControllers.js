import crypto from 'crypto';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { roles, permissions } from '../roles_permit.js'
import sendEmail from '../utils/email.js';
import ErrorHandler from '../utils/errorHandling.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      otherNames,
      email,
      phone,
      password,
      region,
      district,
      city,
      address,
      picturePath,
      role,
      connections,
      status,
      permissions,
      viewedProfile,
      lastSeen,
      impressions,
      isVerified,
      isSubscribed,
      isBlocked,
      isDeleted,
      isSuspended,
      isApproved,
      isPending,
      isPremium
    } = req.body;

    const saltRounds = 10;  // Number of rounds to generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // Hash password

    const newUser = new User({
      firstName,
      lastName,
      otherNames,
      email,
      phone,
      password: hashedPassword,
      region,
      district,
      city,
      address,
      picturePath,
      role: roles.user,
      permissions: 'user',
      connections,
      status: status || 'active',
      viewedProfile: Math.floor(Math.random() * 1000),
      lastSeen: Date.now(),
      impressions: Math.floor(Math.random() * 1000),
      isVerified: false,
      isSubscribed: false,
      isBlocked: false,
      isDeleted: false,
      isSuspended: false,
      isApproved: false,
      isPending: true,
      isPremium: false
    });

    const savedUser = await newUser.save(); // Save user to database
    res.status(201).json(savedUser); // Send response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body; // Get email and password from request body

  if(!email || !password) {
    return ErrorHandler('Please provide an email and password', 400);
  }

  try {
    const user = await User.findOne({ email }).select('+password'); // Find user by email

    if(!user) {
      return ErrorHandler('Invalid credentials', 404);
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(404).json({ success: false, error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded.id = user._id;  // Add user id to decoded token 
    delete user.password; // Delete password from user object
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user) {
      return res.status(404).json({ success: false, error: 'Email could not be sent' });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    // const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `
      <p>You are receiving this email because you (or someone else) has requested the reset of a <b>password</b>.<p>
      <p>Please to go the link below to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password reset request',
        text: message
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, error: 'Email could not be sent' });
    }
  } catch (error) {
    next(error);
  }
};

export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid reset token' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Set new password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;  // Delete reset token
    user.resetPasswordExpire = undefined; // Delete reset token expire date

    await user.save();

    res.status(201).json({ success: true, data: 'Password reset success' });
  } catch (error) {
    next(error);
  }
};
