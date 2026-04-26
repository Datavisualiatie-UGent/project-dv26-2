// Utilities and plots
const { loadCsv } = require('./utils/csv-loader');
const { writeSpec, writeAllSpecs } = require('./utils/exporter');
const { categoryConfig, countryIcons, flags } = require('./utils/constants');
const plots = require('./plots');
const {prepareData} = require("./utils/data-utils");

// no emoji icons by default; flags URLs are used instead

const equipment = loadCsv('portionofexpenditure_equipment.csv');
const infrastructure = loadCsv('portionofexpenditure_infrastructure.csv');
const personnel = loadCsv('portionofexpenditure_personel.csv');
const other = loadCsv('portionofexpenditure_other.csv');

const tidy_data = prepareData(equipment, infrastructure, other, personnel);

// Load share-of-gdp data and prepare tidy format for the heatmap (country, year, share, flag_url)
let share_raw = [];
try {
    share_raw = loadCsv('shareofgdp.csv');
} catch (e) {
    console.warn('shareofgdp.csv not found in assets; share-of-gdp plot will be skipped.');
}

const share_tidy = (share_raw || []).filter(row => row.country !== 'NATO Europe and Canada' && row.country !== 'NATO Total')
    .flatMap(row => Object.keys(row).filter(k => k !== 'country').map(year => ({
        country: row.country,
        year: year,
        share: parseFloat(row[year]) || 0,
        flag_url: flags[row.country]
    })));

// Export options: if an argument is provided, export only that plot name; otherwise export all
const selected = process.argv[2];

// Build specs using plot builders (do not include interactive params in exported static specs)
const specs = {
    'stacked_bar_adaptive': plots.createStackedBar(tidy_data, { labelMode: 'adaptive', includeParams: true }).toSpec(),
    'stacked_bar_always': plots.createStackedBar(tidy_data, { labelMode: 'always', includeParams: true }).toSpec(),
    'stacked_bar_none': plots.createStackedBar(tidy_data, { labelMode: 'none', includeParams: true }).toSpec(),
    'faceted_bar_adaptive': plots.createFacetedBar(tidy_data, { labelMode: 'adaptive', includeParams: true }).toSpec(),
    'faceted_bar_always': plots.createFacetedBar(tidy_data, { labelMode: 'always', includeParams: true }).toSpec(),
    'faceted_bar_none': plots.createFacetedBar(tidy_data, { labelMode: 'none', includeParams: true }).toSpec(),
    'radar_outside': plots.createRadar(tidy_data, { legendInside: true, includeParams: true }).toSpec(),
    'radar_inside': plots.createRadar(tidy_data, { legendInside: true, includeParams: true }).toSpec()
    ,
    'share_of_gdp': plots.createShareOfGdp(share_tidy, { includeParams: true }).toSpec()
};

if (selected) {
    if (!specs[selected]) {
        console.error(`Unknown plot name '${selected}'. Available: ${Object.keys(specs).join(', ')}`);
        process.exit(1);
    }
    const out = writeSpec(selected, specs[selected]);
    console.log(`✅ Wrote ${out}`);
} else {
    const written = writeAllSpecs(specs);
    console.log('✅ Wrote specs:');
    written.forEach(p => console.log(' -', p));
}
