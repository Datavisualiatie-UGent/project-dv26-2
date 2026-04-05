# 1. Before the Billions: Securing a Broken Continent

In order to truly understand the contemporary situation, it is necessary to understand _how_ and _why_ NATO came to be.
For this, we must travel back to 1949 — to a fragile Europe trying to heal the scars left behind from the Second World War.
In a new, bipolar world divided between the influence of the US and the USSR, twelve nations gathered in Washington to sign a pact that would redraw the strategic map of the West forever.

> Twelve nations form the original shield:
>
> - Belgium,
> - Canada,
> - Denmark,
> - France,
> - Iceland,
> - Italy,
> - Luxemburg,
> - Norway,
> - Portugal,
> - The Netherlands,
> - the UK, and
> - the USA
>
> From this, the goal would be to add a new step showing the new members for each of the following years.
> I believe the best approach would be to color the countries that already had joined were to be colored in NATO light blue #118ACB, with new countries being colored in the complementary color (being #cb5211).

```js
import vegaEmbed from "npm:vega-embed";

const div = display(document.createElement("div"));
div.style.width = "100%";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: "container",
  height: 500,
  data: {
    url: "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
    format: {
      type: "topojson",
      feature: "countries"
    }
  },
  projection: {
    type: "naturalEarth1"
  },
  mark: {
    type: "geoshape",
    stroke: "white",
    strokeWidth: 0.5
  },
  encoding: {
    color: {
      condition: {
        param: "hover",
        empty: false,
        value: "#cb5211"
      },
      value: "#118ACB"
    },
    tooltip: [
      { field: "properties.name", type: "nominal", title: "Country" }
    ]
  },
  params: [
    {
      name: "hover",
      select: {
        type: "point",
        on: "mouseover",
        clear: "mouseout"
      }
    }
  ]
};

vegaEmbed(div, spec, { actions: false });
```

As the Cold War froze the borders of Europe, NATO’s first expansion focused on securing the _Southern Flank_ and the heart of the continent.
In 1952, Greece and Turkey joined to anchor the Mediterranean.
They were followed in 1955 by West Germany, a pivotal move that integrated the former frontline of the war into the Western defense architecture.
By the time Spain joined in 1982, the alliance had grown into a sixteen-nation bulwark.

> The map expands to include the Mediterranean and the divided German front

The Fall of the Berlin Wall in 1989 and the subsequent collapse of the Soviet Union fundamentally changed NATO’s purpose.
No longer just a Cold War shield, the alliance became a tool for stabilising a newly free Eastern Europe.
In 1999, former Warsaw Pact [^2] members Poland, Hungary, and the Czech Republic led the way and joined the West.

Just five years later, in 2004, NATO underwent its most ambitious expansion to date.
Seven nations, including the three Baltic States of Estonia, Latvia, and Lithuania, joined together with Bulgaria, Romania, Slovenia and Slovakia in a single wave.
This move shifted the alliance’s borders directly to the doorstep of the former Soviet Union.

> massive blue wave sweeps accross central and eastern Europe

In the last two decades, the focus has shifted again; this time toward the Balkans, with the accession of Albania, Croatia, Montenegro, and North Macedonia.
However, the most dramatic pivot occurred in 2023 and 2024;
as a direct response to Russia’s invasion of Ukraine and a radically changed safety situation, the long-neutral Nordic giants Finland and Sweden joined the alliance.

> Show final map indicating the alliance in full power

What began as a small club of twelve has transformed into a 32-nation powerhouse. [^3]
As the map grew, so did the friction: can 32 different nations truly share the burden of an alliance that Trump calls "the United States in a trench coat"?
