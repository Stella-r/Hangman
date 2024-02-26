const input = document.querySelector('input')
const output = document.querySelector('output')
const guesses = document.getElementById('guesses')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomword = ''
let hiddenword = ''
let guesscount = 0

const newgame = () => {
    const random = Math.floor(Math.random() * 10) + 1
    randomword = words[random]
    hiddenword = "*".repeat(randomword.length)
    console.log(randomword)
    output.innerHTML = hiddenword
    guesscount = 0
    updateguesscount()
}

const win = () => {
    alert(`That is right! The word was ${randomword}. It took you ${guesscount} guesses to find it.`)
    newgame()
}

const replacefound = (guess) => {
    guesscount++
    updateguesscount()
    for (let i = 0;i<randomword.length;i++) {
        const char = randomword.substring(i,i+1)
        if (char === guess) {
            let newstring = hiddenword.split('')
            newstring.splice(i,1,guess)
            newstring = newstring.join('')
            hiddenword = newstring
        }
    }
    output.innerHTML = hiddenword
}

const updateguesscount = () => {
    guesses.textContent = guesscount
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()

        const guess = input.value
        if (guess.toLowerCase() === randomword.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            replacefound(guess)
            if (hiddenword.toLocaleLowerCase() === randomword.toLocaleLowerCase()) {
                win()
            }
        } else {
            alert("That guess was wrong.")
            guesscount++
            updateguesscount()
        }
        input.value = ''
    }
})


newgame()
