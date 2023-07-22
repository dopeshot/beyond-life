/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
        appDir: true,
        forceSwcTransforms: true,
    },
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
