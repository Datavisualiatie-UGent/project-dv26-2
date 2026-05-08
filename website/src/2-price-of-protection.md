# The Price of Protection

*If NATO is a shield, then budget is the cost of the steel*

```js
import vegaEmbed from "npm:vega-embed";
```

## The Elephant in the Room

To understand the friction within NATO, we have to look who's contributing what to the alliance.
In 2023, the United States spent nearly **twice as much** on defense as the rest of the 31 allies combined.

<figure id="expenditure-absolute-graphic" class="breakout">
<div class="vis" id="vis-expenditure-absolute"></div>
</figure>

```js
const spec = await FileAttachment("./plots/expenditure-absolute-2024.json").json();
const viewPromise = vegaEmbed("#vis-expenditure-absolute", spec, { actions: false }).then(res => res.view);
```

For every \$1 spent by a European ally, the US spends nearly \$2.
Trump argues that the US is paying for the protection of Europe, while European allies are not doing their fair share.
Since 2014, NATO has been pushing for a more equitable distribution of the financial burden.
Each country is expected to contribute according to its economic capacity, which is measured as a percentage of its Gross Domestic Product (GDP).
The alliance set a clear benchmark: every member should spend at least **2% of its GDP** on defense. [^4]

<figure id="share-of-gdp-graphic" class="breakout">
<div class="vis" id="vis-share-of-gdp"></div>
</figure>

```js
const spec = await FileAttachment("./plots/share-of-gdp-2024.json").json();
const viewPromise = vegaEmbed("#vis-share-of-gdp", spec, { actions: false }).then(res => res.view);
```

For a long time, many European allies fell short, enjoying what economists call the *peace dividend*.
However, the world changed in 2022 with Russia's invasion of Ukraine.
Our data shows a radical pivot: defense budgets are no longer stagnating; they are surging.

<figure id="real-change-graphic" class="breakout">
<div class="vis" id="vis-real-change"></div>
</figure>

```js
const spec = await FileAttachment("./plots/real-change.json").json();
const viewPromise = vegaEmbed("#vis-real-change", spec, { actions: false }).then(res => res.view);
```

When viewed per capita, the spending gap begins to shrink.
While the US still leads, citizens in nations like Norway and the Baltic states often shoulder a personal financial burden that rivals or even exceeds that of the average American.
This data suggests that the "cowardly" label ignores the significant personal investment made by people living on the alliance's frontlines. [^6]
However, the gap shrinks each year, and the estimates for 2025 show that US citizens will be paying less than other NATO citizens for their protection for the first time in history.

<input type="checkbox" id="toggle-year" style="display:none;">
<label for="toggle-year" class="toggle-label">
  Click to switch between 2024 and 2025 estimates
</label>

<figure id="expenditure-2024" class="breakout">
    <div class="vis no-control" id="vis-expenditure-per-capita-2024"></div>
    <figcaption>Data for 2024</figcaption>
</figure>
<figure id="expenditure-2025" class="breakout">
    <div class="vis no-control" id="vis-expenditure-per-capita-2025"></div>
    <figcaption>Data for 2025</figcaption>
</figure>

```js
const spec2024 = await FileAttachment("./plots/expenditure-per-capita-2024.json").json();
const spec2025 = await FileAttachment("./plots/expenditure-per-capita-2025.json").json();

const viewPromise1 = vegaEmbed("#vis-expenditure-per-capita-2024", spec2024, { actions: false }).then(res => res.view);
const viewPromise2 = vegaEmbed("#vis-expenditure-per-capita-2025", spec2025, { actions: false }).then(res => res.view);
```

Another important aspect of NATO's defense is the human cost, in terms of soldiers.
While the US has the largest military, by far, these absolute numbers can again be misleading.
The plot below gives an indication of the number of soldiers for each country, with the annotation showing the number of soldiers per 10 000 inhabitants, to give a better indication of the relative contribution of each country in terms of manpower.

<figure id="soldiers-absolute-graphic" class="breakout">
<div class="vis" id="vis-soldiers-absolute"></div>
</figure>

```js
const spec = await FileAttachment("./plots/soldiers-absolute.json").json();
const viewPromise = vegaEmbed("#vis-soldiers-absolute", spec, { actions: false }).then(res => res.view);
```

[^4]: In 2025, NATO increased this benchmark to a minimum core budget of 3.5% of a countries GDP, with a goal of 5% in total. [source](https://www.nato.int/content/dam/nato/webready/documents/publications-and-reports/annual-reports/sgar25-en.pdf)
Given how recent this change is and the fact that the numbers for 2024 and 2025 remain estimates, we have decided to focus on the 2% benchmark for the sake of consistency and reliability.

[^6]: Recently, Donald Trump downplayed the contribution of NATO allies in Afghanistan following the American invasion after 9/11.
Numbers show that although in absolute numbers, the US lost most soldiers by far, relatively speaking more Danish soldiers laid their lifes in combat for the US.
The campaign in Afghanistan was the only time NATO's famous Article 5 was activated, another fact President Trump failed to recognise.
[source](https://www.bbc.com/news/articles/crmjewpkje9o)
