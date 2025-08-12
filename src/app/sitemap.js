export default function sitemap() {
  const baseUrl = 'https://elbinbinil.github.io';
  const currentDate = new Date().toISOString();

  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: currentDate,
      changeFrequency: 'monthly', 
      priority: 0.8,
    },
  ];

  return routes;
}
