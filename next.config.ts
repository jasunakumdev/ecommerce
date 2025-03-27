import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  matcher: ['/api/:path*'],
}

export default nextConfig
