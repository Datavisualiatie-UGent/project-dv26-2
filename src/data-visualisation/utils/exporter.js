const fs = require('fs');
const path = require('path');
const { EXPORT_DIR } = require('./constants');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeSpec(filenameBase, spec) {
    ensureDir(EXPORT_DIR);
    const outPath = path.join(EXPORT_DIR, `${filenameBase}.json`);
    fs.writeFileSync(outPath, JSON.stringify(spec, null, 2), 'utf8');
    return outPath;
}

function writeAllSpecs(specMap) {
    ensureDir(EXPORT_DIR);
    const written = [];
    Object.entries(specMap).forEach(([name, spec]) => {
        const p = writeSpec(name, spec);
        written.push(p);
    });
    return written;
}

module.exports = { writeSpec, writeAllSpecs };

