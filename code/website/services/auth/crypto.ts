'use server';

import crypto from 'crypto';
import * as fs from 'fs';

const dataPath = process.env.DATA_PATH || './';
const exportedKeyPath = `${dataPath}exported_key`;
const initialVectorPath = `${dataPath}exported_vector`;

export const encrypt = async (message: string) => {
  const encoder = new TextEncoder();
  const messageUTF8 = encoder.encode(message);

  const algorithm = getAlgorithm();
  const key = await getEncryptionKey();
  const encryptedData = await crypto.subtle.encrypt(
    algorithm,
    key,
    messageUTF8,
  );
  const encryptedMessage = Buffer.from(encryptedData).toString('base64');
  return encryptedMessage;
};

export const decrypt = async (message: string) => {
  const messageBuffer = Buffer.from(message, 'base64');
  const algorithm = getAlgorithm();
  const key = await getEncryptionKey();
  const decryptedData = await crypto.subtle.decrypt(
    algorithm,
    key,
    messageBuffer,
  );
  const decoder = new TextDecoder();
  const decryptedMessage = decoder.decode(decryptedData);
  return decryptedMessage;
};

const getInitialVector = () => {
  if (fs.existsSync(initialVectorPath)) {
    const initialVectorString = fs.readFileSync(initialVectorPath);
    return Buffer.from(initialVectorString.toString(), 'base64');
  }
  const initialVector = crypto.getRandomValues(new Uint8Array(12));
  const initialVectorString = Buffer.from(initialVector).toString('base64');
  fs.writeFileSync(initialVectorPath, initialVectorString);
  return initialVector;
};

const getAlgorithm = () => {
  return {
    name: 'AES-GCM',
    iv: getInitialVector(),
  };
};

const getEncryptionKey = async () => {
  if (!fs.existsSync(exportedKeyPath)) {
    await generateKey();
  }
  const base64Key = fs.readFileSync(exportedKeyPath);
  const keyData = Buffer.from(base64Key.toString(), 'base64');
  const importedKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt'],
  );
  return importedKey;
};

const generateKey = async () => {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const exportedKeyValue = Buffer.from(exportedKey).toString('base64');
  fs.writeFileSync(exportedKeyPath, exportedKeyValue);
};
