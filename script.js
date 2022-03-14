const initialScreenDisplay = document.querySelector('#initial-screen')
const playScreenDisplay = document.querySelector('#play-screen')
const gridDisplay = document.querySelector('#card-grid')
const mistakesDisplay = document.querySelector('#mistakes')
const messageDisplay = document.querySelector('#message')
const glassDisplay = document.querySelector('#glass')
const easyButton = document.querySelector('#easy')
const normalButton = document.querySelector('#normal')
const hardButton = document.querySelector('#hard')
const playAgainButton = document.querySelector('#play-again')
let gameOverFlag = false
let playAgainFlag = false
let remainingMistakes
let allCards
let chosenCards = []
let matchedCards = []
const cards = [
    {
        name: 'red-mushroom',
        img: 'img/red-mushroom.png'
    },
    {
        name: 'green-mushroom',
        img: 'img/green-mushroom.png'
    },
    {
        name: 'red-shell',
        img: 'img/red-shell.png'
    },
    {
        name: 'green-shell',
        img: 'img/green-shell.png'
    },
    {
        name: 'star',
        img: 'img/star.png'
    },
    {
        name: 'fire-flower',
        img: 'img/fire-flower.png'
    },
    {
        name: 'boomerang-flower',
        img: 'img/boomerang-flower.png'
    },
    {
        name: 'egg',
        img: 'img/egg.png'
    },
    {
        name: 'coin',
        img: 'img/coin.png'
    },
    {
        name: 'banana',
        img: 'img/banana.png'
    },
    {
        name: 'red-mushroom',
        img: 'img/red-mushroom.png'
    },
    {
        name: 'green-mushroom',
        img: 'img/green-mushroom.png'
    },
    {
        name: 'red-shell',
        img: 'img/red-shell.png'
    },
    {
        name: 'green-shell',
        img: 'img/green-shell.png'
    },
    {
        name: 'star',
        img: 'img/star.png'
    },
    {
        name: 'fire-flower',
        img: 'img/fire-flower.png'
    },
    {
        name: 'boomerang-flower',
        img: 'img/boomerang-flower.png'
    },
    {
        name: 'egg',
        img: 'img/egg.png'
    },
    {
        name: 'coin',
        img: 'img/coin.png'
    },
    {
        name: 'banana',
        img: 'img/banana.png'
    }    
]

const startGame = () => {
    initialScreenDisplay.style.display = 'none'
    playScreenDisplay.style.display = 'flex'    
    playAgainButton.style.display = 'none'
    messageDisplay.innerHTML = 'Choose a card...'
    messageDisplay.style.color = 'black'
    mistakesDisplay.innerHTML = remainingMistakes
    gameOverFlag = false
    allCardsClickable()
    cleaningBorders()
    createCards()
}

const createCards = () => {
    cards.sort(() => 0.5 - Math.random()) //shuffle the cards at every new game
    if (playAgainFlag) {
        removeCards()
    }
    cards.map( (c, i) => {
        const card = document.createElement('img')
        card.setAttribute('index', `${i}`)
        card.setAttribute('name', c.name)        
        card.setAttribute('src', 'img/face-down.png')
        card.setAttribute('class', 'card')
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)        
    })    
}

const removeCards = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( c => {
        c.parentElement.removeChild(c)
    })
}

function flipCard() {    
    if (!gameOverFlag) {
        messageDisplay.innerHTML = 'Choose the second card...'
    }
    console.log(this)
    this.setAttribute('src', cards[this.getAttribute('index')].img)
    this.removeEventListener('click', flipCard)
    chosenCards.push(this)
    if (chosenCards.length === 2) {
        messageDisplay.innerHTML = 'hold...'
        allCardsUnclickable()
        setTimeout(checkMatch, 1500)
    }    
}

const checkMatch = () => {

    // if cards matched
    if (chosenCards[0].name === chosenCards[1].name) {
        matchedCards.push(chosenCards)
        chosenCards[0].style.border = 'solid green 3px'
        chosenCards[1].style.border = 'solid green 3px'
        if (matchedCards.length === cards.length / 2) {            
            messageDisplay.style.color = 'green'
            messageDisplay.innerHTML = 'CONGRATULATIONS! YOU FOUND THEM ALL!'
            gameOverFlag = true
            allCardsUnclickable()
            playAgainButton.style.display = 'block'
            playAgain()           
        } else {
            messageDisplay.innerHTML = "it's a MATCH!!! Keep up the good work..."
            allCardsClickable()
        }

    // if cards did not match
    } else {
        remainingMistakes--
        mistakesDisplay.innerHTML = remainingMistakes 
        if (remainingMistakes === 0) {
            messageDisplay.style.color = 'red'
            messageDisplay.innerHTML = 'MAMA MIA!! GAME OVER...'            
            allCardsFaceUp()
            allCardsUnclickable()
            gameOverFlag = true
            playAgainButton.style.display = 'block'
            playAgain()
        } else {
            messageDisplay.innerHTML = "Too bad, try again!"
            allCardsClickable()
        }

        if (!gameOverFlag) {
            chosenCards[0].setAttribute('src', 'img/face-down.png')
            chosenCards[1].setAttribute('src', 'img/face-down.png') 
        }               
    }     
    chosenCards = []
}

const allCardsFaceUp = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( (c, i) => {
        c.setAttribute('src', cards[i].img)
    })
}

const allCardsFaceDown = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( (c, i) => {
        c.setAttribute('src', 'img/face-down.png')
    })
}

const allCardsUnclickable = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( (c, i) => {
        c.removeEventListener('click', flipCard)
    })
}

const allCardsClickable = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( (c, i) => {
        c.addEventListener('click', flipCard)
    })
}

const cleaningBorders = () => {
    allCards = document.querySelectorAll('.card')
    Array.from(allCards).map( (c, i) => {
        c.style.border = 'solid black 1px'
    })
}

const chooseDifficult = () => {
    playScreenDisplay.style.display = 'none'
    initialScreenDisplay.style.display = 'flex'
    easyButton.addEventListener('click', () => {
        remainingMistakes = 20
        startGame()
    })
    normalButton.addEventListener('click', () => {
        remainingMistakes = 15
        startGame()
    })
    hardButton.addEventListener('click', () => {
        remainingMistakes = 10
        startGame()
    })
}

const playAgain = () => {    
    playAgainButton.addEventListener('click', () => {
        playAgainFlag = true
        chooseDifficult()
    })
}

playScreenDisplay.style.display = 'none'
chooseDifficult()