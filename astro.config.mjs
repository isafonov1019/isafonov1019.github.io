// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Адрес сайта. Пока публикации не было — заглушка;
  // на этапе публикации заменим на настоящий адрес (Netlify).
  site: 'https://example.netlify.app',

  integrations: [
    // Карта сайта для поисковиков (Яндекс, Google).
    // Админку в неё не включаем.
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],

  // Предзагрузка страниц при наведении на ссылку —
  // переходы по сайту ощущаются мгновенными.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
