const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
//set up the initial game environment stuff.
this.roundNumber = 0;
this.isPlayerTurn = false;
this.enemies = [];
this.currentEnemy;
this.player;

//function for initializing the game, and setting up basic enemy parameters
Game.prototype.initializeGame = function() {
    //add enemies to the array of enemies you will fight
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc','great axe'));
    this.enemies.push(new Enemy('guldan', 'staff of hellfire'));
    //set the 1st enemy to be 1st in array
    this.currentEnemy = this.enemies[0];
    //we also need to prompt the user for their name when starting the game
    inquirer.prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?'
        //destructure name from the prompt object, and create the new player object with the name chosen in inquirer
    }).then(({name}) => {
        this.player = new Player(name);
        //test to make sure Player object is created
        console.log(this.currentEnemy, this.player);
        //start a new battle when the game is initialized
        this.startNewBattle();
    });
};

//function for starting a new round. based on 3 things. 1 - whos turn is it, based on highest AGI. 2 - Display Player object stats. 3 - display enemy description
Game.prototype.startNewBattle = function() {
    if(this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    //actually start the battle
    this.battle();
};

//function for the actual battle logic
Game.prototype.battle = function() {
    //while current enemy health is above 0
    
    //if its the player turn
    if(this.isPlayerTurn) {
        //prompt the player to attack or use a potion
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['Attack', 'Use Potion']
        }).then(({action}) => {
            if(action === 'Use Potion') {
                //if they dont have any potions to use, tell them!
                if(!this.player.getInventory()) {
                    console.log("you dont have any potions!");
                    return this.checkEndOfBattle();
                }

                inquirer.prompt({
                    type: 'list',
                    name: 'action',
                    message: 'Which potion would you like to use',
                    //this sets the choices to map the index 0 to show item 1 in your inventory
                    choices: this.player.getInventory().map((item,index) => `${index + 1}: ${item.name}`)
                }).then(({action}) => {
                    //this does the revrse of the above
                    const potionDetails = action.split(': ');
                    this.player.usePotion(potionDetails[0] - 1);
                    console.log(`You used a ${potionDetails[1]} potion.`);
                    console.table(this.player.getStats());
                    //check the 
                    return this.checkEndOfBattle();
                })

            } else {
                const damage = this.player.getAttackValue();
                this.currentEnemy.reduceHealth(damage);
                console.log(`You attacked the ${this.currentEnemy.name} for ${damage} points of damage`)
                console.log(this.currentEnemy.getHealth());
                this.checkEndOfBattle();
            }
        })
    } else {
        //set the damage of the enemy, and pass that throug the reduce health function
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);
        console.log(`The ${this.currentEnemy.name} attacked you for ${damage} points of damage`);
        console.log(`You have ${this.player.health} hitpoints remaining`);
        this.checkEndOfBattle();
    }


    //end of battle function
}

//function to check if the battle should continue or not
Game.prototype.checkEndOfBattle = function() {
    //if player and current enemy are alive then switch players turn
    if(this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
        //else if the player is alive, and enemy isnt alive
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()){
        console.log(`you have defeated the ${this.currentEnemy.name}`);
        //drop their potion, add it to player inventory
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion.`);
        //increase the round
        this.roundNumber++;
        //check if the roundnumber is capped
        if(this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You Win!');
        }

    } else {
        console.log("youve been defeated");
    }

}












}

module.exports = Game;