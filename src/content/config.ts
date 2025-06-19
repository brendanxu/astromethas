import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// 网站配置集合
const siteConfigCollection = defineCollection({
  type: 'data',
  schema: z.object({
    logo: z.object({
      text: z.string(),
      image: z.string().optional(),
    }),
    navigation: z.object({
      links: z.array(z.object({
        text: z.string(),
        href: z.string(),
        links: z.array(z.object({
          text: z.string(),
          href: z.string(),
        })).optional(),
      })),
    }),
  }),
});

// 首页内容集合
const homepageCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      tagline: z.string().optional(),
      image: z.string().optional(),
      actions: z.array(z.object({
        text: z.string(),
        href: z.string(),
        variant: z.enum(['primary', 'secondary']).optional(),
        icon: z.string().optional(),
      })),
    }),
    features: z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })),
    }),
  }),
});

// 博客文章集合（已存在，保持原样）
const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/content/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
  config: siteConfigCollection,
  homepage: homepageCollection,
};