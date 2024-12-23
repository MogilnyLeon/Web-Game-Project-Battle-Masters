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

const getAbility = (character,List) => 
    character === "Serpent" ? List[0] :
    character === "Madness" ? List[1] :
    character === "Righteous" ? List[2] :
    character === "Tinkerer" ? List[3] :
    character === "Trickster" ? List[4] :
    character === "Sorcerer" ? List[5] :
    character === "Proficient" ? List[6] :
    character === "Darkness" ? List[7] :
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

        const list = ProcessPassiveAbilities(data);

        // Create Player 1

        const player1 = new Character(
            sessionStorage.getItem("Name1"),
            sessionStorage.getItem("Age1"),
            sessionStorage.getItem("SelectedChar1").split("_")[1],
            sessionStorage.getItem("SkinURL1"),
            getAbility(sessionStorage.getItem("SelectedChar1").split("_")[1],list),
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
            getAbility(sessionStorage.getItem("SelectedChar2").split("_")[1],list),
            24,
            100,
            2
        );


        const GameLength = sessionStorage.getItem("GameLength");
        let CurrentTurn = 0;

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

        

        const numOfTurns = document.getElementById("numofTurns");
        numOfTurns.innerText = CurrentTurn;

        const TurnInfo = document.getElementById("TurnInfo");
        updateTurnDisplay(P1Turn);

        // Function to update the turn display and enable/disable buttons
        function updateTurnDisplay(isP1Turn) {
            if (isP1Turn) {
                TurnInfo.innerText = `${player1.PlayerName}'s Turn`;
                toggleMenu("buttonMenu1", false); // Enable Player 1 menu
                toggleMenu("buttonMenu2", true); // Disable Player 2 menu
            } else{
                TurnInfo.innerText = `${player1.PlayerName}'s Turn`;
                toggleMenu("buttonMenu1", true); // Disable Player 1 menu
                toggleMenu("buttonMenu2", false); // Enable Player 2 menu
            }

            if(CurrentTurn >= GameLength) {
                toggleMenu("buttonMenu1", true);
                toggleMenu("buttonMenu2", true);
                let result="";
                if (player1.Health>player2.Health) {
                    result=`${player1.PlayerName} has won the match!`;
                } 
                else if(player2.Health>player1.Heatlth){
                    result=`${player2.PlayerName} has won the match!`;
                } 
                else {
                    result = "It's a Draw!";
                }
                UpdateActionDisplay(result);
                document.getElementById("actionDisplay").addEventListener("click",() => {
                    window.location.href = "./../pages/Character-Selection.html";
                });
            }
            else if (player1.Health === 0) {
                let result="";
                toggleMenu("buttonMenu1", true);
                toggleMenu("buttonMenu2", true);
                result=`${player2.PlayerName} has won the match!`;
                UpdateActionDisplay(result);
                document.getElementById("actionDisplay").addEventListener("click",() => {
                    window.location.href = "./../pages/Character-Selection.html";
                });
            } 
            else if (player2.Health === 0) {
                let result="";
                toggleMenu("buttonMenu1", true);
                toggleMenu("buttonMenu2", true);
                result=`${player1.PlayerName} has won the match!`;
                UpdateActionDisplay(result);
                document.getElementById("actionDisplay").addEventListener("click",() => {
                    window.location.href = "./../pages/Character-Selection.html";
                });
            }

            CurrentTurn++;
            numOfTurns.innerText = CurrentTurn;
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
                let action =`${player1.PlayerName} attacks for ${damage}HP!`;
                //if player1 is Proficient and ability on
                if(player1.CharacterName==="Proficient" && AbilityToggleP1){
                    damage += Combative();
                    action+=`\nTheir combat vigor raises their attack`;
                }
                //if player2 is proficient and ability on
                if(player2.CharacterName==="Proficient" && AbilityToggleP2){
                    damage += Combative();
                    action+=`\nThe Opponent's recklessness lowers their defense`;
                }
                else if(player2.CharacterName==="Righteous" && AbilityToggleP2) {
                    damage -=10;
                    if(damage < 0) {
                        damage=2;
                    }
                    action+= `\nThe oppoenent's shield blocks the attack`;
                    AbilityToggleP2 = false;
                }
                UpdateActionDisplay(action);
                smackP2(damage);
                P1Turn = false;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Attack2").addEventListener("click", () => {
            if (!P1Turn) {
                
                let damage = RollDamage(0);
                let action =`${player2.PlayerName} attacks for ${damage}HP!`;
                //if player1 is Proficient and ability on
                if(player2.CharacterName==="Proficient" && AbilityToggleP2){
                    damage += Combative();
                    action+=`\nTheir combat vigor raises their attack`;
                }
                //if player2 is proficient and ability on
                if(player1.CharacterName==="Proficient" && AbilityToggleP1){
                    damage += Combative();
                    action+=`\nThe Opponent's recklessness lowers their defense`;
                } 
                if(player1.CharacterName==="Righteous" && AbilityToggleP1) {
                    damage -=10;
                    if(damage < 0) {
                        damage=2;
                    }
                    action+= `\nThe oppoenent's shield blocks the attack`;
                    AbilityToggleP1 = false;
                }
                UpdateActionDisplay(action);
                smackP1(damage);
                P1Turn = true;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Heal1").addEventListener("click", () => {
            if (P1Turn) {
                healP1(20);
                if(player2.CharacterName==="Darkness" && AbilityToggleP2) {
                    NightShade(player2);
                }
                P1Turn = false;
                updateTurnDisplay(P1Turn);
            }
        });

        document.getElementById("Heal2").addEventListener("click", () => {
            if (!P1Turn) {
                healP2(20);
                if(player1.CharacterName==="Darkness" && AbilityToggleP1) {
                    NightShade(player1);
                }
                P1Turn = true;
                updateTurnDisplay(P1Turn);
            }
        });

        //Forfeit Events
        document.getElementById("Forfeit1").addEventListener("click", () => {
            toggleMenu("buttonMenu1",true);
            toggleMenu("buttonMenu2",true);

            UpdateActionDisplay(`${player1.PlayerName} has forfeited the match`);
            document.getElementById("actionDisplay").addEventListener("click",() => {
                window.location.href = "./../pages/Character-Selection.html";
            });

        });

        document.getElementById("Forfeit2").addEventListener("click", () => {
            toggleMenu("buttonMenu1",true);
            toggleMenu("buttonMenu2",true);

            UpdateActionDisplay(`${player2.PlayerName} has forfeited the match`);
            document.getElementById("actionDisplay").addEventListener("click",() => {
                window.location.href = "./../pages/Character-Selection.html";
            });
        });

        //AbilityEvents
        let AbilityToggleP1 = false;
        let AbilityCountP1 = 0;

        document.getElementById("Ability1").addEventListener("click", () => {
            
            switch (player1.CharacterName) {
                case "Serpent":
                    CircleOfTheLand(player1);
                    break;
                case "Madness":
                    PathOfTheBerserker(player1);
                    break;
                case "Righteous":
                    KingsShield(player1);
                    break;
                case "Tinkerer":
                    SteamEruption(player1);
                    break;
                case "Trickster":
                    EldritchTrickster(player1);
                    break;
                case "Sorcerer":
                    Runechild(player1);
                    break;
                case "Proficient":
                    if(!AbilityToggleP1) {
                        AbilityToggleP1=true;
                        UpdateActionDisplay(`${player1.PlayerName} steels themseleves and becomes more combative.\nHits will be stronger, but it comes at a cost`);
                    } else {
                        AbilityToggleP1=false;
                        UpdateActionDisplay(`${player1.PlayerName} keeps a level head and finds balance`);
                    }
                    P1Turn=false;
                    updateTurnDisplay(P1Turn);
                    break;
                case "Darkness":
                    if(!AbilityToggleP1) {
                        AbilityToggleP1=true;
                        UpdateActionDisplay(`${player1.PlayerName} casts a shadow over the oppoenent.\nRejuvenation will come at a cost`);
                    } else {
                        AbilityToggleP1=false;
                        UpdateActionDisplay(`${player1.PlayerName} The shadow is banished. The battlefield is peaceful.`);
                    }
                    P1Turn=false;
                    updateTurnDisplay(P1Turn);
                    break;
            }
        });

        let AbilityToggleP2 = false;
        let AbilityCountP2 = 0;

        document.getElementById("Ability2").addEventListener("click", () => {
            switch (player2.CharacterName) {
                case "Serpent":
                    CircleOfTheLand(player2);
                    break;
                case "Madness":
                    PathOfTheBerserker(player2);
                    break;
                case "Righteous":
                    KingsShield(player2);
                    updateTurnDisplay(P1Turn);
                    break;
                case "Tinkerer":
                    SteamEruption(player2);
                    break;
                case "Trickster":
                    EldritchTrickster(player2);
                    break;
                case "Sorcerer":
                    Runechild(player2);
                    break;
                case "Proficient":
                    if(!AbilityToggleP2) {
                        AbilityToggleP2=true;
                        UpdateActionDisplay(`${player2.PlayerName} steels themseleves and becomes more combative.\nHits will be stronger, but it comes at a cost`);
                    } else {
                        AbilityToggleP2=false;
                        UpdateActionDisplay(`${player2.PlayerName} keeps a level head and finds balance`);
                    }
                    P1Turn=true;
                    updateTurnDisplay(P1Turn);
                    break;
                case "Darkness":
                    if(!AbilityToggleP2) {
                        AbilityToggleP2=true;
                        UpdateActionDisplay(`${player2.PlayerName} casts a shadow over the oppoenent.\nRejuvenation will come at a cost`);
                    } else{
                        AbilityToggleP2=false;
                        UpdateActionDisplay(`${player2.PlayerName} banishes the shadow. The battlefield is peaceful.`);
                    }
                    P1Turn=true;
                    updateTurnDisplay(P1Turn);
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
                healP2(30);
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
        //reduces incoming damage and heals
        function KingsShield(currentplayer) {
            if(currentplayer.id===1) {
                if(!AbilityToggleP1) {
                    healP1(20);
                    AbilityToggleP1 = true;
                }
                P1Turn = false;
            }
            else {
                if(!AbilityToggleP2) {
                    healP2(20);
                    AbilityToggleP2 = true;
                }
                P1Turn = true;
            }
            UpdateActionDisplay(`${currentplayer.PlayerName} raises their shield and is ready to take a blow`);
            updateTurnDisplay(P1Turn);
        }
        //do massive damage.
        function SteamEruption(currentplayer) {
            if(currentplayer.id===1) {
                if(AbilityCountP1<2) {
                    smackP2(RollDamage(20));
                    smackP1(RollDamage(0));
                    AbilityCountP1++;
                    P1Turn = false;
                    UpdateActionDisplay(`${currentplayer.PlayerName} engulfs the oppoenent in an eruption of steam!`);
                    updateTurnDisplay(P1Turn);
                }
                else {
                    UpdateActionDisplay("No more steam is left!");
                }
                
            }
            else {
                if(AbilityCountP2<2) {
                    smackP1(RollDamage(20));
                    smackP2(RollDamage(0));
                    AbilityCountP2++;
                    P1Turn = true;
                    UpdateActionDisplay(`${currentplayer.PlayerName} engulfs the oppoenent in an eruption of steam!`);
                    updateTurnDisplay(P1Turn);
                }
                else {
                    UpdateActionDisplay("No more steam is left!");
                }
            }
        }
        //Damages the Oppenent and heals the user
        function EldritchTrickster(currentplayer) {
            if(currentplayer.id===1) {
                smackP2(RollDamage(5));
                healP1(15);
                P1Turn=false;
            }
            else {
                smackP1(RollDamage(5));
                healP2(15);
                P1Turn=true;
            }
            UpdateActionDisplay(`${currentplayer.PlayerName} attacks from the unseen!`);
            updateTurnDisplay(P1Turn);
        }

        // do big damage
        function Runechild(currentplayer) {
            if(currentplayer.id===1) {
                if(AbilityCountP1<1) {
                    smackP2(Math.floor(player2.Health/2));
                    AbilityCountP1++;
                    P1Turn = false;
                    UpdateActionDisplay(`${currentplayer.PlayerName} tears the oppoenent apart with a Runestorm`);
                    updateTurnDisplay(P1Turn);
                }
                else {
                    UpdateActionDisplay("No Runic Power is left!");
                }
            }
            else {
                if(AbilityCountP2<1) {
                    smackP1(Math.floor(player1.Health/2));
                    AbilityCountP2++;
                    P1Turn = true;
                    UpdateActionDisplay(`${currentplayer.PlayerName} tears the oppoenent apart with a Runestorm`);
                    updateTurnDisplay(P1Turn);
                }
                else {
                    UpdateActionDisplay("No Runic Power is left!");
                }
            }
        }
        // Deals increased damage, but takes increased damage until ability is toggled off
        function Combative() {
            //returns bonus damage
            return 5;
        }
        //If the oppenent heals, heal for half, but damage is reduced
        function NightShade(currentplayer) {
            currentplayer.Health = Math.min(100, currentplayer.Health + 10);
            UpdateActionDisplay(`The Shadow syphons energy and rejuvenates ${currentplayer.PlayerName}`);
            if(currentplayer.id===1) {
                updateBarP1();
            }
            else {
                updateBarP2();
            }
        }

    } catch (error) {
        console.error(error);
    }
};

// Call the main function to start the game logic
main();
