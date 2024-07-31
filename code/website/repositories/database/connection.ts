import mariadb from 'mariadb';

const host = process.env.DB_HOST || 'db';
const user = process.env.DB_USER || 'k3s-user';
const password = process.env.DB_PASSWORD || 'mysecurepassword';
const database = process.env.DB_DATABASE || 'k3s';

const databaseConfiguration: { connectionPool: mariadb.Pool | null } = {
  connectionPool: null,
};

export type Connection = mariadb.PoolConnection | null;

export const getConnection = async () => {
  if (!databaseConfiguration.connectionPool) {
    const connectionPool = mariadb.createPool({
      host,
      user,
      password,
      database,
      connectionLimit: 5,
    });
    databaseConfiguration.connectionPool = connectionPool;
  }
  const connection = await databaseConfiguration.connectionPool.getConnection();
  return connection;
};
