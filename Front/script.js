const loginBtn = document.getElementById("login-btn");
const createQuizBtn = document.getElementById("create-quiz-btn");
const createQuestionsBtn = document.getElementById("create-questions-btn");
const selectQuizBtn = document.getElementById("select-quiz-btn");
const showQuestionsBtn = document.getElementById("show-questions-btn");
const showQuestionScreen = document.getElementById("show-questions-screen");
let showQuestions = document.getElementById("show-questions");
const backToStartBtn1 = document.getElementById("back-to-start");
const backToStartBtn = document.getElementById("back-to-start-btn");
const backToStartFromQuestions = document.getElementById("back-to-start-from-questions");
const backToStartAfterCreation = document.getElementById("back-to-start-after-creation");
const backToStartFromQuiz = document.getElementById("back-to-start-from-quiz");
const backToStartFromModify = document.getElementById("back-to-start-from-modify");
const backToStartFromQuestions = document.getElementById(
  "back-to-start-from-questions"
);
const backToStartAfterCreation = document.getElementById(
  "back-to-start-after-creation"
);
const backToStartFromQuiz = document.getElementById("back-to-start-from-quiz");
const backToStartFromModify = document.getElementById(
  "back-to-start-from-modify"
);
const loginText = document.getElementById("login-text");
const userName = document.getElementById("user-name");
const startScreen = document.getElementById("start-screen");
const quizSelectionScreen = document.getElementById("quiz-selection-screen");
const quizCreationScreen = document.getElementById("quiz-creation-screen");
const questionCreationScreen = document.getElementById("question-creation-screen");
const quizList = document.getElementById("quiz-list");
const questionForm = document.getElementById("question-form");
const quizForm = document.getElementById("quiz-form");
const quizSuccessMessage = document.getElementById("quiz-success-message");
const questionsDropdown = document.getElementById("questions-dropdown");
const addQuestionBtn = document.getElementById("add-question-btn");
const selectedQuestionsContainer = document.getElementById(
  "selected-questions-container"
);
const addAnswerBtn = document.getElementById("add-answer-btn");
const createAnotherQuestionBtn = document.getElementById("create-another-question-btn");
const questionSuccessMessage = document.getElementById("question-success-message");
let currentUser = null;
let questions = [];
let quizzes = [];
let selectedQuestions = [];

async function loadQuestions() {
  try {
    const response = await fetch("http://localhost:3000/question");
    if (response.ok) {
      questions = await response.json();
      console.log(
        "Questions chargées depuis la DB:",
        questions.length,
        "questions"
      );
    } else {
      throw new Error("Erreur lors du chargement des questions depuis la DB");
    }
  } catch (error) {
    console.warn("Impossible de charger question.json:", error.message);
  }
}

function showScreen(screenToShow) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((screen) => screen.classList.remove("active"));
  screenToShow.classList.add("active");
}

createQuizBtn.addEventListener("click", async () => {
  await loadQuestions();
  populateQuestionsDropdown();
  selectedQuestions = [];
  displaySelectedQuestions();
  showScreen(quizCreationScreen);
});

createQuestionsBtn.addEventListener("click", async () => {
  showScreen(questionCreationScreen);
  updateQuestionCount();
});

backToStartBtn1.addEventListener("click", () => {
  showScreen(startScreen);
});

selectQuizBtn.addEventListener("click", async () => {
  await loadQuizzes();
  displayQuizList();
  showScreen(quizSelectionScreen);
});

backToStartBtn1.addEventListener("click", () => {
  showScreen(startScreen);
});

backToStartBtn.addEventListener("click", () => {
  showScreen(startScreen);
});

backToStartFromQuestions.addEventListener("click", () => {
  showScreen(startScreen);
});

backToStartAfterCreation.addEventListener("click", () => {
  showScreen(startScreen);
  resetQuestionForm();
});

backToStartFromQuiz.addEventListener("click", () => {
  showScreen(startScreen);
});

backToStartFromModify.addEventListener("click", () => {
  showScreen(startScreen);
});

createAnotherQuestionBtn.addEventListener("click", () => {
  questionSuccessMessage.classList.add("hidden");
  questionForm.classList.remove("hidden");
  resetQuestionForm();
});

const createAnotherQuizBtn = document.getElementById("create-another-quiz-btn");
if (createAnotherQuizBtn) {
  createAnotherQuizBtn.addEventListener("click", () => {
    quizSuccessMessage.classList.add("hidden");
    quizForm.classList.remove("hidden");
    resetQuizForm();
    populateQuestionsDropdown();
  });
}

if (addQuestionBtn) {
  addQuestionBtn.addEventListener("click", addSelectedQuestion);
}

addAnswerBtn.addEventListener("click", addAnswerOption);
createAnotherQuestionBtn.addEventListener("click", () => {
  questionSuccessMessage.classList.add("hidden");
  questionForm.classList.remove("hidden");
  resetQuestionForm();
});

addAnswerBtn.addEventListener("click", addAnswerOption);
addAnswerBtn.addEventListener("click", addAnswerOption);

function addAnswerOption() {
  const answersContainer = document.getElementById("answers-container");
  const answerItems = answersContainer.querySelectorAll(".answer-item");
  const answerIndex = answerItems.length;

  if (answerIndex >= 4) {
    alert("Vous ne pouvez pas ajouter plus de 4 réponses.");
    return;
  }

  const answerItem = document.createElement("div");
  answerItem.className = "answer-item";
  answerItem.innerHTML = `
        <input type="text" class="answer-text" placeholder="Réponse ${
          answerIndex + 1
        }" required>
        <label class="correct-answer">
            <input type="radio" name="correct-answer" value="${answerIndex}">
            Correct
        </label>
        <button type="button" class="remove-answer-btn">✕</button>
    `;

  answersContainer.appendChild(answerItem);
  updateRemoveButtons();

  const removeBtn = answerItem.querySelector(".remove-answer-btn");
  removeBtn.addEventListener("click", () => removeAnswerOption(answerItem));
}

function removeAnswerOption(answerItem) {
  const answersContainer = document.getElementById("answers-container");
  const answerItems = answersContainer.querySelectorAll(".answer-item");

  if (answerItems.length <= 2) {
    alert("Vous devez avoir au moins 2 réponses.");
    return;
  }

  answerItem.remove();
  updateAnswerPlaceholders();
  updateRemoveButtons();
}

function updateRemoveButtons() {
  const answerItems = document.querySelectorAll(".answer-item");
  const removeButtons = document.querySelectorAll(".remove-answer-btn");

  removeButtons.forEach((btn) => {
    btn.style.display = answerItems.length > 2 ? "flex" : "none";
  });
}

function updateAnswerPlaceholders() {
  const answerTexts = document.querySelectorAll(".answer-text");
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

  const answersContainer = document.getElementById("answers-container");
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

  const removeButtons = answersContainer.querySelectorAll(".remove-answer-btn");
  removeButtons.forEach((btn, index) => {
    const answerItem = btn.closest(".answer-item");
    btn.addEventListener("click", () => removeAnswerOption(answerItem));
  });

  updateQuestionCount();
}

function updateQuestionCount() {
  const existingCounter = document.getElementById("question-counter");
  if (existingCounter) {
    existingCounter.remove();
  }

  if (questions.length > 0) {
    const counter = document.createElement("div");
    counter.id = "question-counter";
    counter.style.cssText =
      "margin: 10px 0; padding: 10px; background: #e8f5e8; border-radius: 5px; font-weight: bold; color: #2d5f2d;";
    counter.textContent = `📊 Nombre de questions créées : ${questions.length}`;

    const questionCreationScreen = document.getElementById(
      "question-creation-screen"
    );
    const title = questionCreationScreen.querySelector("h2");
    title.insertAdjacentElement("afterend", counter);
  }
}

questionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("=== DÉBUT DU DÉBOGAGE DU FORMULAIRE ===");

  const formData = new FormData(questionForm);
  const questionText = formData.get("question-text");
  const theme = formData.get("question-theme");
  const level = formData.get("question-level");
  const correctAnswerIndex = formData.get("correct-answer");

  console.log("Données du formulaire:");
  console.log("- Question:", questionText);
  console.log("- Thème:", theme);
  console.log("- Niveau:", level);
  console.log("- Index réponse correcte:", correctAnswerIndex);

  if (!questionText || questionText.trim() === "") {
    alert("Veuillez saisir une question.");
    console.log("❌ Erreur: Question vide");
    return;
  }

  if (!theme || theme === "") {
    alert("Veuillez sélectionner un thème.");
    console.log("❌ Erreur: Thème non sélectionné");
    return;
  }

  if (!level || level === "") {
    alert("Veuillez sélectionner un niveau.");
    console.log("❌ Erreur: Niveau non sélectionné");
    return;
  }

  if (!correctAnswerIndex && correctAnswerIndex !== "0") {
    alert("Veuillez sélectionner une réponse correcte.");
    console.log("❌ Erreur: Aucune réponse correcte sélectionnée");
    return;
  }

  const answerTexts = questionForm.querySelectorAll(".answer-text");
  const answers = [];
  const correctIndex = parseInt(correctAnswerIndex);

  console.log("Traitement des réponses:");
  answerTexts.forEach((input, index) => {
    const answerText = input.value.trim();
    if (answerText) {
      const answer = {
        label: answerText,
        good: index === correctIndex,
      };
      answers.push(answer);
      console.log(
        `- Réponse ${index + 1}: "${answerText}" ${
          answer.good ? "(CORRECTE)" : ""
        }`
      );
    }
  });

  if (answers.length < 2) {
    alert("Vous devez avoir au moins 2 réponses remplies.");
    console.log("❌ Erreur: Moins de 2 réponses");
    return;
  }

  const hasCorrectAnswer = answers.some((answer) => answer.good === true);
  if (!hasCorrectAnswer) {
    alert(
      "Aucune réponse correcte n'a été trouvée. Veuillez vérifier votre sélection."
    );
    console.log("❌ Erreur: Aucune réponse marquée comme correcte");
    return;
  }

  const newQuestion = {
    label: questionText.trim(),
    theme: theme,
    level: level,
    choix: answers,
  };

  questions.push(newQuestion);
  console.log("✅ Nouvelle question créée avec succès:", newQuestion);
  console.log("=== FIN DU DÉBOGAGE ===");
  questionForm.classList.add("hidden");
  questionSuccessMessage.classList.remove("hidden");

  updateQuestionCount();

  const response = await fetch("http://localhost:3000/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });
  console.log();

  loadQuestions();
});

showQuestionsBtn.addEventListener("click", () => {
  showScreen(showQuestionScreen);
  showQuestions.innerHTML = "";
  questions.forEach((question) => {
    const div = document.createElement("div");
    div.className = "form_question";
    const titre = document.createElement("h3");
    titre.textContent = question.label;
    const modifBtn = document.createElement("button");
    modifBtn.textContent = "✏️";
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    div.append(titre, modifBtn, deleteBtn);
    showQuestions.append(div);

    deleteBtn.addEventListener("click", async () => {
      const deletedQuestion = question.label;

      fetch(`http://localhost:3000/question/delete/${question._id}`, {
        method: "DELETE",
      })
        .then(console.log(deletedQuestion + " bien supprimé"))
        .catch((err) => console.log(err));
      div.remove();
    });

    const questionModifScreen = document.getElementById(
      "question-modif-screen"
    );
    const questionLabel = document.getElementById("label");
    const questionTheme = document.getElementById("theme");
    const questionLevel = document.getElementById("level");
    const answersContainer = document.getElementById("answers");
    const questionModifyForm = document.getElementById("questionModifyForm");

    modifBtn.addEventListener("click", async () => {
      const modifQuestion = question.label;
      showScreen(questionModifScreen);

      questionLabel.value = question.label;
      console.log(questionLabel.value);
      questionTheme.value = question.theme;
      console.log(questionTheme.value);

      questionLevel.value = question.level;
      console.log(questionLevel.value);

      question.choix.forEach((choi) => {
        answersContainer.innerHTML += `
        <div class="answer-item">
                <input
                  type="text"
                  class="answer-text"
                  value=${choi.label}
                  required
                />
                <label class="correct-answer">
                  <input
                    type="radio"
                    name="correct-answer"
                    value=${question.choix.indexOf(choi)}
                    ${choi.good ? "checked" : ""}
                    required
                  />
                  Correct
                </label>
              </div>
        `;
        console.log(choi.good);
      });

      questionModifyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(questionModifyForm);
        const questionText = formData.get("question-text");
        const theme = formData.get("question-theme");
        const level = formData.get("question-level");
        const correctAnswerIndex = formData.get("correct-answer");
        console.log(correctAnswerIndex);
        const answerTexts = questionModifyForm.querySelectorAll(".answer-text");
        const answers = [];
        const correctIndex =
          correctAnswerIndex !== undefined ? parseInt(correctAnswerIndex) : -1;

        const correctRadios = document.querySelectorAll(".correct-radio");
        console.log("- Index réponse correcte:", correctAnswerIndex);

        answerTexts.forEach((input, index) => {
          console.log(input.value + "console.log 1 ");
          const answerText = input.value.trim();
          if (answerText) {
            const answer = {
              label: answerText,
              good: index === correctIndex,
            };
            answers.push(answer);
            console.log(
              `- Réponse ${index + 1}: "${answerText}" ${
                answer.good ? "(CORRECTE)" : ""
              }`
            );
          }
        });

        const newQuestion = {
          label: questionText.trim(),
          theme: theme,
          level: level,
          choix: answers,
        };

        questions.push(newQuestion);
        console.log("✅ Nouvelle question créée avec succès:", newQuestion);
        console.log("=== FIN DU DÉBOGAGE ===");
        questionForm.classList.add("hidden");
        questionSuccessMessage.classList.remove("hidden");

        const response = await fetch(
          `http://localhost:3000/question/update/${question._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
          }
        )
          .then(console.log(modifQuestion + " bien Modifier"))
          .catch((err) => console.log(err));

        console.log(question._id + "id de la question");
      });
    });
  });
});
// ! Maintenant rajouter le faire que c'est as envoyer l'objet modifier et le rec dans la DB

document.addEventListener("DOMContentLoaded", () => {
  loadQuestions().then(() => {
    updateQuestionCount();
  });
});

async function loadQuizzes() {
  try {
    const response = await fetch("http://localhost:3000/quizz");
    if (response.ok) {
      quizzes = await response.json();
      console.log("Quiz chargés depuis la DB:", quizzes.length, "quiz");
    } else {
      throw new Error("Erreur lors du chargement des quiz depuis la DB");
    }
  } catch (error) {
    console.warn("Impossible de charger les quiz depuis la DB:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadQuestions();
  await loadQuizzes();
  updateQuestionCount();

  if (questionsDropdown) {
    populateQuestionsDropdown();
  }
});

function populateQuestionsDropdown() {
  if (!questionsDropdown) return;

  questionsDropdown.innerHTML =
    '<option value="">-- Sélectionnez une question à ajouter --</option>';

  if (questions.length === 0) {
    const noQuestionsOption = document.createElement("option");
    noQuestionsOption.textContent = "Aucune question disponible";
    noQuestionsOption.disabled = true;
    questionsDropdown.appendChild(noQuestionsOption);
    return;
  }

  questions.forEach((question, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${question.label} (${question.theme} - ${question.level})`;
    questionsDropdown.appendChild(option);
  });
}

function displaySelectedQuestions() {
  if (!selectedQuestionsContainer) return;

  selectedQuestionsContainer.innerHTML = "";

  if (selectedQuestions.length === 0) {
    const noQuestionsMessage = document.createElement("p");
    noQuestionsMessage.className = "no-questions-message";
    noQuestionsMessage.textContent = "Aucune question sélectionnée";
    selectedQuestionsContainer.appendChild(noQuestionsMessage);
    return;
  }

  selectedQuestions.forEach((questionIndex, listIndex) => {
    const question = questions[questionIndex];
    if (!question) return;

    const questionItem = document.createElement("div");
    questionItem.className = "selected-question-item";
    questionItem.innerHTML = `
      <div class="question-content">
        <div class="question-title">${question.label}</div>
        <div class="question-badges">
          <span class="theme-badge">${question.theme}</span>
          <span class="level-badge">${question.level}</span>
        </div>
      </div>
      <button type="button" class="remove-question-btn" data-index="${listIndex}">
        ✕
      </button>
    `;

    const removeBtn = questionItem.querySelector(".remove-question-btn");
    removeBtn.addEventListener("click", () =>
      removeSelectedQuestion(listIndex)
    );

    selectedQuestionsContainer.appendChild(questionItem);
  });
}

function addSelectedQuestion() {
  const selectedIndex = questionsDropdown.value;

  if (!selectedIndex || selectedIndex === "") {
    alert("Veuillez sélectionner une question à ajouter.");
    return;
  }

  const questionIndex = parseInt(selectedIndex);

  // Regarde si la question est déjà sélectionnée
  if (selectedQuestions.includes(questionIndex)) {
    alert("Cette question est déjà sélectionnée.");
    questionsDropdown.value = "";
    return;
  }

  selectedQuestions.push(questionIndex);
  displaySelectedQuestions();
  questionsDropdown.value = "";

  console.log("Question ajoutée. Total sélectionné:", selectedQuestions.length);
}

function removeSelectedQuestion(listIndex) {
  selectedQuestions.splice(listIndex, 1);
  displaySelectedQuestions();
  console.log(
    "Question supprimée. Total sélectionné:",
    selectedQuestions.length
  );
}

function displayQuizList() {
  if (!quizList) return;

  quizList.innerHTML = "";

  if (quizzes.length === 0) {
    quizList.innerHTML =
      "<p>Aucun quiz disponible pour le moment. Créez d'abord des quiz.</p>";
    return;
  }

    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.style.cssText = 'border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 8px; cursor: pointer;';
        quizItem.innerHTML = `
            <h3>${quiz.title}</h3>
            <p><strong>Description:</strong> ${quiz.description || 'Aucune description'}</p>
            <div class="quiz-meta">
                <span class="theme-badge theme-${quiz.theme}">${
      quiz.theme
    }</span>
                <span class="level-badge level-${quiz.level}">${
      quiz.level
    }</span>
                <span class="questions-count">${
                  quiz.questions ? quiz.questions.length : 0
                } questions</span>
              </div></>
        `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    quizItem.append(deleteBtn);

    deleteBtn.addEventListener("click", async () => {
      const deletedQuizz = quiz.title;
      fetch(`http://localhost:3000/quizz/delete/${quiz._id}`, {
        method: "DELETE",
      })
        .then(console.log(deletedQuizz + " bien supprimé"))
        .catch((err) => console.log(err));
      quizItem.remove();
    });

    quizItem.addEventListener("click", () => {
      console.log("Quiz sélectionné:", quiz);
    });

    quizList.appendChild(quizItem);
  });
}

function resetQuizForm() {
  if (!quizForm) return;

  quizForm.reset();
  selectedQuestions = [];
  displaySelectedQuestions();
  if (questionsDropdown) {
    questionsDropdown.value = "";
  }
}

async function saveQuizToDatabase(quizData) {
  try {
    console.log(quizData);
    const response = await fetch("http://localhost:3000/quizz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("Quiz sauvegardé en base de données:", result);
    return result;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde en base de données:", error);
    console.log("Fallback: sauvegarde en localStorage");
    throw error;
  }
}

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("=== DÉBUT DE LA CRÉATION DU QUIZ ===");

  const formData = new FormData(quizForm);
  const quizName = formData.get("quiz-name");
  const quizDescription = formData.get("quiz-description") || "";
  const quizTheme = formData.get("quiz-theme");
  const quizLevel = formData.get("quiz-level");

  if (!quizName || quizName.trim() === "") {
    alert("Veuillez saisir un nom pour le quiz.");
    return;
  }

  if (!quizTheme || quizTheme === "") {
    alert("Veuillez sélectionner un thème.");
    return;
  }

  if (!quizLevel || quizLevel === "") {
    alert("Veuillez sélectionner un niveau.");
    return;
  }

  if (selectedQuestions.length === 0) {
    alert("Veuillez sélectionner au moins une question pour le quiz.");
    return;
  }

  const selectedQuestionIds = [];
  selectedQuestions.forEach((questionIndex) => {
    selectedQuestionIds.push(questions[questionIndex]._id);
  });

  const newQuiz = {
    title: quizName.trim(),
    description: quizDescription.trim(),
    theme: quizTheme,
    level: quizLevel,
    questions: selectedQuestionIds,
  };

  console.log("Nouveau quiz créé:", newQuiz);
  console.log(`- Nom: ${newQuiz.name}`);
  console.log(`- Thème: ${newQuiz.theme}`);
  console.log(`- Niveau: ${newQuiz.level}`);
  console.log(`- Nombre de questions: ${selectedQuestions.length}`);

  try {
    const result = await saveQuizToDatabase(newQuiz);
    console.log("Quiz sauvegardé en base de données avec succès");

    // Recharger les quiz depuis la DB
    await loadQuizzes();

    quizForm.classList.add("hidden");
    quizSuccessMessage.classList.remove("hidden");
  } catch (error) {
    console.warn(
      "Échec de la sauvegarde en base de données, sauvegarde en localStorage"
    );

    newQuiz.id = Date.now();
    quizzes.push(newQuiz);

    try {
      localStorage.setItem("quiz-collection", JSON.stringify(quizzes));
      console.log("Quiz sauvegardé dans localStorage");

      quizForm.classList.add("hidden");
      quizSuccessMessage.classList.remove("hidden");
    } catch (localError) {
      console.error(
        "Erreur lors de la sauvegarde dans localStorage:",
        localError
      );
      alert("Erreur lors de la sauvegarde du quiz. Veuillez réessayer.");
      return;
    }
  }

  console.log("=== FIN DE LA CRÉATION DU QUIZ ===");
});
