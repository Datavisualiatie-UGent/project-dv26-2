# NATO Strategic Capacities Visualized

This documents is a draft outline of the end product we'll be implementing for the course in Data Visualisation at Ghent University.
It aims at exploring NATO's strategic capabilities by focusing on budget and hard power, through data provided by both NATO and [Global Firepower](https://globalfirepower.com/).

Currently, we're aiming for a _scrollystelling_-style website using [Scrollama](https://pudding.cool/process/introducing-scrollama/) that enables users to both read our own story and explore the data themselves, using visualisations brought by [Vega Lite](https://vega.github.io/vega-lite/).

## Draft Storyline

### 0. The Arsenal of Democracy?

Global headlines are increasingly dominated by a singular anxiety: that the era of peace is over.
If we are to believe the current US President, Russia and China are standing at the borders, armed to the teeth and searching for the one crack in our armor that would allow them to sweep across the continent.
Central to this fear is the North-Atlantic Treaty Organisation (NATO).
Donald Trump famously argues that NATO is little more than the United States in a trench coat — an American powerhouse surrounded by "cowardly" allies who refuse to contribute both financially and military.

![Donald Trump's post in which he calls the NATO allies cowards on his social media platform "Truth Social"](./assets/nato-cowards.png)

But is this true? As countries pivot away from the "peace dividend" and begin funneling billions back into their war chests, we decided to look past the rhetoric.
By analyzing NATO’s own financial audits and Global Firepower’s hardware data, we aim to uncover the reality of the Alliance's strategic weight.
Is the "European Pillar" finally standing on its own, or is the shield truly made in the USA?

### 1. Before the Billions: Securing a Broken Continent

In order to truly understand the contempory situation, it is necessary to understand _how_ and _why_ NATO came to be.
For this, we must travel back to 1949 — to a fragile Europe trying to heal the scars left behind from the Second World War.
In a new, bipolar world divided between the influence of the US and the USSR, twelve nations gathered in Washington to sign a pact that would redraw the strategic map of the West forever.

> Twelve nations show the original shield:
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

As the Cold War froze the borders of Europe, NATO’s first expansion focused on securing the "Southern Flank" and the heart of the continent.
In 1952, Greece and Turkey joined to anchor the Mediterranean.
They were followed in 1955 by West Germany, a pivotal move that integrated the former frontline of the war into the Western defense architecture.
By the time Spain joined in 1982, the alliance had grown into a sixteen-nation bulwark.

> The map expands to include the Mediterranean and the divided German front

The fall of the Berlin Wall in 1989 and the subsequent collapse of the Soviet Union fundamentally changed NATO’s purpose.
No longer just a "Cold War shield," the alliance became a tool for stabilizing a newly free Eastern Europe.
In 1999, former Warsaw Pact [^1] members — the Czech Republic, Hungary, and Poland — bit the bullet and joined the West.

Just five years later, in 2004, NATO underwent its most ambitious expansion to date.
Seven nations, including the three Baltic states of Estonia, Latvia, and Lithuania, joined together with Bulgaria, Romania, Slovenia and Slovakia in a single wave.
This move shifted the alliance’s borders directly to the doorstep of the former Soviet Union.

> massive blue wave sweeps accross central and eastern Europe

In the last two decades, the focus has shifted again—first toward the Balkans, with the accession of Albania, Croatia, Montenegro, and North Macedonia.
However, the most dramatic pivot occurred in 2023 and 2024.
As a direct response to Russia’s invasion of Ukraine and a radically changed safety situation, the long-neutral Nordic giants Finland and Sweden joined the alliance.

> Show final map indicating the alliance in full power

What began as a small club of twelve has transformed into a 32-nation powerhouse [^2].
As the map grew, so did the friction: can 32 different nations truly share the burden of an alliance that Trump calls "the United States in a trench coat"?

[^1]: the Warsaw Pact was NATO's biggest challenger during the Cold War era.
    Backed by the Soviet Unions nuclear umbrella, many communist countries joined forming a defensive alliance of 8 members a its peak, with a few notable observers.
    See also: [Warsaw Pact](https://en.wikipedia.org/wiki/Warsaw_Pact).

[^2]: There are some notable countries not included in the NATO alliance.
    The most well-known is of course Switzerland, which has known a history of neutrality since centuries ago.
    However, the attentive reader also notices some EU countries missing on the map: Ireland, Austria, Cyprus and Malta are also holding on to their military neutrality, which is often anchored in their constitutions.
    Although this fundamental objection to picking a side, these countries often cooperate with NATO in the so-called **Partnership for Peace**-programme.

    It might be interesting to include a map showing all EU countries, coloured into NATO/EU and just NATO or EU members in different colours to provide more information and context to the readers.
