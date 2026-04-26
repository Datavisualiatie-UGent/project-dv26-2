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

// URL flags mapping
exports.flags = {
  Albania: "https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg",
  Belgium: "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",
  Bulgaria: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg",
  Canada: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
  Croatia: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg",
  Czechia: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
  Denmark: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg",
  Estonia: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg",
  Finland: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg",
  France: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  Germany: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  Greece: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg",
  Hungary: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg",
  Italy: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
  Latvia: "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg",
  Lithuania: "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg",
  Luxembourg: "https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg",
  Montenegro: "https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg",
  Netherlands: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
  "North Macedonia": "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg",
  Norway: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg",
  Poland: "https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg",
  Portugal: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg",
  Romania: "https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg",
  "Slovak Republic": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg",
  Slovenia: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg",
  Spain: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  Sweden: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg",
  Türkiye: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
  "United Kingdom": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  "United States": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
};

