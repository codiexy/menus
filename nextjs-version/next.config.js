/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com'
            },
            {
                protocol: 'https',
                hostname: 'hot-dog-kings.firebaseapp'
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
        ],
    },
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        APP_NAME: process.env.NEXT_PUBLIC_APP_NAME
    }
}

module.exports = nextConfig
