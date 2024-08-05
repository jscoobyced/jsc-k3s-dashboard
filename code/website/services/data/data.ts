'use server';
import * as fs from 'fs';
import { Entity } from '../../app/models/auth/user';

const dataPath = process.env.DATA_PATH || './';

export const retrieveData = (path: string) => {
  const dataBase64 = fs.readFileSync(`${dataPath}${path}`);
  if (!dataBase64) {
    return [];
  }
  const data = Buffer.from(dataBase64.toString(), 'base64').toString();
  return JSON.parse(data);
};

export const storeData = (path: string, data: Entity[]) => {
  const dataBase64 = Buffer.from(JSON.stringify(data)).toString('base64');
  fs.writeFileSync(`${dataPath}${path}`, dataBase64);
};
