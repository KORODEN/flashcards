const flashcards = document.querySelector('.flashcards')
const createBox = document.querySelector('.create-box')
const word = document.querySelector('#word')
const translation = document.querySelector('#translation')
const errors = document.querySelectorAll('.error')

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

contentArray.forEach(divMaker)

function divMaker(text) {
    const div = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')
    const h2Word = document.createElement('h2')
    const h2Translation = document.createElement('h2')

    div.className = 'flashcard'

    front.className = 'front'
    back.className = 'back'

    h2Word.className = 'h2Word'
    h2Word.innerHTML = text.word

    h2Translation.className = 'h2Translation'
    h2Translation.innerHTML = text.translation

    front.appendChild(h2Word)
    back.appendChild(h2Translation)
    div.appendChild(front)
    div.appendChild(back)

    div.addEventListener('click', () => {
        front.classList.toggle('active')
        back.classList.toggle('active')
    })

    flashcards.appendChild(div)
}

function addFlashcard() {
    if(word.value && translation.value){
        let flashcardInfo = {
            'word' : word.value,
            'translation' : translation.value
        }
    
        contentArray.push(flashcardInfo)
        localStorage.setItem('items', JSON.stringify(contentArray))
        divMaker(contentArray[contentArray.length - 1])
        word.value = ''
        translation.value = ''
    } else if(!word.value && !translation.value) {
        typingWordError()
        typingTranslationError()
    } else if(!word.value) {
        typingWordError()
    } else {
        typingTranslationError()
    }
}

function typingWordError() {
    word.classList.add('error-input')
    errors[0].classList.add('active')
    setTimeout(() => {
        word.classList.remove('error-input')
        errors[0].classList.remove('active')
    }, 3000)
}

function typingTranslationError() {
    translation.classList.add('error-input')
    errors[1].classList.add('active')
    setTimeout(() => {
        translation.classList.remove('error-input')
        errors[1].classList.remove('active')
    }, 3000)
}

function delFlashcards() {
    localStorage.clear()
    flashcards.innerHTML = ''
    contentArray = []
}

function showCreateCardBox() {
    createBox.classList.toggle('display')
}

function hideCreateBox() {
    createBox.classList.toggle('display')
    word.value = ''
    translation.value = ''
}