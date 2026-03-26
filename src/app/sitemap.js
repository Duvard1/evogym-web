export default function sitemap() {
  return [
    {
      url: 'https://evogym.com.ec',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://evogym.com.ec/inscripcion',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
