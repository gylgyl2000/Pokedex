/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/PokeAPI/**',
            },
            {
                protocol: 'https',
                hostname: 'www.pokepedia.fr',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'archives.bulbagarden.net',
                port: '',
                pathname: '/media/**',
            }
        ]
    }
};

export default nextConfig;
