'use server';

import {
  Connection,
  getConnection,
} from '../../../repositories/database/connection';
import { Session } from '../../models/auth/user';

export const getSessionById = async (currentSessionId: string) => {
  const emptySession: Session = {
    sessionId: '',
    username: '',
  };
  let connection: Connection = null;
  try {
    connection = await getConnection();
    if (!connection) return emptySession;
    const query = 'SELECT * FROM sessions WHERE session_id = ?';
    const rows = await connection.query(query, [currentSessionId]);
    if (!rows.length) {
      return emptySession;
    }
    return {
      sessionId: rows[0].session_id,
      username: rows[0].username,
    };
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};

export const createSessionTable = async () => {
  let connection: Connection = null;
  try {
    connection = await getConnection();
    if (!connection) return;
    await connection.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id INT PRIMARY KEY AUTO_INCREMENT,
                session_id VARCHAR(255),
                username VARCHAR(255)
            )
        `);
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.end();
  }
};
