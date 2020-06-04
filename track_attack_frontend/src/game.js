class Game {
    constructor(gameJson){
        this.id = gameJson["data"]["id"]
        this.user_id = gameJson["data"]["attributes"]["user"]["id"]
        //this.user = gameJson["game"]["user"]
        this.name = gameJson["data"]["attributes"]["name"]
        this.selections = gameJson["data"]["attributes"]["selections"]
        this.charaters = gameJson["data"]["attributes"]["characters"]
        this.selectionAdapter = new SelectionAdapter
    }

    
    renderGameDisplay(){
        //need hide/reset the create new game
        let gameTitle = document.getElementById("game-title")
        gameTitle.innerText = `Game: ${this.name}`
        //* this.gameCharacterOptions()
        document.getElementById("found-character-images").innerHTML = ""
        this.charaters.forEach(character => {
            let characterHtml = `
                <div class="found-character">
                <input type="text" id="game-name" name="game_name" placeholder="Enter Player Name.">
                <div id="counter-${character.id}">0</div>
                <input class="counter-btn" id="heal-btn-${character.id}" type="button" value="Heal(+1)">
                <input class="counter-btn" id="attack-btn" type="button" value="Attacked(-1)">
                <img id="${character.id}" name="${character.description}" src="${character.image}" height="500" width="250"></img>
                </div>
                `
            document.getElementById("found-character-images").innerHTML += characterHtml

            let CreateGameForm = document.getElementById("create-game-form")
            CreateGameForm.reset()

            //this.getUserGames()
            

            

        })


        // let returnedCharacters = this.gameCharacterOptions()
        // this.charaters.push(returnedCharacters)
        // console.log(this.charaters)
        
        // this.getSelectedCharacters()

        // let characterHealButton = document.getElementById("heal-btn-" + `${foundCharacter.id}`)
        // characterHealButton.addEventListener('click', (e) =>{
        //     e.preventDefault()
        //     let characterPoints = parseInt(document.getElementById("counter-" + `${foundCharacter.id}`).innerHTML)
        //     let newPoints = characterPoints += 1
        //     document.getElementById("counter-" + `${foundCharacter.id}`).innerHTML = newPoints
        //     
        // })

    } //end of rendergamedisplay


    


    gameCharacterOptions(){
        //options =[]
        //fetch all characters and put it in a select form (checkbox)?
        //render selected options in renderGameDisplay()
        fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(function(json){
            let charactersArray = []
            let selectedCharacters = []
            json.forEach(character => {
                let characterOption = `
                    <label>
                        <input type="checkbox" id="${character.id}-option" name="${character.id}">
                        ${character.description}
                    </label>
                `

                document.getElementById("check-character-options").innerHTML += characterOption
                
                charactersArray.push(character)
                
                //maybe another loop?
                //     let characterCheckbox = document.getElementById(`${character.id}` + "-option")
                //     if (characterCheckbox.checked === true){
                //         console.log(character.description)
                //     }
                
            })
            
            
                const characterSubmitButton = document.getElementById("character-select-btn")
                characterSubmitButton.addEventListener('click', (e) => {
                    e.preventDefault()
                    let grabbedHtml = document.querySelectorAll(`[id*="-option"]`)
                    grabbedHtml.forEach(option => {
                        if (option.checked === true){
                            console.log(option)
                            alert(`"${option.name}"`)
                            console.log(charactersArray)
                             //find c from array by using the option.name
                            let foundCharacter = charactersArray.find(character => character.id === parseInt(option.name))
                            console.log(foundCharacter)
                            selectedCharacters.push(foundCharacter)
                            console.log(selectedCharacters)
                            //then add divs to display character (in rendergame?)
                            let characterHtml = `
                            <div class="found-character">
                            <input type="text" id="game-name" name="game_name" placeholder="Enter Player Name.">
                            <div id="counter-${foundCharacter.id}">0</div>
                            <input class="counter-btn" id="heal-btn-${foundCharacter.id}" type="button" value="Heal(+1)">
                            <input class="counter-btn" id="attack-btn" type="button" value="Attacked(-1)">
                            <img id="${foundCharacter.id}" name="${foundCharacter.description}" src="${foundCharacter.image}" height="500" width="250"></img>
                            </div>
                            `
                            document.getElementById("found-character-images").innerHTML += characterHtml

                            
                            //add points display
                            let characterHealButton = document.getElementById("heal-btn-" + `${foundCharacter.id}`)
                            characterHealButton.addEventListener('click', (e) =>{
                                e.preventDefault()
                                let characterPoints = parseInt(document.getElementById("counter-" + `${foundCharacter.id}`).innerHTML)
                                let newPoints = characterPoints += 1
                                document.getElementById("counter-" + `${foundCharacter.id}`).innerHTML = newPoints
                                
                            })
                            
                            
                            //do i need to set found characters to this.characters?

                        }
                       
           
                    })
                })
           
                return selectedCharacters 
            
        })
        
    } //end of gameCharacterOptions()

 // getSelectedCharacters(){
 //     const characterSubmitButton = document.getElementById("character-select-btn")
 //     characterSubmitButton.addEventListener('click', (e) => {
 //         e.preventDefault()
 //         let grabbedHtml = document.querySelectorAll(`[id*="-option"]`)
 //         grabbedHtml.forEach(option => {
 //             if (option.checked === true){
 //                 console.log(option)
 //             }
 //             else {
 //                 alert("did not check")
 //             }
// 
 //         })
 //     })
// 
 //    }



   //*  createNewGame(userId){
   //*      const gameButton = document.getElementById("game-btn")
//* 
   //*      gameButton.addEventListener('click', (e) => {
   //*          e.preventDefault()
   //*          const gameNameInput = document.getElementById("game-name").value
   //*          
   //*          postGame(gameNameInput, userId)
   //*      })
//* 
   //*      function postGame(gameNameInput, userId){
   //*          console.log(gameNameInput, userId)
   //*          let gameData = {name: gameNameInput, user_id: userId}
   //*          console.log(gameData) //might have to parse int userId
//* 
   //*          let gameAlert = document.getElementById("game-alert-div")
//* 
   //*          let configObj = {
   //*              method: "POST",
   //*              headers: {
   //*                "Content-Type": "application/json",
   //*                "Accept": "application/json"
   //*              },
   //*              body: JSON.stringify(gameData)
   //*          };
   //*          fetch("http://localhost:3000/games", configObj)
   //*          .then(function(response) {
   //*              return response.json();
   //*          })
   //*          .then(function(json) {
   //*              console.log(json);
   //*              if (json.status === 401){
   //*                  gameAlert.setAttribute("class", "alert-wrapper")
   //*                  gameAlert.innerHTML = `Cannot create game. ${json["main"]}`
   //*              }
   //*              else {
   //*                  console.log(json)
   //*              }
//* 
   //*          });
//* 
   //*      } //end of postGame
   
        
  //*   } //end of createGame


    // getUser(){
    // return User.all.find(user => user.id === this.user_id)
    // }



}