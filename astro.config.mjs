// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Адрес опубликованного сайта (GitHub Pages — быстрый доступ из РФ).
  // Запасная копия остаётся на Netlify: hram-chamerovo.netlify.app
  site: 'https://isafonov1019.github.io',

  // Все адреса — с косой чертой в конце (как отдаёт хостинг).
  // Без этого каждый переход по ссылке делал лишний редирект.
  trailingSlash: 'always',

  build: {
    // Встраиваем стили прямо в HTML: страница приходит «одетой»
    // за один запрос — важно на медленных и нестабильных сетях.
    inlineStylesheets: 'always',
  },

  integrations: [
    // Карта сайта для поисковиков (Яндекс, Google).
    // Админку в неё не включаем.
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],

  // Предзагрузка страниц, как только ссылка показалась на экране:
  // пока человек читает, следующие страницы уже скачиваются в фоне.
  // Важно для телефонов (там нет «наведения») и медленных сетей.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
