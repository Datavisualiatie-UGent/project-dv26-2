# Data & Methodology

## NATO Defence Expenditure 2014-2025

In August 2025, NATO published a large overview[^1] of some key summary figures for the alliance between 2014 and 2025. A similar overview of expenditures between 1949 and 2024 can be found in SIPRI[^2]. We have chosen to base ourselves on the data provided by NATO itself. It is important to note that the figures for 2024 and 2025 are only estimates, for which no exact figures have been released at the time of writing. We extracted the following files from the Excel files that NATO itself provides (all under `assets/nato-defence-expenditure`):

* `shareofgdp`: an overview of the share of GDP per country that goes to defense
* `realchange`: percentage increase of the defense budget compared to the previous year per country
* `gdp2021usdollars`: GDP in millions of $US (expressed in 2021 prices and exchange rates)
* `militarypersonelinthousands`: number of military personnel in thousands (unspecified)
    <br> &rarr; we can combine this afterwards to calculate expenditure per service member
* `spenditurepercapita2021usdollar`: defense expenditure per capita (expressed in 2021 $US)
* `portionofexpenditure_xyz`: percentage share of the defense budget that goes to `xyz`
    <br> &rarr; for `personel`, `infrastructure`, `equipment`, and `other` (unspecified)

## Global Firepower 2026

Regarding an overview expressing in numbers how many aircraft, tanks, and other items a member state possesses, NATO itself does not release precise figures. The European Defence Agency[^3] only provides an overview aggregated at the European Union level, so we have to look for another source. Global Firepower[^4] provides updated figures every year, which is why we decided to scrape the necessary information from their website.

[^1]: North Atlantic Treaty Organization. (2025, August). *Defence Expenditure of NATO Countries (2014-2025)*. NATO Public Diplomacy Division. [https://www.nato.int/content/dam/nato/webready/documents/finance/def-exp-2025-en.pdf](https://www.nato.int/content/dam/nato/webready/documents/finance/def-exp-2025-en.pdf)
[^2]: Stockholm International Peace Research Institute. (2025). *SIPRI Military Expenditure Database 1949-2024*. [https://www.sipri.org/databases/milex](https://www.sipri.org/databases/milex)
[^3]: European Defence Agency. (2025). *EDA Defence Data 2025*. Brussels, Belgium. [https://eda.europa.eu/docs/default-source/brochures/2025-eda_defencedata_web.pdf](https://eda.europa.eu/docs/default-source/brochures/2025-eda_defencedata_web.pdf)
[^4]: Global Firepower. (2026). *2026 Military Strength Ranking*. [https://www.globalfirepower.com/](https://www.globalfirepower.com/)
[^5]: N.B.: items 1-12 are split into stock and ready in the csv. This is because not all equipment and vehicles in stock are combat-ready, and it can be interesting to look at the ready share per country to see how well the entire fleet is maintained.
[^6]: For vessels, this split is not provided by Global Firepower. The distinction between different types of ships is often only vaguely and relatively defined (Wikipedia contributors, 2026, [https://en.wikipedia.org/w/index.php?title=Warship&oldid=1336559986](https://en.wikipedia.org/w/index.php?title=Warship&oldid=1336559986)). For our purposes, most distinctions do not matter, as we focus more on aircraft carriers and submarines than on the distinction between the rest.
