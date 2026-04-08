let score = 0;
let answered = false;

let allQuestions = [
  {
    text: "Your friend returned your hoodie with a stain. What do you say?",
    options: [
      { text: "What did you do to my hoodie?!", correct: false, type: "too direct", explanation: "Aggressive and accusatory." },
      { text: "Hey, I think there is a stain on this. Do you know what happened?", correct: true, type: "appropriate", explanation: "Soft and effective." },
      { text: "It's fine.", correct: false, type: "too indirect", explanation: "Avoids the issue." },
      { text: "You always ruin my stuff.", correct: false, type: "too harsh", explanation: "Overgeneralizes." }
    ]
  },

  {
    text: "You are late to meet your friend. What do you say?",
    options: [
      { text: "I'm late.", correct: false, type: "too blunt", explanation: "No apology." },
      { text: "Sorry I'm late! I'll be there in 10 minutes.", correct: true, type: "appropriate", explanation: "Apology + info." },
      { text: "Relax.", correct: false, type: "dismissive", explanation: "Minimizes impact." },
      { text: "Traffic.", correct: false, type: "too vague", explanation: "Not enough effort." }
    ]
  },

  {
    text: "You want extra time for an assignment. What do you say?",
    options: [
      { text: "Give me more time.", correct: false, type: "too direct", explanation: "Too commanding." },
      { text: "Could I possibly have an extra day to finish this?", correct: true, type: "appropriate", explanation: "Polite request." },
      { text: "I didn’t do it.", correct: false, type: "avoidance", explanation: "Doesn't solve it." },
      { text: "This is unfair.", correct: false, type: "confrontational", explanation: "Sounds like a complaint." }
    ]
  },

  {
    text: "You think your teacher graded you unfairly. What do you say?",
    options: [
      { text: "This grade is wrong.", correct: false, type: "too direct", explanation: "Too blunt." },
      { text: "I was wondering if we could review my grade together.", correct: true, type: "appropriate", explanation: "Respectful and indirect." },
      { text: "You made a mistake.", correct: false, type: "accusatory", explanation: "Sounds confrontational." },
      { text: "Okay.", correct: false, type: "passive", explanation: "No communication." }
    ]
  },

  {
    text: "A server brought you the wrong drink. What do you say?",
    options: [
      { text: "This is wrong.", correct: false, type: "too direct", explanation: "Too blunt." },
      { text: "Excuse me, I think I ordered a Sprite.", correct: true, type: "appropriate", explanation: "Polite correction." },
      { text: "Why did you bring this?", correct: false, type: "accusatory", explanation: "Blaming tone." },
      { text: "Whatever.", correct: false, type: "dismissive", explanation: "Too informal." }
    ]
  },

  {
    text: "You didn’t understand the homework. What do you say?",
    options: [
      { text: "I don't get it.", correct: false, type: "too blunt", explanation: "Too abrupt." },
      { text: "Could you explain it again, please?", correct: true, type: "appropriate", explanation: "Polite request." },
      { text: "This makes no sense.", correct: false, type: "negative", explanation: "Sounds critical." },
      { text: "Never mind.", correct: false, type: "avoidance", explanation: "Gives up." }
    ]
  }
];

// safer copy (instead of [...allQuestions])
let remainingQuestions = allQuestions.slice();

let currentQuestion = null;

function shuffleArray(array) {
  let shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
}

function nextRound() {

  if (remainingQuestions.length === 0) {
    document.getElementById("situation").innerText = "🎉 You finished all questions!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText = "Choose an option to see feedback.";
    return;
  }

  answered = false;

  let index = Math.floor(Math.random() * remainingQuestions.length);
  currentQuestion = remainingQuestions[index];

  document.getElementById("situation").innerText = currentQuestion.text;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  let shuffledOptions = shuffleArray(currentQuestion.options);

shuffledOptions.forEach(function(option) {
    let btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option.text;

    btn.onclick = function () {
      handleAnswer(option);
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "Choose an option to see feedback.";
document.getElementById("feedback").style.color = "#666";
}

function handleAnswer(option) {
  if (answered) return;

  answered = true;

  let buttons = document.querySelectorAll(".option");
  buttons.forEach(function(btn) {
    btn.disabled = true;
  });

  let feedbackText = "[" + option.type.toUpperCase() + "]\n" + option.explanation;

  if (option.correct) {
    score++;

    remainingQuestions = remainingQuestions.filter(function(q) {
      return q !== currentQuestion;
    });

    feedbackText = "✅ " + feedbackText;
  } else {
    feedbackText = "❌ " + feedbackText;
  }

  document.getElementById("feedback").innerText = feedbackText;
document.getElementById("feedback").style.color = "#000";

updateScore();
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}

function restartGame() {
  score = 0;
  remainingQuestions = allQuestions.slice();
  updateScore();
  nextRound();
}

// start game
updateScore();
nextRound();
