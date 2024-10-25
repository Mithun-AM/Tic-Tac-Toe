let boxes=document.querySelectorAll(".box ");
let boxX=document.querySelectorAll(".boxX");
let boxO=document.querySelectorAll(".boxO");
let reset=document.querySelector("#reset");
let newGameButton= document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let TrunO=true;
let count = 0;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame=()=>{
    TrunO=true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(TrunO){
            box.innerText="O";
            TrunO=false;
            box.classList.remove("boxX");
            box.classList.add("boxO");
        }
        else{
            box.innerText="X";
            TrunO=true;
            box.classList.add("boxX");
            box.classList.remove("boxO");
        }
        box.disabled=true; 
        count++;

        let isWinner= checkWinner();

        if(!isWinner && count===9 ){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner =(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner =() =>{
    for(let pattern of winPatterns){
        let post1Val=boxes[pattern[0]].innerText;
        let post2Val=boxes[pattern[1]].innerText;
        let post3Val=boxes[pattern[2]].innerText;

        if(post1Val != "" && post2Val != "" && post3Val != "" ){
            if(post1Val==post2Val && post2Val==post3Val){
                showWinner(post1Val);
                return true;
            }
        }
    }
}

newGameButton.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);