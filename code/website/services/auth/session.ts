'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { Session } from '../../app/models/auth/user';
import { getSessionById } from '../data/session';

const SESSION_KEY = 'sessionId';

export const createSession = (username: string) => {
  const sessionId = randomUUID();
  const session: Session = { username, sessionId };
  setSessionId(sessionId);
  return sessionId;
};

export const getCurrentSession = async () => {
  const sessionId = getCurrentSessionId();
  try {
    return await getSessionById(sessionId);
  } catch (error) {
    console.error(error);
    return { sessionId: '', username: '' };
  }
};

const deleteSession = (sessionId: string) => {
  cookies().delete(SESSION_KEY);
};

export const deleteCurrentSession = async () => {
  const sessionId = await getCurrentSessionId();
  deleteSession(sessionId);
};

const getCurrentSessionId = () => {
  return cookies().get(SESSION_KEY)?.value || '-1';
};

const setSessionId = (sessionId: string) => {
  cookies().set(SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
};

const getSessions = () => {
  return undefined; //retrieveData(sessionPath)
};
