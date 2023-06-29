import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const auth = async(req, res, next) => {
//   try {
//     console.log(req.headers.authorization);
//     const token = req.headers.authorization.split(" ")[1];
//     const googleToken = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });

//     console.log(googleToken);
//     if (googleToken){
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID,
//       });
//       console.log(ticket);
//       const payload = ticket.getPayload();
//       req.user = {id: payload.sub, name: payload.name, email: payload.email, picture: payload.picture};
//     } else {
//       // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//       // const {id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium} = decodedData;
//       // req.user = {id, name, email, phone, photoURL, role, connections, status, permissions, viewedProfile, lastSeen, impressions, isVerified, isSubscribed, isBlocked, isDeleted, isSuspended, isApproved, isPending, isPremium
//       // };
//     const token = req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// }

// export default auth;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const tokenValue = token.split(' ')[1];

    let user;

    // Verify Google login token
    if (tokenValue.startsWith('google:')) {
      const googleToken = tokenValue.split(':')[1];
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      user = { id: payload.sub, name: payload.name, email: payload.email, picture: payload.picture };
    } else {
      // Verify custom login token
      user = jwt.verify(tokenValue, process.env.JWT_SECRET);
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;
