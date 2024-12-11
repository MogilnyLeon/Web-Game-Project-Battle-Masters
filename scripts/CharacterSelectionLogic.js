//import { Player } from "../classes/player"; 
//import { Character } from "../classes/character";

//import { Player } from "../classes/player";

/*
 * List of charcater sprites IDs
 *
 * The Serpent
 *  1-  374.335                     Fuzzy!
 *  2-  342.24                      Rayquaza Snek
 *  3-  148.335                     Caduceus
 * The Madness
 *  1-  20.68                       Muscle Rat
 *  2-  268.68 -> 268.68a           Fiery Rage
 *  3-  212.68                      Scissor Barb
 * The Righteous
 *  1-  329.59                      Sword Doggo
 *  2-  329.369                     Fallen Knight
 *  3-  329.212 -> 329.212c         Chosen One
 * The Tinkerer
 *  1-  9.6                         Steam Power!
 *  2-  337.293                     Cog Handler
 *  3-  337.439                     The Clockwork
 * The Trickster
 *  1-  421.94 -> 421.94c.png       Gold Gremlin   
 *  2-  275.295 -> 275.295a         Dubious Disk
 *  3-  202.93 -> 202.93c           Eyes        
 * The Sorcerer
 *  1-  38.287 -> 38.287d.png       Fire Alchemist
 *  2-  255.287 -> 255.287i.png     Witch
 *  3-  35.287                      Moon Wizard
 * The Proficient
 *  1-  331.212 -> 331.212c.png     Steel Man
 *  2-  200.348                     Hunter
 *  3-  212.354 -> 212.354a         Punch Out
 * The Darkness
 *  1-  227.287 -> 227.287a.png     Dark Lord
 *  2-  357.289                     Anomaly
 *  3-  130.295                     Ragnarok
 */
 




let images = document.getElementsByClassName("image");
const body = document.getElementsByTagName("body");
images= Array.from(images);
console.log(images);
populateCharcters(images)
let previousIndex = null; 
images.forEach((image,index) => {
    image.addEventListener("click", () => {
        if (previousIndex !== null && previousIndex !== index) {
            images[previousIndex].style.backgroundColor = "#F1F1F1";
        }
        image.style.backgroundColor = "#ddd";

        previousIndex = index;

    });
});
function populateCharcters(images) {
    
}

//Change of plans Image fetching will be done in gameplay
function fetchImage() {
    
}