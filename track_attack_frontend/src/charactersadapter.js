class CharactersAdapter {

    constructor(){
        this.allCharactersArray = []
    }

    getAllCharacters(){
        configAdapter.get(`/characters`)
        .then(function(json){
            json.data.forEach(character => {
                let newCharacter = new Character(character)
                newCharacter.renderCharacterCheckbox()
            })
        })
    }


}