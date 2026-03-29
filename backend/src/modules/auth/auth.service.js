import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

// Accepts either an id_token (credential) or an access_token
export const verifyGoogleToken = async (token) => {
  // Try access_token first (implicit flow from useGoogleLogin)
  const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const data = await res.json();
    // Normalise to same shape as id_token payload
    return { sub: data.sub, email: data.email, name: data.name, picture: data.picture };
  }
  throw new Error('Failed to verify Google token');
};

import { ALLOWED_DOMAINS } from '../../config/domains.js';

export const isAllowedDomain = (email) => {
  if (process.env.NODE_ENV === 'development') return true;
  const domain = email.split('@')[1];
  return ALLOWED_DOMAINS.includes(domain);
};

export const findOrCreateUser = async (payload) => {
  const { sub: googleId, email, name, picture } = payload;

  let user = await User.findOne({ googleId });
  if (!user) {
    user = await User.create({ googleId, email, name, photo: picture });
  }
  return user;
};

export const generateStudentJWT = (userId) => {
  return jwt.sign(
    { id: userId, role: 'student' },
    process.env.JWT_SECRET || 'uNdErEsTiMaTe_SeCrEt',
    { expiresIn: '30d' }
  );
};
