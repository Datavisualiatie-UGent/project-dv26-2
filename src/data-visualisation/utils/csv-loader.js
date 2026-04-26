const fs = require('fs');
const path = require('path');
const { ASSETS_DIR } = require('./constants');

function parseCsv(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return [];
    const header = lines[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/).map(h => h.trim().replace(/^\"|\"$/g, '').replace(/^\uFEFF/, ''));
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
        const obj = {};
        for (let j = 0; j < header.length; j++) {
            let v = cols[j] === undefined ? '' : cols[j].trim();
            // strip surrounding quotes
            if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
            // ensure header keys have no surrounding quotes or BOM
            const key = (header[j] || '').replace(/^\"|\"$/g, '').replace(/^\uFEFF/, '');
            obj[key] = v;
        }
        rows.push(obj);
    }
    return rows;
}

function loadCsv(filename) {
    const p = path.join(ASSETS_DIR, filename);
    if (!fs.existsSync(p)) {
        throw new Error(`CSV not found: ${p}`);
    }
    const txt = fs.readFileSync(p, 'utf8');
    return parseCsv(txt);
}

function loadAllCsv(filenames) {
    const out = {};
    filenames.forEach(f => out[f] = loadCsv(f));
    return out;
}

module.exports = { parseCsv, loadCsv, loadAllCsv };


