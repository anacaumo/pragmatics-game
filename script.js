let score = 0;
let answered = false;

let allQuestions = [
  {
  text: "Your friend returned your hoodie with a stain. What do you say?",
  options: [
    { text: "What did you do to my hoodie?!", score: 0, type: "too direct", explanation: "Direct accusation ('you') with no softener or question. Sounds aggressive." },

    { text: "Hey, I think there’s a stain here—do you know what happened?", score: 1, type: "appropriate", explanation: "Uses softener ('I think') + indirect question. reduces blame and keeps it friendly." },

    { text: "There’s a stain on this.", score: 0.5, type: "acceptable", explanation: "Clear statement, but no softener or question. More direct." },

    { text: "It's fine.", score: 0, type: "too indirect", explanation: "Avoids the issue completely. Lacks request or clarification." }
  ]
},

  {
  text: "You are late to meet your friend. What do you say?",
  options: [
    { text: "I'm late.", score: 0, type: "too blunt", explanation: "States the problem, but no apology or repair strategy." },

    { text: "Sorry I'm late! I'll be there in 10 minutes.", score: 1, type: "appropriate", explanation: "Uses apology ('sorry') + repair (time info). Socially appropriate." },

    { text: "Hey, I’m running a bit late.", score: 0.5, type: "acceptable", explanation: "Uses softener ('a bit'), but lacks full repair (no timing or solution)." },

    { text: "Relax.", score: 0, type: "dismissive", explanation: "Dismisses the other person’s perspective. No apology or responsibility." }
  ]
},

  {
  text: "You want extra time for an assignment. What do you say?",
  options: [
    { text: "Give me more time.", score: 0, type: "too direct", explanation: "Direct command. Lacks modal or softener." },

    { text: "Could I possibly have an extra day to finish this?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + softener ('possibly'). Polite and indirect request." },

    { text: "Is it okay if I turn it in late?", score: 0.5, type: "acceptable", explanation: "Polite question, but lacks additional mitigation (no softener or justification)." },

    { text: "I didn’t do it.", score: 0, type: "avoidance", explanation: "States problem, but no request or solution." }
  ]
},

  {
  text: "You think your teacher graded you unfairly. What do you say?",
  options: [
    { text: "This grade is wrong.", score: 0, type: "too direct", explanation: "Direct statement with no softener. Threatens face." },

    { text: "I was wondering if we could review my grade together.", score: 1, type: "appropriate", explanation: "Uses intro phrase ('I was wondering if') + collaborative tone. Reduces imposition." },

    { text: "I think there might be a mistake.", score: 0.5, type: "acceptable", explanation: "Uses softeners ('I think', 'might'), but lacks collaboration." },

    { text: "You made a mistake.", score: 0, type: "accusatory", explanation: "Direct accusation ('you'). Confrontational." }
  ]
},

  {
  text: "A server brought you the wrong drink. What do you say?",
  options: [
    { text: "This is wrong.", score: 0, type: "too direct", explanation: "Blunt statement. Lacks softener or request." },

    { text: "Excuse me, I think I ordered a Sprite.", score: 1, type: "appropriate", explanation: "Uses softener ('I think') + indirect correction. Polite." },

    { text: "I asked for something else.", score: 0.5, type: "acceptable", explanation: "Clear, but lacks softener. Direct and blunt." },

    { text: "Whatever.", score: 0, type: "dismissive", explanation: "Dismissive response. No communication strategy." }
  ]
},

  {
  text: "You didn’t understand the homework. What do you say?",
  options: [
    { text: "I don't get it.", score: 0, type: "too blunt", explanation: "Direct statement. No modal or softener." },

    { text: "Could you explain it again, please?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + 'please'. Polite request." },

    { text: "I’m not sure I understood. Could you go over it again?", score: 1, type: "appropriate", explanation: "Takes responsibility + uses modal ('could'). Strong face-saving strategy." },

    { text: "This makes no sense.", score: 0, type: "negative", explanation: "Critical statement. Threatens listener’s face." }
  ]
},

  {
  text: "It is 11:30 PM and your neighbor is playing loud music. What do you say?",
  options: [
    { text: "Turn that music down right now!", score: 0, type: "too direct", explanation: "Direct command. No softener or modal." },

    { text: "Sorry to bother you, but it’s quite loud and I have an exam tomorrow. Would it be possible to lower it?", score: 1, type: "appropriate", explanation: "Uses apology + softener ('quite') + modal ('would it be possible'). Very polite." },

    { text: "It’s really loud.", score: 0.5, type: "acceptable", explanation: "States problem, but no request or softener." },

    { text: "You’re being inconsiderate.", score: 0, type: "too harsh", explanation: "Judgment ('you'). Escalates conflict." }
  ]
},

  {
  text: "You are at a restaurant and your fork is dirty. What do you say?",
  options: [
    { text: "This is dirty. Bring me another one.", score: 0, type: "too direct", explanation: "Blunt statement + command. No softener or modal." },

    { text: "Excuse me, there seems to be a slight problem with this fork. Could I get another one?", score: 1, type: "appropriate", explanation: "Uses 'there seems to be' + 'slight' + modal ('could'). Highly mitigated request." },

    { text: "I think this isn’t clean. Could I have another one?", score: 0.5, type: "acceptable", explanation: "Uses softener ('I think') + modal ('could'), but less formal." },

    { text: "Um… this fork…", score: 0, type: "too indirect", explanation: "Too vague. No clear request." }
  ]
},

  {
  text: "Your friend is 30 minutes late and hasn’t texted you. What do you say?",
  options: [
    { text: "You’re always late. It’s so annoying.", score: 0, type: "too harsh", explanation: "Uses 'always' + direct criticism. Escalates conflict." },

    { text: "Hey, I’ve been waiting for a bit—is everything okay?", score: 1, type: "appropriate", explanation: "Uses softener ('a bit') + indirect concern. Polite and non-accusatory." },

    { text: "You’re late.", score: 0.5, type: "acceptable", explanation: "Clear, but no softener or question. More direct." },

    { text: "Whatever.", score: 0, type: "dismissive", explanation: "Avoids communication." }
  ]
},

  {
  text: "You want your teacher to check one of your answers. What do you say?",
  options: [
    { text: "Check this.", score: 0, type: "too direct", explanation: "Command. No modal or softener." },

    { text: "I was wondering if you could double-check this answer for me?", score: 1, type: "appropriate", explanation: "Uses intro phrase + modal ('could'). Very polite request." },

    { text: "Can you check this?", score: 0.5, type: "acceptable", explanation: "Uses modal ('can'), but less formal/softened." },

    { text: "This is wrong, right?", score: 0, type: "problematic", explanation: "Pushes the teacher. Sounds leading or insecure." }
  ]
},

  {
  text: "Your food arrives, but it is cold. What do you say?",
  options: [
    { text: "This is cold. Take it back.", score: 0, type: "too direct", explanation: "Blunt statement + command. No softening." },

    { text: "Actually, I think this is a little cold. Could I get a new one?", score: 1, type: "appropriate", explanation: "Uses softener ('I think', 'a little') + modal ('could')." },

    { text: "This is kind of cold.", score: 0.5, type: "acceptable", explanation: "Uses softener ('kind of'), but no request." },

    { text: "Never mind.", score: 0, type: "avoidance", explanation: "Avoids the issue. No communication." }
  ]
},

  {
  text: "A classmate keeps interrupting you while you're speaking. What do you say?",
  options: [
    { text: "Stop interrupting me.", score: 0, type: "too direct", explanation: "Direct command. No softener." },

    { text: "Hey, could I finish what I was saying?", score: 1, type: "appropriate", explanation: "Uses modal ('could'). Assertive but not rude." },

    { text: "Let me talk.", score: 0.5, type: "acceptable", explanation: "Clear, but no softener. Very direct." },

    { text: "You never listen.", score: 0, type: "too harsh", explanation: "Uses 'never'. Overgeneralization and criticism." }
  ]
},

  {
  text: "The classroom is very cold. What do you say to your teacher?",
  options: [
    { text: "It's cold. Turn on the heat.", score: 0, type: "too direct", explanation: "Command. No mitigation." },

    { text: "I'm sorry, but the room is a bit cold. Could we turn on the heat?", score: 1, type: "appropriate", explanation: "Uses softener ('a bit') + modal ('could') + apology." },

    { text: "It's kind of cold.", score: 0.5, type: "acceptable", explanation: "Uses softener, but no request." },

    { text: "This room is freezing.", score: 0, type: "too strong", explanation: "Exaggeration + no request." }
  ]
}, 

  {
  text: "A classmate in your group is not contributing. What do you say?",
  options: [
    { text: "You’re not doing anything.", score: 0, type: "too direct", explanation: "Direct accusation. Confrontational." },

    { text: "Hey, could we divide the work a bit differently so everyone has a part?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + softener ('a bit'). Indirect and collaborative." },

    { text: "We need more help.", score: 0.5, type: "acceptable", explanation: "Indirect, but not very specific." },

    { text: "You never help.", score: 0, type: "too harsh", explanation: "Uses 'never'. Overgeneralization." }
  ]
}, 

  {
  text: "Your friend is talking loudly during a movie. What do you say?",
  options: [
    { text: "Be quiet.", score: 0, type: "too direct", explanation: "Command. No softener." },

    { text: "Hey, could you lower your voice a bit?", score: 1, type: "appropriate", explanation: "Uses modal ('could') + softener ('a bit')." },

    { text: "You’re very loud.", score: 0.5, type: "acceptable", explanation: "Clear, but no softener or request." },

    { text: "You’re ruining this.", score: 0, type: "too harsh", explanation: "Blames the person. Escalates." }
  ]
},

  {
  text: "You need to email your teacher because your assignment is late. What do you say?",
  options: [
    { text: "I'm submitting it late.", score: 0, type: "too blunt", explanation: "No apology or mitigation." },

    { text: "I'm sorry for the delay. I was wondering if I could still submit the assignment.", score: 1, type: "appropriate", explanation: "Uses apology + intro phrase + modal. Very appropriate." },

    { text: "Can I still send it?", score: 0.5, type: "acceptable", explanation: "Uses modal ('can'), but lacks apology and formality." },

    { text: "This deadline was unfair.", score: 0, type: "confrontational", explanation: "Criticizes authority. Inappropriate tone." }
  ]
},

  {
  text: "You receive a bill that seems too high. What do you say?",
  options: [
    { text: "This is wrong.", score: 0, type: "too direct", explanation: "Blunt statement. No softener." },

    { text: "Excuse me, I think there might be a mistake on the bill.", score: 1, type: "appropriate", explanation: "Uses softeners ('I think', 'might'). Polite correction." },

    { text: "This seems high.", score: 0.5, type: "acceptable", explanation: "Uses softener ('seems'), but no clear request." },

    { text: "You overcharged me.", score: 0, type: "accusatory", explanation: "Direct accusation. Confrontational." }
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
