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

export const collections = { services, news };
