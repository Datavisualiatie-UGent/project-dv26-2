#import "configuration.typ": *

#set document(
  title: "Project Datavisualisatie: NAVO in beeld",
  author: "Bram Comyn, Tibo De Peuter & Brent Janssens"
)

#show: configuration

#align(center)[#title[Logboek Project Datavisualisatie]]

#let groepsleden = {
  set heading(numbering: none, outlined: false)

  align(center)[#heading[Groepsleden]]

  grid(
    columns: (1fr, 1fr, 1fr),
    column-gutter: 0.5em,
    align: (center + horizon),
    inset: 10pt,
    [
      Bram Comyn - UGent\
      #link("mailto:bram.comyn@ugent.be")
    ],
    [
      Tibo De Peuter - UGent\
      #link("mailto:tibo.depeuter@ugent.be")
    ],
    [
      Brent Janssens - UGent\
      #link("mailto:brent.janssens@ugent.be")
    ]
  )
}

#groepsleden

#outline(depth: 1)

= Verkenningsfase

Na het uitkiezen van ons onderwerp, gingen we onmiddellijk aan de slag om data te verzamelen.
Aangezien we niet vertrokken zijn van één dataset, hebben we een resem datasets gezocht en beoordeeld op betrouwbaarheid.
Uiteindelijk hebben we besloten om de volgende datasets te gebruiken:

- #cite(<NATO2025DefenceExpenditure>, form: "full")
- #cite(<globalfirepower2026>, form: "full")
- #cite(<WorldBankPopulation2026>, form: "full")

Om vlotter te kunnen werken met de beschikbare data, hebben we deze zelf bewerkt naar een bruikbaarder formaat, dat gedocumenteerd staat in #link("https://github.com/Datavisualiatie-UGent/project-dv26-2/blob/main/docs/main.pdf", `/docs/main.pdf`).
Op basis van deze informatie hebben we een #link("https://github.com/Datavisualiatie-UGent/project-dv26-2/blob/8070e4ae23ed4429f0368391365e84c456c1521e/README.md", [eerste versie van het verhaal]) uitgeschreven en een #link("https://observablehq.com/d/fdbcddf848d81939", [eerste verkenning van de data met Vega Lite]) gedaan.

Op basis van de eerste verhaallijnen zijn we op zoek gegaan naar interessante punten om een grafiek of visualisatie te gebruiken die deze een duwtje in de rug geven.
Al deze punten hebben we aangeduid met een `TODO` (zoals te zien in #link("https://github.com/Datavisualiatie-UGent/project-dv26-2/commit/092084762658b6d2b76a36a7c969b26cc7fb4235", [dit bestand])).
De precieze grafiekvorm hebben we op dat moment niet vast willen bepalen, om zo veel mogelijk ruimte te geven om te experimenteren.

= Eerste iteratie

In een volgende fase hebben we ons werk opgesplitst:

- visualisatie op kaart van NAVO-lidstaten,
- grafieken voor het financiële luik van het verhaal, en
- opzetten website met observable, integratie van #link("https://pudding.cool/process/introducing-scrollama/", [Scrollama])\.

Hieruit kwamen de resultaten die we hebben meegenomen naar onze tweede feedbacksessie.
Feedback op de grafieken binnen het team hebben we vooral verzameld op #link("https://github.com/Datavisualiatie-UGent/project-dv26-2/issues", [Github Issues])\.
Op die manier konden we overzichtelijk grafiek per grafiek afwerken en integreren en hadden we een overzicht over de verschillende aanpassingen doorheen de tijd. #footnote([Zie ook @fig:issues])

#figure(
  image("assets/issues.png"),
  caption: [Screenshot van onze #link("https://github.com/Datavisualiatie-UGent/project-dv26-2/issues", [Github Issues]) voor de verschillende visualisaties op onze website.]
) <fig:issues>

= Afwerking

Op het einde hebben we ervoor gekozen om alle grafieken en visualisaties eens in de website te gaan brengen en zo te kijken of ons verhaal en de ondersteunende visualisaties nog steek houden.
Hierna hebben we enkel nog styllistische aanpassingen gemaakt, zoals het juist zetten van titels, legendes, kleuren, annotaties en fonts.

#show: appendix

= Taakverdeling

== Bram

- Verwerking dataset #cite(<NATO2025DefenceExpenditure>, form: "prose") naar CSV-bestanden
- Verwerking dataset #cite(<globalfirepower2026>, form: "prose") (via scraping) naar CSV-bestand
- Documenteren datasets
- Uitschrijven verhaal in README
- Kaarten NAVO-uitbreiding doorheen de jaren in sectie 1
- `share-of-gdp`, `real-change` en `expenditure-absolute`-grafieken in sectie 2
- Herwerken verhaal na integratie
- Uitschrijven explore sectie
- Uitwerken verslag

== Tibo

- `expenditure-per-capita` in sectie 2, en ongebruikte grafieken
- Website setup & deployment
- Uniformisering van styles
- Rudimentaire exploratie-visualisaties tijdens start project

== Brent

- Rudimentaire exploratie-visualisaties tijdens start project
- `explore-equipment`, `soldiers-absolute`, en ongebruikte grafieken
- Verwerking population dataset

#let before-after-section = {

  set page(flipped: true)

  let image-height = 50%
  let before-after(title, before, after) = {
    align(center + horizon, grid(
      columns: (1fr, 1fr),
      column-gutter: 1em,
      align: center + horizon,
      inset: 10pt,
      figure(
        image(before),
        caption: [#title before]
      ),
      figure(
        image(after),
        caption: [#title after]
      )
    ))
  }

  heading[Voor en na van enkele visualisaties]

  before-after(`share-of-gdp`, "assets/share-of-gdp.before.png", "assets/share-of-gdp.after.png")
  pagebreak()

  before-after(`real-change`, "assets/real-change.before.png", "assets/real-change.after.png")
  pagebreak()

  before-after(`expenditure-per-capita`, "assets/expenditure-per-capita.before.png", "assets/expenditure-per-capita.after.png")
  pagebreak()
  
  before-after(`soldiers-absolute`, "assets/soldiers-absolute.before.png", "assets/soldiers-absolute.after.png")
  pagebreak()

  before-after(`equipment`, "assets/equipment.before.png", "assets/equipment.after.png")

}

#before-after-section

#bibliography("works.bib")
