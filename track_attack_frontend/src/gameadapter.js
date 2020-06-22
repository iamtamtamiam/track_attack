class GameAdapter {
  
    getIdForRender(gameOptionId){
       
        configAdapter.get(`/games/`+ `${gameOptionId}`)
        .then(gameJson => {
            console.log(gameJson)
            let gameToRender = new Game(gameJson)
            gameToRender.renderGameDisplay()
        })
    }



    postGame(gameNameInput, userId){
        let gameData = {name: gameNameInput, user_id: userId}
        console.log(gameData) //might have to parse int userId

    
        configAdapter.post(`/games`, configAdapter.setPostObj(gameData))
        .then(function(json) {
            if (json.status === 401){
                alert(`Cannot create game board. ${Object.values(json.main)}`);
            }
            else {
                console.log(json)
                let newGame = new Game(json)
                console.log(newGame)
                
                let grabbedHtml = document.querySelectorAll(`[id*="-option"]`)
                newGame.selectionAdapter.getCheckedCharacters(newGame.id, grabbedHtml) //nodelist
                
                console.log(User.current)
                
               

                User.current.games.push(newGame)
                
                console.log(User.current.games)
                User.current.getUserGames()
                
                
        
                
            }

        });
        
    } 


   

}