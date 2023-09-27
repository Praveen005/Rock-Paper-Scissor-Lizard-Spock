// variables
//Options to select
const rock= document.querySelector(".rock");
const paper= document.querySelector(".paper");
const scissor= document.querySelector(".scissor");
const lizard= document.querySelector(".lizard");
const spock= document.querySelector(".spock");
const options= document.querySelectorAll(".options")

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

/*
function optionsClicked(event){
    const pickedOption = event.target.innerHTML;
    display1.innerHTML = pickedOption;
}

options.forEach(option =>{
    option.addEventListener('click', optionsClicked);
})
*/

//event: click event
//.matches() matches, if the selected element contains that particular selector. :https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
/*
why below function was needed, if above was working? 
: There was an issue with the above code, when clicked on icon inside, the click event was not getting triggered, only the area arounf the icon inside the div upon being clicked was triggering the click event.

what are we doing in the function below?
: we have passed selector argument as well, it is actually the selector of the outermost parent i.e `.options` here.

`document.documentElement` is the root element of any parent element, say, suppose there is a div tree, 'documentElement' points to the leaf div.

so we started matching from there, then moved up to its parent and so on..
so, we are checking if the element on which click event happened is present inside the outermost parent or not.

*/
//This is an overKill though, coud have done the following instead:
// const options= document.querySelectorAll(".options .fa-solid")

function optionsClicked2(event, selector){
    let currentElement= event.target;
    while(currentElement !== document.documentElement){
        if(currentElement.matches(selector)){
            classList1 = Array.from(currentElement.classList);
            // console.log(currentElement.outerHTML);
            // console.log(classList1);
            display1.innerHTML= currentElement.innerHTML;
        }
        currentElement= currentElement.parentElement;
    }

}

options.forEach(option =>{
    option.addEventListener('click', (event)=> {
        optionsClicked2(event, ".options");
    })
})


//Bot getting its pick

function botPick(event){
    
    // console.log(classList2);
    const index= Math.floor(Math.random()*5);
    display2.innerHTML= optionsAvailable[index];
    classList2 = Array.from(options[index].classList);
    // console.log(classList2);
    // console.log(options[4]);

}

options.forEach(option =>{
    // option.addEventListener('click', (event)=>{
    //     setTimeout(botPick, 100, event);
    // });

    option.addEventListener('click', botPick);
    // calculateScore();
    
})


//Rule for who has win over whom
const rule = {
    lizard: ["spock", "Paper", "fa-hand-spock", "fa-file"],
  
    Paper: ["rock", "spock", "fa-hand-spock", "fa-hand-back-fist"],
  
    rock: ["lizard", "scissor", "fa-hand-lizard", "fa-scissors"],
  
    scissor: ["Paper", "lizard", "fa-hand-lizard", "fa-file"],
  
    spock: ["scissor", "rock", "fa-scissors", "fa-hand-back-fist"],
};

let score1= 0;
let score2= 0;


function calculateScore(){
    // console.log(classList1);
    // console.log(classList2);
    const selectedElement1= classList1[1];
    const selectedElement2= classList2[1];
    console.log("--> ", selectedElement1, typeof selectedElement1);
    console.log("--> ", selectedElement2, typeof selectedElement2);
    if(selectedElement1 === selectedElement2){
        // console.log(`${selectedElement1} + ${selectedElement2}`);
        console.log("Draw!");
    }
    else if(rule[selectedElement1] && rule[selectedElement1].includes(selectedElement2)){
        score1++;
        console.log("Player 1 won: ", score1);
    }
    else{
        score2++;
        console.log("Player 2 won: ", score2);
    }
}

// calculateScore();
// setTimeout(calculateScore)

options.forEach((option)=>{
    option.addEventListener('click', ()=>{
        setTimeout(calculateScore, 100);
    });
})




// console.log(options);










//Reset

function resetSelection(){
    display1.innerHTML ="";
    display2.innerHTML="";
}

reset.addEventListener('click', resetSelection);


//winning and loosing logic
