

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
            let loginData = {username: inputUsername, password: inputPassword}
           
            configAdapter.post(`/login`, configAdapter.setPostObj(loginData))
            .then(function(json) {

                const alertButton = document.getElementById("alert-div");
                if (json.status === 401) {
                  alertButton.setAttribute("class", "alert-wrapper")
                  alertButton.innerText = `Login Failed. Please try again.`
                }
                else {
        
                    let loggedInUser = new User(json)
                    User.current = loggedInUser
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
            let signupData = {username: inputUsername, password: inputPassword}
    
            configAdapter.post(`/users`, configAdapter.setPostObj(signupData))
            .then(function(json) {
                const alertButton = document.getElementById("alert-div");
                if (json.status === 401) {
                  alertButton.setAttribute("class", "alert-wrapper")
                  alertButton.innerText = `Sign Up Failed. ${Object.values(json.main)}`
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
