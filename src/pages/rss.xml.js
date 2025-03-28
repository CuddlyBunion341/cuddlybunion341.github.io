import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');

  return rss({
    title: 'CuddlyBunion341 Blog',
    description: 'Personal blog and portfolio',
    site: context.site,
    language: 'en',
    copyright: `Copyright (c) ${new Date().getFullYear()} CuddlyBunion341. Licensed under MIT.`,
    lastBuildDate: new Date(),
    ttl: 60,
    customData: `<generator>Astro v4</generator>`,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      content: post.body,
      categories: post.data.tags || [],
      author: 'CuddlyBunion341',
      guid: post.slug,
      ...(post.data.heroImage && {
        enclosure: {
          url: post.data.heroImage,
          type: 'image/jpeg',
          length: 0
        }
      }),
      customData: `
        <tags>${(post.data.tags || []).map(tag => `<tag>${tag}</tag>`).join('')}</tags>
        <license>MIT</license>
      `
    })),
  });
}
