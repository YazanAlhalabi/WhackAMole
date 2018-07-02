const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const itemsList = document.querySelector('.plates');
let lastHole;
let timeUp = false;
let score = 0;
let currentScore;
let leaderBoard = localStorage.getItem('items') || 0;

document.getElementById("best-score").innerHTML = leaderBoard;

//for Timer 
let countdown;
const timerDisplay = document.querySelector('.time-left');


// The Timer
function timer(seconds) {
   const now = Date.now();
   const then = now + seconds * 1000;
   displayTimeLeft(seconds); // to start the count right away

   countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      // check if we should stop it
      if (secondsLeft < 0) {
         clearInterval(countdown);
         return;
      }
      //display it
      displayTimeLeft(secondsLeft);

   }, 1000);
}

function displayTimeLeft(seconds) {
   const display = `${seconds < 10 ? '0' : ''}${seconds}`
   document.title = display;
   timerDisplay.textContent = display;
   timerDisplay.classList.add('circle');
}


//The Game
function randomTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
   const idx = Math.floor(Math.random() * holes.length);
   const hole = holes[idx];
   if (hole === lastHole) {
      //console.log('Ah nah thats the same one bud');
      return randomHole(holes);
   }
   lastHole = hole;
   return hole;
}


function peep() {
   const time = randomTime(200, 1000);
   const hole = randomHole(holes);
   hole.classList.add('up');
   setTimeout(() => {
      hole.classList.remove('up');
      if (!timeUp) peep();
   }, time);
}

function startGame() {
   scoreBoard.textContent = 0;
   timeUp = false;
   score = 0;
   peep();
   endGame();
}

function endGame() {
   setTimeout(() => timeUp = true, 15000)
   setTimeout("location.href = 'best-score.html'", 17000);
}

function bonk(e) {
   if (!e.isTrusted) return; // cheater!
   score++;
   console.log(score)
   this.parentNode.classList.remove('up');
   scoreBoard.textContent = score;
   if (leaderBoard < score) {
      localStorage.setItem('items', JSON.stringify(score));
   }
}

moles.forEach(mole => mole.addEventListener('click', bonk));