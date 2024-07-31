'use server';

import { User } from '../../models/auth/user';
import { retrieveData, storeData } from '../data/data';
import { decrypt, encrypt } from './crypto';
import {
  createSession,
  deleteCurrentSession,
  getCurrentSessionId,
} from './session';

const userPath = `users`;

export const register = async (username: string, password: string) => {
  const users = getUsers();
  const user = users.find((user: User) => user.username === username);
  if (user) {
    return false;
  }
  const encryptedPassword = await encrypt(password);
  users.push({ username, password: encryptedPassword });
  storeData(userPath, users);
  return await login(username, password);
};

export const login = async (username: string, password: string) => {
  const users: User[] = getUsers();
  const user = users.find((user: User) => user.username === username);
  if (!user) {
    return false;
  }
  const decryptedPassword = await decrypt(user.password);
  if (decryptedPassword === password) {
    createSession(username);
    return true;
  }
  return false;
};

export const logout = async () => {
  deleteCurrentSession();
};

export const isLoggedIn = () => {
  const sessionId = getCurrentSessionId();
};

const getUsers = () => {
  return retrieveData(userPath);
};
