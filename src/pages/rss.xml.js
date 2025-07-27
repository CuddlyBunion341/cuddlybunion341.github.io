export async function GET(context) {
  const blog = await getCollection("blog");

  const items = await Promise.all(
    blog.map(async (post) => {
      const { html } = await post.render();

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        content: html,
        categories: post.data.tags || [],
        author: "CuddlyBunion341",
        guid: post.slug,
        ...(post.data.heroImage && {
          enclosure: {
            url: post.data.heroImage,
            type: "image/jpeg",
            length: 0,
          },
        }),
        customData: `
          <tags>${(post.data.tags || []).map((tag) => `<tag>${tag}</tag>`).join("")}</tags>
          <license>MIT</license>
        `,
      };
    })
  );

  return rss({
    title: "CuddlyBunion341 Blog",
    description: "Personal blog and portfolio",
    site: context.site,
    language: "en",
    copyright: `Copyright (c) ${new Date().getFullYear()} CuddlyBunion341. Licensed under MIT.`,
    lastBuildDate: new Date(),
    ttl: 60,
    customData: `<generator>Astro v4</generator>`,
    items,
  });
}
