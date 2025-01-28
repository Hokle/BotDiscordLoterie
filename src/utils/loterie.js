const { lots, specialLots } = require('../config/lots');

function choisirLot() {
    const sommeChances = lots.reduce((total, lot) => total + lot.chance, 0);
    const random = Math.random() * sommeChances;
    let accumulation = 0;

    for (const lot of lots) {
        accumulation += lot.chance;
        if (random <= accumulation) {
            return {
                name: lot.name,
                special: specialLots.includes(lot.name)
            };
        }
    }
}

module.exports = { choisirLot };