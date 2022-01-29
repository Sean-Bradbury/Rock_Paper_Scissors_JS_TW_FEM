"use strict";

// Data Controller
var DataCtrl = function () {
  var data = {
    score: 0,
    userSelection: '',
    computerSelection: ''
  };

  var _handleData = function handleData(theComputerSelection, theUserSelection) {
    data.userSelection = theUserSelection;
    data.computerSelection = theComputerSelection;
    var findTheWinner = findWinner();
    data.score = findTheWinner[0];
    var theWinner = findTheWinner[1];
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
    gameArea: '.game-area',
    choiceContainer: '.choice-container',
    jsRulesModal: '.js-rules-modal',
    jsRulesModalClose: '.js-modal-close',
    jsModal: '.js-modal'
  };

  var showModal = function showModal() {
    var jsModal = document.querySelector('.js-modal');

    if (jsModal === null) {
      var body = document.querySelector(body); // Create div

      var div = document.createElement('div'); // Add classes

      div.classList.add('js-modal', 'absolute', 'bg-white', 'top-5', 'rounded');
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
      document.querySelector('.js-modal').remove();
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

  return {
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
      loadEventListeners();
      console.log('app initialized');
    },
    HandleWinner: function HandleWinner(theComputerSelection, theUserSelection, score) {
      handleWinner(theComputerSelection, theUserSelection, score);
    }
  };
}(UICtrl, DataCtrl);

App.init();
