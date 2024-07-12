import { defineConfig, sharpImageService } from 'astro/config';
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  layout: 'layouts/BaseLayout.astro',
  integrations: [mdx(), tailwind({ applyBaseStyles: true, configFilePath: "./tailwind.config.js" })],
  site: "https://cuddlybunion341.github.io",
  image: {
    service: sharpImageService()
  },
  markdown: {
    shikiConfig: {
      theme: "aurora-x"
    }
  }
});
