const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Lion", correct: false },
            { text: "Elephant", correct: true },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false }
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: true },
            { text: "Antarctica", correct: false }
        ]
    },
    {
        question: "Which is largest continent in the world?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Asia", correct: true },
            { text: "Europe", correct: false },
            { text: "Australia", correct: false }
        ]
    }
];


const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

let currQuestIdx = 0;
let score = 0;

// Initialize the quiz
function initializeQuiz() {
    startButton.style.display = 'block';
    questionElement.textContent = 'Quiz App';
    answerButtons.innerHTML = '';
    nextButton.style.display = 'none';
}

// Start the quiz
function startQuiz() {
    startButton.style.display = 'none';
    currQuestIdx = 0;
    score = 0;
    showQuestion();
}
function showQuestion() {
    resetState();
    
    const currentQuestion = questions[currQuestIdx];
    const questionNo = currQuestIdx + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = 'true';
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    
    
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });
    
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}`;
    nextButton.style.display = 'none';
    startButton.style.display = 'block';
    startButton.textContent = 'Restart Quiz';
}


document.addEventListener('DOMContentLoaded', () => {
    // Initialize the quiz
    initializeQuiz();
    
    
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        if (currQuestIdx < questions.length - 1) {
            currQuestIdx++;
            showQuestion();
        } else {
            showScore();
        }
    });
});



