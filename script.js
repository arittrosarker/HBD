// click sound on every button (delegated)
const clickSound = document.getElementById('click-sound');
document.body.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') clickSound.play();
});

// your existing arrays & quiz code here…
const bgColors = ['#ffe6f0','#ffd1e6','#ffccd9','#ffc0cc','#ffb3bf','#ffa6b2','#ff99a6'];
const quizQuestions = [ 
  { question: "What was the date and time of our first text?", options: ["July 05, 2024, 11:55 PM","June 23, 2024, 11:55 PM","July 02, 2024, 9:55 PM","June 17, 2024, 6:45 PM"], correct: 1, rightMsg: 'kire tui parli kivabe, cheating korsish naki', wrongMsg: 'haire eitao monenai, gotomashei gelo' },
  { question: "What is the most used word in our chat?", options: ["Prapti","Mama","Raiyan","Dost"], correct: 3, rightMsg: 'Prapti r Raiyan amader jonno na', wrongMsg: 'haire eita jodi na parish...' },
  { question: "Who starts the convo more?", options: ["Me (A)", "You (M)", "Equally", "No one"], correct: 1, rightMsg: 'Obosshoi tui, ebong shetar jonno oshongkho dhonnobad', wrongMsg: 'nare dost, eta tui, ebong shetar jonno oshongkho dhonnobad' }
];

let score = 0;
const slidesContainer = document.querySelector('.slides');
// ← INSERT THIS FUNCTION HERE →
function selectAnswer(qI, selI, slide) {
  const q = quizQuestions[qI];
  const isCorrect = selI === q.correct;
  if (isCorrect) {
    score++;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }
  slide.querySelectorAll('.options button').forEach(btn => {
    const idx = Number(btn.dataset.optionIndex);
    if (idx === q.correct) {
      btn.classList.add('correct');
    } else if (idx === selI) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });
  slide.dataset.answered = 'true';
  const msg = document.createElement('p');
  msg.style.marginTop = '20px';
  msg.style.fontSize = '1rem';
  msg.innerText = isCorrect ? q.rightMsg : q.wrongMsg;
  slide.appendChild(msg);
}
// ← END INSERTION →

// Dynamically add quiz slides…
quizQuestions.forEach((q,i) => {
  const slide = document.createElement('div');
  slide.classList.add('slide', 'quiz-slide');
  slide.dataset.questionIndex = i;
  slide.dataset.answered = 'false';

  const questionText = document.createElement('h2'); questionText.innerText = q.question;
  slide.appendChild(questionText);

  const optionsDiv = document.createElement('div'); optionsDiv.classList.add('options');
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button'); btn.innerText = opt; btn.dataset.optionIndex = idx;
    btn.addEventListener('click', () => selectAnswer(i, idx, slide)); optionsDiv.appendChild(btn);
  });
  slide.appendChild(optionsDiv);
  slidesContainer.appendChild(slide);
});

// Score slide
const scoreSlide = document.createElement('div');
scoreSlide.classList.add('slide'); scoreSlide.id = 'score-slide';
scoreSlide.innerHTML = `<h2>Your Score</h2><p id="score-text"></p><p id="message"></p>`;
slidesContainer.appendChild(scoreSlide);

// Final text slide
const finalTextSlide = document.createElement('div');
finalTextSlide.classList.add('slide', 'tall-slide'); finalTextSlide.id = 'final-text-slide';
finalTextSlide.innerHTML = `
  <p>prio bondhu maisha,</p>
  <p>jonmodiner shuveccha! dekhte dekhte ekti bochor par hoye gelo. tor biyer boyosh hoye gelo.</p>
  <p> Happy Birthday!
toke chinar por eta ditio 12 July, gotobar toke chintam na thik moto.agei bollam amar ebar handmade gift parcel kore deyar iccha silo, but oita jehutu shomvob na tai eita banaisi, janina pochondo hoise naki kintu er beshi r parina. eita banano start korsilam april 13 te, 2week kaj kore rekhe disilam, bakita may te ektu ektu korsi, r year finaler por. eto kisu lekte mon chaitese je koi theke shuru korbo bujhtesina, tao shuru kori.
prothomei dhonnobad aunty o uncle ke, tara na thakle aj ami eirokom ekti dosto petam na. erpore dhonnobad Mark Zuckerberg ke Facebook abishkar korar jonno.
amra irl frens na kintu amar ashe pasher shob manusher theke ami tor bepare beshi jani r tuio janish. amra eto valo pasher bashar aunty hobo 1 bochor age vabio nai.ami loke ki bolbe eita niye onek chinta kori, kintu tui adaloter judge hoye geleo toke kisu bolte apotti hobena, jodio jani tui judge kore amar nam e ki ki vabbi tao😭🙏. Amader onek bar e genjam lagse, kintu upor wala o tor doyay shob bar e mite gese. Thank you for not giving up on me and please don't😞 majhe majhe matha thik thakena.tor theke ami heart r pranir srenibinnash charao r o onek kichu shikhsi. ami ager theke better manush hoyechi, character develop bole monehoy english e. nijer vul bujha shikhsi hoyto ektu hoileo,age r o worst chilam.
tui amader frenship ke majhe majhei appreciate korish kintu ami directly temon ekta korini, r ekhon jodi ami shamne boshe thaktam, taile uporer kisu o bolte partam na, chup kore jutar dike takay boshe thaktam, r shamne cold coffeer cup thakle hoyto pipe diye ektu ektu kore khaitam.
amake er age keo kokhono bestie bff eidhoroner kichu bolenai, to tui jokhon oi type caption er reels dish emotional hoye jai🥲. dhonnobad amake ei upadhi deyar jonno, means a lot. ami janina ami ei upadhir joggo kina tao.
Porashona niye tension kor kintu kanna kati korishna dost, tui ekhon consistent asish, eita onek kichu, nijer progress celebrate kor taile dekbi motivated lagtese, toke academic advice deyar moto result amar nai kintu manoshik support to ditei pari. Retake ta diye fresh mind niye porte thak, 6 mashe e hoye jbe shesh syllabus, r oi apur kothay demotivate hoish na, unare bolish ami unar motamoter shathe shohomot na.
We highlight the important parts of our books, you are one of the things I highlighted in my not so big lyf. I appreciate your existence, may I die before you.
</p>
  <p>iti,</p>
  <p>tor oprio bondhu</p>
  <p>arittro</p> 
  <img src="heart.png" alt="heart" align="center">
  <br> <br>
`;
slidesContainer.appendChild(finalTextSlide);

// ——— NEW: Wish Slide ———
const wishSlide = document.createElement('div');
wishSlide.classList.add('slide'); wishSlide.id = 'wish-slide';
wishSlide.innerHTML = `
  <h2>Tor kono birthday wish thakle lekhte parish</h2>
  <textarea id="wish-input" placeholder="Type your wish here…"></textarea>
  <button id="send-wish-btn">Send</button>
  <p id="wish-confirm" style="margin-top:15px;"></p>
`;
slidesContainer.appendChild(wishSlide);

// ——— Firebase Setup ———
const firebaseConfig = {
  apiKey: "AIzaSyAx3b-2EPm2qPjYu6L07GCCKAkoF_z1sF0",
  authDomain: "poralagbe-17c0e.firebaseapp.com",
  databaseURL: "https://poralagbe-17c0e-default-rtdb.firebaseio.com",
  projectId: "poralagbe-17c0e",
  storageBucket: "poralagbe-17c0e.firebasestorage.app",
  messagingSenderId: "380156491503",
  appId: "1:380156491503:web:9983033564385f0b5d8d1a"
};
firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref('wishes');

document.getElementById('send-wish-btn').addEventListener('click', () => {
  const text = document.getElementById('wish-input').value.trim();
  if (!text) return;
  dbRef.push({ wish: text, time: Date.now() });
  document.getElementById('wish-confirm').innerText = 'I got your wish!';
});

// ——— Slide Logic ———
const slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;
const prevBtn = document.getElementById('prevBtn'),
      nextBtn = document.getElementById('nextBtn'),
      navBtns = document.getElementById('navBtns');

function updateProgress() {
  // hide on first
  prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
  nextBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
  const pct = (currentSlide / (slides.length - 1)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
document.getElementById('bg-overlay').style.background = bgColors[currentSlide % bgColors.length];
}

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;
  slides[currentSlide].classList.remove('visible');
  slides[currentSlide].classList.add('exit-left');
  currentSlide = index;
  slides[currentSlide].classList.remove('exit-left');
  slides[currentSlide].classList.add('visible');
  
  updateProgress();
  if (slides[currentSlide].classList.contains('tall-slide')) {
  document.body.classList.add('show-scroll');
} else {
  document.body.classList.remove('show-scroll');
}


  // score-text on score slide
  if (slides[currentSlide].id === 'score-slide') {
    document.getElementById('score-text').innerText = `${score}/${quizQuestions.length}`;
    document.getElementById('message').innerText = 
      score === quizQuestions.length ? 'Shabash' : 'veri bad!';
  }

  // hide nav on wish slide
  if (slides[currentSlide].id === 'wish-slide') {
    navBtns.style.display = 'none';
  } else {
    navBtns.style.display = 'block';
  }
}

function nextSlide() {
  // quiz answer guard
  clickSound.play();
  if (slides[currentSlide].classList.contains('quiz-slide') &&
      slides[currentSlide].dataset.answered === 'false') {
    return alert('Please select an answer first!');
  }
  showSlide(currentSlide + 1);
}
function prevSlide() {
  clickSound.play();
  showSlide(currentSlide - 1);
}
window.addEventListener('load', () => {
  setTimeout(() => showSlide(1), 3000);
  updateProgress();
});
