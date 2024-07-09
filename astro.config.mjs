import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  layout: 'layouts/BaseLayout.astro',
  integrations: [mdx()]
});