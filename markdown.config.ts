import remarkToc from "remark-toc";

export default {
  shikiConfig: {
    theme: "one-light",
  },
  remarkPlugins: [[remarkToc, { tight: false, ordered: false }]],
  rehypePlugins: [],
};
