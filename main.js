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


function randomTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
   const idx = Math.floor(Math.random() * holes.length);
   const hole = holes[idx];
   if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
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
   setTimeout(() => timeUp = true, 10000)
   setTimeout("location.href = 'best-score.html'", 11000);
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