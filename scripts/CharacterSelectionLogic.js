//import { Player } from "../classes/player"; 
//import { Character } from "../classes/character";

//import { Player } from "../classes/player";

/*
 * List of charcater sprites IDs
 *
 * The Serpent
 *  1-  374.335     Fuzzy!
 *  2-  342.24      Rayquaza Snek
 *  3-  28.148      Sand 'n' air?
 * The Madness
 *  1-  20.68
 *  2-
 *  3-
 * The Righteous
 *  1-  329.59
 *  2-
 *  3-
 * The Tinkerer
 *  1-  9.6
 *  2-
 *  3-
 * The Trickster
 *  1-  421.94 -> 421.94c.png   
 *  2-
 *  3-
 * The Sorcerer
 *  1-  38.287 -> 38.287b.png       Fire Alchemist
 *  2-  255.287 -> 255.287i.png     Witch
 *  3-  35.287                      Moon Wizard
 * The Proficient
 *  1-  331.212 -> 331.212c.png
 *  2-  
 *  3-  
 * The Darkness
 *  1-  227.287 -> 227.287a.png
 *  2-  
 *  3-  
 */
 




let images = document.getElementsByClassName("image");
const body = document.getElementsByTagName("body");
images= Array.from(images);
console.log(images);
populateCharcters(images)
let previousIndex = null; 
images.forEach((image,index) => {
    image.addEventListener("click", () => {
        console.log(image);
        //fix dynamic selection for 1 player
        if (previousIndex === null) {
            previousIndex = index;
        }
        if (index != previousIndex){
            images[previousIndex].style.backgroundColor = "F1F1F1";
        }
        image.style.backgroundColor = "#ddd";
        previousIndex = index;

    });
});

// images.forEach(image => {
//     image.addEventListener("dblclick", () => {
//         console.log(image);
//         image.style.backgroundColor = "#F1F1F1";
//     });
// });
function populateCharcters(images) {
    

}