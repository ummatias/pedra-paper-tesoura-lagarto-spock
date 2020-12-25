const score = document.querySelector('.scoreCount')
const selectionScreen = document.querySelector('.selection')
const resultScreen = document.querySelector('.result-page')
const resultTextArea = document.querySelector('.result-text')

const playerSelectArea = document.querySelector('.player-op')
const houseSelectArea = document.querySelector('.house-op')

const loading = document.querySelector('.loading-dot')

const rock = 1
const paper = 2
const scissors = 3
const lizard = 4
const spock = 5

let scoreCount = 0

document.addEventListener('click', function(e){
    const el = e.target

    if(el.parentElement.classList.contains('rock-menu') || (el.classList.contains('rock-menu'))){
        playRound(rock)
    }if(el.parentElement.classList.contains('paper-menu') || (el.classList.contains('paper-menu'))){
        playRound(paper)
    }if(el.parentElement.classList.contains('scissors-menu') || (el.classList.contains('scissors-menu'))){
        playRound(scissors)
    }if(el.parentElement.classList.contains('lizard-menu') || (el.classList.contains('lizard-menu'))){
        playRound(lizard)
    }if(el.parentElement.classList.contains('spock-menu') || (el.classList.contains('spock-menu'))){
        playRound(spock)
    }

    if(el.parentElement.classList.contains('play-again') || (el.classList.contains('play-again'))){
        clear()
        
    }
})

function game(playerSelect, houseSelect){

    if(playerSelect == houseSelect) return undefined
    if(playerSelect === scissors && (houseSelect === lizard || houseSelect === paper)) return true
    if(playerSelect === paper && (houseSelect === spock || houseSelect === rock)) return true
    if(playerSelect === rock && (houseSelect === scissors || houseSelect === lizard)) return true
    if(playerSelect === lizard && (houseSelect === paper || houseSelect === spock)) return true
    if(playerSelect === spock && (houseSelect === rock || houseSelect === scissors)) return true
    
    return false
}

function playRound(playerOption){
    const houseOption = houseSelect()

    const gameResult = game(playerOption, houseOption)
    getSelectItem(playerOption, playerSelectArea)
    changeDisplay(resultScreen, selectionScreen)

    setTimeout(() => {
        getSelectItem(houseOption, houseSelectArea)
        changeDisplay(houseSelectArea, loading)
    }, 1000) 

    setTimeout(()=> {
        
        changeDisplay(resultTextArea.parentElement, undefined, 'flex')
        roundText(gameResult)
        roundScore(gameResult)
        applyLight(gameResult)
        
    
    }, 2000)
}

function roundScore(result){
    updateGameScore(result)
    putScore()
}

function updateGameScore(result){
    if(result === true){
        scoreCount++
    }
    if(result === false) {
        scoreCount--
    }
}

function putScore(){
    if(scoreCount < 0) scoreCount = 0
    score.innerHTML = scoreCount
}

function getResultText(result){
    const roud_results = ['YOU WIN', 'YOU LOSE', "IT'S A DRAW"]

    switch (result) {
        case true:
            return roud_results[0]

        case false:
            return roud_results[1] 
        default:
            return roud_results[2]
    }
}

function putRoundText(result){
    resultTextArea.innerHTML = result
}

function roundText(result){
    putRoundText(getResultText(result))
}

function houseSelect(){
    return Math.floor((Math.random() * 5) + 1)
}


function changeDisplay(screenToShow, ScreenToHide, display='grid'){
    screenToShow.style.display = display
    if(ScreenToHide != undefined){
        ScreenToHide.style.display = 'none'
    }
}

function getSelectItem(select, player){
    const icons = ['rock', 'paper', 'scissors', 'lizard', 'spock']

    const selected = icons[select - 1]

    player.classList.add(selected)
    player.appendChild(createIcon(selected))
}

function clearSelectedIcon(selectedItem){
    classIcon = selectedItem.classList.item(2)
    selectedItem.classList.remove(classIcon)
    selectedItem.firstChild.remove()
}

function clearResultText(){
    resultTextArea.innerHTML = ""
}

function clear(){
    changeDisplay(selectionScreen, resultScreen, 'flex')
    changeDisplay(loading, houseSelectArea)
    changeDisplay(resultTextArea.parentElement, undefined, 'none')
    clearSelectedIcon(playerSelectArea)
    clearSelectedIcon(houseSelectArea)
    clearResultText()
    removeLight()
}

function createIcon(iconName){
    const img = document.createElement('img')
    img.setAttribute('src', `./assets/icon-${iconName}.svg`)
    img.setAttribute('alt', iconName)
    return img
}

function applyLight(result){
    if(result === true){
        playerSelectArea.classList.add('light')
    }
    
    if(result === false){
        houseSelectArea.classList.add('light')
    }
}

function removeLight(){
    if(playerSelectArea.classList.contains('light')){
        playerSelectArea.classList.remove('light')
    }
    if(houseSelectArea.classList.contains('light')){
        houseSelectArea.classList.remove('light')
    }
}