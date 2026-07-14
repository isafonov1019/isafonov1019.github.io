// =========================================================
//  ОПИСАНИЕ КОЛЛЕКЦИЙ КОНТЕНТА
//  Здесь задаётся, какие поля есть у расписания и новостей.
//  Это же описание проверяет контент: если забыть обязательное
//  поле, сборка честно об этом предупредит.
// =========================================================
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// --- Расписание богослужений ---
// Один файл = один день со списком служб.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    // Дата дня
    date: z.coerce.date(),
    // Необязательный заголовок дня (например: «Неделя 5-я по Пятидесятнице»)
    title: z.string().optional(),
    // Необязательное примечание (например: «Престольный праздник»)
    note: z.string().optional(),
    // Список служб в этот день: время + название
    services: z
      .array(
        z.object({
          time: z.string(),
          name: z.string(),
        })
      )
      .default([]),
  }),
});

// --- Новости и объявления ---
// Один файл = одна новость. Текст новости — в теле файла (Markdown).
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // Краткое описание для списка новостей (необязательно)
    summary: z.string().optional(),
    // Картинка (необязательно) — путь вида /images/news/...
    image: z.string().optional(),
    // Показывать ли новость на сайте
    published: z.boolean().default(true),
  }),
});

// --- Духовенство ---
// Один файл = один священнослужитель. Биография — в теле файла.
const clergy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clergy' }),
  schema: z.object({
    name: z.string(),
    // Сан / должность (например: «настоятель, протоиерей»)
    rank: z.string().optional(),
    // Фотография (необязательно) — путь вида /images/clergy/...
    photo: z.string().optional(),
    // Порядок вывода (меньше — выше)
    order: z.number().default(100),
  }),
});

// --- Фотогалерея ---
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    image: z.string().optional(),
    caption: z.string().optional(),
    order: z.number().default(100),
  }),
});

// --- Редактируемые тексты страниц ---
// Например, история храма (id: "istoriya"). Текст — в теле файла (Markdown).
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().optional(),
  }),
});

// --- Общие настройки храма (один файл: settings/site.md) ---
// Название, адрес, телефон и т. п. — меняются в одном месте,
// подставляются по всему сайту.
const settings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/settings' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    welcome: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    // Реквизиты для пожертвований (можно в несколько строк)
    requisites: z.string().optional(),
    // Код карты (iframe) или ссылка — необязательно
    mapEmbed: z.string().optional(),
  }),
});

export const collections = { services, news, clergy, gallery, pages, settings };
