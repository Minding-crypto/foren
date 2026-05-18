/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"

const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/foren" : "",
  assetPrefix: isGithubPages ? "/foren/" : "",
  trailingSlash: isGithubPages,
  images: {
    unoptimized: true
  }
}

export default nextConfig
