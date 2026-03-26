export default function manifest() {
  return {
    name: 'EvoGym',
    short_name: 'EvoGym',
    description: 'El gimnasio más completo de Tambillo, Ecuador.',
    start_url: '/',
    display: 'standalone',
    background_color: '#131313',
    theme_color: '#60DB00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 64x64',
        type: 'image/x-icon',
      },
    ],
  }
}
