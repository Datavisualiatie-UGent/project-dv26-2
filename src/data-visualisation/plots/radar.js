const vl = require('vega-lite-api');
const { categoryConfig } = require('../utils/constants');

function createRadar(data, { legendInside = false, includeParams = true } = {}) {
    const { natoAvgLabel, baseCountries, defaultCountryB } = require('../utils/data-utils').computeOptions(data);

    const initialSelectionData = data.filter(d => d.country_label === natoAvgLabel || d.country_label === defaultCountryB);
    const maxDataValue = Math.max(...initialSelectionData.map(d => d.value));
    const max_val = Math.ceil(maxDataValue / 10) * 10 || 50;
    const scaleLimit = max_val * 1.3;

    let closedData = [];
    data.forEach(d => {
        const config = categoryConfig[d.category];
        let px = d.value * Math.cos(config.angle);
        let py = d.value * Math.sin(config.angle);
        closedData.push({ ...d, px, py, order: config.order });
        if (config.order === 1) closedData.push({ ...d, px, py, order: 5 });
    });

    const axesData = Object.keys(categoryConfig).map(k => {
        const angle = categoryConfig[k].angle;
        const sampleDatum = data.find(d => d.category === k);
        return {
            category_label: sampleDatum ? sampleDatum.category_label : k,
            x: max_val * Math.cos(angle), y: max_val * Math.sin(angle),
            lx: (max_val * 1.15) * Math.cos(angle), ly: (max_val * 1.15) * Math.sin(angle),
            x0: 0, y0: 0
        };
    });

    const gridData = [];
    const gridSteps = [max_val * 0.25, max_val * 0.5, max_val * 0.75, max_val];
    gridSteps.forEach(val => {
        [1, 2, 3, 4, 1].forEach((ord, idx) => {
            let angle = ord === 1 ? Math.PI / 2 : ord === 2 ? 0 : ord === 3 ? 1.5 * Math.PI : Math.PI;
            gridData.push({ v: val, x: val * Math.cos(angle), y: val * Math.sin(angle), order: idx + 1 });
        });
    });

    const gridValues = gridSteps.map(val => ({ v: val, label: val + '%', x: 0, y: val }));
    gridValues.push({ v: 0, label: '0%', x: 0, y: 0 });

    const gridLayer = vl.markLine({ color: '#e0e0e0', strokeWidth: 1 }).data(gridData)
        .encode(vl.x().fieldQ('x').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.y().fieldQ('y').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.order().fieldQ('order'), vl.detail().fieldQ('v'));

    const gridValuesLayer = vl.markText({ align: 'left', dx: 3, dy: 5, fontSize: 10, color: '#888' }).data(gridValues)
        .encode(vl.x().fieldQ('x').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.y().fieldQ('y').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.text().fieldN('label'));

    const axesLayer = vl.markRule({ color: '#a0a0a0' }).data(axesData)
        .encode(vl.x().fieldQ('x').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.y().fieldQ('y').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.x2().fieldQ('x0'), vl.y2().fieldQ('y0'));

    const labelsLayer = vl.markText({ align: 'center', baseline: 'middle', fontSize: 12, fontWeight: 'bold' }).data(axesData)
        .encode(vl.x().fieldQ('lx').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.y().fieldQ('ly').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null), vl.text().fieldN('category_label'));

    const hover_name = legendInside ? 'hover_dir' : 'hover_std';
    const hover = vl.selectPoint(hover_name).on('mouseover').clear('mouseout');

    const legendConfig = legendInside
        ? { orient: 'none', legendX: 10, legendY: 10, fillColor: 'white', padding: 5, cornerRadius: 5, strokeColor: '#ddd' }
        : { orient: 'right' };

    const dataLayer = vl.markLine({ point: true, strokeWidth: 2 })
        .data(closedData)
        .transform(
            vl.filter('datum.year === year_select'),
            vl.filter('datum.country_label === country_a || datum.country_label === country_b')
        )
        .params(hover)
        .encode(
            vl.x().fieldQ('px').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null),
            vl.y().fieldQ('py').scale({ domain: [-scaleLimit, scaleLimit] }).axis(null),
            vl.color().fieldN('country_label').scale({ range: ['#1f77b4', '#ff7f0e'] }).legend(legendConfig).title(null),
            vl.order().fieldQ('order'),
            vl.detail().fieldN('country_label'),
            vl.opacity().if(hover, vl.value(1)).value(0.3),
            vl.size().if(hover, vl.value(3)).value(2),
            vl.tooltip(['country_label', 'category_label', 'value'])
        );

    let chart = vl.layer(gridLayer, gridValuesLayer, axesLayer, labelsLayer, dataLayer)
        .width(300).height(300)
        .view({ stroke: null })
        .title({ text: legendInside ? 'Legend Inside Plot' : 'Legend Outside Plot', fontSize: 14 });

    if (includeParams) {
        const { yearOptions, natoExclUsLabel, countryOptions } = require('../utils/data-utils').computeOptions(data);
        // computeOptions returns natoExclUsLabel and countryOptions as well
        chart = chart.params([
            vl.param('year_select').value(yearOptions[yearOptions.length - 1]).bind({ input: 'select', options: yearOptions, name: 'Year: ' }),
            vl.param('country_a').value(natoAvgLabel).bind({ input: 'select', options: countryOptions, name: 'Country A: ' }),
            vl.param('country_b').value(defaultCountryB).bind({ input: 'select', options: countryOptions, name: 'Country B: ' })
        ]).data(data);
    } else {
        chart = chart.data(data);
    }

    return chart;
}

module.exports = { createRadar };


