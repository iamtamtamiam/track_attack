class User {

    constructor(userJson){
        this.id = userJson.data.id
        this.username = userJson.data.attributes.username
        this.games = userJson.data.attributes.games 
        this.gameAdapter = new GameAdapter
        this.charactersAdapter = new CharactersAdapter
    } 


    renderUserWelcomeMessage(){
        const alertButton = document.getElementById("alert-div");
            alertButton.setAttribute("class", "hidden")
            alertButton.innerText = "" 

        document.getElementById("login-form").style.display="none"

        document.getElementById("logged-in-display").style.display = "block"
        const weclcomeMessage = document.getElementById("welcome-user")
            weclcomeMessage.innerHTML = `Welcome ${this.username}!    `

        const logoutButton = document.createElement("button")
            logoutButton.setAttribute("id", "logout-btn")
            logoutButton.setAttribute("type", "button")
            logoutButton.innerText = `Logout!`
            weclcomeMessage.appendChild(logoutButton)
        
            logoutButton.addEventListener('click', (e) => {    
                e.preventDefault()
                this.logoutUser()
            })

        const gameTitle = document.getElementById("game-title")
        gameTitle.innerText = `Select a game from the select bar, then click show game to display game below.`
        
        document.getElementById("seeded-images").style.display="none"

        this.getUserGames()
        this.renderCreateGameForm()

    } // end of renderWelcome 



    getUserGames(){
        document.getElementById("list-user-games").innerHTML = ""

        this.games.forEach(game =>{
                let userGamesSelect = document.getElementById("list-user-games")
                userGamesSelect.innerHTML += `
                    <option value="${game.id}">${game.name}</option>
                `
        })

        const showGameButton = document.getElementById("game-select-btn")
         showGameButton.addEventListener('click', (e) =>{
             e.preventDefault()
             const selectionValues = document.querySelectorAll("#list-user-games > option")
             selectionValues.forEach(option => {
                 if (option.selected === true){
                     this.gameAdapter.getIdForRender(option.value)
                 }
             })
         })
    } // end of get user games


    renderCreateGameForm(){
        this.charactersAdapter.getAllCharacters()
        const createGameButton = document.getElementById("create-game-form")
            createGameButton.addEventListener('submit', function(e) {
                e.preventDefault()
                User.current.createUserGame()})
    }
    

    createUserGame(){
        const newGameName = document.getElementById("create-game-name").value
        this.gameAdapter.postGame(newGameName, this.id)
    
    }

    logoutUser(){
           
        const weclcomeMessage = document.getElementById("welcome-user")
        const logoutButton = document.getElementById("logout-btn")
      
        configAdapter.post(`/logout`, configAdapter.setPostObj())
        .then(function(json) {
        
            weclcomeMessage.innerText = `You have been logged out.`
            logoutButton.remove()
            document.getElementById("login-form").reset()
            document.getElementById("login-form").style.display="block"
            document.getElementById("seeded-images").style.display="block"

            document.getElementById("list-user-games").innerHTML = ""
            document.getElementById("logged-in-display").style.display="none"
            document.getElementById("create-game-characters").innerHTML = ""
            document.getElementById("container-games").innerHTML = ""
        });
        User.current =""
        location.reload()
    } //end of logout


}
