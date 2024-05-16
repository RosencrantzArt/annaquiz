const questionContainer = document.getElementById('quiz-container');
const startButton = document.getElementById('start-button');
const nextQuestionButton = document.getElementById('next-question');
const timerElement = document.getElementById('timer');
const questionBox = document.getElementById('question-box');
const restartButton = document.getElementById('restart-button');
let currentQuestionIndex = 0;
let timerInterval;
let startTime;
let userResponses = []; // Array to store user responses

// Array of questions and options
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
    },
    {
        question: "Over the long term, a bear market occurs every ________ year on average.",
        options: ["1 to 2", "4 to 6", "7", "8"],
        answer: "4 to 6"
    },
    {
        question: "What's the worst thing to do in a bear market",
        options: ["Buy", "Sell", "Nothing", "It depends"],
        answer: "It depends"
    },
    {
        question: "What's the best thing to do in a bear market",
        options: ["Buy", "Sell", "Nothing", "It depends"],
        answer: "It depends"
    }

];

function startQuiz() {
    questionBox.classList.remove("d-none");
    questionContainer.classList.add("d-none");
    timerElement.classList.remove("d-none"); // Remove d-none class to show the timer
    startButton.disabled = true;
    nextQuestionButton.disabled = false;
    showQuestion();
    startTime = Date.now() + (45 * 1000); // Start timer 45 seconds from now
    timerInterval = setInterval(updateTimer, 1000); // Timer update per second
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionBox.innerHTML = `
        <p>${currentQuestion.question}</p>
        ${currentQuestion.options.map((option, index) => `
            <button class="option-button" data-answer="${option === currentQuestion.answer ? 'correct' : ''}" onclick="selectOption(this)">${option}</button>
        `).join('')}
    `;
}

function selectOption(button) {
    userResponses.push(button.textContent); // Store the selected option text
    checkAnswer();
}

function checkAnswer() {
    const selectedOption = document.querySelector('.option-button.selected');
    const correctOption = currentQuestionIndex < questions.length? questions[currentQuestionIndex].answer : null;
    if (selectedOption && selectedOption.textContent === correctOption) {
        console.log("Correct!");
        selectedOption.classList.add('correct'); // Add correct class for visual feedback
    } else if (selectedOption) {
        console.log("Incorrect.");
        selectedOption.classList.add('incorrect'); // Add incorrect class for visual feedback
    }

    nextQuestion();
}


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        // End of quiz
        nextQuestionButton.disabled = true;
        clearInterval(timerInterval);
        submitResult(); // Call submitResult when the quiz is completed
    } else {
        showQuestion();
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
    let remainingTime = 45 - elapsedTime; // Calculate remaining time in seconds
    if (remainingTime < 0) {
        remainingTime = 0; // Ensure timer doesn't go negative
    }

    // Display the remaining time in MM:SS format
    timerElement.textContent = `${remainingTime.toString().padStart(2, '0')}`;

    // Check if time is up
    if (remainingTime <= 0) {
        clearInterval(timerInterval); // Stop the timer
        timerElement.textContent = "Time's up!";
        // You may want to add additional logic here for what happens when time is up
    }
}

// Function to process the user's responses after the quiz is completed
function submitResult() {
    let correctAnswers = 0;
    userResponses.forEach((response, index) => {
        if (response === questions[index].answer) {
            correctAnswers++;
        }
    });
    const score = (correctAnswers / questions.length) * 100; // Calculate the percentage score

    //show result on page
    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = `Quiz Completed!<br>Your Score: ${score.toFixed(2)}%`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userResponses =[];
    startQuiz();

    const resultArea = document.getElementById('result-area');
    resultArea.innerHTML = '';
}


// Make sure to clear the interval when the page is unloaded or when the quiz is over
window.addEventListener('beforeunload', () => {
    clearInterval(timerInterval);
});

startButton.addEventListener('click', startQuiz);
nextQuestionButton.addEventListener('click', checkAnswer); // Call checkAnswer on nextQuestionButton click
restartButton.addEventListener('click', restartQuiz);

