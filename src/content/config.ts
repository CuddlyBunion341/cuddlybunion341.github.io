import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  project: projectCollection,
};
