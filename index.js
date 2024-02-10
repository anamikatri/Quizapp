const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Stephen King"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "What is the largest mammal?",
        choices: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
        correctAnswer: "Blue Whale"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const timeElement = document.getElementById("time");
    
    questionElement.textContent = questions[currentQuestion].question;
    choicesElement.innerHTML = "";

    questions[currentQuestion].choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = checkAnswer;
        choicesElement.appendChild(button);
    });

    timeLeft = 10;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    clearInterval(timer);
    const selectedChoice = this.textContent;
    if (selectedChoice === questions[currentQuestion].correctAnswer) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent = "Wrong!";
    }
    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        document.getElementById("result").textContent = "";
        document.getElementById("nextBtn").disabled = true;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const container = document.querySelector(".container");
    container.innerHTML = `
        <h1>Quiz Complete!</h1>
        <p>Your score is ${score} out of ${questions.length}.</p>
    `;
}

displayQuestion();