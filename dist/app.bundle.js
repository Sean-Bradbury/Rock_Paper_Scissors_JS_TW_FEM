"use strict";

// Data Controller
var DataCtrl = function () {
  var data = {
    score: 0,
    userSelection: '',
    computerSelection: '',
    winner: ''
  };

  var _handleData = function handleData(theComputerSelection, theUserSelection) {
    data.userSelection = theUserSelection;
    data.computerSelection = theComputerSelection;
    var findTheWinner = findWinner();
    data.score = findTheWinner[0];
    var theWinner = findTheWinner[1];
    data.winner = theWinner;
    UICtrl.UpdateStepOne();
    console.log(data);
    console.log(theWinner);
  };

  function findWinner() {
    var user = data.userSelection;
    var computer = data.computerSelection;
    var score = data.score;
    var winner = '';

    if (user === 'scissors') {
      computer === 'rock' ? (score = --score, winner = 'computer') : computer === 'paper' ? (score = ++score, winner = 'user') : (score = score, winner = 'draw');
      return [score, winner];
    }

    if (user === 'rock') {
      computer === 'scissors' ? (score = ++score, winner = 'user') : computer === 'paper' ? (score = --score, winner = 'computer') : (score = score, winner = 'draw');
      return [score, winner];
    }

    if (user === 'paper') {
      computer === 'scissors' ? (score = --score, winner = 'computer') : computer === 'rock' ? (score = ++score, winner = 'user') : (score = score, winner = 'draw');
      return [score, winner];
    }
  }

  return {
    getData: function getData() {
      return data;
    },
    handleData: function handleData(theComputerSelection, theUserSelection) {
      _handleData(theComputerSelection, theUserSelection);
    }
  };
}(); // UI Controller


var UICtrl = function () {
  var UISelectors = {
    gameAreaContainer: '.game-area-container',
    gameArea: '.game-area',
    gameAreaProgressContainer: '.game-area-progress',
    choiceContainer: '.choice-container',
    jsRulesModal: '.js-rules-modal',
    jsRulesModalClose: '.js-modal-close',
    jsModal: '.js-modal',
    jsScore: '.js-score',
    jsPlayAgain: '.js-play-again',
    jsPlayAgainBtn: '.js-play-again-btn'
  };

  var showModal = function showModal() {
    var jsModal = document.querySelector('.js-modal');

    if (jsModal === null) {
      var body = document.querySelector(body); // Create div

      var div = document.createElement('div'); // Add classes

      div.classList.add('js-modal', 'absolute', 'bg-white', 'top-5', 'rounded', 'animate-fadeIn');
      div.innerHTML = "\n            <div class=\"p-5\">\n                <div class=\"flex justify-between items-center\">\n                    <h3 class=\"text-xl uppercase leading-5\">Rules</h3>\n                    <button class=\"js-modal-close close-modal-btn h-5 w-5 flex justify-center items-center text-black\"></button>\n                </div>           \n                <img class=\"mt-10 h-80\" src=\"src/images/image-rules.svg\" />\n            </div>";
      document.body.appendChild(div);
      document.querySelector(UISelectors.jsRulesModalClose).addEventListener('click', closeModal);
      document.addEventListener('click', closeModalOutsideClick);
    } else {
      closeModal();
    }
  };

  function closeModal() {
    var jsModal = document.querySelector('.js-modal');

    if (jsModal) {
      document.querySelector('.js-modal').classList.add('animate-fadeOut');
      setTimeout(function () {
        return document.querySelector('.js-modal').remove();
      }, 300);
    }
  }

  function closeModalOutsideClick() {
    var targetElement = event.target;

    if (UISelectors.jsModal) {
      if (!targetElement.classList.contains('js-rules-modal') && !targetElement.closest('.js-modal')) {
        closeModal();
      }
    }
  }

  function createGameArea() {
    document.querySelector(UISelectors.gameAreaContainer).innerHTML = "\n        <div class=\"game-area animate-fadeIn\">\n            <div class=\"flex flex-col\">\n                <div class=\"game-area-top w-full flex justify-between\">\n                    <div class=\"choice-container-wrap paper mr-5\">\n                    <div class=\"js-paper choice-container\">\n                        <img src=\"src/images/icon-paper.svg\" alt=\"paper\" srcset=\"src/images/icon-paper.svg\">\n                    </div>\n                    </div>\n                    <div class=\"choice-container-wrap scissors ml-5\">\n                    <div class=\"js-scissors choice-container scissors\">\n                        <img src=\"src/images/icon-scissors.svg\" alt=\"scissors\" srcset=\"src/images/icon-scissors.svg\">\n                    </div>\n                    </div>\n                </div>\n                <div class=\"game-area-bottom flex justify-center\">\n                    <div class=\"choice-container-wrap rock\">\n                    <div class=\"js-rock choice-container rock\">\n                        <img src=\"src/images/icon-rock.svg\" alt=\"rock\" srcset=\"src/images/icon-rock.svg\">\n                    </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ";
    App.LoadEventListeners();
  }

  function updateStepOne() {
    var data = DataCtrl.getData();
    var userSelection = data.userSelection,
        computerSelection = data.computerSelection;
    document.querySelector(UISelectors.gameArea).remove();
    document.querySelector(UISelectors.gameAreaContainer).innerHTML = "\n        <div class=\"game-area-progress text-white animate-fadeIn\">\n            <div class=\"flex justify-between items-end md:items-start\">\n                <div class=\"user-pick md:mr-20\">\n                <h2 class=\"text-xl text-center pb-10 uppercase leading-5 hidden md:block\">You picked</h2>\n                <div class=\"choice-container-wrap ".concat(userSelection, "\">\n                    <div class=\"choice-container cursor-none ").concat(userSelection, "\">\n                    <img src=\"src/images/icon-").concat(userSelection, ".svg\" alt=\"").concat(userSelection, "\" srcset=\"src/images/icon-").concat(userSelection, ".svg\">\n                    </div>\n                </div>\n                <h2 class=\"text-2xl text-center pt-10 uppercase leading-5 md:hidden\">You picked</h2>\n                </div>\n                <div class=\"js-play-again opacity-0 hidden text-center md:block md:self-center\">\n                    <div class=\"p-5\">\n                        <div class=\"flex-column items-center\">\n                            <h3 class=\"text-2xl uppercase leading-5\">").concat(data.winner === 'user' ? 'You Won' : data.winner === 'computer' ? 'You lost' : 'Draw', "</h3>\n                            <button class=\"js-play-again-btn mt-2 w-full rounded grid place-content-center py-2 px-4 bg-white text-black text-lg uppercase\">play again</button>\n                        </div>   \n                    </div>\n                </div>\n                <div class=\"computer-pick ml-20 flex-column justify-content-end\">\n                <h2 class=\"text-xl text-center pb-10 uppercase leading-5 hidden md:block\">The house picked</h2>\n                <div class=\"choice-container-wrap cursor-none\">\n                    <div class=\"choice-container none\">\n                    </div>\n                </div>\n                <h2 class=\"text-2xl text-center pt-10 uppercase leading-5 md:hidden\">The house picked</h2>\n                </div>\n            </div>\n            <div class=\"js-play-again mt-10 opacity-0 md:hidden\">\n            <div class=\"p-5\">\n                <div class=\"flex-column items-center text-center\">\n                    <h3 class=\"text-5xl uppercase leading-10 mb-3\">").concat(data.winner === 'user' ? 'You Won' : data.winner === 'computer' ? 'You lost' : 'Draw', "</h3>\n                    <button class=\"js-play-again-btn text-3xl inline-flex mt-2 rounded justify-center items-center py-3 px-4 bg-white text-black uppercase\">play again</button>\n                </div>   \n            </div>\n            </div>\n        </div>\n        ");

    (function () {
      setTimeout(function () {
        document.querySelectorAll('.computer-pick .choice-container').forEach(function (item) {
          item.classList.remove('none');
        });
        document.querySelectorAll('.computer-pick .choice-container').forEach(function (item) {
          item.classList.add("".concat(computerSelection));
        });
        document.querySelectorAll('.computer-pick .choice-container-wrap').forEach(function (item) {
          item.classList.add("".concat(computerSelection), 'animate-fadeIn');
        });
        document.querySelectorAll('.computer-pick .choice-container').forEach(function (item) {
          item.innerHTML = "\n                    <img src=\"src/images/icon-".concat(computerSelection, ".svg\" alt=\"").concat(computerSelection, "\" srcset=\"src/images/icon-").concat(computerSelection, ".svg\">\n                    ");
        });
      }, 1000);
      setTimeout(function () {
        // Show js play again
        var jsPlayAgainBtns = document.querySelectorAll(UISelectors.jsPlayAgain);
        jsPlayAgainBtns.forEach(function (btn) {
          btn.classList.remove('opacity-0');
          btn.classList.add('opacity-100', 'animate-fadeIn');
        }); //Update score

        addFadeInAnimation(UISelectors.jsScore);
        document.querySelector(UISelectors.jsScore).textContent = data.score;
        jsPlayAgainBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var gameArea = document.querySelector(UISelectors.gameArea);
            var gameAreaProgress = document.querySelector(UISelectors.gameAreaProgressContainer);
            gameAreaProgress.remove();
            createGameArea();
          });
        });
      }, 2000);
    })();
  }

  function updateScore() {
    var data = DataCtrl.getData();
    document.querySelector(UISelectors.jsScore).textContent = data.score;
  }

  function addFadeInAnimation(selector) {
    document.querySelector(selector).classList.add('animate-fadeIn');
    setTimeout(function () {
      return document.querySelector(selector).classList.remove('animate-fadeIn');
    }, 300);
  }

  return {
    CreateGameArea: function CreateGameArea() {
      createGameArea();
    },
    ShowModal: function ShowModal() {
      showModal();
    },
    CloseModal: function CloseModal() {
      closeModal();
    },
    CloseModalOutsideClick: function CloseModalOutsideClick() {
      closeModalOutsideClick();
    },
    GetSelectors: function GetSelectors() {
      return UISelectors;
    },
    UpdateStepOne: function UpdateStepOne() {
      updateStepOne();
    },
    UpdateScore: function UpdateScore() {
      updateScore();
    }
  };
}(); // App Controller


var App = function (UICtrl, DataCtrl) {
  var loadEventListeners = function loadEventListeners() {
    var UISelectors = UICtrl.GetSelectors();
    document.querySelector(UISelectors.jsRulesModal).addEventListener('click', UICtrl.ShowModal);
    document.querySelectorAll(UISelectors.choiceContainer).forEach(function (item) {
      return item.addEventListener('click', handleChoiceClick);
    });
  };

  var handleChoiceClick = function handleChoiceClick() {
    var target = event.target;
    var realTarget = target.closest('.choice-container');

    if (realTarget.classList.contains('js-paper')) {
      DataCtrl.handleData(randomComputerSelection(), 'paper');
    }

    if (realTarget.classList.contains('js-rock')) {
      DataCtrl.handleData(randomComputerSelection(), 'rock');
    }

    if (realTarget.classList.contains('js-scissors')) {
      DataCtrl.handleData(randomComputerSelection(), 'scissors');
    }
  };

  var randomComputerSelection = function randomComputerSelection() {
    var choices = ['rock', 'paper', 'scissors'];
    var chosen = choices[Math.floor(Math.random() * 3)];
    return chosen;
  };

  return {
    init: function init() {
      UICtrl.CreateGameArea();
      loadEventListeners();
    },
    HandleWinner: function HandleWinner(theComputerSelection, theUserSelection, score) {
      handleWinner(theComputerSelection, theUserSelection, score);
    },
    LoadEventListeners: function LoadEventListeners() {
      loadEventListeners();
    }
  };
}(UICtrl, DataCtrl);

App.init();
