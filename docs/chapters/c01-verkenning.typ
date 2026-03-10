#import "@preview/flagada:1.0.1": *

= Verkenning

#let global-firepower-footnote = footnote[
  N.B.: puntjes 1-12 zijn in de csv opgesplitst in `stock` en `ready`.
  Dit is omdat niet alle toestellen en voertuigen _in stock_ gevechtsklaar zijn en het interessant kan zijn om te kijken naar het _ready_-aandeel per land om te zien hoe goed de volledige vloot onderhouden wordt.
  Voor vaartuigen is deze opsplitsing niet gegeven door #cite(<globalfirepower2026>, form: "author").
]

#let global-firepower-navy-footnote = footnote[
  Het onderscheid tussen verschillende types schepen is vaak slechts vaag en relatief gedefinieerd. #cite(<WikipediaWarship>)
  Voor ons doen de meeste onderscheiden er niet toe, want wij focussen meer op vliegdekschepen en onderzeeërs dan op het onderscheid tussen de rest.
]

== Lidstaten van de NAVO

Je zou het kunnen vergeven worden, maar de kans is klein dat je alle lidstaten van de alliantie uit het hoofd kent.
Misschien is het dus nuttig om ook even op te lijsten welke landen specifiek deel zijn van de NAVO - en misschien nog interessanter: welke niet.

Hoewel de alliantie begon met een kleine groep, is de kaart van de NAVO door de jaren heen flink veranderd. Het begon allemaal in 1949 met de twaalf oprichters:
België #flag-be(), Canada #flag-ca(), Denemarken #flag-dk(), Frankrijk #flag-fr(), IJsland #flag-is(), Italië #flag-it(), Luxemburg #flag-lu(), Noorwegen #flag-no(), Portugal #flag-pt(), Nederland #flag-nl(), het Verenigd Koninkrijk #flag-gb() en de Verenigde Staten #flag-us().

Tijdens de Koude Oorlog breidde de alliantie zich strategisch uit in Europa:

- 1952: Turkije #flag-tr() en Griekenland #flag-gr() treden toe.
- 1955: Duitsland #flag-de() (toen de Bondsrepubliek) sluit zich aan.
- 1982: Spanje #flag-es() wordt het zestiende lid.

Na de val van de Berlijnse Muur veranderde de focus naar Centraal- en Oost-Europa. In 1999 beten Tsjechië #flag-cz(), Hongarije #flag-hu() en Polen #flag-pl() de spits af.
Vijf jaar later, in 2004, volgde de grootste uitbreidingsgolf tot nu toe met maar liefst zeven landen:
Bulgarije #flag-bg(), Estland #flag-ee(), Letland #flag-lv(), Litouwen #flag-lt(), Roemenië #flag-ro(), Slovenië #flag-si() en Slowakije #flag-sk().

Ook in de afgelopen twintig jaar bleef de alliantie groeien, waarbij de focus verschoof naar de Balkan en, zeer recent, Scandinavië.
In 2009 traden Albanië #flag-al() en Kroatië #flag-hr() toe, gevolgd door Montenegro #flag-me() in 2017 en Noord-Macedonië #flag-mk() in 2020.
De meest opvallende uitbreiding vond echter plaats in de afgelopen twee jaar: als direct gevolg van de veranderde veiligheidssituatie in Europa verwelkomde de NAVO in 2023 Finland #flag-fi() en in 2024 Zweden #flag-se() als haar nieuwste bondgenoten.

=== "Neutrale" EU-lidstaten

#let switserland = footnote[
  Zwitserland #flag-ch() is geen EU-lidstaat én geen lid van NAVO en is net als Malta een typisch neutraal en militair ongebonden land.
  We nemen het dus net als de andere vier niet mee in onze berekeningen.
]

Hoewel de Europese Unie en de NAVO nauw samenwerken, zijn er vier EU-lidstaten #switserland die momenteel geen deel uitmaken van de militaire alliantie:

- Oostenrijk #flag-at(): Houdt vast aan de grondwettelijke neutraliteit die in 1955 werd vastgelegd.
- Ierland #flag-ie(): Volgt een langdurig beleid van militaire neutraliteit en is geen lid van militaire allianties.
- Cyprus #flag-cy(): Het enige EU-land dat geen lid is van het NAVO-partnerschap (Partnership for Peace), mede door de aanhoudende territoriale geschillen en de veto-positie van Turkije.
- Malta #flag-mt(): Is een neutrale staat en voert een beleid van niet-gebondenheid.

Ondanks hun status als niet-lid, werken deze landen (met uitzondering van Cyprus op formeel niveau) wel samen met de NAVO via het *Partnership for Peace*-programma.
Omdat we hier echter alleen willen focussen op NAVO, hebben we deze landen niet meegenomen in onze visualisaties.

== NATO Defence Expenditure 2014-2025

De NAVO publiceerde in augustus 2025 een groot overzicht @NATO2025DefenceExpenditure van enkele belangrijke samenvattende cijfers voor de alliantie tussen 2014 en 2025.
Een soortgelijk overzicht van uitgaven tussen 1949 en 2024 is te vinden in @SIPRI_Milex_2025.
Wij hebben ervoor gekozen om ons te baseren op de gegevens die de NAVO zelf beschikbaar stelt.
Belangrijk daarbij is dat de cijfers voor 2024 en 2025 slechts schattingen zijn, waarvoor op moment van schrijven nog geen exacte cijfers zijn vrijgegeven.
We hebben de volgende bestanden geëxtraheerd uit de Excel-bestanden die de NAVO zelf beschikbaar stelt (allen onder `assets/nato-defence-expenditure`):

+ `shareofgdp`: een overzicht van het aandeel van het BBP per land dat naar defensie gaat
+ `realchange`: procentuele toename van defensiebudget t.o.v. vorig jaar per land
+ `gdp2021usdollars`: BBP in aantal miljoen \$US (uitgedrukt in prijzen en wisselkoersen 2021)
+ `militarypersonelinthousands`: aantal duizend militairen (niet nader gespecifieerd) \
  $-->$ kunnen we achteraf combineren om uitgaven per militair te berekenen
+ `spenditurepercapita2021usdollar`: uitgaven per capita aan defensie (uitgedrukt in 2021 \$US)
+ `portionofexpenditure_xyz`: procentueel aandeel van defensiebudget dat naar `xyz` gaat \
  $-->$ voor `personel`, `infrastructure`, `equipment` en `other` (niet nader gespecifieerd)

== Global Firepower 2026

Wat betreft een overzicht dat in aantallen uitdrukt hoeveel stuks vliegtuigen, tanks en andere een lidstaat heeft, geeft de NAVO zelf geen precieze getallen vrij.
Het #cite(<EDA2025DefenceData>, form: "prose") geeft enkel een overzicht geaggregeerd op niveau van de Europese Unie, dus we moeten op zoek naar een andere bron.
#cite(<globalfirepower2026>, form: "prose") geeft elk jaar geüpdatete cijfers terug, waardoor wij beslist hebben om de nodige informatie van hun website te scrapen.

De data die we van #cite(<globalfirepower2026>, form: "author") hebben gescraped, hebben we ondergebracht in `assets/global-firepower` en geaggregeerd in één enkel csv-bestand met volgende informatie per land: #global-firepower-footnote #global-firepower-navy-footnote

+ `aircraft_total`: vliegtuigen waarover de luchtmacht beschikt, geen onderscheid op type
+ `fighters_total`: beschikbare gevechtsvliegtuigen, geen onderscheid in types/generaties\
  $-->$ cf. F-16, Eurofighter Typhoon, ...
+ `attack_aircraft_total`: aanvalsvliegtuigen (bedoeld voor lucht-tot-grondoperaties)\
  $-->$ cf. A-10 Warthog
+ `fixed_wing_transport_total`: transportvliegtuigen ("fixed wing" = vliegtuig)\
  $-->$ cf. A400M, C-17, ...
+ `tanker_transport_total`: Multi Role Tanker Transport-vliegtuigen (MRTT), voor in-air refueling en andere logistieke ondersteuning\
  $-->$ cf. A330 MRTT, KC-135 Stratotanker
+ `helicopter_total`: beschikbare helikopters (zowel aanvals- als transport- en reddingshelikopter)\
  $-->$ cf. NH-90, Agusta A109, ...
+ `attack_helicopter_total`: aanvalshelikopters \
  $-->$ cf. AH-64 Apache
+ `tanks_total`: beschikbare (Main Battle) tanks (MBT)\
  $-->$ cf. Leopard 2A7, Abrams M2A2, T-72, ...
+ `apc_total`: aantal Armored Personel Carriers (APCs), Armored Fighting Vechicles (AFVs) en Infantry Fighting Vehicles (IFVs), pantservoertuigen met een ondersteunende rol, vooral bedoeld om troepen van en naar gevechtssituaties te brengen.\
  $-->$ cf. Griffon
+ `spg_artillery_total`: Self-Propelled Gun (SPG), zwaar geschut (op rupsbanden), lijkt op tank, is het niet (visueel duidelijker door zwaarder kaliber)
+ `towed_artillery_total`: zwaar geschut dat voortgetrokken wordt
+ `mlrs_total`: Multiple Launch Rocket System, zowel surface-to-air als surface-to-surface\
  $-->$ cf. HIMARS
+ `ships_total`: aantal schepen in marine
+ `ships_tonnage_total`: laadruimte van alle schepen in de marine, om uit te drukken of een marine veel lichte of een aantal zware schepen heeft
+ `aircraft_carrier_total`: vliegdekschepen
+ `helo_carrier_total`: helikopterschepen, bijna-vliegdekschip voor vertical take-off en landing (helikopters, VTOL-vliegtuigen zoals F-35B)
+ `destroyers_total`: aantal _destroyers_
+ `frigates_total`: aantal fregatten
+ `corvettes_total`: aantal corvetes
+ `submarines_total`: aantal duikboten, zowel voor kruisraketten als ballistische raketten en "normale" duikboten
+ `coastal_patrol_craft_total`: kustpatrouille schepen
+ `mine_warfare_craft_total`: mijnbestrijdingsvaartuigen (mijnenvegers en -jagers)
