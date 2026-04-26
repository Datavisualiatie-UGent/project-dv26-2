const path = require('path');

exports.ASSETS_DIR = path.join(__dirname, '..', '..', '..', 'assets', 'nato-defence-expenditure');
exports.EXPORT_DIR = path.join(__dirname, '..', 'exports', 'plots');

exports.categoryConfig = {
    "Equipment": { icon: "🛡️", angle: Math.PI / 2, order: 1 },
    "Personnel": { icon: "🧑‍🤝‍🧑", angle: 0, order: 2 },
    "Infrastructure": { icon: "🏢", angle: 1.5 * Math.PI, order: 3 },
    "Other": { icon: "📦", angle: Math.PI, order: 4 }
};

exports.countryIcons = {
    "NATO Average": "🌐",
    "NATO Excl. US Average": "✨",
    "NATO Eastflank": "🛡️",
    "Albania": "🇦🇱",
    "Belgium": "🇧🇪",
    "Bulgaria": "🇧🇬",
    "Canada": "🇨🇦",
    "Croatia": "🇭🇷",
    "Czechia": "🇨🇿",
    "Denmark": "🇩🇰",
    "Estonia": "🇪🇪",
    "Finland": "🇫🇮",
    "France": "🇫🇷",
    "Germany": "🇩🇪",
    "Greece": "🇬🇷",
    "Hungary": "🇭🇺",
    "Italy": "🇮🇹",
    "Latvia": "🇱🇻",
    "Lithuania": "🇱🇹",
    "Luxembourg": "🇱🇺",
    "Montenegro": "🇲🇪",
    "Netherlands": "🇳🇱",
    "North Macedonia": "🇲🇰",
    "Norway": "🇳🇴",
    "Poland": "🇵🇱",
    "Portugal": "🇵🇹",
    "Romania": "🇷🇴",
    "Slovak Republic": "🇸🇰",
    "Slovenia": "🇸🇮",
    "Spain": "🇪🇸",
    "Sweden": "🇸🇪",
    "Türkiye": "🇹🇷",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    "USA": "🇺🇸"
};

