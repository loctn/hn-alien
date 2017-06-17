export const formatDuration = (time, now = Date.now() / 1000) => {
  const seconds = now - time;
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
  return Math.floor(seconds / 86400) + 'd';
};

export const formatSource = url => new URL(url || 'about:blank').hostname.replace(/^www\./i, '');

export const formatSourceHref = url => {
  const obj = new URL(url || 'about:blank');
  return obj.protocol + '//' + obj.hostname;
};