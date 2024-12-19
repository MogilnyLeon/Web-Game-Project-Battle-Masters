import { Player } from "./player";

export class Character extends Player{
    constructor(Name,Age,CharacterName,Skin,Abilities,Speed) {
        super(Name,Age);
        this.CharacterName = CharacterName;
        this.SkinURL = Skin;
        this.Abilities = Abilities;
        this.Speed = Speed;
    };
    //Generate Character Class in Gameplay?
};