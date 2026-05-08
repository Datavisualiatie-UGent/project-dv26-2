import footnote from "markdown-it-footnote";

export default {
  title: "NATO Strategic Capacities Visualised",

  root: "src",
  head: `
    <link rel="stylesheet" href="./style.css">
    <script type="module" src="./script.js"></script>
    `,

  // logo: "logo.png",

  // favicons: [
  //   {rel: "icon", href: "favicon.ico", sizes: "any"},
  //   {rel: "icon", href: "favicon.svg", type: "image/svg+xml"}
  // ],

  sidebar: true,
  toc: true,
  pager: true,

  // search: true,

  // TODO Add links?
  footer: `Built with ❤️ by Bram Comyn, Tibo De Peuter & Brent Janssens for the 2026 Datavisualisation project at Ghent University.`,

  // Plugins
  markdownIt: (md) => md.use(footnote),
};
