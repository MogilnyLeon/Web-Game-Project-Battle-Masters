import { Character } from "./../classes/character.js";

// Fetch DnD API
async function AbilityGeneration() {
    const response = await fetch("https://api.open5e.com/v1/classes/?format=json");
    if (!response.ok) {
        throw new Error("Uh oh! Something's wrong, I can feel it");
    }
    const data = await response.json();
    return data;
}

function ProcessPassiveAbilities(data) {
    // Process abilities logic here
    return [
        data.results[3].archetypes[0].name,
        data.results[0].archetypes[0].name,
        "King's Shield",
        "Steam Eruption",
        data.results[8].archetypes[1].name,
        data.results[9].archetypes[2].name,
        "Combative",
        "Night Shade"
    ]
}

const getAbility = (character) => 
    character === "Serpent" ? "Circle of the Land" :
    character === "Madness" ? "Path of the Berserker" :
    character === "Righteous" ? "King's Shield" :
    character === "Tinkerer" ? "Champion of Steel" :
    character === "Trickster" ? "Eldritch Trickster" :
    character === "Sorcerer" ? "Runechild" :
    character === "Proficient" ? "Hunter" :
    character === "Darkness" ? "Night Shade" :
    "Unknown Ability";

// General Functionality methods
function RollDamage(bonus) {
    let damageRoll = Math.floor((Math.random() * 20) + 1);
    damageRoll += bonus;
    return damageRoll;
}

async function main() {
    try {
        const data = await AbilityGeneration();
        console.log(data);

        const list = ProcessPassiveAbilities(data);
        console.log(list);

        // Create Player 1

        const player1 = new Character(
            sessionStorage.getItem("Name1"),
            sessionStorage.getItem("Age1"),
            sessionStorage.getItem("SelectedChar1").split("_")[1],
            sessionStorage.getItem("SkinURL1"),
            getAbility(sessionStorage.getItem("SelectedChar1").split("_")[1]),
            25,
            100,
            1
        );

        // Create Player 2
        const player2 = new Character(
            sessionStorage.getItem("Name2"),
            sessionStorage.getItem("Age2"),
            sessionStorage.getItem("SelectedChar2").split("_")[1],
            sessionStorage.getItem("SkinURL2"),
            getAbility(sessionStorage.getItem("SelectedChar2").split("_")[1]),
            24,
            100,
            2
        );

        console.log(player1);
        console.log(player2);

        const GameLength = sessionStorage.getItem("GameLength");
        let CurrentTurn = 1;

        // Sets up images
        const P1Sprite = document.getElementById("Player1Char");
        P1Sprite.src = player1.SkinURL;

        const P2Sprite = document.getElementById("Player2Char");
        P2Sprite.src = player2.SkinURL;

        // Sets up user info
        const P1Name = document.getElementById("P1Name");
        P1Name.innerText = player1.getName;
        const P2Name = document.getElementById("P2Name");
        P2Name.innerText = player2.getName;

        const P1Character = document.getElementById("P1Character");
        P1Character.innerText = player1.CharacterName;
        const P2Character = document.getElementById("P2Character");
        P2Character.innerText = player2.CharacterName;

        // Sets up everything before the game starts
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

        // Update Bar for either player
        function updateBarP1() {
            document.getElementById("healthP1").innerText = `${player1.Health}/100`;

            const bar = document.getElementById("bar1");
            bar.style.width = `${player1.Health}%`;

            if (player1.Health <= 100) {
                bar.style.backgroundColor = "#14e114";
            }
            if (player1.Health <= 50) {
                bar.style.backgroundColor = "#ffa310";
            }
            if (player1.Health <= 25) {
                bar.style.backgroundColor = "#ff0000";
            }
        }

        function updateBarP2() {
            document.getElementById("healthP2").innerText = `${player2.Health}/100`;

            const bar = document.getElementById("bar2");
            bar.style.width = `${player2.Health}%`;

            if (player2.Health <= 100) {
                bar.style.backgroundColor = "#14e114";
            }
            if (player2.Health <= 50) {
                bar.style.backgroundColor = "#ffa310";
            }
            if (player2.Health <= 25) {
                bar.style.backgroundColor = "#ff0000";
            }
        }

        function UpdateActionDisplay(action) {
            document.getElementById("actionDisplay").innerText = action;
        };

        // Attack and Heal Events
        document.getElementById("Attack1").addEventListener("click", () => {
            if (P1Turn) {
                let damage = RollDamage(0);
                UpdateActionDisplay(`${player1.PlayerName} attacks for ${damage}HP!`);
                smackP2(damage);
                P1Turn = false;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Attack2").addEventListener("click", () => {
            if (!P1Turn) {
                let damage = RollDamage(0);
                UpdateActionDisplay(`${player2.PlayerName} attacks for ${damage}HP!`);
                smackP1(damage);
                P1Turn = true;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Heal1").addEventListener("click", () => {
            if (P1Turn) {
                healP1(20);
                P1Turn = false;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Heal2").addEventListener("click", () => {
            if (!P1Turn) {
                healP2(20);
                P1Turn = true;
                updateTurnDisplay(P1Turn);
            }
        });
        //AbilityEvents
        let AbiiliyToggleP1 = false;

        document.getElementById("Ability1").addEventListener("click", () => {
            switch (player1.CharacterName) {
                case "Serpent":
                    CircleOfTheLand(player1);
                    break;
                case "Madness":
                    PathOfTheBerserker(player1);
                    break;
                case "Righteous":
                    break;
                case "Tinkerer":
                    break;
                case "Trickster":
                    break;
                    case "Sorcererer":
                        if(!AbiiliyToggleP1) {
                            AbiiliyToggleP1=true;
                            UpdateActionDisplay(`${player1.PlayerName} does stuff`);
                        } else {
                            AbiiliyToggleP1=false;
                        }
                        break;
                    case "Proficient":
                        if(!AbiiliyToggleP1) {
                            AbiiliyToggleP1=true;
                            UpdateActionDisplay(`${player1.PlayerName} steels themseleves and becomes more combative.\nHits will be stronger, but it comes at a cost`);
                        } else {
                            AbiiliyToggleP1=false;
                        }
                        break;
                    case "Darkness":
                        if(!AbiiliyToggleP1) {
                            AbiiliyToggleP1=true;
                            UpdateActionDisplay(`${player1.PlayerName} casts a shadow over the oppoenent.\nRejuvenation will come at a cost`);
                        } else {
                            AbiiliyToggleP1=false;
                            UpdateActionDisplay(`${player1.PlayerName} The shadow is banished. The battlefield is peaceful.`);
                        }
                        break;
            }
        });

        let AbiiliyToggleP2 = false;

        document.getElementById("Ability2").addEventListener("click", () => {
            switch (player2.CharacterName) {
                case "Serpent":
                    CircleOfTheLand(player2);
                    break;
                case "Madness":
                    PathOfTheBerserker(player2);
                    break;
                case "Righteous":
                    break;
                case "Tinkerer":
                    break;
                case "Trickster":
                    break;
                case "Sorcererer":
                    if(!AbiiliyToggleP2) {
                        AbiiliyToggleP2=true;
                        UpdateActionDisplay(`${player2.PlayerName} does stuff`);
                    } else {
                        AbiiliyToggleP2=false;
                    }
                    break;
                case "Proficient":
                    if(!AbiiliyToggleP2) {
                        AbiiliyToggleP2=true;
                        UpdateActionDisplay(`${player2.PlayerName} steels themseleves and becomes more combative.\nHits will be stronger, but it comes at a cost`);
                    } else {
                        AbiiliyToggleP2=false;
                    }
                    break;
                case "Darkness":
                    if(!AbiiliyToggleP2) {
                        AbiiliyToggleP2=true;
                        UpdateActionDisplay(`${player2.PlayerName} casts a shadow over the oppoenent.\nRejuvenation will come at a cost`);
                    } else {
                        AbiiliyToggleP2=false;
                        UpdateActionDisplay(`${player2.PlayerName} The shadow is banished. The battlefield is peaceful.`);
                    }
                    break;
            }
        });

        //General Functionallity Methods for buttons

        //Attack buttons
        function smackP1(damage) {
            player1.Health = Math.max(0, player1.Health - damage);
            updateBarP1();
        }

        function smackP2(damage) {
            player2.Health = Math.max(0, player2.Health - damage);
            updateBarP2();
        }

        //Heal Buttons
        function healP1(toHeal) {
            player1.Health = Math.min(100, player1.Health + toHeal);
            updateBarP1();
        }

        function healP2(toHeal) {
            player2.Health = Math.min(100, player2.Health + toHeal);
            updateBarP2();
        }


        //Ability Functionality
        //general application
        function CalculateRecoil(damage,currentplayer) {
            let Recoil = Math.floor((damage*3)/4);
            currentplayer.Health = Math.max(0, currentplayer.Health - Recoil);
            if(currentplayer.id===1) {
                updateBarP1();
            } else {
                updateBarP2();
            }
        }

        //heals the user with a 50% increase in strength
        function CircleOfTheLand(currentplayer) {
            if(currentplayer.id===1) {
                healP1(30);
                P1Turn = false;
            }
            else {
                healP1(30);
                P1Turn = true;
            }
            UpdateActionDisplay(`The Circle of the Land rejuvenates ${currentplayer.PlayerName} for ${30}HP!`);
            updateTurnDisplay(P1Turn);
        }
        //Attacks with bonus damage
        function PathOfTheBerserker(currentplayer) {
            let damage = RollDamage(15);
            UpdateActionDisplay(`Going Berserk, ${currentplayer.PlayerName} attacks for ${damage}HP! \n They take recoil due to the reckless attack`);
            if(currentplayer.id===1) {
                smackP2(damage);
                CalculateRecoil(damage,currentplayer);
                P1Turn = false;
            }
            else {
                smackP1(damage);
                CalculateRecoil(damage,currentplayer);
                P1Turn = true;
            }
            updateTurnDisplay(P1Turn);
        }
        //Blocks the next hit
        function KingsShield(currentplayer) {

        }
        //If Building steam, heal for a bit. Once Steam is built up, do massive damage.
        function SteamEruption(currentplayer) {

        }
        //Damages the Oppenent and heals the user
        function EldritchTrickster(currentplayer) {

        }

        // Ability Toggles

        //
        function Runechild(currentplayer) {

        }
        // Deals increased damage, but takes increased damage until ability is toggled off
        function Combative(currentplayer) {
            
        }
        //If the oppenent heals, heal for half, but damage is reduced
        function NightShade(currentplayer) {

        }

    } catch (error) {
        console.error(error);
    }
};

// Call the main function to start the game logic
main();
