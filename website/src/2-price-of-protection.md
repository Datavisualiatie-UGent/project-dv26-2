# The Price of Protection

*If NATO is a shield, then the defense budget is the cost of the steel*

> [!warning]
> Alternative storyline:
>
> 1. absolute dollars
> 2. 2% threshold (as introduction, also Trump frustration, actually so? -> relative)
> 3. relative dollars (gpd or per capita) (based on 2024 estimates)
> 4. change over time
> 5. expenditure shares
> 6. soldiers

```js
import vegaEmbed from "npm:vega-embed";
```

For decades, the United States has shouldered the majority of the financial burden; a fact that led to the friction we see in modern politics.
In 2014, the alliance set a clear benchmark: every member should spend at least **2% of its GDP** on defense. [^4]

<!-- TODO Add title in markdown instead of svg -->
<!-- TODO Move legend somewhere else? -->
<!-- TODO Add 2% threshold -->
<!-- TODO Either use 2023 or 2024 throughout -->

<figure id="share-of-gdp-graphic" class="breakout">
<div class="vis" id="vis-share-of-gdp"></div>
</figure>

```js
const spec = await FileAttachment("./plots/share-of-gdp.json").json();
const viewPromise = vegaEmbed("#vis-share-of-gdp", spec, { actions: false }).then(res => res.view);
```

For a long time, many European allies fell short, enjoying what economists call the _peace dividend_.
However, the world changed in 2022 with Russia's invasion of Ukraine.
Our data shows a radical pivot: defense budgets are no longer stagnating; they are surging.

<figure id="real-change-graphic" class="breakout">
<div class="vis" id="vis-real-change"></div>
</figure>

```js
const spec = await FileAttachment("./plots/real-change.json").json();
const viewPromise = vegaEmbed("#vis-real-change", spec, { actions: false }).then(res => res.view);
```

## The Weight of the Titan?

To understand the friction within NATO, we have to look past percentages and look at raw cash.
In 2023, the United States spent nearly **twice as much** on defense as the rest of the 31 allies combined.

<figure id="expenditure-absolute-graphic" class="breakout">
<div class="vis" id="vis-expenditure-absolute"></div>
</figure>

```js
const spec = await FileAttachment("./plots/expenditure-absolute.json").json();
const viewPromise = vegaEmbed("#vis-expenditure-absolute", spec, { actions: false }).then(res => res.view);
```

While almost every member now meets the 2% threshold, the absolute dollar amounts reveal the true scale of American dominance.
For every \$1 spent by a European ally, the US spends nearly \$2.
However, this might be an unfair comparison, as there are no countries that have the population number the US has.
To see the true "fairness" of the alliance, we must ask: how much does the average citizen contribute to the shield?
By factoring in population, we move from the power of nations to the commitment of individuals.

<figure id="expenditure-per-capita-graphic" class="breakout">
<div class="vis no-control" id="vis-expenditure-per-capita"></div>
</figure>

```js
const spec = await FileAttachment("./plots/expenditure-per-capita.json").json();
const viewPromise = vegaEmbed("#vis-expenditure-per-capita", spec, { actions: false }).then(res => res.view);
```

When viewed per capita, the spending gap begins to shrink.
While the US still leads, citizens in nations like Norway and the Baltic states often shoulder a personal financial burden that rivals or even exceeds that of the average American.
This data suggests that the "cowardly" label ignores the significant personal investment made by people living on the alliance's frontlines. [^6]

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
