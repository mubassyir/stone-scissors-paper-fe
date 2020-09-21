const request = new XMLHttpRequest(); 
/*
DOM IMG URL PLAYER
*/
let stone = document.querySelectorAll('.stone-img-src');
let scissors = document.querySelectorAll('.scissors-img-src')
let paper = document.querySelectorAll('.paper-img-src')
        
try{
    request.open('GET','http://127.0.0.1:3000/api', true);
    request.onload = function(){
        let arrayImageUrl = [];
        let data = JSON.parse(this.response)
        data.play_game.forEach((image)=> arrayImageUrl.push(image.url));
        console.log(arrayImageUrl); // => checking url query from end point
        stone.forEach(i => i.setAttribute('src',arrayImageUrl[0]));
        scissors.forEach(j => j.setAttribute('src',arrayImageUrl[1]));
        paper.forEach(k => k.setAttribute('src',arrayImageUrl[2]));
        }
    request.send();
} catch(err) {
    console.log(err.message);
}
    
document.getElementById('refresh').style.display = 'none';
/*
function for player click
*/
let playerClick=(idClick)=>{
    loggingData(`Player Choosing ${idClick}`);
    document.getElementById(idClick).classList.add('chosen');
    disableClick();
    comRandom(idClick);
}

//disable player click
let disableClick = () => {
    document.querySelectorAll('.player').forEach(j=>{
        j.classList.remove('img-hover');
        j.setAttribute('disabled','disabled')
    })
}
let comRandom = (idClick) =>{
    let arrComputerChoice = ["com-stone","com-scissors","com-paper"];
    let computerChoice = arrComputerChoice[Math.floor(Math.random() *3)]
    document.getElementById(computerChoice).classList.add('chosen');
    loggingData(`Computer Choosing ${computerChoice}`);
    matchResult(idClick,computerChoice)
}

let matchResult=(idClick,computerChoice)=>{
    document.getElementById('vs').style.display = 'none';
    let classId;
    if(idClick==="stone"){
        switch(computerChoice){
            case "com-stone" : classId = "draw";
            break;

            case "com-scissors" : classId = "player-win"
            break;

            case "com-paper" : classId = "com-win"
            break;
                }
    } else if(idClick === "scissors"){
        switch(computerChoice){
            case "com-stone": classId = "com-win"
            break;

            case "com-scissors": classId = "draw"
            break;

            case "com-paper" : classId = "player-win"
            break;
            }
    } else{
        switch(computerChoice){
            case "com-stone": classId = "player-win"
            break;

            case "com-scissors": classId = "com-win"
            break;

            case "com-paper" : classId = "draw"
            break;
            }
    }
  document.getElementById(classId).style.display = "block";
  document.getElementById('refresh').style.display = "block";

  loggingData(`match result ${classId}`);
}
         //Reset Game
let reset=()=>{
    document.querySelectorAll(".player").forEach(k=>{
        k.removeAttribute('disabled')
        k.classList.add("img-hover")
    })
    document.getElementById('vs').style.display = 'block';
    document.querySelectorAll("figure").forEach(l => {
        l.classList.remove('chosen');
    })
  document.getElementById('com-win').style.display = 'none';
  document.getElementById('player-win').style.display = 'none';
  document.getElementById('draw').style.display = 'none';
  document.getElementById('refresh').style.display = 'none';
  loggingData('refreshing game . . . ')
}

loggingData=(data)=>{
    console.log(data);
}