

class Authenticate {
   

    login(){
        const loginButton = document.getElementById("login-btn")
        
        loginButton.addEventListener('click', (e) => {
            e.preventDefault()
            const usernameInput = document.querySelector("#login-name").value
            const passwordInput = document.querySelector("#login-password").value
            postUser(usernameInput, passwordInput)
        })
    


        function postUser(inputUsername, inputPassword){
            console.log(inputUsername, inputPassword)
            let loginData = {username: inputUsername, password: inputPassword}
            console.log(loginData)
        
            
            configAdapter.post(`/login`, configAdapter.setPostObj(loginData))
            .then(function(json) {
                console.log(json);

                var alertButton = document.getElementById("alert-div");
                if (json.status === 401) {
                  alertButton.setAttribute("class", "alert-wrapper")
                  alertButton.innerText = `Login Failed. Please try again.`
                }
                else {
        
                    let loggedInUser = new User(json)
                    console.log(loggedInUser)
                    User.current = loggedInUser
                    console.log(User.current)
                    loggedInUser.renderUserWelcomeMessage()
                }
            
            });
        
        }
    }


    signup(){

        const signupButton = document.getElementById("signup-btn")
        
        signupButton.addEventListener('click', (e) => {    
            e.preventDefault()
            const usernameInput = document.querySelector("#login-name").value
            const passwordInput = document.querySelector("#login-password").value
            signupUser(usernameInput, passwordInput)
        })

        function signupUser(inputUsername, inputPassword){
            console.log(inputUsername, inputPassword) //testing input
            let signupData = {username: inputUsername, password: inputPassword}
            console.log(signupData)
        
            // let configObj = {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //       "Accept": "application/json"
            //     },
            //     body: JSON.stringify(signupData)
            // };
            //configAdapter.setPostObj(signupData)
            configAdapter.post(`/users`, configAdapter.setPostObj(signupData) )

            // fetch("http://localhost:3000/users", configObj)
            // .then(function(response) {
            //     return response.json();
            // })
            .then(function(json) {
                console.log(json);
                var alertButton = document.getElementById("alert-div");
                if (json.status === 401) {
                  alertButton.setAttribute("class", "alert-wrapper")
                  alertButton.innerText = `Please try again. ${Object.values(json.main)}`
                }
                else {
                    const signedUpUser = new User(json)
                    User.current = signedUpUser
                    signedUpUser.renderUserWelcomeMessage()
            
                }
            
            });
        
        }
    } //end of signup


    






} //end of class
