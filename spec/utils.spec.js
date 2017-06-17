/* global describe, it, expect */
import { formatDuration } from '../src/lib/utils';


describe('Utilities', () => {
  const SECONDS_PER_HOUR = 60 * 60;
  const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
  const now = Date.now() / 1000;

  it('should return how long ago in minutes', () => {  
    expect(formatDuration(now - 0, now)).toBe('0m');
    expect(formatDuration(now - (SECONDS_PER_HOUR - 1), now)).toMatch(/\d+m/);
    expect(formatDuration(now - SECONDS_PER_HOUR, now)).not.toMatch(/\d+m/);
  });

  it('should return how long ago in hours', () => {  
    expect(formatDuration(now - (SECONDS_PER_HOUR - 1), now)).not.toMatch(/\d+h/);
    expect(formatDuration(now - (SECONDS_PER_DAY - 1), now)).toMatch(/\d+h/);
    expect(formatDuration(now - SECONDS_PER_DAY, now)).not.toMatch(/\d+h/);
  });

  it('should return how long ago in days', () => {  
    expect(formatDuration(now - (SECONDS_PER_DAY - 1), now)).not.toMatch(/\d+d/);
    expect(formatDuration(now - SECONDS_PER_DAY, now)).toMatch(/\d+d/);
    expect(formatDuration(now - SECONDS_PER_DAY * 365 * 2, now)).toMatch(/\d+d/);
  });
});