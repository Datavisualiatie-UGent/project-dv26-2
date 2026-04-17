# The Price of Protection - If NATO is a shield, then the defense budget is the cost of the steel

> [!warning]
> Alternative storyline:
> 1. absolute dollars
> 2. 2% threshold (as introduction, also Trump frustration, actually so? -> relative)
> 3. relative dollars (gpd or per capita) (based on 2024 estimates)
> 4. change over time
> 5. expenditure shares
> 6. soldiers

```js
import vegaEmbed from "npm:vega-embed";
import scrollama from "npm:scrollama";
const scroller = scrollama();
```

<div id="scrolly-share-of-gdp" class="scrolly">
<article>
<div class="step">

For decades, the United States has shouldered the majority of the financial burden; a fact that led to the friction we see in modern politics.
In 2014, the alliance set a clear benchmark: every member should spend at least **2% of its GDP** on defense. [^4]

</div>
</article>

> [!plot] gdp-share
> TODO: graph showing 2014 share of GDP for defense indicating the 2% threshold\
> Note to self: can be interesting to look at countries that have a large portion, probably countries close to Russia?
> TODO full red line at 2% threshold

<figure id="share-of-gdp-graphic">
<div class="vis" id="vis-share-of-gdp"></div>
</figure>
</div>

<!-- TODO Add title in markdown instead of svg -->
<!-- TODO Move legend somewhere else? -->
<!-- TODO Add 2% threshold -->

```js
const spec = await FileAttachment("./data-visualisation/share-of-gdp.json").json();
const viewPromise = vegaEmbed("#vis-share-of-gdp", spec, { actions: false }).then(res => res.view);
```

<div id="scrolly-real-change" class="scrolly">
<article>
<div class="step">

For a long time, many European allies fell short, enjoying what economists call the _peace dividend_.
However, the world changed in 2022 with Russia's invasion of Ukraine.
Our data shows a radical pivot: defense budgets are no longer stagnating; they are surging.

</div>
</article>

> [!plot] real-change
>
> TODO: chart showing real change (%) in budgets from 2014 to 2025.
> Notice the sharp upward trajectory for countries bordering Russia?
> TODO add aggregates
>   - nato averages
>   - nato excluding US average
>   - nato us average
>   - nato close to Russia average
>
> (no other lines, exploration in explore-real-change)

<figure id="real-change-graphic">
<div class="vis" id="vis-real-change"></div>
</figure>
</div>

```js
const spec = await FileAttachment("./data-visualisation/real-change.json").json();
const viewPromise = vegaEmbed("#vis-real-change", spec, { actions: false }).then(res => res.view);
```

## More than just Salaries

Where does that money actually go?
A common criticism is that European armies spend too much on pensions and salaries, and not enough on the hard power needed for modern war.
NATO targets a **20% minimum** for key equipment that provides hard combat power like missiles, fighter jets, combat vehicles etc. [^5]

> [!plot] equipment-expenditure-threshold
>
> TODO bar chart Highlight the 20% (TODO Verify) threshold (y-axis) for equipment for each
> x-axis
>   - nato averages
>   - nato excluding US average
>   - nato us average
>   - nato close to Russia average
>
> Perhaps might be interesting to allow comparing/selecting countries? --> explore

By breaking down the portion of expenditure, we can see which countries are simply maintaining the status quo and which are actively building the arsenal of the future.

> [!plot] expenditure-shares
>
> TODO: horizontal stacked bar chart showing expenditure shares
> x-axis: aggregates
> y-axis: share

## The Weight of the Titan?

To understand the friction within NATO, we have to look past percentages and look at raw cash.
In 2023, the United States spent nearly **twice as much** on defense as the rest of the 31 allies combined.

TODO Check claim in sentence above

> [!plot] expenditure-absolute
>
> Sunburst chart in steps:
> - NATO
> - NATO excluding US, US
> - NATO excluding US, US, close to Russia, not close to Russia
> - countries (optional)
>
> nice-to-have: interactive to allow zooming
>
> Sourcing based on gdp-2021-us-dollars.csv and share-of-gdp.csv from assets

(no explore needed)

While almost every member now meets the 2% threshold, the absolute dollar amounts reveal the true scale of American dominance.
For every \$1 spent by a European ally, the US spends nearly \$2.
However, this might be an unfair comparison, as there are no countries that have the population number the US has.

Total billions can be misleading.
To see the true "fairness" of the alliance, we must ask: how much does the average citizen contribute to the shield? By factoring in population, we move from the power of nations to the commitment of individuals.

> [!plot] expenditure-per-capita
>
> TODO: show expenditure per capita in a bar chart, similar to gdp
>
>  bars are countries, length is expenditure
> categories as colours encoding (choose which to show)
>   - nato averages
>   - nato excluding US average
>   - nato us average
>   - nato close to Russia average
>
> explore not needed when everything is (already) visualised

When viewed per capita, the spending gap begins to shrink.
While the US still leads, citizens in nations like Norway and the Baltic states often shoulder a personal financial burden that rivals or even exceeds that of the average American.
This data suggests that the "cowardly" label ignores the significant personal investment made by people living on the alliance's frontlines. [^6]
This fact is also shown in the number of soldiers per 1,000 inhabitants:

> [!plot] soldiers-absolute
>
> TODO: show number of soldiers in relative and absolute numbers next to each other,
pictogram showing blocks of (some scale, e.g. thousands) of soldiers
> - TODO Legend/scale for blocks (!)
> - colors are categories (us, close to russia etc.) (otherwise too many colors)
>
> Toggle between absolute (per 1,000 inhabitants) numbers
>
> NOTE use flags for countreis individually?

> [!plot] soldiers-per-capita
>
> TODO if needed, annotate previous plot with percentages of soldiers in that country

---

> [!plot] explore-share-of-gdp
>
> TODO choose year between 2014-2025
> TODO When 2014-2024: add 2% red line indicating the 2% threshold
> TODO when 2025: Add red dotted line indicating new 5% threshold

> [!plot] explore-real-change
>
> x-axis over time
> TODO compare country to (see similar to above real-change):
> - nato average
> - nato excluding US average
> - nato us average
> - nato close to Russia average
>
> choose country in left multi-selection dropdown (enable/disable each country individually)
> choose reference in right dropdown

> [!plot] explore-expenditure-shares
>
> TODO radial chart country-to-aggregate comparison,
> each arm is a category (personnel, other, ...),
> two lines, 1 is a country, 1 is an aggregate/reference
>
> - Choose country/aggregate with (single-option) dropdown
> - Dropdown values are aggregates + countries, to allow comparing both
> - Instead of dropdown, toggle-buttons

---

[^4]: in 2025, NATO increased this benchmark to a minimum core budget of 3.5% of a countries GDP, with a goal of 5% in total. [source](https://www.nato.int/content/dam/nato/webready/documents/publications-and-reports/annual-reports/sgar25-en.pdf)
Give how recent this change is and the fact that the numbers for 2024 and 2025 remain estimates, we have decided to focus on the 2% benchmark for the sake of consistency and reliability.

[^5]: NATO, "Defence Expenditure of NATO Countries (2014-2024)", NATO, Brussels, Belgium, June 2024. Accessed: Mar. 30, 2026. [Online]. Available: <https://www.nato.int/content/dam/nato/webready/documents/finance/def-exp-2025-en.pdf>

[^6]: Recently, Donald Trump downplayed the contribution of NATO allies in Afghanistan following the American invasion after 9/11.
Numbers show that although in absolute numbers, the US lost most soldiers by far, relatively speaking more Danish soldiers laid their lifes in combat for the US.
The campaign in Afghanistan was the only time NATO's famous Article 5 was activated, another fact President Trump failed to recognise.
[source](https://www.bbc.com/news/articles/crmjewpkje9o)
