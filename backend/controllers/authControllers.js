import User from '../models/User.js';

export const register = async (req, res, next) => {
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
    role = 'user',
    connections,
    status,
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

  try {
    const user = await User.create({
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
    });

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const login = (req, res, next) => {
  res.send('login');
};

export const forgotpassword = (req, res, next) => {
  res.send('forgotpassword');
};

export const resetpassword = (req, res, next) => {
  res.send('resetpassword');
};