import crypto from 'crypto';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { roles, permissions } from '../roles_permit.js';
import sendEmail from '../utils/email.js';
import ErrorHandler from '../utils/errorHandling.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      phone,
      password,
      region,
      district,
      city,
      address,
      connections,
      status,
    } = req.body;

    // Check for password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    // Change email to lowercase
    const emailToLower = email.toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: emailToLower });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const saltRounds = 10;  // Number of rounds to generate salt for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // Hash password

    const newUser = new User({
      name,
      email: emailToLower,
      phone,
      password: hashedPassword,
      region,
      district,
      photoURL: '',
      city,
      address,
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
      isPremium: false,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Prepare response data
    const responseData = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      region: savedUser.region,
      district: savedUser.district,
      photoURL: savedUser.photoURL,
      city: savedUser.city,
      address: savedUser.address,
      role: savedUser.role,
      connections: savedUser.connections,
      status: savedUser.status,
      viewedProfile: savedUser.viewedProfile,
      lastSeen: savedUser.lastSeen,
      impressions: savedUser.impressions,
      isVerified: savedUser.isVerified,
      isSubscribed: savedUser.isSubscribed,
      isBlocked: savedUser.isBlocked,
      isDeleted: savedUser.isDeleted,
      isSuspended: savedUser.isSuspended,
      isApproved: savedUser.isApproved,
      isPending: savedUser.isPending,
      isPremium: savedUser.isPremium,
      token,
    };

    res.status(201).json({ success: true, result: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body; // Get email and password from request body
  console.log("the request body is: ", req.body);
  // Change email to lowercase
  const emailToLower = email.toLowerCase();

  try {
    // Check if email and password are provided
    if (!emailToLower || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Find the user by email
    const user = await User.findOne({ email: emailToLower }).select('+password');
    console.log("the user is: ", user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, error: 'User does not exist' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log("the token is: ", token);
    // Remove password from user object
    const { password: userPassword, ...userData } = user.toObject();
    console.log("the user data is: ", userData);
    res.status(200).json({ success: true, token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("the error is: ", error);
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
