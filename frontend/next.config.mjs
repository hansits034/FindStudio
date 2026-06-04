/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — outputs HTML/JS/CSS files to `out/`.
  // Works on any static host (Netlify, Vercel, GitHub Pages, S3, Cloudflare Pages).
  output: 'export',
  // Static export disables next/image optimizer (which needs a server),
  // so we serve images as-is.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  // Trailing slash gives stable /path/index.html files — friendlier to static hosts.
  trailingSlash: true,
};

export default nextConfig;
