# Explore

<div class="slidecontainer">
  <input type="range" min="2014" max="2025" value="2024" class="slider" id="myRange">
</div>

<div class="column">
<figure id="expenditure-absolute-graphic" class="breakout">
<div class="vis" id="vis-expenditure-absolute"></div>
</figure>
<figure id="share-of-gdp-graphic" class="breakout">
<div class="vis" id="vis-share-of-gdp"></div>
</figure>
</div>

```js
import vegaEmbed from "npm:vega-embed";

const selectedYear = Generators.input(document.querySelector("#year-selector"));

// const expenditureAbsoluteSpec = await FileAttachment("./plots/expenditure-absolute.json").json();
// const expenditureAbsoluteViewPromise = vegaEmbed("#vis-expenditure-absolute", expenditureAbsoluteSpec, {actions: false}).then(res => res.view);

const shareOfGdpSpec = await FileAttachment("./plots/share-of-gdp.json").json();
const shareOfGdpViewPromise = vegaEmbed("#vis-share-of-gdp", shareOfGdpSpec, {actions: false}).then(res => res.view);

const views = [
    // await expenditureAbsoluteViewPromise,
    await shareOfGdpViewPromise,
];

for (const view of views) {
    if (view) {
        view.signal("selectedYear", selectedYear).run();
    }
}

```
