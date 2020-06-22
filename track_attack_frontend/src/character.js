class Character {

    constructor(characterJson){
        this.id = characterJson["id"]
        this.description = characterJson["attributes"]["description"]
        this.image = characterJson["attributes"]["image"]


    }

    renderCharacterCheckbox(){
        const characterOption = `
                <label>
                    <input type="checkbox" id="${this.id}-option" name="${this.id}">
                    ${this.description}
                </label>
            `
        document.getElementById("create-game-characters").innerHTML += characterOption


    }


}