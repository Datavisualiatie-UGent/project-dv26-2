import define1 from "./26670360aa6f343b@226.js";

function _1(md){return(
md`# Dataexploratie NATO`
)}

function _shareofgdp(FileAttachment){return(
FileAttachment("shareofgdp.csv")
  .csv({ typed: true })
  .then(rows =>
    rows.filter(row => row.country !== "NATO Europe and Canada" && row.country !== "NATO Total")
  )
  .then(rows =>
    rows.flatMap(row =>
      Object.keys(row)
        .filter(k => k !== "country")
        .map(year => ({
          country: row.country,
          year: year,
          value: row[year]
        }))
    )
  )
)}

function _militarypersonalinthousands(FileAttachment){return(
FileAttachment("militarypersonelinthousands.csv")
  .csv({ typed: true })
  .then(rows =>
    rows.filter(row => row.country !== "NATO Europe and Canada" && row.country !== "NATO Total")
  )
  .then(rows =>
    rows.flatMap(row =>
      Object.keys(row)
        .filter(k => k !== "country")
        .map(year => ({
          country: row.country,
          year: year,
          value: row[year]
        }))
    )
  )
)}

async function _equipment(FileAttachment){return(
(await FileAttachment("portionofexpenditure_equipment.csv").csv({ types: true }))
    .map(d => ({ ...d, category: "Equipment" }))
)}

async function _infrastructure(FileAttachment){return(
(await FileAttachment("portionofexpenditure_infrastructure.csv").csv({ types: true }))
    .map(d => ({ ...d, category: "Infrastructure" }))
)}

async function _other(FileAttachment){return(
(await FileAttachment("portionofexpenditure_other.csv").csv({ types: true }))
    .map(d => ({ ...d, category: "Other" }))
)}

async function _personnel(FileAttachment){return(
(await FileAttachment("portionofexpenditure_personel.csv").csv({ types: true }))
    .map(d => ({ ...d, category: "Personnel" }))
)}

function _combined(equipment,infrastructure,other,personnel){return(
[
    ...equipment,
    ...infrastructure,
    ...other,
    ...personnel
  ]
)}

function _expenditure(combined){return(
combined.flatMap(d =>
  Object.keys(d)
    .filter(k => k !== "country" && k !== "category")
    .map(yearRaw => {
      // Extract numeric year (e.g. "2024e" → 2024)
      const year = parseInt(yearRaw);

      return {
        country: d.country,
        category: d.category,
        year: year,
        value: d[yearRaw]
      };
    })
    .filter(d => !isNaN(d.year) && d.value != null && !isNaN(d.value))
)
)}

function _realchange(FileAttachment){return(
FileAttachment("realchange.csv")
  .csv({ types: true })
  .then(rows =>
    rows.filter(
      row =>
        row.country !== "NATO Europe and Canada" &&
        row.country !== "NATO Total"
    )
  )
  // Map to seperate objects for each data point
  .then(rows =>
    rows.flatMap(row =>
      Object.keys(row)
        .filter(k => k !== "country")
        .map(year => ({
          country: row.country,
          year: parseInt(year),
          value: row[year] / 100
        }))
    )
  )
  // Define previous and current value so it can be used for a candlestick chart
  .then(rows =>
    rows
      .map((d, i, arr) => {
        const next = arr[i + 1];

        if (next && next.country === d.country) {
          return {
            country: d.country,
            year: d.year,
            prev: d.value,
            curr: next.value
          };
        }

        return null;
      })
      .filter(Boolean)
  )
)}

function _nato_firepower(FileAttachment){return(
FileAttachment("nato_firepower_2026.csv")
  .csv({ types: true })
  .then(rows =>
    rows.flatMap(row =>
      Object.keys(row)
        .filter(k => k !== "country")
        .map(year => ({
          country: row.country,
          type: year,
          value: parseInt(row[year])
        }))
    )
  )
)}

function _13(md){return(
md`# Share of GDP & Military personel

In onderstaande grafiek zien we een duidelijke trend dat in het algemeen elk land steeds meer uitgeeft aan defensie. We zien ook dat er landen in 2025 zijn die meer uitgeven dat de VS. Ook zien we dat er duidelijk een doel van 2% GDP uitgave werd behaald in 2025.`
)}

function _14(vl,shareofgdp,militarypersonalinthousands)
{
  const shareofgdp_chart = vl.markPoint({ filled: true, size: 100, stroke: "black", strokeWidth: 0.5 })
  .data(shareofgdp)
  .encode(
    vl.x().fieldQ("value").title("GDP Share (%)"),
    vl.y().fieldN("country").sort("-x").title("Country"),
    vl.color().fieldN("year")
      .scale({ scheme: "viridis" })
      .title("Year"),
    vl.tooltip(["country","year","value"]),
  )
  .title("Share of GDP (%) spent on military for each NATO country");

  const militarypersonalinthousands_chart = vl.markPoint({ filled: true, size: 100, stroke: "black", strokeWidth: 0.5 })
  .data(militarypersonalinthousands)
  .encode(
    vl.x().fieldQ("value").title("Amount of military personel (in thousands)"),
    vl.y().fieldN("country").sort("-x").title("Country"),
    vl.color().fieldN("year")
      .scale({ scheme: "viridis" })
      .title("Year"),
    vl.tooltip(["country","year","value"]),
  )
  .title("Amount of military personal for each NATO country (in thousands)");

  return vl.hconcat(
    vl.layer(shareofgdp_chart),
    vl.layer(militarypersonalinthousands_chart)
  ).render();
}


function _15(md){return(
md`# Expenditures

In onderstaande grafiek zien we dat militaire uitgaven zeer divers kunnen zijn aangezien de "Other" categorie steeds een aanzienlijk deel van de uitgave bedraagt. We zien ook dat in het algemeen er het meest wordt uitgegeven aan personeel. Er is wel een shift door de jaren heen zichbaar om meer uit te geven aan "Equipment". Mogelijks omdat apparatuur zoals kamikaze drones eenvoudiger in te zetten zijn dan fysieke mensen.`
)}

function _16(expenditure,vl)
{
  const expenditure_2020 = expenditure.filter(d => d.year === 2020)

  const expenditure_chart = vl.markBar()
    .data(expenditure)
    .params([{
      name: "year_select",
      value: 2020, // default year
      bind: {
        input: "range",
        min: 2014,
        max: 2025,
        step: 1,
        name: "Year: "
      }
    }])
    .transform([
      { filter: "datum.year == year_select" }
    ])
    .encode(
      vl.x().fieldQ("value").title("Percentage").stack("normalize"),
      vl.y().fieldN("country").title("Country").sort("y"),
      vl.color().fieldN("category").title("Expenditure type")
    )
    .title({
      text: "Expenditure per type",
      subtitle: { "expr": "year_select" }
    })

  return expenditure_chart.render()
}


function _17(md){return(
md`# Change in spending`
)}

function _18(realchange,vl)
{
  const unique_countries = [...new Set(realchange.map(d => d.country))];

  return vl
    .data(realchange)
    .facet(
      vl.column().fieldN("country")
    )
    .spec(
      vl.layer([
        vl.markBar().encode(
          vl.x().fieldN("year").title("Year"),
          vl.y().fieldQ("prev").title("Increase in spending (%)"),
          vl.y2().fieldQ("curr").title(""),
          vl.color({
            condition: {
              test: "datum.prev < datum.curr",
              value: "#06982d"
            },
            value: "#ae1325"
          })
        ),
        // vl.markLine().encode(
        //   vl.x().fieldN("year"),
        //   vl.y().fieldQ("curr"),
        //   vl.color({
        //     value: "#000000"
        //   })
        // )
      ])
    )
    .render();
}


function _19(md){return(
md`# NATO Firepower`
)}

function _20(nato_firepower,vl)
{
  const unique_types = [...new Set(nato_firepower.map(d => d.type))]
  
  return vl
    .markBar()
    .data(nato_firepower)
    .params([{
      name: "type_select",
      value: "aircraft_total_stock",
      bind: {
        input: "select",
        options: unique_types,
        name: "Type of equipment: "
      }
    }])
    .transform([
      { filter: "datum.type == type_select" }
    ])
    .encode(
      vl.x().fieldQ("value").title("Amount"),
      vl.y().fieldN("country").title("Country")
    )
    .title({
      text: "Amount of equipment for each country",
      subtitle: { "expr": "type_select" }
    })
    .render();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nato_firepower_2026.csv", {url: new URL("./files/cdb2bcb76160008cd372da9efc682b444fd05068fdfa6d765f5c84e5f5a9f8385babdfa47341360ec08bdbf2867bdc72bd3902f7e5164baac3e934a615fc4a5d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["realchange.csv", {url: new URL("./files/82ddd7ab1a741d8232730ab1ca66b2f5fc9709eabfc07f0b11bef297dfd5cf4a8e5cf91d5bb90962748359bef7d6e9ca82d310fdcb279d67ab3c02e885e7cbf2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["portionofexpenditure_equipment.csv", {url: new URL("./files/8697207024bc833bf09963f1217e801810404df9b0056b00a22c6520458ab281ab3509dce10e63adfa3b59f3e12a79f1afa06cd552e7658ed952b716639b5b43.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["portionofexpenditure_infrastructure.csv", {url: new URL("./files/86a26644b5f4e2f28588fc9fcd073ef1a8723be26fb7130d2b3556726ce55a7a33234c496a26c4e93cb6a76dcfd592bd8516b57524e6a0168ef49283ab85abfd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["portionofexpenditure_other.csv", {url: new URL("./files/ae971f25324ace7ddd3fdaf9d75fbfe6a6696868bac4e7614a518967e9af5dceda46bb54ad11e479baef58003e5e28e0f3654454288ffc65af1ccd4191030f6b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["shareofgdp.csv", {url: new URL("./files/7650b0b44d5f65f78d37e0bbd8bea4ad0029d72b0b64039c50a2b86cd893648af87cb683092565159dbc7d27284de47595d5dcfb647784088aaab0004353cb20.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["portionofexpenditure_personel.csv", {url: new URL("./files/c6af5fc0faf597475390b0d44bfdfc87aef61426df090cc43c93f084bae7b08afef5d4dd9992ea699197bdc29ec5ad58a993dba0257f5ae5cf4dd4f368e25003.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["militarypersonelinthousands.csv", {url: new URL("./files/c665bf126618bfd2219cfdbe1f31199791ee0f37433ee527782fef6ab9188829bd44c3d7092e854c176529d2b7a336ca26bda3e86d894c906375b875cdd7fa8f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer("shareofgdp")).define("shareofgdp", ["FileAttachment"], _shareofgdp);
  main.variable(observer("militarypersonalinthousands")).define("militarypersonalinthousands", ["FileAttachment"], _militarypersonalinthousands);
  main.variable(observer("equipment")).define("equipment", ["FileAttachment"], _equipment);
  main.variable(observer("infrastructure")).define("infrastructure", ["FileAttachment"], _infrastructure);
  main.variable(observer("other")).define("other", ["FileAttachment"], _other);
  main.variable(observer("personnel")).define("personnel", ["FileAttachment"], _personnel);
  main.variable(observer("combined")).define("combined", ["equipment","infrastructure","other","personnel"], _combined);
  main.variable(observer("expenditure")).define("expenditure", ["combined"], _expenditure);
  main.variable(observer("realchange")).define("realchange", ["FileAttachment"], _realchange);
  main.variable(observer("nato_firepower")).define("nato_firepower", ["FileAttachment"], _nato_firepower);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["vl","shareofgdp","militarypersonalinthousands"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["expenditure","vl"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["realchange","vl"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["nato_firepower","vl"], _20);
  return main;
}
