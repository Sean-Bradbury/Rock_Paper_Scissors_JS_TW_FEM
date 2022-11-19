// Data Controller
const DataCtrl = (function(){
    let data = {
        score: 0,
        userSelection: '',
        computerSelection: '',
        winner: ''
    }

    const handleData = function(theComputerSelection, theUserSelection){  
        data.userSelection = theUserSelection;
        data.computerSelection = theComputerSelection;
        const findTheWinner = findWinner();
        data.score = findTheWinner[0];

        const theWinner = findTheWinner[1];

        data.winner = theWinner;

        UICtrl.UpdateStepOne();
        
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
    }

    const showModal = function(){
        const jsModal = document.querySelector('.js-modal');

        if(jsModal === null){
            const body = document.querySelector(body);
            // Create div
            const div = document.createElement('div');
            // Add classes
            div.classList.add('js-modal', 'absolute', 'bg-white', 'top-5', 'rounded', 'animate-fadeIn');
            
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
            document.querySelector('.js-modal').classList.add('animate-fadeOut'); 
            setTimeout(() => document.querySelector('.js-modal').remove(), 300);            
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

    function createGameArea(){
        document.querySelector(UISelectors.gameAreaContainer).innerHTML = `
        <div class="game-area animate-fadeIn">
            <div class="flex flex-col">
                <div class="game-area-top w-full flex justify-between">
                    <div class="choice-container-wrap paper mr-5">
                    <div class="js-paper choice-container">
                        <img src="src/images/icon-paper.svg" alt="paper" srcset="src/images/icon-paper.svg">
                    </div>
                    </div>
                    <div class="choice-container-wrap scissors ml-5">
                    <div class="js-scissors choice-container scissors">
                        <img src="src/images/icon-scissors.svg" alt="scissors" srcset="src/images/icon-scissors.svg">
                    </div>
                    </div>
                </div>
                <div class="game-area-bottom flex justify-center">
                    <div class="choice-container-wrap rock">
                    <div class="js-rock choice-container rock">
                        <img src="src/images/icon-rock.svg" alt="rock" srcset="src/images/icon-rock.svg">
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        App.LoadEventListeners();
    }

    function updateStepOne(){
        const data = DataCtrl.getData();
        const { userSelection, computerSelection, winner } = data;

        document.querySelector(UISelectors.gameArea).remove();

        document.querySelector(UISelectors.gameAreaContainer).innerHTML = `
        <div class="game-area-progress text-white animate-fadeIn">
            <div class="flex justify-between items-end md:items-start">
                <div class="user-pick md:mr-20">
                <h2 class="text-xl text-center pb-10 uppercase leading-5 hidden md:block">You picked</h2>
                <div class="choice-container-wrap ${userSelection} ${winner === 'user' ? 'won' : winner === 'computer' ? 'lost' : ''}">
                    <div class="choice-container cursor-none ${userSelection}">
                    <img src="src/images/icon-${userSelection}.svg" alt="${userSelection}" srcset="src/images/icon-${userSelection}.svg">
                    </div>
                </div>
                <h2 class="text-2xl text-center pt-10 uppercase leading-5 md:hidden">You picked</h2>
                </div>
                <div class="js-play-again opacity-0 hidden text-center md:block md:self-center">
                    <div class="p-5">
                        <div class="flex-column items-center">
                            <h3 class="text-2xl uppercase leading-5">${winner === 'user' ? 'You Won' : winner === 'computer' ? 'You lost' : 'Draw'}</h3>
                            <button class="js-play-again-btn mt-2 w-full rounded grid place-content-center py-2 px-4 bg-white text-black hover:text-red-500 text-lg uppercase">play again</button>
                        </div>   
                    </div>
                </div>
                <div class="computer-pick ml-20 flex-column justify-content-end">
                <h2 class="text-xl text-center pb-10 uppercase leading-5 hidden md:block">The house picked</h2>
                <div class="choice-container-wrap cursor-none ${winner === 'user' ? 'lost' : winner === 'computer' ? 'won' : ''}">
                    <div class="choice-container none">
                    </div>
                </div>
                <h2 class="text-2xl text-center pt-10 uppercase leading-5 md:hidden">The house picked</h2>
                </div>
            </div>
            <div class="js-play-again mt-10 opacity-0 md:hidden">
            <div class="p-5">
                <div class="flex-column items-center text-center">
                    <h3 class="text-5xl uppercase leading-10 mb-3">${winner === 'user' ? 'You Won' : winner === 'computer' ? 'You lost' : 'Draw'}</h3>
                    <button class="js-play-again-btn text-3xl inline-flex mt-2 rounded justify-center items-center py-3 px-4 bg-white text-black hover:text-red-500 uppercase">play again</button>
                </div>   
            </div>
            </div>
        </div>
        `;

        (function(){
            setTimeout(function(){
                document.querySelectorAll('.computer-pick .choice-container').forEach(item => {
                    item.classList.remove('none');
                });

                document.querySelectorAll('.computer-pick .choice-container').forEach(item => {
                    item.classList.add(`${computerSelection}`);
                });

                document.querySelectorAll('.computer-pick .choice-container-wrap').forEach(item => {
                    item.classList.add(`${computerSelection}`, 'animate-fadeIn');
                });

                document.querySelectorAll('.computer-pick .choice-container').forEach(item => {
                    item.innerHTML = `
                    <img src="src/images/icon-${computerSelection}.svg" alt="${computerSelection}" srcset="src/images/icon-${computerSelection}.svg">
                    `;
                });
            }, 1000);

            setTimeout(function(){
                // Show js play again
                const jsPlayAgainBtns = document.querySelectorAll(UISelectors.jsPlayAgain);
                jsPlayAgainBtns.forEach((btn) => {
                    btn.classList.remove('opacity-0');
                    btn.classList.add('opacity-100', 'animate-fadeIn');
                });

                //Update score
                addFadeInAnimation(UISelectors.jsScore);
                document.querySelector(UISelectors.jsScore).textContent = data.score;
                             

                jsPlayAgainBtns.forEach((btn) =>  {
                    btn.addEventListener('click', function(){
                        const gameArea = document.querySelector(UISelectors.gameArea);
                        const gameAreaProgress = document.querySelector(UISelectors.gameAreaProgressContainer);
    
                        gameAreaProgress.remove();
                        createGameArea();
                    });
                });
                
            }, 2000);
        })();

    }

    function updateScore(){
        const data = DataCtrl.getData();
        document.querySelector(UISelectors.jsScore).textContent = data.score;
    }

    function addFadeInAnimation(selector){
        document.querySelector(selector).classList.add('animate-fadeIn');
        setTimeout(() => document.querySelector(selector).classList.remove('animate-fadeIn'), 300);   
    }

      return {
          CreateGameArea: function(){
            createGameArea();
          },
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
          },
          UpdateStepOne: function(){
              updateStepOne();
          },
          UpdateScore: function(){
            updateScore();
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
            UICtrl.CreateGameArea();
            loadEventListeners();
        },
        HandleWinner: function(theComputerSelection, theUserSelection, score){
            handleWinner(theComputerSelection, theUserSelection, score);
        },
        LoadEventListeners: function(){
            loadEventListeners();
        }
    }
})(UICtrl, DataCtrl);


App.init();