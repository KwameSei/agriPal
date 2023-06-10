import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async(req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const googleToken = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });

    console.log(googleToken);
    if (googleToken){
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(ticket);
      const payload = ticket.getPayload();
      req.user = {id: payload.sub, name: payload.name, email: payload.email, picture: payload.picture};
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export default auth;