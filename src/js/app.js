// Data Controller
const DataCtrl = (function(){
    let data = {
        score: 0,
        userSelection: '',
        computerSelection: '',
    }

    const handleData = function(theComputerSelection, theUserSelection){  
        data.userSelection = theUserSelection;
        data.computerSelection = theComputerSelection;
        const findTheWinner = findWinner();
        data.score = findTheWinner[0];

        const theWinner = findTheWinner[1];
        
        
        console.log(data);
        console.log(theWinner);
    }

    function findWinner(){
        const user = data.userSelection;
        const computer = data.computerSelection;
        let score = data.score;
        let winner = '';

        if(user === 'scissors'){
            computer === 'rock' ? (score = --score, winner = 'computer') : computer === 'paper' ? (score = ++score, winner = 'user') : (score = score, winner = 'draw') ;
            return ([score, winner]);
        }

        if(user === 'rock'){
            computer === 'scissors' ? (score = ++score, winner = 'user') : computer === 'paper' ? (score = --score, winner = 'computer') : (score = score, winner = 'draw') ;
            return ([score, winner]);
        }

        if(user === 'paper'){
            computer === 'scissors' ? (score = --score, winner = 'computer') : computer === 'rock' ? (score = ++score, winner = 'user') : (score = score, winner = 'draw') ;
            return ([score, winner]);
        }
    }

    return {
        getData: function(){
            return data;
        },
        handleData: function(theComputerSelection, theUserSelection){
            handleData(theComputerSelection, theUserSelection);
        }
    }
})();

// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        gameArea: '.game-area',
        choiceContainer: '.choice-container',
        jsRulesModal: '.js-rules-modal',
        jsRulesModalClose: '.js-modal-close',
        jsModal: '.js-modal'
    }

    const showModal = function(){
        const jsModal = document.querySelector('.js-modal');

        if(jsModal === null){
            const body = document.querySelector(body);
            // Create div
            const div = document.createElement('div');
            // Add classes
            div.classList.add('js-modal', 'absolute', 'bg-white', 'top-5', 'rounded');
            
            div.innerHTML = `
            <div class="p-5">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl uppercase leading-5">Rules</h3>
                    <button class="js-modal-close close-modal-btn h-5 w-5 flex justify-center items-center text-black"></button>
                </div>           
                <img class="mt-10 h-80" src="src/images/image-rules.svg" />
            </div>`;
            
            document.body.appendChild(div);
            document.querySelector(UISelectors.jsRulesModalClose).addEventListener('click', closeModal); 
            document.addEventListener('click', closeModalOutsideClick);
        } else {
            closeModal();
        }
        
    }

    function closeModal(){
        const jsModal = document.querySelector('.js-modal');

        if(jsModal){
            document.querySelector('.js-modal').remove(); 
        } 
    }

    function closeModalOutsideClick(){
        const targetElement = event.target;

        if(UISelectors.jsModal){
            if(!targetElement.classList.contains('js-rules-modal') && !targetElement.closest('.js-modal')){
                closeModal();
            }
        }
    }

      return {
          ShowModal: function(){
            showModal();
          },
          CloseModal: function(){
            closeModal();
          },
          CloseModalOutsideClick: function(){
            closeModalOutsideClick();
          },
          GetSelectors: function(){
              return UISelectors;
          }
      }
})();


// App Controller
const App = (function(UICtrl, DataCtrl){
    const loadEventListeners = function(){
        const UISelectors = UICtrl.GetSelectors();
        document.querySelector(UISelectors.jsRulesModal).addEventListener('click', UICtrl.ShowModal);
        document.querySelectorAll(UISelectors.choiceContainer).forEach(item => item.addEventListener('click', handleChoiceClick));

    }

    const handleChoiceClick = function(){
        const target = event.target;
        const realTarget = target.closest('.choice-container');

        
        if(realTarget.classList.contains('js-paper')){
            DataCtrl.handleData(randomComputerSelection(), 'paper')}
        
        if(realTarget.classList.contains('js-rock')){
            DataCtrl.handleData(randomComputerSelection(), 'rock');
        }

        if(realTarget.classList.contains('js-scissors')){
            DataCtrl.handleData(randomComputerSelection(), 'scissors');
        }   
    }

    const randomComputerSelection = function() {
        const choices = ['rock', 'paper', 'scissors'];
        let chosen = choices[Math.floor(Math.random() * 3)]

        return chosen;
    }

    return {
        init: function(){
            loadEventListeners();
            console.log('app initialized');
        },
        HandleWinner: function(theComputerSelection, theUserSelection, score){
            handleWinner(theComputerSelection, theUserSelection, score);
        }
    }
})(UICtrl, DataCtrl);


App.init();