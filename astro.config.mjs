import { defineConfig, sharpImageService } from "astro/config";
import markdownConfig from "./markdown.config";
import mdx from "@astrojs/mdx";
import htmlBeautifier from 'astro-html-beautifier';

// https://astro.build/config
export default defineConfig({
  layout: "layouts/BaseLayout.astro",
  markdown: markdownConfig,
  integrations: [
    mdx({
      ...markdownConfig,
      extendPlugins: false,
    }),
    htmlBeautifier({
      indent_size: 2,
      indent_char: " ",
      max_preserve_newlines: 2,
      preserve_newlines: true,
      keep_array_indentation: true,
      break_chained_methods: false,
      indent_scripts: "normal",
      brace_style: "collapse",
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: true,
      wrap_line_length: 120,
      indent_inner_html: true,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false
    })
  ],
  site: "https://cuddlybunion341.github.io",
  image: {
    service: sharpImageService(),
  },
});
