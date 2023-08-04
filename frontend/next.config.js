// Parsing error: Cannot find module 'next/babel' is not fixable yet without breaking es-lint: https://github.com/dopeshot/beyond-life/issues/379
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
