import {
  rawUnit,
  readableCpuMetric,
  readableMemoryMetric,
  readablizeBytes,
} from './format';

describe('format.readablizeBytes', () => {
  it('should format a number to human readable', () => {
    expect(readablizeBytes(1)).toBe('1 byte');
    expect(readablizeBytes(0)).toBe('0 byte');
    expect(readablizeBytes(5)).toBe('5 bytes');
    expect(readablizeBytes(1024)).toBe('1.00 kB');
    expect(readablizeBytes(1900)).toBe('1.86 kB');
    expect(readablizeBytes(1024 * 1024)).toBe('1.00 MB');
    expect(readablizeBytes(1024 * 1024)).toBe('1.00 MB');
    expect(readablizeBytes(1024 * 1024 * 1024)).toBe('1.00 GB');
    expect(readablizeBytes(1024 * 1024 * 1024 * 1024)).toBe('1.00 TB');
    expect(readablizeBytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe('1.00 PB');
  });

  it('should return empty string for invalid input', () => {
    expect(readablizeBytes(-1)).toBe('');
  });
});

describe('format.rawUnit', () => {
  it('should return 0 for invalid input', () => {
    expect(rawUnit('0')).toBe(0);
    expect(rawUnit('-2Ki')).toBe(0);
    expect(rawUnit('')).toBe(0);
  });

  it('should return the correct value for the given input', () => {
    expect(rawUnit('1Ki')).toBe(1024);
    expect(rawUnit('1Mi')).toBe(1024 * 1024);
    expect(rawUnit('1Gi')).toBe(1024 * 1024 * 1024);
  });
});

describe('format.readableCpuMetric', () => {
  it('should return the correct value for the given input', () => {
    expect(readableCpuMetric('0.5')).toBe('0.00m');
    expect(readableCpuMetric('1')).toBe('1.00m');
    expect(readableCpuMetric('2500')).toBe('2500.00m');
    expect(readableCpuMetric('100000000n')).toBe('100.00m');
  });
});

describe('format.readableMemoryMetric', () => {
  it('should return the correct value for the given input', () => {
    expect(readableMemoryMetric('1Ki')).toBe('0.00Mi');
    expect(readableMemoryMetric('1Mi')).toBe('1.00Mi');
    expect(readableMemoryMetric('2500Ki')).toBe('2.44Mi');
    expect(readableMemoryMetric('100000000Ki')).toBe('97656.25Mi');
  });
});
