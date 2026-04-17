# The Price of Protection - If NATO is a shield, then the defense budget is the cost of the steel

```js
import vegaEmbed from "npm:vega-embed";
import scrollama from "npm:scrollama";
```

<div id="scrolly-share-of-gdp" class="scrolly">
<article>
<div>
For decades, the United States has shouldered the majority of the financial burden; a fact that led to the friction we see in modern politics.
In 2014, the alliance set a clear benchmark: every member should spend at least **2% of its GDP** on defense. [^4]

> TODO: graph showing 2014 share of GDP for defense indicating the 2% threshold\
> Note to self: can be interesting to look at countries that have a large portion, probably countries close to Russia?
</div>
</article>

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

const scroller = scrollama();

scroller
    .setup({
        step: "#scrolly-share-of-gdp .step",
        offset: 0.5,
        debug: false
    })
    .onStepEnter(async (response) => {
        const signalsRaw = response.element.dataset.signals;

        if (signalsRaw) {
            const signals = JSON.parse(signalsRaw);
            const view = await viewPromise;

            for (const [key, value] of Object.entries(signals)) {
                view.signal(key, value);
            }

            view.run();
        }
    });
```

For a long time, many European allies fell short, enjoying what economists call the _peace dividend_.
However, the world changed in 2022 with Russia's invasion of Ukraine.
Our data shows a radical pivot: defense budgets are no longer stagnating; they are surging.

> TODO: chart showing real change (%) in budgets from 2014 to 2025.
> Notice the sharp upward trajectory for countries bordering Russia?

## More than just Salaries

Where does that money actually go?
A common criticism is that European armies spend too much on pensions and salaries, and not enough on the hard power needed for modern war.
NATO targets a **20% minimum** for key equipment that provides hard combat power like missiles, fighter jets, combat vehicles etc. [^5]

> TODO: chart showing expenditure shares\
> Perhaps might be interesting to allow comparing/selecting countries?

By breaking down the portion of expenditure, we can see which countries are simply maintaining the status quo and which are actively building the arsenal of the future.

## The Weight of the Titan?

To understand the friction within NATO, we have to look past percentages and look at raw cash.
In 2023, the United States spent nearly **twice as much** on defense as the rest of the 31 allies combined.

> TODO: add chart showing this comparison\
> Check claim in scentence above

While almost every member now meets the 2% threshold, the absolute dollar amounts reveal the true scale of American dominance.
For every $1 spent by a European ally, the US spends nearly $2.
However, this might be an unfair comparison, as there are no countries that have the population number the US has.

Total billions can be misleading.
To see the true "fairness" of the alliance, we must ask: how much does the average citizen contribute to the shield? By factoring in population, we move from the power of nations to the commitment of individuals.

> TODO: show expenditure per capita in a bar chart?

When viewed per capita, the spending gap begins to shrink.
While the US still leads, citizens in nations like Norway and the Baltic states often shoulder a personal financial burden that rivals or even exceeds that of the average American.
This data suggests that the "cowardly" label ignores the significant personal investment made by people living on the alliance's frontlines. [^6]
This fact is also shown in the number of soldiers per 1,000 inhabitants:

> TODO: show number of soldiers in relative and absolute numbers next to each other\
> Note to self: two horizontal bar charts? Pictogram or waffle charts showing blocks of thousands of soldiers?


