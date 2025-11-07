export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const postDate = new Date(timestamp);
  let seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (seconds < 0) return "just now";
  if (seconds < 60) return seconds + "s";
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes + "m";
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }
  if (seconds < 31536000) {
    const months = Math.floor(seconds / 2592000);
    const days = Math.floor((seconds % 2592000) / 86400);
    return days > 0 ? `${months}mo ${days}d` : `${months}mo`;
  }
  const years = Math.floor(seconds / 31536000);
  const months = Math.floor((seconds % 31536000) / 2592000);
  return months > 0 ? `${years}y ${months}mo` : `${years}y`;
};
