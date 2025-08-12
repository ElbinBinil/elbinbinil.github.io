export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot', 
        allow: '/',
      },
    ],
    sitemap: 'https://elbinbinil.github.io/sitemap.xml',
  };
}
