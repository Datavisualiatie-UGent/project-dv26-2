const vl = require('vega-lite-api');
const { computeOptions } = require('../utils/data-utils');

function getBarLabels(labelMode) {
    if (labelMode === 'none') return [];

    let encodings = [
        vl.y().fieldN('country_label').sort({ 'field': 'country_order', 'op': 'min' }),
        vl.x().fieldQ('value'),
        vl.order().fieldQ('order'),
        vl.text().fieldQ('value').format('.1f'),
        vl.detail().fieldN('category_label')
    ];

    if (labelMode === 'adaptive') {
        encodings.push({ 'opacity': { 'condition': { 'test': 'datum.value >= 5', 'value': 1 }, 'value': 0 } });
    }

    return [vl.markText({ align: 'right', dx: -4, color: 'white' }).encode(...encodings)];
}

function createFacetedBar(data, { labelMode = 'none', includeParams = true } = {}) {
    // 1. Hide the default Y-axis labels since we will use flags
    const barLayer = vl.markBar({ cornerRadiusEnd: 2 })
        .encode(
            vl.y().fieldN("country_label").title(null).axis({ labels: false, ticks: false }).sort({"field": "country_order", "op": "min"}),
            vl.x().fieldQ("value").title("Share (%)").scale({domain: [0, 100]}),
            vl.color().fieldN("category_label").title("Category").legend({ orient: "bottom" }).scale({ scheme: "tableau10" }),
            vl.tooltip(["country_label", "category_label", "value", "flag_url"])
        );

    // 2. Draw flags inside the facet, pinned to the left edge (x=0)
    const flagLayer = vl.markImage({ width: 20, height: 12, align: 'right', dx: -5 })
        .encode(
            vl.x().value(0),
            vl.y().fieldN("country_label").sort({"field": "country_order", "op": "min"}),
            vl.url().field("flag_url")
        );

    const titleText = labelMode === "none" ? "Unlabeled" : labelMode === "always" ? "Labeled (Always)" : "Labeled (Adaptive)";

    // 3. Layer the flags and bars BEFORE facetting
    let chart = vl.layer(flagLayer, barLayer, ...getBarLabels(labelMode))
        .width(200).height(50)
        .facet(
            vl.row().fieldN("category_label").title(null).header({ labelAngle: 0, labelAlign: 'left' })
        )
        .resolve({scale: {x: 'shared'}})
        .title({ text: titleText });

    if (includeParams) {
        const { yearOptions, natoAvgLabel, countryOptions, defaultCountryB } = computeOptions(data);

        chart = chart.data(data)
            .params([
                vl.param('year_select').value(yearOptions[yearOptions.length - 1]).bind({ input: 'select', options: yearOptions, name: 'Year: ' }),
                vl.param('country_a').value(natoAvgLabel).bind({ input: 'select', options: countryOptions, name: 'Country A: ' }),
                vl.param('country_b').value(defaultCountryB).bind({ input: 'select', options: countryOptions, name: 'Country B: ' })
            ])
            .transform(
                vl.filter('datum.year === year_select'),
                vl.filter('datum.country_label === country_a || datum.country_label === country_b'),
                vl.calculate("datum.country_label === country_a ? 1 : 2").as('country_order')
            );
    } else {
        chart = chart.data(data);
    }

    return chart;
}

module.exports = { createFacetedBar };
