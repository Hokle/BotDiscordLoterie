const fs = require('fs');

class Storage {
    constructor(filename) {
        this.filename = filename;
        this.data = {};
        this.load();
    }

    load() {
        if (fs.existsSync(this.filename)) {
            try {
                const content = fs.readFileSync(this.filename, 'utf8');
                this.data = JSON.parse(content);
            } catch (error) {
                console.error(`Erreur lors de la lecture du fichier ${this.filename}:`, error);
                this.data = {};
            }
        } else {
            this.save();
        }
    }

    save() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error(`Erreur lors de l'écriture du fichier ${this.filename}:`, error);
        }
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.save();
    }
}

const tickets = new Storage('./data/tickets.json');
const usedInvites = new Storage('./data/usedInvites.json');
const state = new Storage('./data/state.json');

module.exports = { tickets, usedInvites, state };