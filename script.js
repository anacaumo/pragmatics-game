let currentLevel = "";
let currentSituation = null;
let score = 0;
let answered = false;

const data = {

  friends: [
    {
      text: "Your friend returned your hoodie with a stain. What do you say?",
      options: [
        {
          text: "What did you do to my hoodie?!",
          type: "too direct",
          correct: false,
          explanation: "This sounds aggressive and accusatory."
        },
        {
          text: "Hey, I think there’s a stain on this. Do you know what happened?",
          type: "appropriate",
          correct: true,
          explanation: "Good balance: soft, but still addresses the problem."
        },
        {
          text: "It's fine.",
          type: "too indirect",
          correct: false,
          explanation: "You avoid the issue completely."
        },
        {
          text: "You always ruin my stuff.",
          type: "too harsh",
          correct: false,
          explanation: "Overgeneralizing makes it worse."
        }
      ]
    },
    {
      text: "You are late to meet your friend at the mall. What do you say?",
      options: [
        {
          text: "I'm late.",
          type: "too blunt",
          correct: false,
          explanation: "Too short, no apology."
        },
        {
          text: "Sorry I'm late! I'll be there in 10 minutes.",
          type: "appropriate",
          correct: true,
          explanation: "Good: apology + information."
        },
        {
          text: "Relax.",
          type: "dismissive",
          correct: false,
          explanation: "Minimizes the situation."
        },
        {
          text: "Traffic.",
          type: "too vague",
          correct: false,
          explanation: "Not enough effort."
        }
      ]
    }
  ],

  school: [
    {
      text: "You want extra time for an assignment. What do you say to your teacher?",
      options: [
        {
          text: "Give me more time.",
          type: "too direct",
          correct: false,
          explanation: "Too commanding."
        },
        {
          text: "Could I possibly have an extra day to finish this?",
          type: "appropriate",
          correct: true,
          explanation: "Uses modal + softener = polite request."
        },
        {
          text: "I didn’t do it.",
          type: "avoidance",
          correct: false,
          explanation: "Doesn’t solve the situation."
        },
        {
          text: "This assignment is unfair.",
          type: "confrontational",
          correct: false,
          explanation: "Sounds like a complaint, not a request."
        }
      ]
    },
    {
      text: "You didn’t understand the homework. What do you say?",
      options: [
        {
          text: "I don't get it.",
          type: "too blunt",
          correct: false,
          explanation: "Too abrupt."
        },
        {
          text: "Could you explain the homework again, please?",
          type: "appropriate",
          correct: true,
          explanation: "Polite request with modal and 'please'."
        },
        {
          text: "This makes no sense.",
          type: "negative",
          correct: false,
          explanation: "Sounds critical."
        },
        {
          text: "Never mind.",
          type: "avoidance",
          correct: false,
          explanation: "You give up instead of asking."
        }
      ]
    }
  ],

  authority: [
    {
      text: "You think your teacher graded you unfairly. What do you say?",
      options: [
        {
          text: "This grade is wrong.",
          type: "too direct",
          correct: false,
          explanation: "Too blunt for authority."
        },
        {
          text: "I was wondering if we could review my grade together.",
          type: "appropriate",
          correct: true,
          explanation: "Indirect + respectful."
        },
        {
          text: "You made a mistake.",
          type: "accusatory",
          correct: false,
          explanation: "Sounds confrontational."
        },
        {
          text: "Okay.",
          type: "passive",
          correct: false,
          explanation: "No communication."
        }
      ]
    },
    {
      text: "A server brought you the wrong drink. What do you say?",
      options: [
        {
          text: "This is wrong.",
          type: "too direct",
          correct: false,
          explanation: "Too blunt."
        },
        {
          text: "Excuse me, I think I ordered a Sprite.",
          type: "appropriate",
          correct: true,
          explanation: "Polite and indirect."
        },
        {
          text: "Why did you bring this?",
          type: "accusatory",
          correct: false,
          explanation: "Sounds blaming."
        },
        {
          text: "Whatever.",
          type: "dismissive",
          correct: false,
          explanation: "Too informal."
        }
      ]
    }
  ]

};

function startGame(level) {
  currentLevel = level;
  score = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("levelLabel").innerText = "Level: " + level;
  updateScore();

  nextRound();
}

function nextRound() {
  const situations = data[currentLevel];
  currentSituation = situations[Math.floor(Math.random() * situations.length)];

  answered = false;

  document.getElementById("situation").innerText = currentSituation.text;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  currentSituation.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option.text;

    btn.onclick = () => handleAnswer(option);

    optionsDiv.appendChild(btn);
  });

  document.getElementById("feedback").innerText = "";
}

function handleAnswer(option) {
  if (answered) return;

  answered = true;

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(btn => btn.disabled = true);

  let feedbackText = `[${option.type.toUpperCase()}]\n${option.explanation}`;

  if (option.correct) {
    score++;
    feedbackText = "✅ " + feedbackText;
  } else {
    feedbackText = "❌ " + feedbackText;
  }

  document.getElementById("feedback").innerText = feedbackText;

  updateScore();
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}
}