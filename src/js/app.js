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

    function createGameArea(){
        document.querySelector(UISelectors.gameAreaContainer).innerHTML = `
        <div class="game-area">
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
        const { score, userSelection, computerSelection } = data;

        document.querySelector(UISelectors.gameArea).remove();

        document.querySelector(UISelectors.gameAreaContainer).innerHTML = `
        <div class="game-area-progress text-white flex justify-between">
            <div class="flex justify-between">
                <div class="user-pick mr-20">
                <h2 class="text-lg text-center pb-10 uppercase leading-5">You picked</h2>
                <div class="choice-container-wrap ${userSelection}">
                    <div class="choice-container cursor-none ${userSelection}">
                    <img src="src/images/icon-${userSelection}.svg" alt="${userSelection}" srcset="src/images/icon-${userSelection}.svg">
                    </div>
                </div>
                </div>
                <div class="computer-pick ml-20">
                <h2 class="text-lg text-center pb-10 uppercase leading-5">The house picked</h2>
                <div class="choice-container-wrap cursor-none">
                    <div class="choice-container none">
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;

        (function(){
            setTimeout(function(){
                document.querySelector('.computer-pick .choice-container').classList.remove('none');

                document.querySelector('.computer-pick .choice-container').classList.add(`${computerSelection}`);
                document.querySelector('.computer-pick .choice-container-wrap').classList.add(`${computerSelection}`, 'animate-fade');

                document.querySelector('.computer-pick .choice-container').innerHTML = `
                <img src="src/images/icon-${computerSelection}.svg" alt="${computerSelection}" srcset="src/images/icon-${computerSelection}.svg">
                `;
            }, 1000);

            setTimeout(function(){
                // Get data
                const data = DataCtrl.getData();
                // Create div
                const div = document.createElement('div');
                // Add classes
                div.classList.add('js-play-again');
                // Parent el
                const parentEl = document.querySelector('.game-area-progress > div');

                const computerPickContainer = document.querySelector('.computer-pick');
                
                div.innerHTML = `
                <div class="p-5">
                    <div class="flex-column items-center">
                        <h3 class="text-2xl uppercase leading-5">${data.winner === 'user' ? 'You Won' : data.winner === 'computer' ? 'You lost' : 'Draw'}</h3>
                        <button class="js-play-again-btn flex mt-2 w-full rounded justify-center items-center py-2 bg-white text-black uppercase">play again</button>
                    </div>   
                </div>`;

                parentEl.insertBefore(div, computerPickContainer);

                //Update score
                document.querySelector(UISelectors.jsScore).textContent = data.score;

                document.querySelector(UISelectors.jsPlayAgainBtn).addEventListener('click', function(){
                    const gameArea = document.querySelector(UISelectors.gameArea);
                    const gameAreaProgress = document.querySelector(UISelectors.gameAreaProgressContainer);

                    gameAreaProgress.remove();
                    createGameArea();
                });
            }, 2000);
        })();

    }

    function updateScore(){
        const data = DataCtrl.getData();
        document.querySelector(UISelectors.jsScore).textContent = data.score;
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