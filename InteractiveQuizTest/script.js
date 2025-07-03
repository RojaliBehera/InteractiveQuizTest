const quizData = [
    {
      question: "What does HTML stand for?",
      answers: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Transfer Markup Language"
      ],
      correct: 0
    },
    {
      question: "Which language is used for styling web pages?",
      answers: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python"
      ],
      correct: 1
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
        "<js>",
        "<script>",
        "<javascript>",
        "<scripting>"
      ],
      correct: 1
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      answers: [
        "//",
        "<!-- -->",
        "#",
        "**"
      ],
      correct: 0
    },
    {
      question: "What does CSS stand for?",
      answers: [
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correct: 2
    }
  ];

  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const nextBtn = document.getElementById('next-btn');
  const resultEl = document.getElementById('result');
  const restartBtn = document.getElementById('restart-btn');

  let currentQuestionIndex = 0;
  let score = 0;

  function loadQuestion() {
    clearStatus();
    const current = quizData[currentQuestionIndex];
    questionEl.textContent = current.question;

    answersEl.innerHTML = '';
    current.answers.forEach((answer, i) => {
      const button = document.createElement('button');
      button.classList.add('answer-btn');
      button.textContent = answer;
      button.setAttribute('data-index', i);
      button.addEventListener('click', () => selectAnswer(button, i));
      answersEl.appendChild(button);
    });

    nextBtn.style.display = 'none';
    resultEl.textContent = '';
  }

  function clearStatus() {
    resultEl.textContent = '';
    const buttons = answersEl.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.classList.remove('correct', 'incorrect', 'disabled');
      btn.disabled = false;
    });
  }

  function selectAnswer(button, selectedIndex) {
    const current = quizData[currentQuestionIndex];
    const buttons = answersEl.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('disabled');
    });

    if (selectedIndex === current.correct) {
      button.classList.add('correct');
      score++;
      resultEl.textContent = 'Correct! 🎉';
    } else {
      button.classList.add('incorrect');
      // Highlight correct answer
      buttons[current.correct].classList.add('correct');
      resultEl.textContent = 'Wrong! 😞';
    }

    nextBtn.style.display = 'inline-block';
    if (currentQuestionIndex === quizData.length - 1) {
      nextBtn.textContent = 'Show Results';
    } else {
      nextBtn.textContent = 'Next';
    }
  }

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    loadQuestion();
  });

  function showResults() {
    questionEl.textContent = 'Quiz Completed!';
    answersEl.innerHTML = '';
    resultEl.textContent = `Your score: ${score} / ${quizData.length}`;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
  }

  // Initialize quiz
  loadQuestion();
