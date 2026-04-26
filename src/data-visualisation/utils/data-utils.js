// Utilities for preparing tidy data and computing selector options
const { categoryConfig, countryIcons } = require('./constants');
// Use flags (URLs) instead of emoji icons by default
const use_icons = false;

function computeOptions(data) {
    const yearOptions = Array.from(new Set(data.map(d => d.year))).sort();
    const baseCountries = Array.from(new Set(data.map(d => d.country_label)))
        .filter(c => !c.includes('NATO Average') && !c.includes('NATO Excl. US') && !c.includes('NATO Eastflank'))
        .sort();
    const natoAvgLabel = data.find(d => d.country === 'NATO Average')?.country_label || 'NATO Average';
    const natoExclUsLabel = data.find(d => d.country === 'NATO Excl. US Average')?.country_label || 'NATO Excl. US Average';
    const natoEastflankLabel = data.find(d => d.country === 'NATO Eastflank')?.country_label || 'NATO Eastflank';
    const defaultCountryB = baseCountries.length > 0 ? baseCountries[0] : natoAvgLabel;
    const countryOptions = [natoAvgLabel, natoExclUsLabel, natoEastflankLabel, ...baseCountries];

    return { yearOptions, baseCountries, natoAvgLabel, natoExclUsLabel, natoEastflankLabel, defaultCountryB, countryOptions };
}

function prepareData(equipmentCsv, infrastructureCsv, otherCsv, personnelCsv) {
    const datasets = {
        "Equipment": equipmentCsv,
        "Infrastructure": infrastructureCsv,
        "Other": otherCsv,
        "Personnel": personnelCsv
    };

    let tidyData = [];
    const eastflank = ["Norway", "Sweden", "Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Romania"];
    let yearsSet = new Set();

    for (const [category, data] of Object.entries(datasets)) {
        if (!data) continue;
        data.forEach(row => {
            const country = row.country;
            for (const key in row) {
                if (key !== "country") {
                    const year = key.replace('e', '');
                    yearsSet.add(year);
                    const value = parseFloat(row[key]) || 0;
                    tidyData.push({ country, category, year, value });
                }
            }
        });
    }

    const yearsArr = Array.from(yearsSet);
    const categories = Object.keys(categoryConfig);
    let finalData = [];

    yearsArr.forEach(year => {
        categories.forEach(category => {
            const currentData = tidyData.filter(d => d.year === year && d.category === category);
            if (currentData.length === 0) return;

            const natoAvg = currentData.reduce((sum, d) => sum + d.value, 0) / currentData.length;
            const exclUS = currentData.filter(d => d.country !== "USA" && d.country !== "United States");
            const natoExclUsAvg = exclUS.length > 0 ? exclUS.reduce((sum, d) => sum + d.value, 0) / exclUS.length : 0;
            const flank = currentData.filter(d => eastflank.includes(d.country));
            const flankAvg = flank.length > 0 ? flank.reduce((sum, d) => sum + d.value, 0) / flank.length : 0;

            const yearCategorySet = [
                ...currentData,
                { country: "NATO Average", category, year, value: natoAvg },
                { country: "NATO Excl. US Average", category, year, value: natoExclUsAvg },
                { country: "NATO Eastflank", category, year, value: flankAvg }
            ];

            yearCategorySet.forEach(d => {
                const catConf = categoryConfig[d.category];
                const catLabel = use_icons && catConf.icon ? `${d.category} ${catConf.icon}` : d.category;

                const cIcon = use_icons && countryIcons[d.country] ? ` ${countryIcons[d.country]}` : "";
                const cLabel = `${d.country}${cIcon}`;

                finalData.push({
                    ...d,
                    category_label: catLabel,
                    country_label: cLabel,
                    order: catConf.order // Passed explicitly to guarantee strict stacking sequence
                });
            });
        });
    });

    return finalData;
}

module.exports = { computeOptions, prepareData };
