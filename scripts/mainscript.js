import { Player } from "./../classes/player.js";

document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("MainLogin");

    login.addEventListener("submit",HandleLogin);
})


function HandleLogin(event) {

    event.preventDefault();

    //Input field values
    let player1Name = document.getElementById("Name1").value;
    let player2Name = document.getElementById("Name2").value;
    let player1Age = document.getElementById("UserAge1").value;
    let player2Age = document.getElementById("UserAge2").value;

    if(player1Name === "" || player2Name === "" || player1Age === "" || player2Age === "") {
        alert("Please fill out all the fields");
        event.preventDefault();
        return;
    }
    //Create objects
    const player1 = new Player(player1Name,player1Age);
    const player2 = new Player(player2Name,player2Age);
    //Because session storage can only handle string values, if an object is passed, it will only return [object]
    sessionStorage.setItem("player1Info",player1.ToString()); //ToString() = [Name],[Age]
    sessionStorage.setItem("player2Info",player2.ToString());

    window.location.href = "./pages/character-selection.html";
}