const vl = require('vega-lite-api');
const { flags } = require('../utils/constants');

function createShareOfGdp(data, { includeParams = true } = {}) {
    // data is expected to be tidy: { country, year, share, flag_url }

    const heatmap = vl.markRect()
        .encode(
            vl.x().fieldO('year').title(null),
            vl.y().fieldN('country').sort({ field: 'avg_share', order: 'descending' }).axis(null),
            vl.color().fieldQ('share').scale({ scheme: 'blues' }).legend({ title: 'Share', labelExpr: "datum.value + '%'" }),
            vl.tooltip(['country', 'year', 'share'])
        );

    const labels = vl.markImage({ width: 30, height: 15 })
        .transform(vl.aggregate(vl.min('avg_share').as('avg_share')).groupby(['country', 'flag_url']))
        .encode(
            vl.x().value(-20),
            vl.y().fieldN('country').sort({ field: 'avg_share', order: 'descending' }),
            vl.url().field('flag_url')
        );

    const text_labels = vl.markText({ align: 'right' })
        .transform(vl.aggregate(vl.min('avg_share').as('avg_share')).groupby(['country', 'flag_url']))
        .encode(
            vl.x().value(-40),
            vl.y().fieldN('country').sort({ field: 'avg_share', order: 'descending' }),
            vl.text().fieldN('country')
        );

    let chart = vl.layer(heatmap, labels, text_labels)
        .resolve({ scale: { y: 'shared' } })
        .width({ step: 27.5 })
        .height({ step: 27.5 })
        .background('#f0f0f0')
        .title({ text: 'Share of GDP for each year per country', subtitle: 'Sorted by average share of GDP', fontSize: 18, offset: 10 })
        .config({ axis: { grid: true, gridOpacity: 0.6, tickBand: 'extent', labelFontSize: 12 } });

    if (includeParams) {
        chart = chart.data(data);
    } else {
        chart = chart.data(data);
    }

    return chart;
}

module.exports = { createShareOfGdp };

