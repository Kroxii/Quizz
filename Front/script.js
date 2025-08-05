const loginBtn = document.getElementById('login-btn');
const createQuizBtn = document.getElementById('create-quiz-btn');
const createQuestionsBtn = document.getElementById('create-questions-btn');
const selectQuizBtn = document.getElementById('select-quiz-btn');
const showQuestionsBtn = document.getElementById('show-questions-btn');
const showQuestionScreen = document.getElementById('show-questions-screen')
let showQuestions = document.getElementById('show-questions')
const backToStartBtn1 = document.getElementById('back-to-start');
const backToStartBtn = document.getElementById('back-to-start-btn');
const backToStartFromQuestions = document.getElementById('back-to-start-from-questions');
const backToStartAfterCreation = document.getElementById('back-to-start-after-creation');
const loginText = document.getElementById('login-text');
const userName = document.getElementById('user-name');
const startScreen = document.getElementById('start-screen');
const quizSelectionScreen = document.getElementById('quiz-selection-screen');
const quizCreationScreen = document.getElementById('quiz-creation-screen');
const questionCreationScreen = document.getElementById('question-creation-screen');
const quizList = document.getElementById('quiz-list');
const questionForm = document.getElementById('question-form');
const addAnswerBtn = document.getElementById('add-answer-btn');
const createAnotherQuestionBtn = document.getElementById('create-another-question-btn');
const questionSuccessMessage = document.getElementById('question-success-message');
let currentUser = null;
let questions = [];


async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:3000/question');
        if (response.ok) {
            questions = await response.json();
            console.log('Questions chargées depuis question.json:', questions.length, 'questions');
        } else {
            throw new Error('Fichier question.json non trouvé');
        }
    } catch (error) {
        console.warn('Impossible de charger question.json:', error.message);
    }
}

function showScreen(screenToShow) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    screenToShow.classList.add('active');
}

createQuestionsBtn.addEventListener('click', async () => {
    showScreen(questionCreationScreen);
    updateQuestionCount();
});

backToStartBtn1.addEventListener('click', () => {
    showScreen(startScreen);
});

backToStartBtn.addEventListener('click', () => {
    showScreen(startScreen);
});

backToStartFromQuestions.addEventListener('click', () => {
    showScreen(startScreen);
});

backToStartAfterCreation.addEventListener('click', () => {
    showScreen(startScreen);
    resetQuestionForm();
});

createAnotherQuestionBtn.addEventListener('click', () => {
    questionSuccessMessage.classList.add('hidden');
    questionForm.classList.remove('hidden');
    resetQuestionForm();
});

addAnswerBtn.addEventListener('click', addAnswerOption);

function addAnswerOption() {
    const answersContainer = document.getElementById('answers-container');
    const answerItems = answersContainer.querySelectorAll('.answer-item');
    const answerIndex = answerItems.length;
    
    if (answerIndex >= 4) {
        alert('Vous ne pouvez pas ajouter plus de 4 réponses.');
        return;
    }
    
    const answerItem = document.createElement('div');
    answerItem.className = 'answer-item';
    answerItem.innerHTML = `
        <input type="text" class="answer-text" placeholder="Réponse ${answerIndex + 1}" required>
        <label class="correct-answer">
            <input type="radio" name="correct-answer" value="${answerIndex}">
            Correct
        </label>
        <button type="button" class="remove-answer-btn">✕</button>
    `;
    
    answersContainer.appendChild(answerItem);
    updateRemoveButtons();
    
    const removeBtn = answerItem.querySelector('.remove-answer-btn');
    removeBtn.addEventListener('click', () => removeAnswerOption(answerItem));
}

function removeAnswerOption(answerItem) {
    const answersContainer = document.getElementById('answers-container');
    const answerItems = answersContainer.querySelectorAll('.answer-item');
    
    if (answerItems.length <= 2) {
        alert('Vous devez avoir au moins 2 réponses.');
        return;
    }
    
    answerItem.remove();
    updateAnswerPlaceholders();
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const answerItems = document.querySelectorAll('.answer-item');
    const removeButtons = document.querySelectorAll('.remove-answer-btn');
    
    removeButtons.forEach(btn => {
        btn.style.display = answerItems.length > 2 ? 'flex' : 'none';
    });
}

function updateAnswerPlaceholders() {
    const answerTexts = document.querySelectorAll('.answer-text');
    const radioInputs = document.querySelectorAll('input[name="correct-answer"]');
    
    answerTexts.forEach((input, index) => {
        input.placeholder = `Réponse ${index + 1}`;
    });
    
    radioInputs.forEach((radio, index) => {
        radio.value = index;
    });
}

function resetQuestionForm() {
    questionForm.reset();

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = `
        <div class="answer-item">
            <input type="text" class="answer-text" placeholder="Réponse 1" required>
            <label class="correct-answer">
                <input type="radio" name="correct-answer" value="0" required>
                Correct
            </label>
            <button type="button" class="remove-answer-btn" style="display: none;">✕</button>
        </div>
        <div class="answer-item">
            <input type="text" class="answer-text" placeholder="Réponse 2" required>
            <label class="correct-answer">
                <input type="radio" name="correct-answer" value="1">
                Correct
            </label>
            <button type="button" class="remove-answer-btn" style="display: none;">✕</button>
        </div>
    `;

    const removeButtons = answersContainer.querySelectorAll('.remove-answer-btn');
    removeButtons.forEach((btn, index) => {
        const answerItem = btn.closest('.answer-item');
        btn.addEventListener('click', () => removeAnswerOption(answerItem));
    });
    
    updateQuestionCount();
}

function updateQuestionCount() {
    const existingCounter = document.getElementById('question-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    if (questions.length > 0) {
        const counter = document.createElement('div');
        counter.id = 'question-counter';
        counter.style.cssText = 'margin: 10px 0; padding: 10px; background: #e8f5e8; border-radius: 5px; font-weight: bold; color: #2d5f2d;';
        counter.textContent = `📊 Nombre de questions créées : ${questions.length}`;
        
        const questionCreationScreen = document.getElementById('question-creation-screen');
        const title = questionCreationScreen.querySelector('h2');
        title.insertAdjacentElement('afterend', counter);
    }
}

questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('=== DÉBUT DU DÉBOGAGE DU FORMULAIRE ===');
    
    const formData = new FormData(questionForm);
    const questionText = formData.get('question-text');
    const theme = formData.get('question-theme');
    const level = formData.get('question-level');
    const correctAnswerIndex = formData.get('correct-answer');
    
    console.log('Données du formulaire:');
    console.log('- Question:', questionText);
    console.log('- Thème:', theme);
    console.log('- Niveau:', level);
    console.log('- Index réponse correcte:', correctAnswerIndex);
    
    // Validation de base
    if (!questionText || questionText.trim() === '') {
        alert('Veuillez saisir une question.');
        console.log('❌ Erreur: Question vide');
        return;
    }
    
    if (!theme || theme === '') {
        alert('Veuillez sélectionner un thème.');
        console.log('❌ Erreur: Thème non sélectionné');
        return;
    }
    
    if (!level || level === '') {
        alert('Veuillez sélectionner un niveau.');
        console.log('❌ Erreur: Niveau non sélectionné');
        return;
    }
    
    if (!correctAnswerIndex && correctAnswerIndex !== '0') {
        alert('Veuillez sélectionner une réponse correcte.');
        console.log('❌ Erreur: Aucune réponse correcte sélectionnée');
        return;
    }
    
    const answerTexts = questionForm.querySelectorAll('.answer-text');
    const answers = [];
    const correctIndex = parseInt(correctAnswerIndex);
    
    console.log('Traitement des réponses:');
    answerTexts.forEach((input, index) => {
        const answerText = input.value.trim();
        if (answerText) {
            const answer = {
                label: answerText,
                good: index === correctIndex
            };
            answers.push(answer);
            console.log(`- Réponse ${index + 1}: "${answerText}" ${answer.good ? '(CORRECTE)' : ''}`);
        }
    });
    
    if (answers.length < 2) {
        alert('Vous devez avoir au moins 2 réponses remplies.');
        console.log('❌ Erreur: Moins de 2 réponses');
        return;
    }
    
    const hasCorrectAnswer = answers.some(answer => answer.good === true);
    if (!hasCorrectAnswer) {
        alert('Aucune réponse correcte n\'a été trouvée. Veuillez vérifier votre sélection.');
        console.log('❌ Erreur: Aucune réponse marquée comme correcte');
        return;
    }
    
    const newQuestion = {
        label: questionText.trim(),
        theme: theme,
        level: level,
        choix: answers
    };

    questions.push(newQuestion);
    console.log('✅ Nouvelle question créée avec succès:', newQuestion);
    console.log('=== FIN DU DÉBOGAGE ===');
    questionForm.classList.add('hidden');
    questionSuccessMessage.classList.remove('hidden');
    
    updateQuestionCount();

    const response = await fetch('http://localhost:3000/question', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
            newQuestion
        )
        })
        console.log(questions)

    loadQuestions()
});

showQuestionsBtn.addEventListener('click', () => {
    showScreen(showQuestionScreen)
    showQuestions.innerHTML = ''
    questions.forEach(question => {
        const div = document.createElement('div')
        const titre = document.createElement('h1')
        titre.textContent = question.label
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'X'
        div.append(titre, deleteBtn)
        showQuestions.append(div)
        
        deleteBtn.addEventListener('click', async () => {
            const deletedQuestion = question.label
            fetch(`http://localhost:3000/question/delete/${question._id}`, {
                method: 'DELETE'
            })
            .then(console.log(deletedQuestion + ' bien supprimé'))
            .catch(err=>console.log(err))
            div.remove()
        })
})
})

document.addEventListener('DOMContentLoaded', () => {
    loadQuestions().then(() => {
        updateQuestionCount();
    });
});
