// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Адрес опубликованного сайта (Netlify)
  site: 'https://hram-chamerovo.netlify.app',

  // Все адреса — с косой чертой в конце (как отдаёт хостинг).
  // Без этого каждый переход по ссылке делал лишний редирект.
  trailingSlash: 'always',

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
