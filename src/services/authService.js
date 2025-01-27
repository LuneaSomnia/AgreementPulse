import jwt_decode from 'jwt-decode';

const mockUsers = [
  {
    email: 'demo@agreementpulse.com',
    password: 'demo123',
    name: 'Demo User'
  }
];

export const authenticateUser = (credentials) => {
  const user = mockUsers.find(u => 
    u.email === credentials.email && 
    u.password === credentials.password
  );

  if (user) {
    const token = generateToken(user);
    localStorage.setItem('token', token);
    return true;
  }
  return false;
};

const generateToken = (user) => {
  // In production, this would be handled by the backend
  return btoa(JSON.stringify({
    user: { email: user.email, name: user.name },
    exp: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
  }));
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = jwt_decode(token);
    return decoded.exp > new Date().getTime();
  } catch {
    return false;
  }
};
