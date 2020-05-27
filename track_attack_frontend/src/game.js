class Game {


    createNewGame(userId){
        const gameButton = document.getElementById("game-btn")

        gameButton.addEventListener('click', (e) => {
            e.preventDefault()
            const gameNameInput = document.getElementById("game-name").value
            
            postGame(gameNameInput, userId)
        })

        function postGame(gameNameInput, userId){
            console.log(gameNameInput, userId)
            let gameData = {name: gameNameInput, user_id: userId}
            console.log(gameData) //might have to parse int userId

            let gameAlert = document.getElementById("game-alert-div")

            let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify(gameData)
            };
            fetch("http://localhost:3000/games", configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                if (json.status === 401){
                    gameAlert.setAttribute("class", "alert-wrapper")
                    gameAlert.innerHTML = `Cannot create game. ${json["main"]}`
                }
                else {
                    console.log(json)
                }

            });

        } //end of postGame
   
        
    } //end of createGame






}