import { Character } from "./../classes/character.js";

//Fetch DnD API

async function AbilityGeneration() {
    const response = await fetch("https://api.open5e.com/v1/classes/?format=json");
    if (!response.ok) {
        return new Error("Uh oh! something's wrong, I can feel it");
    }
    const data = await response.json();
    return data;
}

function ProcessAbilities(data) {
    
}

//General Functionality methods

function RollDamage(bonus) {
    let damageRoll = Math.floor((Math.random()*20)+1);
    damageRoll+=bonus;
    return damageRoll;

}
//Passive Abilities:
//1- Swordsman (does bonuse damage on basic and ability attacks)
//2- Berserk (does 50% bonus damage, and takes Recoil Damage)
//3- 
//4- 
//5- 
//6- 
//7- 
//8- 

//Active Abilities:
//1- 
//2- 
//3- 
//4- 
//5- 
//6- 
//7- 
//8- 

AbilityGeneration()
.then((data) => {
    console.log(data);

    ProcessAbilities(data);

    //Create Player 1

    //missing "abilities",Speed and Health
    const player1 = new Character(
        sessionStorage.getItem("Name1"),
        sessionStorage.getItem("Age1"),
        sessionStorage.getItem("SelectedChar1").split("_")[1],
        sessionStorage.getItem("SkinURL1"),
        "temporary",
        25,
        100
    );

    //Create Player 2

    //missing "abilities",Speed and Health
    const player2 = new Character(
        sessionStorage.getItem("Name2"),
        sessionStorage.getItem("Age2"),
        sessionStorage.getItem("SelectedChar2").split("_")[1],
        sessionStorage.getItem("SkinURL2"),
        "temporary",
        24,
        100
    );

    console.log(player1);
    console.log(player1.Health)
    const GameLength = sessionStorage.getItem("GameLength");
    let CurrentTurn = 1;

    //Sets up images
    const P1Sprite = document.getElementById("Player1Char");
    P1Sprite.src = player1.SkinURL;

    const P2Sprite = document.getElementById("Player2Char");
    P2Sprite.src = player2.SkinURL;

    //Sets up user info
    const P1Name = document.getElementById("P1Name");
    P1Name.innerText = player1.getName;
    const P2Name = document.getElementById("P2Name");
    P2Name.innerText = player2.getName;

    const P1Character = document.getElementById("P1Character");
    P1Character.innerText = player1.CharacterName;
    const P2Character = document.getElementById("P2Character");
    P2Character.innerText = player2.CharacterName;

    //sets up everything before the game starts
    let P1Turn = player1.Speed > player2.Speed;


    const TurnInfo = document.getElementById("TurnInfo");
    updateTurnDisplay(P1Turn);

    const numOfTurns = document.getElementById("numofTurns");
    numOfTurns.innerText = CurrentTurn;



    // Function to update the turn display and enable/disable buttons
    function updateTurnDisplay(isP1Turn) {
        if (isP1Turn) {
            TurnInfo.innerText = "Player 1's Turn";
            toggleMenu("buttonMenu1", false); // Enable Player 1 menu
            toggleMenu("buttonMenu2", true); // Disable Player 2 menu
        } else {
            TurnInfo.innerText = "Player 2's Turn";
            toggleMenu("buttonMenu1", true); // Disable Player 1 menu
            toggleMenu("buttonMenu2", false); // Enable Player 2 menu
        }
    }

    // Helper function to toggle button menus
    function toggleMenu(menuId, isDisabled) {
        const buttons = document.querySelectorAll(`#${menuId} button`);
        buttons.forEach(button => {
            button.disabled = isDisabled;
        });
    }

    //Update Bar for either player
    function updateBarP1() {
        const bar = document.getElementById("bar1");
        bar.style.width = `${player1.Health}%`
    
    
        if (player1.Health <= 100) {
            bar.style.backgroundColor="#14e114";
        }
        if (player1.Health <= 50) {
            bar.style.backgroundColor="#ffa310";
        }
        if (player1.Health <= 25){
            bar.style.backgroundColor="#ff0000"; 
        }
        
    }
    function updateBarP2() {
        const bar = document.getElementById("bar2");
        bar.style.width = `${player2.Health}%`
    
    
        if (player2.Health <= 100) {
            bar.style.backgroundColor="#14e114";
        }
        if (player2.Health <= 50) {
            bar.style.backgroundColor="#ffa310";
        }
        if (player2.Health <= 25){
            bar.style.backgroundColor="#ff0000"; 
        }
        
    }

    //attack functionality
    document.getElementById("Attack1").addEventListener("click", () => {
        if (P1Turn) {
            console.log("Player 1 attacks!");
            smackP2(RollDamage(0));
            P1Turn = false;
            updateTurnDisplay(P1Turn);
        }
    });

    document.getElementById("Attack2").addEventListener("click", () => {
        if (!P1Turn) {
            console.log("Player 2 attacks!");
            smackP1(RollDamage(0));
            P1Turn = true;
            updateTurnDisplay(P1Turn);
        }
    });

    function smackP1(damage) {
        //adjust the health
        //max chooses either 0 or the calculation, depending which is greater
        console.log(player1.Health)
        player1.Health = Math.max(0,player1.Health - damage);
        //update display
        console.log(player1.Health)
        updateBarP1();
    
    }
    
    function smackP2(damage) {
        //adjust the health
        //max chooses either 0 or the calculation, depending which is greater
        player2.Health = Math.max(0,player2.Health - damage);
        console.log(player2.Health);
        //update display
        
        updateBarP2();
    
    }
})
.catch((error) => {
    console.error(error);
});





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
    smack(RollDamage(5));
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
