const quizData = [
    {
        question: "What does HTTP stand for?",
        answers: ["HyperText Transfer Protocol", "Hyperlink Text Transfer Protocol", "Hyper Transfer Text Protocol", "HyperText Transmit Protocol"],
        correct: 0
    },
    {
        question: "Who is known as the father of Computer Science?",
        answers: ["Alan Turing", "Charles Babbage", "John von Neumann", "George Boole"],
        correct: 1
    },
    {
        question: "Which planet in our solar system has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 3
    },
    {
        question: "Which data structure uses a LIFO order?",
        answers: ["Queue", "Stack", "Tree", "Array"],
        correct: 1
    },
    {
        question: "What does SQL stand for?",
        answers: ["Simple Query Language", "Structured Question Language", "Structured Query Language", "Sequential Query Language"],
        correct: 2
    },
    {
        question: "What is the largest organ in the human body?",
        answers: ["Brain", "Liver", "Lungs", "Skin"],
        correct: 3
    },
    {
        question: "What is the synonym of 'abundant'?",
        answers: ["Scarce", "Plentiful", "Fragile", "Common"],
        correct: 1
    },
    {
        question: "Which sorting algorithm has the best average time complexity?",
        answers: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
        correct: 2
    },
    {
        question: "In computing, what does 'CPU' stand for?",
        answers: ["Central Processing Unit", "Computer Processing Unit", "Central Performance Unit", "Computer Performance Unit"],
        correct: 0
    },
    {
        question: "Which layer of the OSI model is responsible for routing data between networks?",
        answers: ["Physical Layer", "Network Layer", "Data Link Layer", "Transport Layer"],
        correct: 1
    },
    {
        question: "Fill in the blank: She _____ to the store every Saturday.",
        answers: ["goes", "going", "gone", "go"],
        correct: 0
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "South Korea", "Japan", "Thailand"],
        correct: 2
    },
    {
        question: "Which of the following is NOT a type of logical reasoning?",
        answers: ["Deductive reasoning", "Inductive reasoning", "Abductive reasoning", "Reverse reasoning"],
        correct: 3
    },
    {
        question: "In programming, what is the term for a block of code that only runs when called?",
        answers: ["Loop", "Variable", "Function", "Array"],
        correct: 2
    },
    {
        question: "What is the antonym of 'benevolent'?",
        answers: ["Kind", "Malicious", "Generous", "Helpful"],
        correct: 1
    },
    {
        question: "Which of these is a binary search tree property?",
        answers: ["Each node has at most one child", "All nodes have the same value", "Left subtree values are smaller than the parent node", "Each node has exactly two children"],
        correct: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Iron", "Graphite", "Diamond", "Gold"],
        correct: 2
    },
    {
        question: "Which English word is an anagram of 'SILENT'?",
        answers: ["LISTEN", "TEN", "INLET", "LINE"],
        correct: 0
    },
    {
        question: "In reasoning, if all cats are animals and some animals are dogs, what can be concluded?",
        answers: ["All animals are cats", "All cats are dogs", "Some cats may be dogs", "No conclusion"],
        correct: 3
    },
    {
        question: "If the following sequence continues, what comes next: 1, 1, 2, 3, 5, 8, ___?",
        answers: ["8", "10", "13", "11"],
        correct: 2
    },
    {
        question: "Who proposed the theory of relativity?",
        answers: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
        correct: 2
    },
    {
        question: "Which programming language is commonly associated with web development?",
        answers: ["Python", "Java", "JavaScript", "C++"],
        correct: 2
    }
];


        function displayQuiz() {
            const quizBody = document.getElementById('quiz-body');
            quizBody.innerHTML = '';

            quizData.forEach((quiz, index) => {
                const quizItem = document.createElement('div');
                quizItem.className = 'quiz-item';

                quizItem.innerHTML = `
                    <h3>${index + 1}. ${quiz.question}</h3>
                    <div class="answers">
                        ${quiz.answers.map((answer, i) => `
                            <div class="answer-item">
                                <input type="radio" name="question-${index}" value="${i}" />
                                <label>${answer}</label>
                            </div>
                        `).join('')}
                    </div>
                `;

                quizBody.appendChild(quizItem);
            });
        }

        function submitQuiz() {
            const selectedAnswers = [];
            const quizItems = document.querySelectorAll('.quiz-item');

            quizItems.forEach((item, index) => {
                const selectedRadio = item.querySelector(`input[name="question-${index}"]:checked`);
                if (selectedRadio) {
                    selectedAnswers.push(parseInt(selectedRadio.value));
                } else {
                    selectedAnswers.push(-1);
                }
            });

            let score = 0;
            quizItems.forEach((item, index) => {
                const answers = item.querySelectorAll('.answer-item');
                answers.forEach((answer, i) => {
                    if (i === quizData[index].correct) {
                        answer.classList.add('correct');
                    } else if (selectedAnswers[index] === i) {
                        answer.classList.add('incorrect');
                    }
                });

                if (selectedAnswers[index] === quizData[index].correct) {
                    score++;
                }
            });

            document.querySelector(".score").textContent=`${score}/22`;
        }

        document.addEventListener('DOMContentLoaded', () => {
            checkAuth();
            displayQuiz();
        });