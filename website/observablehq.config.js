import footnote from "markdown-it-footnote";

export default {
  title: "NATO Strategic Capacities Visualised",

  root: "src",
  head: '<link rel="stylesheet" href="./style.css">',

  // logo: "logo.png",

  // favicons: [
  //   {rel: "icon", href: "favicon.ico", sizes: "any"},
  //   {rel: "icon", href: "favicon.svg", type: "image/svg+xml"}
  // ],

  sidebar: true,
  toc: true,
  pager: true,

  // search: true,

  // TODO Add names
  footer: `Built with ❤️`,

  // Plugins
  markdownIt: (md) => md.use(footnote),
};
