let score = 0;
let answered = false;

let allQuestions = [
  {
    text: "Your friend returned your hoodie with a stain. What do you say?",
    options: [
      { text: "What did you do to my hoodie?!", score: 0, type: "too direct", explanation: "Aggressive and accusatory." },
      { text: "Hey, I think there’s a stain here—do you know what happened?", score: 1, type: "appropriate", explanation: "Uses softener ('I think') + indirect question instead of accusation." },
      { text: "There’s a stain on this.", score: 0.5, type: "acceptable", explanation: "Clear, but no softener or question." },
      { text: "It's fine.", score: 0, type: "too indirect", explanation: "Avoids the issue." }
    ]
  },

  {
    text: "You are late to meet your friend. What do you say?",
    options: [
      { text: "I'm late.", score: 0, type: "too blunt", explanation: "Too blunt." },
      { text: "Sorry I'm late! I'll be there in 10 minutes.", score: 1, type: "appropriate", explanation: "Includes apology + specific information (repair strategy)."},
      { text: "Hey, I’m running a bit late.", score: 0.5, type: "acceptable", explanation: "Uses softener ('a bit'), but lacks detail" },
      { text: "Relax.", score: 0, type: "dismissive", explanation: "Minimizes impact." }
    ]
  },

  {
    text: "You want extra time for an assignment. What do you say?",
    options: [
      { text: "Give me more time.", score: 0, type: "too direct", explanation: "Too commanding." },
      { text: "Could I possibly have an extra day to finish this?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + softener ('possibly')." },
      { text: "Is it okay if I turn it in late?", score: 0.5, type: "acceptable", explanation: "Polite question, but less formal and less mitigated." },
      { text: "I didn’t do it.", score: 0, type: "avoidance", explanation: "Doesn’t solve the issue." }
    ]
  },

  {
    text: "You think your teacher graded you unfairly. What do you say?",
    options: [
      { text: "This grade is wrong.", score: 0, type: "too direct", explanation: "Too blunt." },
      { text: "I was wondering if we could review my grade together.", score: 1, type: "appropriate", explanation: "Uses intro phrase ('I was wondering if') + collaborative language." },
      { text: "I think there might be a mistake.", score: 0.5, type: "acceptable", explanation: "Uses softeners ('I think', 'might'), but less collaborative." },
      { text: "You made a mistake.", score: 0, type: "accusatory", explanation: "Sounds confrontational." }
    ]
  },

  {
    text: "A server brought you the wrong drink. What do you say?",
    options: [
      { text: "This is wrong.", score: 0, type: "too direct", explanation: "Too blunt." },
      { text: "Excuse me, I think I ordered a Sprite.", score: 1, type: "appropriate", explanation: "Uses softener ('I think') + indirect correction." },
      { text: "I asked for something else.", score: 0.5, type: "acceptable", explanation: "Clear, but no softener. Slightly blunt." },
      { text: "Whatever.", score: 0, type: "dismissive", explanation: "Too informal." }
    ]
  },

  {
    text: "You didn’t understand the homework. What do you say?",
    options: [
      { text: "I don't get it.", score: 0, type: "too blunt", explanation: "Too abrupt." },
      { text: "Could you explain it again, please?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + 'please' for politeness." },
      { text: "I’m not sure I understood. Could you go over it again?", score: 1, type: "appropriate", explanation: "Takes responsibility + uses modal ('could'). Effective." },
      { text: "This makes no sense.", score: 0, type: "negative", explanation: "Sounds too critical." }
    ]
  },

  {
    text: "It is 11:30 PM and your neighbor is playing loud music. What do you say?",
    options: [
      { text: "Turn that music down right now!", score: 0, type: "too direct", explanation: "Sounds aggressive." },
      { text: "Sorry to bother you, but it’s quite loud and I have an exam tomorrow. Would it be possible to lower it?", score: 1, type: "appropriate", explanation: "Uses apology + softener ('quite') + modal ('would it be possible')." },
      { text: "It’s really loud.", score: 0.5, type: "acceptable", explanation: "States problem, but no request or softening strategy." },
      { text: "You’re being inconsiderate.", score: 0, type: "too harsh", explanation: "Judgment, not a request." }
    ]
  },

  {
    text: "You are at a restaurant and your fork is dirty. What do you say?",
    options: [
      { text: "This is dirty. Bring me another one.", score: 0, type: "too direct", explanation: "Too blunt." },
      { text: "Excuse me, there seems to be a slight problem with this fork. Could I get another one?", score: 1, type: "appropriate", explanation: "Uses 'there seems to be' + 'slight' + modal ('could'). Very polite." },
      { text: "I think this isn’t clean. Could I have another one?", score: 0.5, type: "acceptable", explanation: "Uses softener ('I think') + modal ('could'), but less refined." },
      { text: "Um… this fork…", score: 0, type: "too indirect", explanation: "Too unclear." }
    ]
  }
];

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
    document.getElementById("feedback").innerText = "";
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

  score += option.score;

  let feedbackText = "[" + option.type.toUpperCase() + "]\n" + option.explanation;

  if (option.score === 1) {
    remainingQuestions = remainingQuestions.filter(function(q) {
      return q !== currentQuestion;
    });
    feedbackText = "✅ " + feedbackText;
  } else if (option.score === 0.5) {
    feedbackText = "🟡 " + feedbackText;
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

updateScore();
nextRound();
