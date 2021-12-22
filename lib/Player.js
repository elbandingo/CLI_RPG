const Potion = require('../lib/Potion');
function Player(name = '') {
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    console.log(this.health);
    this.strength = Math.floor(Math.random() * 5 + 7);
    console.log(this.strength);
    this.agility = Math.floor(Math.random() * 5 + 7);
    console.log(this.agility)
    this.inventory = [new Potion('health'), new Potion()];
    console.log(this.inventory);

    //returns an object with various player stats and properties
    Player.prototype.getStats = function() {
        return {
            potions: this.inventory.length,
            health: this.health,
            agility: this.agility,
            strength: this.strength
        };
    };

    //returns the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if(this.inventory.length) {
            console.log(this.inventory);
            return this.inventory;
        }
        return false;
    };
}

module.exports = Player;