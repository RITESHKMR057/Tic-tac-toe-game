const boxes = document.querySelectorAll('.box') ;
const resetbtn = document.querySelector('#reset-btn') ;
const newGameBtn = document.querySelector('#new-btn') ;
const msgContainer = document.querySelector('.msg-container') ;
const msg = document.querySelector('#msg') ;

let turn0 = true ;
let count = 0 ;

const winPatterns = [
    [0,1,2] ,
    [0,3,6] ,
    [0,4,8] ,
    [1,4,7] ,
    [2,5,8] ,
    [2,4,6] ,
    [3,4,5] ,
    [6,7,8] ,
] ;

// when you click on reset game button
const resetGame = () => {
    turn0 = true ;
    count = 0 ;
    enableBoxes() ;  // enable all boxes 
    msgContainer.classList.add("hide") ; // hide msgcontainer
}

boxes.forEach( (box) => {
    box.addEventListener('click' , function(){
        if(turn0){
            box.innerText = "0" ;
            turn0 = false ;
        }else{
            box.innerText = "X" ;
            turn0 = true ;
        }
        box.disabled = true ;
        
        count++ ; // after disabled that box then increase count as 1

        let isWinner = checkWinner() ;

// think what if count === 9 and you also satisfy winner condition
        if(count === 9 && !isWinner ){
            msg.innerText = "offo!! Match is Draw" ;
            msgContainer.classList.remove('hide') ;
            disableBoxes() ;
         }
 
    }) ;
}) ;

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true ;
    }
} ;

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false ;
        box.innerText = "" ;
    }
}

const showWinner = (winner) => {
    msg.innerText = `congratulation !!  , winner is ${winner}` ;
    msgContainer.classList.remove("hide") ;
    disableBoxes() ;
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0] , pattern[1] , pattern[2]) ;

        // console.log(boxes[pattern[0]].innerText , boxes[pattern[1]].innerText , boxes[pattern[2]].innerText) ;

        let pos1val = boxes[pattern[0]].innerText ;
        let pos2val = boxes[pattern[1]].innerText ;
        let pos3val = boxes[pattern[2]].innerText ;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                // console.log('winner' , pos1val) ;
                showWinner(pos1val) ;
            }
        }
    

    } ;
} ;

// when click on new Game button we call function resetGame .
newGameBtn.addEventListener('click' , resetGame) ;
resetbtn.addEventListener('click' , resetGame ) ;