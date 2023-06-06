import crypto from 'crypto';
import mongoose from 'mongoose';
import { roles, permissions} from '../roles_permit.js';

const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name.']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name.']
  },
  otherNames: String,
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    match: [emailRegex, 'Please provide a valid email address.'],
    index: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number.'],
    unique: true,
    match: [phoneRegex, 'Please provide a valid phone number.'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
    select: false,  // Prevents password from being returned in query results
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: {
    type: String,
    enum: [roles.user, roles.admin, roles.superAdmin, roles.editor, roles.moderator, roles.author, roles.subscriber],
    default: roles.user,
  },
  permissions: {
    type: String,
    enum: [...Object.values(roles)],
    default: roles.user,
  },  
  connections: {
    type: Array,
    default: [],
  },
  region: {
    type: String,
    trim: true,
    enum: ["Greater Accra", "Ashante", "Eastern", "Northern", "Central", "Western", "Volta", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo", "Savannah", "North East", "Oti", "Western North"],
  },
  district: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  picturePath: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended", "banned", "deleted"],
    default: "active",
  },
  viewedProfiles: {
    type: Number
  },
  lastSeen: {
    type: Date
  },
  impressions: {
    type: Number
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  updatedAt: Date,
  deletedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  }
});

// User reset password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;  // 10 minutes

  return resetToken; 
}

const User = mongoose.model('User', UserSchema);

export default User;