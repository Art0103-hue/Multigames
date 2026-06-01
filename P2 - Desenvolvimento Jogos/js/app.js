// ==================== MAIN APP LOGIC ====================
(function() {
    'use strict';

    // ==================== STATE ====================
    const state = {
        currentScreen: 'welcome',
        user: null,
        questions: [],
        currentQuestion: 0,
        answers: [],
        questionPoints: [],
        totalPoints: 0,
        wheel: null,
        users: JSON.parse(localStorage.getItem('quiz_users') || '[]')
    };

    // ==================== DOM ELEMENTS ====================
    const screens = {
        welcome: document.getElementById('screen-welcome'),
        login: document.getElementById('screen-login'),
        register: document.getElementById('screen-register'),
        wheel: document.getElementById('screen-wheel'),
        quiz: document.getElementById('screen-quiz'),
        result: document.getElementById('screen-result')
    };

    const elements = {
        btnEnter: document.getElementById('btn-enter'),
        loginEmail: document.getElementById('login-email'),
        loginSenha: document.getElementById('login-senha'),
        btnLoginSubmit: document.getElementById('btn-login-submit'),
        linkRegister: document.getElementById('link-register'),
        regNome: document.getElementById('reg-nome'),
        regEmail: document.getElementById('reg-email'),
        regSenha: document.getElementById('reg-senha'),
        termsCheckbox: document.getElementById('terms-checkbox'),
        btnRegisterSubmit: document.getElementById('btn-register-submit'),
        btnSpin: document.getElementById('btn-spin'),
        quizPerguntaLabel: document.getElementById('quiz-pergunta-label'),
        quizQuestionText: document.getElementById('quiz-question-text'),
        quizOptions: document.getElementById('quiz-options'),
        btnPrev: document.getElementById('btn-prev'),
        btnNext: document.getElementById('btn-next'),
        progressBar: document.getElementById('progress-bar'),
        resultScore: document.getElementById('result-score'),
        resultDetails: document.getElementById('result-details'),
        btnPlayAgain: document.getElementById('btn-play-again'),
        feedbackModal: document.getElementById('feedback-modal'),
        feedbackIcon: document.getElementById('feedback-icon'),
        feedbackText: document.getElementById('feedback-text'),
        btnFeedbackOk: document.getElementById('btn-feedback-ok')
    };

    // ==================== SCREEN MANAGEMENT ====================
    function showScreen(screenName) {
        const currentEl = screens[state.currentScreen];
        const nextEl = screens[screenName];

        currentEl.classList.add('fade-out');

        setTimeout(() => {
            currentEl.classList.remove('active', 'fade-out');
            nextEl.classList.add('active', 'fade-in');

            setTimeout(() => {
                nextEl.classList.remove('fade-in');
            }, 300);

            state.currentScreen = screenName;
        }, 300);
    }

    // ==================== WELCOME SCREEN ====================
    elements.btnEnter.addEventListener('click', () => {
        showScreen('login');
    });

    // ==================== LOGIN ====================
    elements.btnLoginSubmit.addEventListener('click', () => {
        const email = elements.loginEmail.value.trim();
        const senha = elements.loginSenha.value.trim();

        if (!email || !senha) {
            showFeedback(false, 'Por favor, preencha todos os campos!');
            return;
        }

        const foundUser = state.users.find(u => u.email === email && u.senha === senha);
        if (foundUser) {
            state.user = foundUser;
            initGame();
        } else {
            showFeedback(false, 'Email ou senha incorretos!');
        }
    });

    elements.loginSenha.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') elements.btnLoginSubmit.click();
    });

    elements.linkRegister.addEventListener('click', () => {
        showScreen('register');
    });

    // ==================== REGISTER ====================
    elements.btnRegisterSubmit.addEventListener('click', () => {
        const nome = elements.regNome.value.trim();
        const email = elements.regEmail.value.trim();
        const senha = elements.regSenha.value.trim();
        const terms = elements.termsCheckbox.checked;

        if (!nome || !email || !senha) {
            showFeedback(false, 'Por favor, preencha todos os campos!');
            return;
        }

        if (!terms) {
            showFeedback(false, 'Voce precisa aceitar os Termos de Uso!');
            return;
        }

        if (state.users.find(u => u.email === email)) {
            showFeedback(false, 'Este email ja esta cadastrado!');
            return;
        }

        const newUser = { nome, email, senha };
        state.users.push(newUser);
        state.user = newUser;
        localStorage.setItem('quiz_users', JSON.stringify(state.users));

        showFeedback(true, 'Cadastro realizado com sucesso!');
        setTimeout(() => {
            initGame();
        }, 1500);
    });

    elements.regSenha.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') elements.btnRegisterSubmit.click();
    });

    // ==================== GAME INITIALIZATION ====================
    function initGame() {
        state.questions = getRandomQuestions();
        state.currentQuestion = 0;
        state.answers = new Array(5).fill(null);
        state.questionPoints = new Array(5).fill(0);
        state.totalPoints = 0;
        showWheelScreen();
    }

    // ==================== WHEEL SCREEN ====================
    function showWheelScreen() {
        showScreen('wheel');
        if (!state.wheel) {
            state.wheel = new SpinWheel('wheel-canvas');
        }
        state.wheel.onSpinComplete = onWheelSpinComplete;
        elements.btnSpin.disabled = false;
    }

    elements.btnSpin.addEventListener('click', () => {
        if (state.wheel && !state.wheel.isSpinning()) {
            elements.btnSpin.disabled = true;
            state.wheel.spin();
        }
    });

    function onWheelSpinComplete(value) {
        state.questionPoints[state.currentQuestion] = value;

        if (value === 0) {
            showFeedback(false, 'Voce tirou 0 pontos! Gire novamente.');
            setTimeout(() => {
                elements.btnSpin.disabled = false;
            }, 2000);
        } else {
            showFeedback(true, 'Voce tirou ' + value + ' pontos para a Pergunta ' + (state.currentQuestion + 1) + '!');
            setTimeout(() => {
                showScreen('quiz');
                renderQuestion();
            }, 2000);
        }
    }

    // ==================== QUIZ ====================
    function renderQuestion() {
        const q = state.questions[state.currentQuestion];
        const idx = state.currentQuestion;

        elements.quizPerguntaLabel.textContent = 'Pergunta ' + (idx + 1) + '/5';
        elements.quizQuestionText.textContent = q.question;

        // Update progress bar
        const steps = elements.progressBar.querySelectorAll('.progress-step');
        steps.forEach((step, i) => {
            step.classList.remove('active', 'completed');
            if (i === idx) {
                step.classList.add('active');
            } else if (state.answers[i] !== null) {
                step.classList.add('completed');
            }
        });

        // Update options
        const options = elements.quizOptions.querySelectorAll('.quiz-option');
        options.forEach((option, i) => {
            const letterSpan = option.querySelector('.option-letter');
            const textSpan = option.querySelector('.option-text');
            letterSpan.textContent = String.fromCharCode(65 + i) + ')';
            textSpan.textContent = q.options[i];

            option.classList.remove('selected', 'correct', 'wrong');
            option.disabled = false;

            if (state.answers[idx] !== null && state.answers[idx].selected === i) {
                option.classList.add('selected');
            }
        });

        // Update navigation buttons
        elements.btnPrev.disabled = (idx === 0);

        if (idx === 4) {
            elements.btnNext.innerHTML = '&#10003;';
        } else {
            elements.btnNext.innerHTML = '&#8594;';
        }
    }

    // Handle option click
    elements.quizOptions.addEventListener('click', (e) => {
        const option = e.target.closest('.quiz-option');
        if (!option || option.disabled) return;

        const idx = parseInt(option.dataset.index);
        const q = state.questions[state.currentQuestion];
        const currentPoints = state.questionPoints[state.currentQuestion] || 0;

        const options = elements.quizOptions.querySelectorAll('.quiz-option');
        options.forEach(o => o.classList.remove('selected'));

        option.classList.add('selected');

        state.answers[state.currentQuestion] = {
            selected: idx,
            correct: idx === q.correct,
            points: idx === q.correct ? currentPoints : 0
        };
    });

    // Previous button
    elements.btnPrev.addEventListener('click', () => {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            renderQuestion();
        }
    });

    // Next button
    elements.btnNext.addEventListener('click', () => {
        if (state.answers[state.currentQuestion] === null) {
            showFeedback(false, 'Selecione uma resposta antes de prosseguir!');
            return;
        }

        if (state.currentQuestion < 4) {
            state.currentQuestion++;
            showWheelScreen();
        } else {
            showResults();
        }
    });

    // Progress step click
    elements.progressBar.addEventListener('click', (e) => {
        const step = e.target.closest('.progress-step');
        if (!step) return;

        const stepIdx = parseInt(step.dataset.step) - 1;
        if (stepIdx <= state.currentQuestion) {
            state.currentQuestion = stepIdx;
            renderQuestion();
        }
    });

    // ==================== RESULTS ====================
    function showResults() {
        let totalPoints = 0;
        let detailsHTML = '';

        state.answers.forEach((answer, i) => {
            if (answer) {
                totalPoints += answer.points;
                detailsHTML += '<div class="result-item ' + (answer.correct ? 'correct-answer' : 'wrong-answer') + '">' +
                    '<span class="result-question-num">Pergunta ' + (i + 1) + '</span>' +
                    '<span>' + (answer.correct ? 'Correta' : 'Errada') + '</span>' +
                    '<span class="result-points">' + answer.points + ' pts</span>' +
                    '</div>';
            } else {
                detailsHTML += '<div class="result-item wrong-answer">' +
                    '<span class="result-question-num">Pergunta ' + (i + 1) + '</span>' +
                    '<span>Nao respondida</span>' +
                    '<span class="result-points">0 pts</span>' +
                    '</div>';
            }
        });

        state.totalPoints = totalPoints;
        elements.resultScore.textContent = totalPoints;
        elements.resultDetails.innerHTML = detailsHTML;

        showScreen('result');
    }

    // Play again
    elements.btnPlayAgain.addEventListener('click', () => {
        initGame();
    });

    // ==================== FEEDBACK MODAL ====================
    function showFeedback(isCorrect, text) {
        elements.feedbackIcon.textContent = isCorrect ? '\u2714' : '\u2718';
        elements.feedbackIcon.className = 'modal-icon ' + (isCorrect ? 'correct' : 'wrong');
        elements.feedbackText.textContent = text;
        elements.feedbackModal.classList.add('active');
    }

    elements.btnFeedbackOk.addEventListener('click', () => {
        elements.feedbackModal.classList.remove('active');
    });

    // ==================== KEYBOARD SUPPORT ====================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            elements.feedbackModal.classList.remove('active');
        }
    });

    // ==================== INIT ====================
    console.log('QU!Z - Jogo de Perguntas inicializado!');
})();
