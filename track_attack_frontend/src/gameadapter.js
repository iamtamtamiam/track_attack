class GameAdapter {
  
    getIdForRender(gameOptionId){
        configAdapter.get(`/games/`+ `${gameOptionId}`)
        .then(gameJson => {
            let gameToRender = new Game(gameJson)
            gameToRender.renderGameDisplay()
        })
    }


    postGame(gameNameInput, userId){
        let gameData = {name: gameNameInput, user_id: userId}
    
        configAdapter.post(`/games`, configAdapter.setPostObj(gameData))
        .then(function(json) {
            if (json.status === 401){
                alert(`Cannot create game board. ${Object.values(json.main)}`);
            }
            else {
                let newGame = new Game(json)

                let characterOptions = document.querySelectorAll(`[id*="-option"]`)
                newGame.selectionAdapter.getCheckedCharacters(newGame.id, characterOptions) //nodelist
    
                User.current.games.push(newGame)
                User.current.getUserGames()
            }
        });
    } 


}