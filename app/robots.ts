import { siteConfig } from '@/lib/config/site';
import { baseUrl } from 'lib/utils';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*'
      }
    ],
    sitemap: `${siteConfig}/sitemap.xml`,
    host: baseUrl
  };
}
