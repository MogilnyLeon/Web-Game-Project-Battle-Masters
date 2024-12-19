
import { Character } from "../classes/character.js";
//this is temporary

let health = 100;

function smack(damage) {
    //adjust the health
    //max chooses either 0 or the calculation, depending which is greater
    health = Math.max(0,health - damage);
    //update display
    updateBar();
}

function heal(toHeal) {
    //adjust the health
    health = Math.min(100,health + toHeal);
    //update display
    updateBar();
}

const Attack = document.getElementById("attack");

Attack.addEventListener("click", () => {
    smack(10);
});

const Heal = document.getElementById("heal");

Heal.addEventListener("click", () => {
    heal(20);
});

//update display
function updateBar() {
    const bar = document.getElementById("bar");
    bar.style.width = `${health}%`


    if (health <= 100) {
        bar.style.backgroundColor="#14e114";
    }
    if (health <= 50) {
        bar.style.backgroundColor="#ffa310";
    }
    if ( health <= 25){
        bar.style.backgroundColor="#ff0000"; 
    }
    
}