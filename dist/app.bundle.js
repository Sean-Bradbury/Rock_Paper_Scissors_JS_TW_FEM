"use strict";

// Data Controller
var DataCtrl = function () {
  var data = {
    score: 0,
    userSelection: '',
    computerSelection: ''
  };

  var _handleData = function handleData(key, value, score) {
    if (score) {
      data.score === score;
    }

    if (key) {
      if (key === 'computerSelection') {
        data.computerSelection = value;
      }

      if (key === 'userSelection') {
        data.userSelection = value;
      }
    }

    console.log(data);
  };

  return {
    getData: function getData() {
      return data;
    },
    handleData: function handleData(key, value, score) {
      _handleData(key, value, score);
    }
  };
}(); // UI Controller


var UICtrl = function () {
  var UISelectors = {
    gameArea: '.game-area',
    choiceContainer: '.choice-container',
    jsRulesModal: '.js-rules-modal',
    jsRulesModalClose: '.js-modal-close'
  };

  var showModal = function showModal() {
    var jsModal = document.querySelector('.js-modal');

    if (jsModal === null) {
      var body = document.querySelector(body); // Create div

      var div = document.createElement('div'); // Add classes

      div.classList.add('js-modal', 'absolute', 'bg-white', 'w-80', 'h-80', 'top-5');
      div.innerHTML = "\n            <div class=\"p-5\">\n                <div class=\"flex justify-between items-center\">\n                    <h3 class=\"text-xl uppercase leading-5\">Rules</h3>\n                    <button class=\"js-modal-close close-modal-btn h-5 w-5 flex justify-center items-center text-black\"></button>\n                </div>           \n            </div>";
      document.body.appendChild(div);
    } else {
      closeModal();
    }

    document.querySelector(UISelectors.jsRulesModalClose).addEventListener('click', closeModal);
  };

  function closeModal() {
    document.querySelector('.js-modal').remove();
  }

  return {
    ShowModal: function ShowModal() {
      showModal();
    },
    CloseModal: function CloseModal() {
      closeModal();
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

  var handleChoiceClick = function handleChoiceClick(e) {
    var target = e.target;
    var realTarget = target.closest('.choice-container');
    DataCtrl.handleData('computerSelection', randomComputerSelection(), null);

    if (realTarget.classList.contains('js-paper')) {
      DataCtrl.handleData('userSelection', 'paper', handleWinner());
    }

    if (realTarget.classList.contains('js-rock')) {
      DataCtrl.handleData('userSelection', 'rock', handleWinner());
    }

    if (realTarget.classList.contains('js-scissors')) {
      DataCtrl.handleData('userSelection', 'scissors', handleWinner());
    }
  };

  var handleWinner = function handleWinner() {
    var data = DataCtrl.getData();

    if (data.userSelection === 'scissors' && data.computerSelection === 'rock') {
      var newScore = data.score--;
      return newScore;
    }

    if (data.userSelection === 'rock' && data.computerSelection === 'scissors') {
      var _newScore = data.score++;

      return _newScore;
    }

    if (data.userSelection === 'rock' && data.computerSelection === 'paper') {
      var _newScore2 = data.score--;

      return _newScore2;
    }

    if (data.userSelection === 'paper' && data.computerSelection === 'rock') {
      var _newScore3 = data.score++;

      return _newScore3;
    }

    if (data.userSelection === 'paper' && data.computerSelection === 'scissors') {
      var _newScore4 = data.score--;

      return _newScore4;
    }

    if (data.userSelection === 'scissors' && data.computerSelection === 'paper') {
      var _newScore5 = data.score++;

      return _newScore5;
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
    }
  };
}(UICtrl, DataCtrl);

App.init();
