import remarkToc from "remark-toc";

export default {
  shikiConfig: {
    theme: "aurora-x",
  },
  remarkPlugins: [[remarkToc, { tight: false, ordered: false }]],
  rehypePlugins: [],
};
