import footnote from "markdown-it-footnote";

export default {
  title: "NATO Strategic Capacities Visualised",

  root: "src",
  head: `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="./assets/graph.png" sizes="any">
    <link rel="stylesheet" href="./style.css">
    <script type="module" src="./script.js"></script>
    `,

  // logo: "logo.png",

  sidebar: true,
  toc: true,
  pager: true,

  // search: true,

  footer: `Built with 🩸, 💦 & 💧 by <a href="https://github.com/bramcomyn">Bram Comyn</a>, <a href="https://github.com/tdpeuter">Tibo De Peuter</a> & <a href="https://github.com/brentjan">Brent Janssens</a> for the <a href="https://studiekiezer.ugent.be/2025/studiefiche/en/C004074">2026 Datavisualisation project</a> at <a href="https://www.ugent.be/">Ghent University.</a></br><a href="https://www.flaticon.com/free-icons/data-visualization" title="data visualization icons">Data visualization icons created by meaicon - Flaticon</a>`,

  // Plugins
  markdownIt: (md) => md.use(footnote),
};
