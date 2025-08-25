import API from './api';

// Login user
export const login = async (credentials) => {
  const { data } = await API.post('/auth/login', credentials);

  // Backend returns { _id, name, email, role, token }
  if (!data || !data.token) {
    throw new Error('Invalid login response from server');
  }
  return data; // this is the user object with token
};

// Register user
export const register = async (userData) => {
  const { data } = await API.post('/auth/register', userData);

  // Backend returns { _id, name, email, role, token }
  if (!data || !data.token) {
    throw new Error('Invalid register response from server');
  }
  return data; // this is the user object with token
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
