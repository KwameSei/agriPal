import User from '../models/Users.js'

// Get al users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

// Get a user
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const getUserConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const connections = await Promise.all(
      user.connections.map((id) => User.findById(id))
    );

    const formattedConnections = connections.map(
      ({ _id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium }) => {
        return { _id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium}
      }
    );

    res.status(200).json(formattedConnections);
  } catch(error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

// Add or remove a connection
export const addRemoveConnection = async (req, res) => {
  try {
    const { id, connectionId } = req.params;
    const user = await User.findById(id);
    const connection = await User.findById(connectionId);

    if (user.connections.includes(connectionId)) {
      user.connections = user.connections.filter((id) => id !== connectionId);
      connection.connections = connection.connections.filter((id) => id !== id);
  } else {
    user.connections.push(connectionId);
    connection.connections.push(id);
  }

  await user.save();
  await connection.save();

  const connections = await Promise.all(
    user.connections.map((id) => User.findById(id))
  );

  const formattedConnections = connections.map(
    ({ _id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium }) => {
      return { _id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium}
    }
  );

  res.status(200).json(formattedConnections);
} catch(error) {
  res.status(404).json({ success: false, message: error.message });
}
}

// Create a user
export const createUser = async (req, res) => {
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

  //  Confirm user data
  if (!firstName || !lastName || !email || !phone || !password || role) {
    res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  // Confirm user does not exist
  if (User.findOne({ email })) {
    res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser = { 
    firstName: firstName,
    lastName: lastName,
    otherNames: otherNames,
    email: email,
    phone: phone,
    password: hashedPassword,
    region: region,
    district: district,
    city: city,
    address: address,
    picturePath: picturePath,
    role: role,
    connections: connections,
    status: status,
    permissions: permissions,
    viewedProfile: viewedProfile,
    lastSeen: lastSeen,
    impressions: impressions,
    isVerified: isVerified,
    isSubscribed: isSubscribed,
    isBlocked: isBlocked,
    isDeleted: isDeleted,
    isSuspended: isSuspended,
    isApproved: isApproved,
    isPending: isPending,
    isPremium: isPremium
  };

  try {
    const user = await User.create(newUser);
    if (user) {
      res.status(201).json({ success: true, message: 'User created successfully', user: user });
    } else {
      res.status(400).json({ success: false, message: 'User could not be created' });
    }
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Update a user
// export const updateUser = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     otherNames,
//     email,
//     phone,
//     password,
//     region,
//     district,
//     city,
//     address,
//     picturePath,
//     role,
//     connections,
//     status,
//     permissions,
//     viewedProfile,
//     lastSeen,
//     impressions,
//     isVerified,
//     isSubscribed,
//     isBlocked,
//     isDeleted,
//     isSuspended,
//     isApproved,
//     isPending,
//     isPremium
//     } = req.body;

//   //  Confirm user data
//   if (!firstName || !lastName || !email || !phone || !password || role) {
//     res.status(400).json({ success: false, message: 'Please provide all required fields' });
//   }

//   const user = await User.findById(req.params.id);

//   // Confirm user exists
//   if (!user) {
//     res.status(404).json({ success: false, message: 'User not found' });
//   }

//   try {
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.otherNames = otherNames;
//     user.email = email;
//     user.phone = phone;
//     user.region = region;
//     user.district = district;
//     user.city = city;
//     user.address = address;
//     user.picturePath = picturePath;
//     user.role = role;
//     user.connections = connections;
//     user.status = status;
//     user.permissions = permissions;
//     user.viewedProfile = viewedProfile;
//     user.lastSeen = lastSeen;
//     user.impressions = impressions;
//     user.isVerified = isVerified;
//     user.isSubscribed = isSubscribed;
//     user.isBlocked = isBlocked;
//     user.isDeleted = isDeleted;
//     user.isSuspended = isSuspended;
//     user.isApproved = isApproved;
//     user.isPending = isPending;
//     user.isPremium = isPremium;
    
//     if (password) {
//       const saltRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);
//       user.password = hashedPassword;
//     }

//     const updatedUser = await user.save();
//     res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
//   } catch(error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  try {
    const {_id:id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium} = updatedUser;

    const token = jwt.sign({ id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(200).json({ success: true, message: 'User updated successfully', result: {updatedUser, token} });
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Confirm user exists
  if (!id) {
    res.status(404).json({ success: false, message: 'User not found' });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
  }
}