//const endPoint = "http://localhost:3000/users/characters";

const authenticate = new Authenticate;
const configAdapter = new ConfigAdapter;

document.addEventListener('DOMContentLoaded', () => {
    //alert('LOADED');
    //getUsers()
    getAllCharacterImages()
    authenticate.login()
    authenticate.signup()
    
    //authenticate.logout() no button yet so null

    
  });








//testing rendering on html
// function getUsers(){
//     fetch("http://localhost:3000/users")
//     .then(res => res.json())
//     //.then(json =>console.log(json))
//     .then(function(json){
//         console.log(json)
//         json.data.forEach(user => {
//             let experimentingUsers = `
//                 <p>${user.id}</p>
//                 <p>${user["attributes"]["username"]}</p>
//             `
//         
//         document.querySelector(".experimenting").append(experimentingUsers)
//             
// 
//         })
// 
// 
// 
//     })
//     // .then(users => {
//     //     users.data.forEach(user => {
//     //         let experimentingUsers = `
//     //             <p>${user.id}</p>
//     //             <p>${user.username}</p>
//     //         `
//     //     //document.querySelector(".experimenting").innerHTML += experimentingUsers
//     //     document.querySelector(".experimenting").append(experimentingUsers)
//     //         
//     //     });
//     // })
// }



//testing  

//testing rails and js connection with fetch ; added http://
//* const BACKEND_URL = 'http://localhost:3000';
//* fetch(`${BACKEND_URL}/users/1`)
//*   .then(response => response.json())
//*   .then(parsedResponse => console.log(parsedResponse));

function getAllCharacterImages(){
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    //.then(json =>console.log(json))
    .then(function(json){
         json.data.forEach(character => {
             let characterImages = 
                 `<img id="${character.id}" name="${character["attributes"]["description"]}" src="${character["attributes"]["image"]}" height="500" width="250"></img>`
             
         
        document.querySelector(".all-images").innerHTML += characterImages
    })
            

    })

}