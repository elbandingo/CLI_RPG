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
}

module.exports = Player;