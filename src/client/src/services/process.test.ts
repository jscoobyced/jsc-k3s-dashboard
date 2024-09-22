import { getFromProcess } from './process';

describe('process', () => {
  it('should return the value of the key if it exists', () => {
    const key = 'KEY';
    const value = 'VALUE';
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const mockProcess = process ?? {
      env: {},
    };
    mockProcess.env[key] = value;

    expect(getFromProcess(key, 'DEFAULT')).toBe(value);
  });

  it("should return the default value of the key if it doesn't exists", () => {
    const key = 'KEY';
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const mockProcess = process ?? {};

    mockProcess.env = {};

    expect(getFromProcess(key, 'DEFAULT')).toBe('DEFAULT');
  });

  it('should return the default value if there is an exception', () => {
    const key = 'KEY';
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const mockProcess = process ?? {};
    mockProcess.env = null as unknown as NodeJS.ProcessEnv;

    expect(getFromProcess(key, 'DEFAULT')).toBe('DEFAULT');
  });
});
