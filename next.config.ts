import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    turbopack: {
        root: process.cwd()
    },
    images: {
        remotePatterns: [{
            hostname: 'readonlydemo.vendure.io',
        }]
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);