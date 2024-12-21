import { Player } from "./player.js"; 

export class Character extends Player{
    constructor(Name,Age,CharacterName,Skin,Abilities,Speed,Health) {
        super(Name,Age);
        this.CharacterName = CharacterName;
        this.SkinURL = Skin;
        this.Abilities = Abilities;
        this.Speed = Speed;
        this.Health = Health;
    };
    //Generate Character Class in Gameplay?
};