import axios from "axios";
axios.defaults.withCredentials = true


export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
}

export const signin = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${USERS_API}/signin`, credentials, { withCredentials: true });
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  localStorage.removeItem('user');
  return response.data;
};

export const profile = async () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else {
    const response = await axios.post(`${USERS_API}/profile`, null, { withCredentials: true });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axios.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const { password, ...userWithoutPassword } = user;
  const response = await axios.post(`${USERS_API}`, user);
  return { ...response.data, password: undefined };
};

export const deleteUser = async (user: any) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};
