import { Player } from "./player.js";

export class Character extends Player{
    constructor(Name,Age,CharacterName,Skin,Abilities,Speed,Health,id) {
        super(Name,Age);
        this.id=id;
        this.CharacterName = CharacterName;
        this.SkinURL = Skin;
        this.Abilities = Abilities;
        this.AbilityCounter = 0;
        this.Speed = Speed;
        this.Health = Health;
    };
    //Generate Character Class in Gameplay?
};