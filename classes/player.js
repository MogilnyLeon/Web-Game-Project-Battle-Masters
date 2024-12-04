

 export class Player {
    constructor(name, age) {
        this.PlayerName = name;
        this.PlayerAge = age;
    }

    get getName() {
        return this.PlayerName;
    }

    get getAge() {
        return this.PlayerAge;
    }

    ToString() {
        return `${this.PlayerName},${this.PlayerAge}`
    }
}