// import { Player } from "./../classes/player"; 
// import { Character } from "./../classes/character";

//import { Player } from "../classes/player";

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
 *  1-  38.287 -> 38.287d.png       Fire Alchemist  0
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
images.forEach((image,index) => {
    image.addEventListener("click", () => {
        if (previousIndex !== null && previousIndex !== index) {
            images[previousIndex].style.backgroundColor = "#F1F1F1";
        }
        image.style.backgroundColor = "#ddd";

        previousIndex = index;
        
        let player1skin = document.querySelector(".slctChar1");
        player1skin.src = image.src;
        player1skin.id = `player1_${image.id}`;
        console.log(player1skin.id);
    });
});

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
        
        let player2skin = document.querySelector(".slctChar2");
        player2skin.src = image1.src;
        player2skin.id = `player2_${image1.id}`;
        console.log(player2skin.id);
    });
});
function populateCharcters(images) {
    
}

//Change of plans Image fetching will be done in gameplay
function fetchImage() {
    
}