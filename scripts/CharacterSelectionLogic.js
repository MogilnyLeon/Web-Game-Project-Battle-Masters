// import { Player } from "./../classes/player"; 
// import { Character } from "./../classes/character";


/*
 * List of charcater sprites IDs
 *
 * The Serpent
 *  1-  374.335                     Fuzzy!          0
 *  2-  342.24                      Rayquaza Snek   1
 *  3-  148.335                     Caduceus        2
 * The Madness
 *  1-  20.68                       Muscle Rat      0
 *  2-  268.68 -> 268.68a           Fiery Rage      1
 *  3-  212.68                      Scissor Barb    2
 * The Righteous
 *  1-  329.59                      Sword Doggo     0
 *  2-  329.369                     Fallen Knight   1
 *  3-  329.212 -> 329.212c         Chosen One      2
 * The Tinkerer
 *  1-  9.6                         Steam Power!    0
 *  2-  337.293                     Cog Handler     1
 *  3-  337.439                     The Clockwork   2
 * The Trickster
 *  1-  421.94 -> 421.94c.png       Gold Gremlin    0
 *  2-  275.295 -> 275.295a         Dubious Disk    1
 *  3-  202.93 -> 202.93c           Eyes            2
 * The Sorcerer
 *  1-  38.287 -> 38.287c.png       Fire Alchemist  0
 *  2-  255.287 -> 255.287i.png     Witch           1
 *  3-  35.287                      Moon Wizard     2
 * The Proficient
 *  1-  331.212 -> 331.212c.png     Steel Man       0
 *  2-  200.348                     Hunter          1
 *  3-  212.354 -> 212.354a         Punch Out       2
 * The Darkness
 *  1-  227.287 -> 227.287a.png     Dark Lord       0
 *  2-  357.289                     Anomaly         1
 *  3-  130.295                     Ragnarok        2
 */

class ClassSprites {
    constructor(name,ids) {
      this.ClassName = name;
      this.Ids = ids  
    };
};

const listOfCharacters =  [
    new ClassSprites("Serpent",["374.335","342.24","148.335"]),
    new ClassSprites("Madness",["20.68","268.68,1","212.68"]),
    new ClassSprites("Righteous",["329.59,1","329.369","329.212,3"]),
    new ClassSprites("Tinkerer",["9.6","337.293","337.439"]),
    new ClassSprites("Trickster",["421.94,3","275.295,1","202.93,3"]),
    new ClassSprites("Sorcerer",["38.287,3","255.287,9","35.287"]),
    new ClassSprites("Proficient",["331.212,3","200.348","212.354,1"]),
    new ClassSprites("Darkness",["227.287,1","357.289","130.295"])
];

//Parse information received from index.html
let Player1Info = sessionStorage.getItem("player1Info");
let Player2Info = sessionStorage.getItem("player2Info");

Player1Info = Player1Info.split(",");
Player2Info = Player2Info.split(",");



const Player1Name = document.getElementById("Name1");
Player1Name.innerText = Player1Info[0];
const Player2Name = document.getElementById("Name2");
Player2Name.innerText = Player2Info[0];

let images = document.getElementsByClassName("image");
const body = document.getElementsByTagName("body");
images= Array.from(images);
let previousIndex = null; 
let player1skin = document.querySelector(".slctChar1");
images.forEach((image,index) => {
    image.addEventListener("click", () => {
        if (previousIndex !== null && previousIndex !== index) {
            images[previousIndex].style.backgroundColor = "#F1F1F1";
        }
        image.style.backgroundColor = "#ddd";

        previousIndex = index;
        
        //this causes a bug where if a character is selected, but a a skin isn't cycled. The base image won't load
        //might be almost impossible to implement without overbloating the code
        player1skin.src = image.src;
        player1skin.id = `player1_${image.id}`;
    });
});

//Welcome to "Readability Hell part 1", but the logic works :)
let p1iterator = 0;
const numSkins = 3;
let P1imgURL = null;
player1skin.addEventListener("click",() => {
    let p1info = null;
    switch(player1skin.id) {
        case "player1_Serpent":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[0].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Madness":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[1].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Righteous":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[2].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Tinkerer":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[3].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Trickster":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[4].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Sorcerer":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[5].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[[p1info[1]]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Proficient":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[6].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player1_Darkness":
            p1iterator = p1iterator + 1;
            p1info = listOfCharacters[7].Ids[p1iterator%numSkins].split(',');
            fetchCharSprites(p1info[0])
            .then( data => {
                if(p1info.length === 2){
                    P1imgURL = data.variants[p1info[1]].image_url;
                }
                else {
                    P1imgURL = data.variants[0].image_url;
                }
                player1skin.src = P1imgURL;
            })
            .catch(error => console.error(error));
            break;
        default:
            console.error("wut");
      }
});

let player2skin = document.querySelector(".slctChar2");

let images1 = document.getElementsByClassName("image1");
images1= Array.from(images1);
let previousIndexAlt = null; 
images1.forEach((image1,index) => {
    image1.addEventListener("click", () => {
        if (previousIndexAlt !== null && previousIndexAlt !== index) {
            images1[previousIndexAlt].style.backgroundColor = "#F1F1F1";
        }
        image1.style.backgroundColor = "#ddd";

        previousIndexAlt = index;
        
        //this causes a bug where if a character is selected, but a a skin isn't cycled. The base image won't load
        //might be almost impossible to implement without overbloating the code
        player2skin.src = image1.src;
        player2skin.id = `player2_${image1.id}`;
    });
});

//Welcome to "Readability Hell part 2", but the logic works :)

let p2iterator = 0;
let P2imgURL = null;
player2skin.addEventListener("click",() => {
    let p2info = null;
    switch(player2skin.id) {
        case "player2_Serpent":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[0].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Madness":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[1].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Righteous":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[2].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Tinkerer":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[3].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Trickster":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[4].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Sorcerer":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[5].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Proficient":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[6].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        case "player2_Darkness":
            p2iterator = p2iterator + 1;
            p2info = listOfCharacters[7].Ids[p2iterator%numSkins].split(',');
            fetchCharSprites(p2info[0])
            .then( data => {
                if(p2info.length === 2){
                    P2imgURL = data.variants[p2info[1]].image_url;
                }
                else {
                    P2imgURL = data.variants[0].image_url;
                }
                player2skin.src = P2imgURL;
            })
            .catch(error => console.error(error));
            break;
        default:
            console.error("wut");
      }
});



async function fetchCharSprites(id) {
    const response = await fetch(`https://api.infinitefusion.org/custom-sprites/${id}`);
    if (!response.ok) {
        return new Error("Uh oh! something's wrong, I can feel it");
    }
    const data = await response.json();
    return data;
}


//Handling Game Start section

const range = document.getElementById("slider");
const output = document.getElementById("numOfTurns");
output.innerText = range.value;
let numOfTurn = range.value;

range.oninput = () => {
    output.innerText = range.value;
    numOfTurn = range.value;
};

const StartGame = document.getElementById("startGame");

StartGame.addEventListener("click", () => {
    sessionStorage.setItem("Name1",Player1Info[0]);
    sessionStorage.setItem("Age1",Player1Info[1]);
    sessionStorage.setItem("SelectedChar1",player1skin.id);
    sessionStorage.setItem("SkinURL1",P1imgURL);

    sessionStorage.setItem("Name2",Player2Info[0]);
    sessionStorage.setItem("Age2",Player2Info[1]);
    sessionStorage.setItem("SelectedChar2",player2skin.id);
    sessionStorage.setItem("SkinURL2",P2imgURL);

    sessionStorage.setItem("GameLength", numOfTurn);

    window.location.href = "./../pages/gameplay.html";
});


