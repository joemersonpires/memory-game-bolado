const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const personagens = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
    'meeseeks'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className;
    return element;

}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card')

    if(disabledCards.length == 20){
        clearInterval(this.loop)
        alert(`Parabens, ${spanPlayer.innerHTML}! seu tempo foi: ${timer.innerHTML}`)

    }
}

const checkCard = () => {
   const firstPersonagen = firstCard.getAttribute('data-personagen')
   const secondPersonagen = secondCard.getAttribute('data-personagen')

   if(firstPersonagen == secondPersonagen){

      firstCard.firstChild.classList.add('disabled-card')
      secondCard.firstChild.classList.add('disabled-card');

      firstCard = ''
      secondCard = ''

      checkEndGame()

   }
   else{
    setTimeout(() =>{
        
     firstCard.classList.remove('reveal-card')
     secondCard.classList.remove('reveal-card')

     firstCard = ''
     secondCard = ''

   }, 500);
}
}
const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
        return
    }
    if(firstCard == '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode;
    }
    else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;

        checkCard()
    }
}

const createCard = (personagen) => {

    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../imagens/${personagen}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)

      card.setAttribute('data-personagen', personagen)

    return card;

}
const loadGame = () => {

    const duplicatePersonages = [ ...personagens, ...personagens];
    const enbaralhArray = duplicatePersonages.sort(() => Math.random() - 0.5)

    enbaralhArray.forEach((personagen) => {
        const card = createCard(personagen);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() =>{
   const currentTime = +timer.innerHTML
   timer.innerHTML = currentTime + 1
}, 1000);
}

window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem('player')
startTimer()
loadGame();

}