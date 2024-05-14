//Point at html elements
const startButton = document.getElementById('start-button');
const nextQuestionButton =document.getElementById('next-question');
const timerElement =document.getElementById('timer');
let currentQuestionIndex = 0;
let timerInterval;
let startTime;

//Array questions and options
const questions = [
    {
        question: "Which market condition is characterized by falling prices?",
        options: ["Bull Market", "Bear Market", "Neutral Market", "Sideways Market"],
        answer: "Bear Market"
    },
    {
        question: "In a bear market, investors tend to...",
        options: ["Buy more stocks", "Sell off stocks", "Hold onto stocks", "Invest in bonds"],
        answer: "Sell off stocks"
    },
    {
        question: "A bull market is typically characterized by...",
        options: ["Falling stock prices", "Rising stock prices", "Stable stock prices", "Fluctuating stock prices"],
        answer: "Rising stock prices"
    },
    {
        question: "During a bear market, the economy is generally...",
        options: ["Growing", "Stagnant", "Declining", "Expanding"],
        answer: "Declining"
    },
    {
        question: "Which market condition is characterized by sideways movement in stock prices?",
        options: ["Bull Market", "Bear Market", "Neutral Market", "Sideways Market"],
        answer: "Sideways Market"
    },
    {
        question: "In a bull market, investors tend to...",
        options: ["Sell off stocks", "Buy more stocks", "Hold onto stocks", "Invest in bonds"],
        answer: "Buy more stocks"
    }
];

function startQuiz() {
    startButton.disabled= true;
    nextQuestionButton.disabled = false;
    showQuestion()
    startTime = Date.now(0); //Start timer
    timerInterval =setInterval(updateTimer, 1000);//Timer update per second
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <p>${questions[currentQuestionIndex].question}</p>
        ${questions[currentQuestionIndex].options.map((option, index) => `
            <button class="option-button" data-answer="${index === questions[currentQuestionIndex].answer? 'correct' : ''}" onclick="selectOption(this)">${option}</button>
        `).join('')}
    `;
}