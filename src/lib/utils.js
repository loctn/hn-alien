export const formatDuration = time => {
  const seconds = Date.now() / 1000 - time;
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
  if (seconds < 216000) return Math.floor(seconds / 3600) + 'h';
  return Math.floor(seconds / 216000) + 'd';
};

export const formatSource = url => new URL(url || 'about:blank').hostname.replace(/^www\./i, '');