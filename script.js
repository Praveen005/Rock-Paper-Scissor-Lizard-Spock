// variables
//Options to select
const rock= document.querySelector(".rock");
const paper= document.querySelector(".paper");
const scissor= document.querySelector(".scissor");
const lizard= document.querySelector(".lizard");
const spock= document.querySelector(".spock");
const options= document.querySelectorAll(".options, .rock, .paper, .scissor, .lizard, .spock");

//result area
const playerScore= document.getElementById("playerScore");
const botScore= document.getElementById("botScore");
const gameResult= document.getElementById("gameResult");

//Display area, box in which icon will show up, upon selected/clicked from 5 options below by user/player
const display1 = document.querySelector(".player1");
const display2 = document.querySelector(".player2");

//reset button
const reset= document.getElementById("resetBtn");

const optionsAvailable= [
    '<i class="fa-solid fa-hand-back-fist"></i>',
    '<i class="fa-solid fa-file"></i>',
    '<i class="fa-solid fa-scissors"></i>',
    '<i class="fa-solid fa-hand-lizard"></i>',
    '<i class="fa-solid fa-hand-spock"></i>'
]

let classList1= '';
let classList2= '';


//Player 1 having its pick.


function optionsClicked(event){
    const pickedOption = event.target.outerHTML;
    display1.innerHTML = pickedOption;
    classList1= Array.from(event.target.classList);
}

options.forEach(option =>{
    option.addEventListener('click', optionsClicked);
})


// function optionsClicked2(event, selector){
//     let currentElement= event.target;
//     while(currentElement !== document.documentElement){
//         if(currentElement.matches(selector)){
//             classList1 = Array.from(currentElement.classList);
            
//             display1.innerHTML= currentElement.innerHTML;
//         }
//         currentElement= currentElement.parentElement;
//     }

// }

// options.forEach(option =>{
//     option.addEventListener('click', (event)=> {
//         optionsClicked2(event, ".options");
//     })
// })


//Bot getting its pick

function botPick(event){
    const index= Math.floor(Math.random()*5);
    display2.innerHTML= optionsAvailable[index];
    classList2 = Array.from(options[index].classList);
}

options.forEach(option =>{
    option.addEventListener('click', botPick);    
})



//Rule for who has win over whom
const rule = {
    lizard: ["spock", "paper", "fa-hand-spock", "fa-file"],
  
    paper: ["rock", "spock", "fa-hand-spock", "fa-hand-back-fist"],
  
    rock: ["lizard", "scissor", "fa-hand-lizard", "fa-scissors"],
  
    scissor: ["paper", "lizard", "fa-hand-lizard", "fa-file"],
  
    spock: ["scissor", "rock", "fa-scissors", "fa-hand-back-fist"],
};


//calculate score
let score1= 0;
let score2= 0;


function calculateScore(){

    const selectedElement1= classList1[1];
    const selectedElement2= classList2[1];

    if(selectedElement1 === selectedElement2){
        gameResult.innerText= "It's a Draw!"
    }
    else if(rule[selectedElement2].includes(selectedElement1)){
        score2++;
        botScore.innerText= score2;
        gameResult.innerText= "Bot Won!"

    }
    else{
        score1++;
        playerScore.innerText= score1;
        gameResult.innerText= "Player-1 Won!"
    }
}

options.forEach((option)=>{
    option.addEventListener('click', calculateScore);
})

//reset
function resetSelection(){
    display1.innerHTML ="";
    display2.innerHTML="";
    playerScore.innerHTML= "0";
    botScore.innerHTML= "0";
    gameResult.innerHTML="----";
    score1= 0;
    score2= 0;
}

reset.addEventListener('click', resetSelection);

