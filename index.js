let cards = document.querySelectorAll(".card");
let flipedCard = false;
let firstCard, secondCard;
let boardlock = false;
let move = document.getElementById("moves");
//set minutes 
var mins = 1; 
  
//calculate the seconds 
var secs = mins * 60;

const shuffle=()=>{
    Array.from(cards).forEach(function(box) {
        box.style.order=Math.floor(Math.random()*16);
    })
}

// document.body.onload = shuffle();


function flipcard(){
    
    if (boardlock) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!flipedCard){
        //click1
        flipedCard=true;
        firstCard=this;
    } else {
        //click2
        flipedCard=false;
        secondCard=this;     
        
        checkIfMatch();
    }

    if(checkwin() === true){
      const isPlay =  confirm(`Congratulations. You won! \n You made ${move.textContent} moves \n Do yoou want to play again?`)
     if(isPlay){
         location.reload()
     }else{
         window.close()
     }
    }
}

function checkIfMatch(){
     //cardMatch
     if (firstCard.dataset.name === secondCard.dataset.name) {
        //then its a match
        move.textContent++;
        disableCards();
        

    } else{
        move.textContent++;
        unflipCard();
        
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
}

function unflipCard(){
    boardlock = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

    // boardlock = false;
    resetBoard();

    }, 1000);
}

cards.forEach(cardd => cardd.addEventListener('click', flipcard ));

const refreshButton = document.querySelector("#refresh");
refreshButton.addEventListener("click",shuffle);

//TIMER

//countdown function is evoked when page is loaded 
function countdown() { 
    setTimeout('Decrement()', 60); 
} 

//Decrement function decrement the value. 
function Decrement() { 
    if (document.getElementById) { 
        minutes = document.getElementById("minutes"); 
        seconds = document.getElementById("seconds"); 

        //if less than a minute remaining 
        //Display only seconds value. 
        if (seconds < 59) { 
            seconds.value = secs; 
        } 

        //Display both minutes and seconds 
        //getminutes and getseconds is used to 
        //get minutes and seconds 
        else { 
            minutes.value = getminutes(); 
            seconds.value = getseconds(); 
        } 
        //when less than a minute remaining 
        //colour of the minutes and seconds 
        //changes to red 
        if (mins < 1) { 
            minutes.style.color = "red"; 
            seconds.style.color = "red"; 
        } 
        //if seconds becomes zero, 
        //then page alert time up 
        if (mins < 0) { 
            
            if(checkwin() === true){
                alert('win')
            }else{
                alert('lost')
            };
            unflipAll();
            boardlock = true;
            minutes.value = 0; 
            seconds.value = 0;
            location.reload(); 
        } 
        //if seconds > 0 then seconds is decremented 
        else { 
            secs--; 
            setTimeout('Decrement()', 1000); 
        } 
    } 
} 

function getminutes() { 
    //minutes is seconds divided by 60, rounded down 
    mins = Math.floor(secs / 60); 
    return mins; 
} 

function getseconds() { 
    //take minutes remaining (as seconds) away  
    //from total seconds remaining 
    return secs - Math.round(mins * 60); 
} 

function unflipAll(){
    Array.from(cards).forEach(function(box) {
        box.classList.remove('flip')
    })
}

function resetBoard(){
    [flipedCard, boardlock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkwin(){
    const winArray =  Array.from(cards).filter(function(box) {
      return box.classList[1] == 'flip'
  })
  if(winArray.length === 16){
      
      return true;
  }else{
      return false;
  }
  }

countdown();
shuffle();