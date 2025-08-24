const API_BASE = import.meta.env.VITE_API?.replace(/\/api$/, "");

export default function getImageSrc(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url}`;
}
