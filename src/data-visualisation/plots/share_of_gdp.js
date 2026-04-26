const vl = require('vega-lite-api');
const { flags } = require('../utils/constants');
const { createFlagOverlay } = require('../utils/flag-panel');

function createShareOfGdp(data, { includeParams = true } = {}) {
    // data is expected to be tidy: { country, year, share, flag_url }

    const heatmap = vl.markRect()
        .encode(
            vl.x().fieldO('year').title(null),
            vl.y().fieldN('country').sort({ field: 'avg_share', order: 'descending' }).axis(null),
            vl.color().fieldQ('share').scale({ scheme: 'blues' }).legend({ title: 'Share', labelExpr: "datum.value + '%'" }),
            vl.tooltip(['country', 'year', 'share'])
        );

    // Overlay flags and country text using absolute x positions so image loads
    // do not affect the heatmap layout. Use the same aggregation to compute
    // average share for sorting the y axis.
    const overlay = createFlagOverlay(vl, { imageWidth: 30, imageHeight: 15, imageX: -20, textX: -40 });

    let chart = vl.layer(heatmap, overlay)
        .transform(
            vl.joinaggregate(vl.average('share').as('avg_share')).groupby(['country'])
        )
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
