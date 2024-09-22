export const getFromProcess = (key: string, defaultValue: string): string => {
  try {
    return process.env[key] ?? defaultValue;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return defaultValue;
  }
};
