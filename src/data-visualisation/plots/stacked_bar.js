const vl = require('vega-lite-api');
const { computeOptions } = require('../utils/data-utils');
const { createFlagPanel } = require('../utils/flag-panel');

function getBarLabels(labelMode) {
    if (labelMode === 'none') return [];

    let encodings = [
        vl.y().fieldN('country_label').sort({ 'field': 'country_order', 'op': 'min' }),
        vl.x().fieldQ('value').stack('zero'),
        vl.order().fieldQ('order'),
        vl.text().fieldQ('value').format('.1f'),
        vl.detail().fieldN('category_label')
    ];

    if (labelMode === 'adaptive') {
        encodings.push({ 'opacity': { 'condition': { 'test': 'datum.value >= 5', 'value': 1 }, 'value': 0 } });
    }

    return [vl.markText({ align: 'right', dx: -4, color: 'white' }).encode(...encodings)];
}

function createStackedBar(data, { labelMode = 'none', includeParams = true } = {}) {
    const barLayer = vl.markBar()
        .encode(
            // Hide default Y-axis text & ticks so our custom left panel takes over smoothly
            vl.y().fieldN('country_label').title(null)
                .sort({ 'field': 'country_order', 'op': 'min' })
                .axis({ labels: false, ticks: false, domain: false }),
            vl.x().fieldQ('value').title('Share (%)').stack('zero').scale({ domain: [0, 100] }),
            vl.color().fieldN('category_label').title('Category').legend({ orient: 'bottom' }).scale({ scheme: 'tableau10' }),
            vl.order().fieldQ('order'),
            vl.tooltip(['country_label', 'category_label', 'value', 'flag_url'])
        );

    // Build right-side layers (bars + optional numeric labels)
    const rightLayers = [barLayer, ...getBarLabels(labelMode)];
    const titleText = labelMode === 'none' ? 'Unlabeled' : labelMode === 'always' ? 'Labeled (Always)' : 'Labeled (Adaptive)';

    const rightPanel = vl.layer(...rightLayers).width(450).height(120);

    // Build Left Panel for custom Flag and Label formatting
    const leftPanel = createFlagPanel(vl, { width: 140 });

    // Use hconcat with shared Y scale to stitch the custom labels to the rows
    let chart = vl.hconcat(leftPanel, rightPanel)
        .resolve({ scale: { y: 'shared' } })
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

module.exports = { createStackedBar };
