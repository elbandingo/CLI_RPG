const Potion = require('./Potion');

function Enemy(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();
    this.health = Math.floor(Math.random()*10+85);
    this.strength = Math.floor(Math.random()*5+5);
    this.agility = Math.floor(Math.random()*5+5);

    //returns the players health
    Enemy.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    //checks to see if player is alive
    Enemy.prototype.isAlive = function() {
        if(this.health === 0) {
            return false;
        }
        return true;
    };

    //reduces player health, where damage is usually passed through
    Enemy.prototype.reduceHealth = function(damage) {
        this.health -= damage;

        if(this.health < 0) {
            this.health = 0;
        }
    };

    //get player attack value
    Enemy.prototype.getAttackValue = function(){
        //minimum damage is your str - 5
        const min = this.strength - 5;
        //max damage is str +5
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max-min) + min);
    };

    //get enemy description
    Enemy.prototype.getDescription = function() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    };



}

module.exports = Enemy;