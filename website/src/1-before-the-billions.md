# Before the Billions: Securing a Broken Continent

In order to truly understand the contemporary situation, it is necessary to understand _how_ and _why_ NATO came to be.
For this, we must travel back to 1949 — to a fragile Europe trying to heal the scars left behind from the Second World War.
In a new, bipolar world divided between the influence of the US and the USSR, twelve nations gathered in Washington to sign a pact that would redraw the strategic map of the West forever.

```js
import vegaEmbed from "npm:vega-embed";
import scrollama from "npm:scrollama";
```

<!-- TODO I think we should add a legend for the fading to darker colors with "age" or some bar that denotes the colors. -->

<!-- TODO I would add the title in HTML instead of in the graph/visualisation -->

<!-- TODO Highlight the currently active block -->

## The Expansion of NATO

TODO Focus on Europe or global view preferred?

> [!plot] nato-map

<div id="scrolly-world-map" class="scrolly">
  <article>
    <div class="step" data-step="1949" data-signals='{"SelectYear": 1949}'>

Twelve nations form the original shield:

- Belgium,
- Canada,
- Denmark,
- France,
- Iceland,
- Italy,
- Luxembourg,
- Norway,
- Portugal,
- The Netherlands,
- the UK, and
- the USA

From this, the goal would be to add a new step showing the new members for each of the following years.
I believe the best approach would be to color the countries that already had joined were to be colored in NATO light blue #118ACB, with new countries being colored in the complementary color (being #cb5211).

</div>
<div class="step" data-step="1982" data-signals='{"SelectYear": 1952}'>

As the Cold War froze the borders of Europe, NATO’s first expansion focused on securing the _Southern Flank_ and the heart of the continent.
In 1952, Greece and Turkey joined to anchor the Mediterranean.

</div>

<div class="step" data-step="1955" data-signals='{"SelectYear": 1955}'>

They were followed in 1955 by West Germany, a pivotal move that integrated the former frontline of the war into the Western defense architecture.

</div>
<div class="step" data-step="1982" data-signals='{"SelectYear": 1982}'>

By the time Spain joined in 1982, the alliance had grown into a sixteen-nation bulwark.

</div>
<div class="step" data-step="1999" data-signals='{"SelectYear": 1999}'>

The Fall of the Berlin Wall in 1989 and the subsequent collapse of the Soviet Union fundamentally changed NATO’s purpose.
No longer just a Cold War shield, the alliance became a tool for stabilising a newly free Eastern Europe.
In 1999, former Warsaw Pact [^2] members Poland, Hungary, and the Czech Republic led the way and joined the West.

</div>
<div class="step" data-step="2004" data-signals='{"SelectYear": 2004}'>

Just five years later, in 2004, NATO underwent its most ambitious expansion to date.
Seven nations, including the three Baltic States of Estonia, Latvia, and Lithuania, joined together with Bulgaria, Romania, Slovenia and Slovakia in a single wave.
This move shifted the alliance’s borders directly to the doorstep of the former Soviet Union.

</div>
<div class="step" data-step="2024" data-signals='{"SelectYear": 2024}'>

In the last two decades, the focus has shifted again; this time toward the Balkans, with the accession of Albania, Croatia, Montenegro, and North Macedonia.
However, the most dramatic pivot occurred in 2023 and 2024;
as a direct response to Russia’s invasion of Ukraine and a radically changed safety situation, the long-neutral Nordic giants Finland and Sweden joined the alliance.

</div>

<div class="step" data-step="2026" data-signals='{"SelectYear": 2026}'>

What began as a small club of twelve has transformed into a 32-nation powerhouse. [^3]
As the map grew, so did the friction: can 32 different nations truly share the burden of an alliance that Trump calls "the United States in a trench coat"?

</div>
</article>

<figure id="graphic">
  <div class="vis" id="vis-world-map"></div>
</figure>
</div>

---

> [!plot] explore-nato-map
> TODO Exploration with choosing between years, choose europe focus view or global view

---

[^2]: The Warsaw Pact formed NATO's biggest challenger during the Cold War era.
    Backed by the Soviet Union's nuclear umbrella, many communist countries joined forming a defensive alliance of 8 members a its peak, with a few notable observers.
    See also: [Warsaw Pact](https://en.wikipedia.org/wiki/Warsaw_Pact).

[^3]: There are some notable countries not included in the NATO alliance.
    The most well-known is of course Switzerland, which has known a history of neutrality since centuries ago.
    However, the attentive reader also notices some EU countries missing on the map: Ireland, Austria, Cyprus and Malta are also holding on to their military neutrality, which is often anchored in their constitutions.
    Even though they have fundamental objection to picking a side, these countries often cooperate with NATO in the so-called [**Partnership for Peace**-programme](https://www.nato.int/en/what-we-do/partnerships-and-cooperation/partnership-for-peace-programme).

    > It might be interesting to include a map showing all EU countries, coloured into NATO/EU and just NATO or EU members in different colours to provide more information and context to the readers.

```js
const spec = await FileAttachment("./data-visualisation/nato-world-map.json").json();

const viewPromise = vegaEmbed("#vis-world-map", spec, { actions: false }).then(res => res.view);

const scroller = scrollama();

scroller
  .setup({
    step: "#scrolly-world-map article .step",
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
