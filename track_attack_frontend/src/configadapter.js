class ConfigAdapter {

    constructor(){
        this.baseUrl = "http://localhost:3000"
    }

    get(restOfURL){
        return fetch(this.baseUrl + restOfURL)
        .then(resp => resp.json())
        
    }

    post(restOfURL, configObj){
        return fetch(this.baseUrl + restOfURL, configObj)
        .then(resp => resp.json())
    }

  setPostObj(data){
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };

        return configObj
    }

}