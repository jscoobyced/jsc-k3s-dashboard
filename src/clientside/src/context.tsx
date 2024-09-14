import { createContext } from 'react';
import {
  ApplicationContextData,
  defaultApplicationContext,
} from './models/applicationContext';

export const ApplicationContext = createContext<ApplicationContextData>(
  defaultApplicationContext,
);
