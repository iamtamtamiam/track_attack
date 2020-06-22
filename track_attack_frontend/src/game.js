class Game {
    constructor(gameJson){
        this.id = gameJson["data"]["id"]
        this.user_id = gameJson["data"]["attributes"]["user"]["id"]
        this.name = gameJson["data"]["attributes"]["name"]
        this.selections = gameJson["data"]["attributes"]["selections"]
        this.charaters = gameJson["data"]["attributes"]["characters"]
        this.selectionAdapter = new SelectionAdapter
    }

    renderGameDisplay(){
    
        document.getElementById("shown-game").innerHTML = ""
        document.getElementById("container-games").innerHTML = ""

        const gameTitle = document.getElementById("game-title")
            gameTitle.innerText = `Showing Game: ${this.name}`
        
        
        this.charaters.forEach(character => {
            const characterHtml = `
                <div class="grid-item-game">
                
                <input type="text" id="game-name" name="game_name" placeholder="Enter Player Name.">
                <div id="counter-${character.id}">0</div>
                <input class="counter-btn-heal" id="heal-btn-${character.id}" type="button" value="Heal(+1)">
                <input class="counter-btn-attack" id="attack-btn-${character.id}" type="button" value="Attacked(-1)">
                <img id="${character.id}" name="${character.description}" src="${character.image}" height="500" width="250"></img>
                
                </div>
                `
            document.getElementById("container-games").innerHTML += characterHtml

            const CreateGameForm = document.getElementById("create-game-form")
            CreateGameForm.reset()
                
        })

        this.renderGameBoardSounds()
    
        const deleteGameButton = document.createElement("input")
        deleteGameButton.setAttribute("class","submit-btn")
        deleteGameButton.setAttribute("id", "game-delete-btn")
        deleteGameButton.setAttribute("type", "submit")
        deleteGameButton.setAttribute("value", "Delete This Game")
        document.getElementById("shown-game").appendChild(deleteGameButton)
        deleteGameButton.addEventListener('click', (e)=>{
            this.deleteGame(e)
        })

    } //end of rendergamedisplay


    renderGameBoardSounds(){
        const characterHealButtons = document.querySelectorAll(".counter-btn-heal")
        characterHealButtons.forEach(button => {
            let buttonId = button.id.slice(-1) //string id number
            button.addEventListener('click', (e) => {
                e.preventDefault()
                this.playHealSound()
                let characterPoints = parseInt(document.getElementById("counter-" + `${buttonId}`).innerHTML)
                let newPoints = characterPoints += 1
                document.getElementById("counter-" + `${buttonId}`).innerHTML = newPoints
            })
        })

        const characterAttackButtons = document.querySelectorAll(".counter-btn-attack")
        characterAttackButtons.forEach(button => {
            let buttonIdA = button.id.slice(-1) //string id number
            button.addEventListener('click', (e) => {
                e.preventDefault()
                this.playAttackSound()
                let characterPointsA = parseInt(document.getElementById("counter-" + `${buttonIdA}`).innerHTML)
                let newPointsA = characterPointsA -= 1
                document.getElementById("counter-" + `${buttonIdA}`).innerHTML = newPointsA
            })
        })

        const characterImages = document.querySelectorAll(".grid-container-games .grid-item-game img")
        characterImages.forEach(character => {
            character.addEventListener("dblclick", (e) =>{
                e.preventDefault()
                this.playWinnerSound()
                character.parentElement.innerHTML += `
                <img id="trophy" name="trophy" src="https://publicdomainvectors.org/photos/trophy.png">
                `
            })
        })

    }


    deleteGame(e){
        e.preventDefault
        let gameDataForDelete = {game_id: this.id}
        let configObj = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(gameDataForDelete)
        }; 
        fetch("http://localhost:3000/games/" + `${this.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            alert('Gameboard has been deleted.')})

        document.getElementById("container-games").innerHTML = ""
        
        let gameToDelete = User.current.games.find(element => element.id == this.id)
        let indexOfGameToDelete = User.current.games.indexOf(gameToDelete)
        User.current.games.splice(indexOfGameToDelete, 1)

        const gameTitle = document.getElementById("game-title")
        gameTitle.innerText = ""

        const buttonToRemove = document.getElementById("shown-game")
        buttonToRemove.innerHTML = ""

        User.current.getUserGames()

    }

   playAttackSound(){
       const attackSound = new Audio("../track_attack_frontend/css/sounds/zapsplat_laser.mp3")
       attackSound.play()
   }

   playHealSound(){
    const healSound = new Audio("../track_attack_frontend/css/sounds/zapsplat_ascend.mp3")
    healSound.play()
   }

   playWinnerSound(){
    const winnerSound = new Audio("../track_attack_frontend/css/sounds/zapslpat_arcade.mp3")
    winnerSound.play()
   }
    
    
}