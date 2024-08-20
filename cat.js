const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = {
    meow: "1. Meow\n",
    eat: "2. Eat\n",
    sleep: "3. Sleep\n",
    bite: "4. Bite\n",
    scratch: "5. Scratch\n",
    play: "6. Play\n",
    purr: "7. Purr\n",
    die: "8. Die\n",
    exit: "9. Exit\n"
};

const menuText = menu.meow + menu.eat + menu.sleep + menu.bite + menu.scratch + menu.play + menu.purr + menu.die + menu.exit;

class Cat {
    constructor(name, age, gender, color, breed) {
        this.name = name.length > 10 ? name.substring(0, 10) : name; 
        this.age = parseInt(age); 
        this.gender = gender.length > 1 ? gender.substring(0, 1) : gender; 
        this.color = color.length > 10 ? color.substring(0, 10) : color; 
        this.breed = breed.length > 20 ? breed.substring(0, 20) : breed; 
        this.isAlive = true;
        this.isHungry = false;
        this.isEating = false;
        this.isAngry = false;
        this.isSleeping = false;
    }

    meow() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't meow! 💀😭`);
        } else if (this.isSleeping) {
            console.log(`${this.name} is sleeping and can't meow! 😴`);
        } else if (this.isEating) {
            console.log(`${this.name} is eating and can't meow! 🍽️`);
        } else {
            console.log(`${this.name} says meow! 🐈😆`);
        }
    }

    bite() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't bite! 💀😭`);
        } else if (this.isSleeping) {
            console.log(`${this.name} is sleeping and can't bite! 😴`);
        } else if (this.isEating) {
            console.log(`${this.name} is eating and can't bite! 🍽️`);
        } else {
            console.log(`${this.name} bites you! 😹😡`);
            this.isAngry = true;
        }
    }

    eat() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't eat! 💀😭`);
        } else if (this.isSleeping) {
            console.log(`${this.name} is sleeping and can't eat! 😴`);
        } else if (this.isAngry) {
            console.log(`${this.name} is angry and doesn't want to eat! 😡`);
        } else if (this.isHungry) {
            console.log(`${this.name} is eating! 🍽️`);
            this.isEating = true;
            this.isHungry = false;
        } else {
            console.log(`${this.name} is not hungry! 😐`);
        }
    }

    sleep() {
        if (!this.isAlive) {
            console.log(`${this.name} can't sleep because it's no longer alive. 💀`);
        } else {
            console.log(`${this.name} is sleeping! 😴`);
            this.isSleeping = true;
            this.isAngry = false;
            this.isHungry = false;
            this.isEating = false;
        }
    }

    die() {
        if (this.isAlive) {
            console.log(`${this.name} has died. Goodbye cat! 💀`);
            this.isAlive = false;
            this.isSleeping = false;
            this.isHungry = false;
            this.isEating = false;
            this.isAngry = false;
        }
    }

    scratch() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't scratch! 💀😭`);
        } else if (this.isSleeping) {
            console.log(`${this.name} is sleeping and can't scratch! 😴`);
        } else {
            console.log(`${this.name} is scratching! 🐾`);
            this.isAngry = true;
        }
    }

    play() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't play! 💀😭`);
        } else if (this.isSleeping) {
            console.log(`${this.name} is sleeping and can't play! 😴`);
        } else if (this.isEating) {
            console.log(`${this.name} is eating and can't play! 🍽️`);
        } else if (this.isAngry) {
            console.log(`${this.name} is angry and doesn't want to play! 😡`);
        } else {
            console.log(`${this.name} is playing! 🎉`);
            this.isHungry = true;
        }
    }

    purr() {
        if (!this.isAlive) {
            console.log(`${this.name} is dead and can't purr! 💀😭`);
        } else if (this.isSleeping || this.isHungry || this.isAngry || this.isEating) {
            console.log(`${this.name} can't purr because it's not in the right state! 😒`);
        } else {
            console.log(`${this.name} is purring! 😻`);
        }
    }
}

function showMenu(cat) {
    console.log(menuText);
    rl.question("Order: ", (ownerInput) => {
        if (ownerInput === "1") {
            cat.meow();
        } else if (ownerInput === "2") {
            cat.eat();
        } else if (ownerInput === "3") {
            cat.sleep();
        } else if (ownerInput === "4") {
            cat.bite();
        } else if (ownerInput === "5") {
            cat.scratch();
        } else if (ownerInput === "6") {
            cat.play();
        } else if (ownerInput === "7") {
            cat.purr();
        } else if (ownerInput === "8") {
            cat.die();
        } else if (ownerInput === "9") {
            console.log("Goodbye!");
            rl.close();
            return;
        } else {
            console.log('Invalid option. Please choose a number between 1 and 9.');
        }
        showMenu(cat);
    });
}

// Create a new cat object
let myCat = new Cat("Whiskers", 2, 'M', "Gray", "Siberian");

// Start the menu system
showMenu(myCat);
