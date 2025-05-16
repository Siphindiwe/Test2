const questions = [
  {
    question: "How do you select an element with id 'header' in CSS?",
    options: ['header', '*header', '#header', '.header'],
    correct: '#header',
  },
  {
    question: 'Which tag is used to create a hyperlink in HTML?',
    options: ['<img>', '<a>', '<link>', '<href>'],
    correct: '<a>',
  },
  {
    question: 'What does CSS stand for?',
    options: [
      'Cascading Style Sheets',
      'Computer Style Sheet',
      'Colorful Style Sheet',
      'Creative Style Syntax',
    ],
    correct: 'Cascading Style Sheets',
  },
  {
    question: 'Which property changes the background color?',
    options: ['color', 'background', 'bgcolor', 'background-color'],
    correct: 'background-color',
  },
  {
    question: 'What symbol is used for class selectors in CSS?',
    options: ['#', '.', '*', '$'],
    correct: '.',
  },
  {
    question: 'Which HTML tag is used to define an unordered list?',
    options: ['<ul>', '<ol>', '<li>', '<list>'],
    correct: '<ul>',
  },
]

let currentQuestion = 0
let score = 0

const questionText = document.getElementById('question-text')
const optionsContainer = document.getElementById('options-container')
const questionNumber = document.getElementById('question-number')
const scoreDisplay = document.getElementById('score')
const nextBtn = document.getElementById('next-btn')

function loadQuestion() {
  const q = questions[currentQuestion]
  questionText.textContent = q.question
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${
    questions.length
  }`
  optionsContainer.innerHTML = ''
  nextBtn.disabled = true

  q.options.forEach((option) => {
    const button = document.createElement('button')
    button.textContent = option
    button.className = 'option-btn'
    button.onclick = () => handleAnswer(button, option)
    optionsContainer.appendChild(button)
  })
}

function handleAnswer(button, selected) {
  const q = questions[currentQuestion]
  const isCorrect = selected === q.correct

  if (isCorrect) {
    button.style.backgroundColor = '#a8e6a1'
    score++
    scoreDisplay.textContent = `Score: ${score}`
  } else {
    button.style.backgroundColor = '#f8a1a1'
    const correctBtn = [...optionsContainer.children].find(
      (btn) => btn.textContent === q.correct
    )
    if (correctBtn) correctBtn.style.backgroundColor = '#a8e6a1'
  }

  ;[...optionsContainer.children].forEach((btn) => (btn.disabled = true))
  nextBtn.disabled = false
}

nextBtn.onclick = () => {
  currentQuestion++
  if (currentQuestion < questions.length) {
    loadQuestion()
  } else {
    showFinalScore()
  }
}

function showFinalScore() {
  questionText.textContent = `Quiz Complete! Your final score is ${score} out of ${questions.length}.`
  optionsContainer.innerHTML = ''
  nextBtn.style.display = 'none'
  questionNumber.textContent = ''
}

loadQuestion()
