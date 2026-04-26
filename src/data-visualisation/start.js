// Utilities and plots
const { loadCsv } = require('./utils/csv-loader');
const { writeSpec, writeAllSpecs } = require('./utils/exporter');
const { categoryConfig, countryIcons } = require('./utils/constants');
const plots = require('./plots');
const {prepareData} = require("./utils/data-utils");

const use_icons = true;

const equipment = loadCsv('portionofexpenditure_equipment.csv');
const infrastructure = loadCsv('portionofexpenditure_infrastructure.csv');
const personnel = loadCsv('portionofexpenditure_personel.csv');
const other = loadCsv('portionofexpenditure_other.csv');

const tidy_data = prepareData(equipment, infrastructure, other, personnel);

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
