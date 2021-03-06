class SelectionAdapter {

    getCheckedCharacters(gameId, optionsNodeList){
        optionsNodeList.forEach(option => {
            if (option.checked === true){
                this.postSelection(gameId, option)
            }
        })
    } 


    postSelection(gameId, option){
        const selectionData = {game_id: gameId, character_id: option.name}
        
        configAdapter.post(`/selections`, configAdapter.setPostObj(selectionData))
        .then(function(json) {
            let newGameAdapter = new GameAdapter
            newGameAdapter.getIdForRender(json.game_id)
        })
    }


}