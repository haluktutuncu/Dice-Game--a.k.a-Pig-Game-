'use strict';

//Selecting active scores
const bigscore1 = document.querySelector('#score0');
const bigscore2 = document.querySelector('#score1');
const rollBtn = document.querySelector('.dice');
const newGBtn = document.querySelector('.Ngame');
const holdBtn = document.querySelector('.hold');
const diceImg = document.querySelector('img');
const current1 = document.querySelector('#current0');
const current2 = document.querySelector('#current1');

diceImg.classList.add('hiddenimg');

const Scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.querySelector('.right').classList.toggle('bckturn1');
  document.querySelector('.left').classList.toggle('bckturn2');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    //1-Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2-Display Dice
    diceImg.classList.remove('hiddenimg');
    diceImg.src = `/dice-${dice}.png`;
    //3-Check for rolled 1 if true switch to next player
    if (dice !== 1) {
      document.querySelector(`#current${activePlayer}`).textContent = 0;
      currentScore += dice;
      document.querySelector(`#current${activePlayer}`).textContent =
        currentScore; //CHANGE LATER FOW SWITCH
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    Scores[activePlayer] += currentScore;

    document.querySelector(`#score${activePlayer}`).textContent =
      Scores[activePlayer];

    if (Scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-winner');

      diceImg.classList.add('hiddenimg');
    } else {
      switchPlayer();
    }
  }
});

newGBtn.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceImg.classList.remove('hiddenimg');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player-winner');

  current1.textContent = 0;
  current2.textContent = 0;

  diceImg.classList.add('hiddenimg');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle(`.bckturn${activePlayer}`);

  bigscore1.textContent = 0;
  bigscore2.textContent = 0;

  Scores[0] = currentScore;
  Scores[1] = currentScore;
});
