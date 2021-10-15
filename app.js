const flashcards = document.querySelector('.flashcards')
const createBox = document.querySelector('.create-box')
const question = document.querySelector('#question')
const answer = document.querySelector('#answer')

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

contentArray.forEach(divMaker)

function divMaker(text) {
    const div = document.createElement('div')
    const h2Question = document.createElement('h2')
    const h2Answer = document.createElement('h2')

    div.className = 'flashcard'

    h2Question.className = 'h2Question'
    h2Question.innerHTML = text.question

    h2Answer.className = 'h2Answer'
    h2Answer.innerHTML = text.answer

    div.appendChild(h2Question)
    div.appendChild(h2Answer)

    div.addEventListener('click', () => {
        if(h2Answer.classList.contains('display')) {
            h2Answer.classList.remove('display')
        } else {
            h2Answer.classList.add('display')
        }
        console.log('dsafds')
    })

    flashcards.appendChild(div)
}

function addFlashcard() {
    let flashcardInfo = {
        'question' : question.value,
        'answer' : answer.value
    }

    contentArray.push(flashcardInfo)
    localStorage.setItem('items', JSON.stringify(contentArray))
    divMaker(contentArray[contentArray.length - 1])
    question.value = ''
    answer.value = ''
}

function delFlashcards() {
    localStorage.clear()
    flashcards.innerHTML = ''
    contentArray = []
}

function showCreateBox() {
    createBox.style.display = 'block'
}

function hideCreateBox() {
    createBox.style.display = 'none'
}

