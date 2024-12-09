import { Player } from "../classes/player"; 
import { Character } from "../classes/character";
const login = document.getElementById("MainLogin");

login.addEventListener("submit",HandleLogin);

function HandleLogin(event) {

    //Input field values
    let player1Name = document.getElementById("Name1").value;
    let player2Name = document.getElementById("Name2").value;
    let player1Age = document.getElementById("UserAge1").value;
    let player2Age = document.getElementById("UserAge2").value;
    //Age doesn't need to be verified because it can be done through HTML
    if(player1Name === "" || player2Name === "") {
        alert();
        event.preventDefault();
    }
    else {
        //Create objects
        const player1 = new Player(player1Name,player1Age);
        const player2 = new Player(player2Name,player2Age);
        //Because session storage can only handle string values, if an object os passed, it will only return [object]
        sessionStorage.setItem("player1Info",player1.ToString);
        sessionStorage.setItem("player2Info",player2.ToString);
    }
}