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
        name: 'bread',
        img: 'img/bread.PNG'
    },
    {
        name: 'chicken',
        img: 'img/chicken.PNG'
    },
    {
        name: 'cupcake',
        img: 'img/cupcake.PNG'
    },
    {
        name: 'donut',
        img: 'img/donut.PNG'
    },
    {
        name: 'fries',
        img: 'img/fries.PNG'
    },
    {
        name: 'hamburger',
        img: 'img/hamburger.PNG'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.PNG'
    },
    {
        name: 'icecream',
        img: 'img/icecream.PNG'
    },
    {
        name: 'pizza',
        img: 'img/pizza.PNG'
    },
    {
        name: 'popcorn',
        img: 'img/popcorn.PNG'
    },
    {
        name: 'bread',
        img: 'img/bread.PNG'
    },
    {
        name: 'chicken',
        img: 'img/chicken.PNG'
    },
    {
        name: 'cupcake',
        img: 'img/cupcake.PNG'
    },
    {
        name: 'donut',
        img: 'img/donut.PNG'
    },
    {
        name: 'fries',
        img: 'img/fries.PNG'
    },
    {
        name: 'hamburger',
        img: 'img/hamburger.PNG'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.PNG'
    },
    {
        name: 'icecream',
        img: 'img/icecream.PNG'
    },
    {
        name: 'pizza',
        img: 'img/pizza.PNG'
    },
    {
        name: 'popcorn',
        img: 'img/popcorn.PNG'
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
        card.setAttribute('src', 'img/face-down.PNG')
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
            messageDisplay.innerHTML = 'CONGRATULATIONS!!'
            gameOverFlag = true
            allCardsUnclickable()
            playAgainButton.style.display = 'block'
            playAgain()           
        } else {
            messageDisplay.innerHTML = "It's a match, Keep it up!"
            allCardsClickable()
        }

    // if cards did not match
    } else {
        remainingMistakes--
        mistakesDisplay.innerHTML = remainingMistakes 
        if (remainingMistakes === 0) {
            messageDisplay.style.color = 'red'
            messageDisplay.innerHTML = 'GAME OVER...'            
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
            chosenCards[0].setAttribute('src', 'img/face-down.PNG')
            chosenCards[1].setAttribute('src', 'img/face-down.PNG') 
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
        c.setAttribute('src', 'img/face-down.PNG')
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
        c.style.border = 'solid black 3px'
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