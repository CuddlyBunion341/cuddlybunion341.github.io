import { defineConfig, sharpImageService } from "astro/config";
import markdownConfig from "./markdown.config";
import mdx from "@astrojs/mdx";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  layout: "layouts/BaseLayout.astro",
  markdown: markdownConfig,
  integrations: [
    mdx({
      ...markdownConfig,
      extendPlugins: false,
    }),
    tailwind({ applyBaseStyles: true, configFilePath: "./tailwind.config.js" }),
  ],
  site: "https://cuddlybunion341.github.io",
  image: {
    service: sharpImageService(),
  },
});
