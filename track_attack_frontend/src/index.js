

const authenticate = new Authenticate;
const configAdapter = new ConfigAdapter;

document.addEventListener('DOMContentLoaded', () => {
  
    getAllCharacterImages()
    authenticate.login()
    authenticate.signup()
    

    
  });


  //images for mainscreen display

function getAllCharacterImages(){
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(function(json){
         json.data.forEach(character => {
             let characterImages = 
                 `<img id="${character.id}" name="${character["attributes"]["description"]}" src="${character["attributes"]["image"]}" height="500" width="250"></img>`
             
        document.querySelector(".all-images").innerHTML += characterImages
    })
            
    })

}