# Explore

<div class="controls">
<label for="yearSlider"><strong>Selected Year:</strong> <span id="yearLabel">2024</span></label>
<input type="range" id="yearSlider" min="2014" max="2025" step="1" value="2024">
</div>

<div class="column">
<figure id="expenditure-absolute-graphic">
<div class="vis" id="vis-expenditure-absolute"></div>
</figure>
<figure id="share-of-gdp-graphic">
<div class="vis" id="vis-share-of-gdp"></div>
</figure>
</div>

```js
import vegaEmbed from "npm:vega-embed";

const slider = document.getElementById("yearSlider");
const yearLabel = document.getElementById("yearLabel");
const sunburstDiv = document.getElementById("vis-expenditure-absolute");
const gdpDiv = document.getElementById("vis-share-of-gdp");

const expenditureAbsoluteFiles = {
    2014: FileAttachment(`./plots/expenditure-absolute-2014.json`).json(),
    2015: FileAttachment(`./plots/expenditure-absolute-2015.json`).json(),
    2016: FileAttachment(`./plots/expenditure-absolute-2016.json`).json(),
    2017: FileAttachment(`./plots/expenditure-absolute-2017.json`).json(),
    2018: FileAttachment(`./plots/expenditure-absolute-2018.json`).json(),
    2019: FileAttachment(`./plots/expenditure-absolute-2019.json`).json(),
    2020: FileAttachment(`./plots/expenditure-absolute-2020.json`).json(),
    2021: FileAttachment(`./plots/expenditure-absolute-2021.json`).json(),
    2022: FileAttachment(`./plots/expenditure-absolute-2022.json`).json(),
    2023: FileAttachment(`./plots/expenditure-absolute-2023.json`).json(),
    2024: FileAttachment(`./plots/expenditure-absolute-2024.json`).json(),
    2025: FileAttachment(`./plots/expenditure-absolute-2025.json`).json(),
};

const shareOfGdpFiles = {
    2014: FileAttachment(`./plots/share-of-gdp-2014.json`).json(),
    2015: FileAttachment(`./plots/share-of-gdp-2015.json`).json(),
    2016: FileAttachment(`./plots/share-of-gdp-2016.json`).json(),
    2017: FileAttachment(`./plots/share-of-gdp-2017.json`).json(),
    2018: FileAttachment(`./plots/share-of-gdp-2018.json`).json(),
    2019: FileAttachment(`./plots/share-of-gdp-2019.json`).json(),
    2020: FileAttachment(`./plots/share-of-gdp-2020.json`).json(),
    2021: FileAttachment(`./plots/share-of-gdp-2021.json`).json(),
    2022: FileAttachment(`./plots/share-of-gdp-2022.json`).json(),
    2023: FileAttachment(`./plots/share-of-gdp-2023.json`).json(),
    2024: FileAttachment(`./plots/share-of-gdp-2024.json`).json(),
    2025: FileAttachment(`./plots/share-of-gdp-2025.json`).json(),
};

// 2. Define the rendering function
async function renderCharts(year) {
    // Update UI text
    yearLabel.textContent = year;

    // Embed Sunburst Chart
    // vegaEmbed takes a URL directly and fetches the JSON automatically!

    vegaEmbed('#vis-expenditure-absolute', await expenditureAbsoluteFiles[year], {actions: false})
        .catch(err => {
            console.warn(`Could not load ${year}`, err);
            sunburstDiv.innerHTML = `<span class="error-msg">Error: Missing ${year}</span>`;
        });

    // Embed Share of GDP Chart
    vegaEmbed('#vis-share-of-gdp', await shareOfGdpFiles[year], {actions: false})
        .catch(err => {
            console.warn(`Could not load ${year}`, err);
            gdpDiv.innerHTML = `<span class="error-msg">Error: Missing ${year}</span>`;
        });
}

// 3. Add Event Listener to the slider
// 'input' fires continuously while dragging. Use 'change' if you only want it to load when dragging stops.
slider.addEventListener("input", (e) => {
    renderCharts(e.target.value);
});

// 4. Trigger initial render when the page loads
renderCharts(slider.value);
```
