class User {

    constructor(userJson){
        this.id = userJson.data.id
        this.username = userJson.data.attributes.username
        this.games = userJson.data.attributes.games 
        this.gameAdapter = new GameAdapter
        this.charactersAdapter = new CharactersAdapter
    } 


    renderUserWelcomeMessage(){
        console.log(this)
        const alertButton = document.getElementById("alert-div");
            alertButton.setAttribute("class", "hidden")
            alertButton.innerText = "" 

        document.getElementById("login-form").style.display="none"

        document.getElementById("logged-in-display").style.display = "block"
        let weclcomeMessage = document.getElementById("welcome-user")
            weclcomeMessage.innerHTML = `Welcome ${this.username}!    `

        let logoutButton = document.createElement("button")
            logoutButton.setAttribute("id", "logout-btn")
            logoutButton.setAttribute("type", "button")
            logoutButton.innerText = `Logout!`
            weclcomeMessage.appendChild(logoutButton)
        
            logoutButton.addEventListener('click', (e) => {    
                e.preventDefault()
                this.logoutUser()
            })

        let gameTitle = document.getElementById("game-title")
        gameTitle.innerText = `Select a game from the select bar, then click show game to display game below.`
        
        document.getElementById("seeded-images").style.display="none"

        this.getUserGames()
        this.renderCreateGameForm()

        
        
    } // end of renderWelcome 


   logoutUser(){
            console.log("logging out....did it work?") 
            let weclcomeMessage = document.getElementById("welcome-user")
            let logoutButton = document.getElementById("logout-btn")
            let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify()
            };
            fetch("http://localhost:3000/logout", configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                weclcomeMessage.innerText = `You have been logged out.`
                logoutButton.remove()
                document.getElementById("login-form").reset()
                document.getElementById("login-form").style.display="block"
                document.getElementById("seeded-images").style.display="block"
               
                console.log(User.current) // do i need to clear?
                document.getElementById("list-user-games").innerHTML = ""
                document.getElementById("logged-in-display").style.display="none"
                document.getElementById("create-game-characters").innerHTML = ""
                document.getElementById("container-games").innerHTML = ""

               

    
                

            });
            User.current =""
            console.log(this)
            console.log(User.current)
            location.reload()
        } //end of logout



    getUserGames(){
        document.getElementById("list-user-games").innerHTML = ""

        this.games.forEach(game =>{
                let userGamesSelect = document.getElementById("list-user-games")
                userGamesSelect.innerHTML += `
                    <option value="${game.id}">${game.name}</option>
                `
        })
        console.log(this) //user
        

        const showGameButton = document.getElementById("game-select-btn")
         showGameButton.addEventListener('click', (e) =>{
             e.preventDefault()
             const selectionValues = document.querySelectorAll("#list-user-games > option")
             selectionValues.forEach(option => {
                 if (option.selected === true){
                     console.log(option)
                     this.gameAdapter.getIdForRender(option.value)
                 }
             })
         })
    } // end of get user games


    renderCreateGameForm(){
        this.charactersAdapter.getAllCharacters()
        let createGameButton = document.getElementById("create-game-form")
            createGameButton.addEventListener('submit', function(e) {
                e.preventDefault()
                User.current.createUserGame()})
    }
    

    createUserGame(){
        let newGameName = document.getElementById("create-game-name").value
        this.gameAdapter.postGame(newGameName, this.id)
    
    }

}
