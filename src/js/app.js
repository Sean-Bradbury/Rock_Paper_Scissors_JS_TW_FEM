// Data Controller
const DataCtrl = (function(){
    let data = {
        score: 0,
        userSelection: '',
        computerSelection: '',
    }

    const handleData = function(key, value, score){        
        if(score){
            data.score === score;
        }

        if(key){
            if(key === 'computerSelection'){
                data.computerSelection = value;
            }
            
            if(key === 'userSelection'){
                data.userSelection = value;
            }
        }       

        console.log(data);
    }

    return {
        getData: function(){
            return data;
        },
        handleData: function(key, value, score){
            handleData(key, value, score);
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
    }

    const showModal = function(){
        const jsModal = document.querySelector('.js-modal');

        if(jsModal === null){
            const body = document.querySelector(body);
            // Create div
            const div = document.createElement('div');
            // Add classes
            div.classList.add('js-modal', 'absolute', 'bg-white', 'w-80', 'h-80', 'top-5');
            
            div.innerHTML = `
            <div class="p-5">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl uppercase leading-5">Rules</h3>
                    <button class="js-modal-close close-modal-btn h-5 w-5 flex justify-center items-center text-black"></button>
                </div>           
            </div>`;
            
            document.body.appendChild(div);
            
        } else {
            closeModal();
        }

        document.querySelector(UISelectors.jsRulesModalClose).addEventListener('click', closeModal); 
    }

    function closeModal(){
        document.querySelector('.js-modal').remove();
    }

      return {
          ShowModal: function(){
            showModal();
          },
          CloseModal: function(){
            closeModal();
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

    const handleChoiceClick = function(e){
        const target = e.target;
        const realTarget = target.closest('.choice-container');

        DataCtrl.handleData('computerSelection', randomComputerSelection(), null);     
         
        if(realTarget.classList.contains('js-paper')){
            DataCtrl.handleData('userSelection', 'paper', handleWinner());
        }
        
        if(realTarget.classList.contains('js-rock')){
            DataCtrl.handleData('userSelection', 'rock', handleWinner());
        }

        if(realTarget.classList.contains('js-scissors')){
            DataCtrl.handleData('userSelection', 'scissors', handleWinner());
        }   
    }

    const handleWinner = function(){
        const data = DataCtrl.getData();

        if(data.userSelection === 'scissors' && data.computerSelection === 'rock'){
            const newScore = data.score --;

            return newScore;
        }

        if(data.userSelection === 'rock' && data.computerSelection === 'scissors'){
            const newScore =  data.score ++;

            return newScore;
        }

        if(data.userSelection === 'rock' && data.computerSelection === 'paper'){
            const newScore =  data.score --;

            return newScore;
        }

        if(data.userSelection === 'paper' && data.computerSelection === 'rock'){
            const newScore =  data.score ++;

            return newScore;
        }

        if(data.userSelection === 'paper' && data.computerSelection === 'scissors'){
            const newScore =  data.score --;

            return newScore;
        }

        if(data.userSelection === 'scissors' && data.computerSelection === 'paper'){
            const newScore =  data.score ++;

            return newScore;
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
        }
    }
})(UICtrl, DataCtrl);


App.init();