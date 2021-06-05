let score = 0;
let currentQuestion = 0;

const questionArray = [
    {
        text: 'What does DOM stand for?',
        options: ['Direct Orientation Mode', 'Department of Mysteries', 'Disk on Module', 'Document Object Model'],
        answer: 3
    },
    {   
        text: 'Who invented JavaScript?',
        options: ['Jim Clark', 'Marc Andreessen', 'Brendan Eich', 'Bill Sun'],
        answer: 2
    },
    {   
        text: 'How do you define a variable type in an array?',
        options: ['Quotes', 'Square Brackets', 'Round Brackets', 'Curly Brackets'],
        answer: 1
    },
    {
        text: 'Inside which HTML element does the JavaScript go?',
        options: ['<meta>', '<head>', '<style>', '<script>'],
        answer: 3
    },
    {
        text: 'What is used to link two strings?',
        options: ['plus', 'comma', 'dot', 'arrow'],
        answer: 0
    },
];

let timer;
let timeLeft = 0;

function start() {
    timeLeft = 75;
    document.getElementById('timeLeft').innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timeLeft').innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
    next();
}

console.log('Welcome to the quiz! Previous high score was: ', localStorage.getItem('quizHighScore'));

const startBtn = document.querySelector('#start-btn');

startBtn.addEventListener('click', startGame)

function startGame(){
    const welcomeScreen = document.querySelector('#welcome-screen');
    welcomeScreen.classList.add('hide');
    const gameDiv = document.querySelector('#game');
    gameDiv.classList.remove('hide');
    renderQuestion(questionArray[currentQuestion]);
}

function renderQuestion(question){
    if(!question){
        endQuiz();
    }
    const scoreBoardEl = document.querySelector('#score');
    scoreBoardEl.textContent = score;
    const questionEl = document.querySelector('#question');
    questionEl.textContent = question.text;
    document.querySelector('#options').innerHTML = '';

    question.options.forEach(handleOption)
    function handleOption(option){
        const liEl = document.createElement('li');
        liEl.textContent = option;
        document.querySelector('#options').appendChild(liEl);
        liEl.addEventListener('click', handleClick)

        function handleClick(event){
            const userChoice = event.target.textContent;
            const correctChoice = question.options[question.answer];
            currentQuestion++;
            if(userChoice === correctChoice){
                score = score + 10;
                alert('Correct!');
                localStorage.setItem('quizHighScore', score);
                renderQuestion(questionArray[currentQuestion]);

            } else {
                alert('Wrong!');
                timeLeft -= 5;
                console.log('You lost! High score is: ',
                localStorage.getItem('quizHighScore'));
                renderQuestion(questionArray[currentQuestion]);
            }
        }
    };
}

function endQuiz(){
    clearInterval(timer);
    const gameDiv = document.querySelector('#game');
    gameDiv.classList.add('hide');
    alert(`Game over!`);
}