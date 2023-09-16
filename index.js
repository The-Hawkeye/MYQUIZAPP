const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "In which language is memory management provided by JVM?",
        options: ["Java", "C", "C++", "Python"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answer-list');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

function loadQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.text;
    answerListElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.classList.add('option-item');
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `option-${index}`;
        input.name = 'answer';
        input.value = index;


        const label = document.createElement('label');
        label.textContent = option;
        label.setAttribute('for', `option-${index}`);

        let ques = document.createElement("div");
        ques.className = "ques";
        ques.append(input,label);


        li.append(ques);
        answerListElement.appendChild(li);
    });

    submitButton.style.display = 'block';
    nextButton.style.display = 'none';
}

function showNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert(`Quiz finished! Your score is: ${score}/${questions.length}`);
    }
}

submitButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const selectedAnswerIndex = parseInt(selectedOption.value);
    const correctAnswerIndex = questions[currentQuestion].correct;

    if (selectedAnswerIndex === correctAnswerIndex) {
        score++;
    }

    const correctOptionLabel = document.querySelector(`label[for="option-${correctAnswerIndex}"]`);
    correctOptionLabel.style.backgroundColor = 'lightgreen';

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
});

nextButton.addEventListener('click', showNextQuestion);

loadQuestion();