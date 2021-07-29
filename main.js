// var allCategoryButtons = document.getElementbyId(activity-buttons-row);
var exerciseButton = document.getElementById('exercise-button');
var meditateButton = document.getElementById('meditate-button');
var studyButton = document.getElementById('study-button');
var meditateImage = document.getElementById('meditate-icon');
var exerciseImage = document.getElementById('exercise-icon');
var studyImage = document.getElementById('study-icon');
var charFilter = document.getElementById('time-input-row');
var startActivityButton = document.getElementById('start-activity-button');
var minutesInput = document.getElementById('minutes');
var secondsInput = document.getElementById('seconds');
var accomplishInput = document.getElementById('accomplish-input');
var accomplishWarning = document.getElementById('accomplish-input-warning');
var minutesWarning = document.getElementById('minutes-input-warning');
var secondsWarning = document.getElementById('seconds-input-warning');
var formAlignment = document.querySelector('#form-alignment');
var activityTimer = document.querySelector('#activity-timer');
var accomplishOutput = document.querySelector('#accomplish-output');
var timeLeft = document.querySelector('#time-left');
var startButton = document.querySelector('#start-button');
var form = document.getElementById('form');
// allCategoryButtons.addEventListener('click', )
studyButton.addEventListener('click', studyButtonClicked);
meditateButton.addEventListener('click', meditateButtonClicked);
exerciseButton.addEventListener('click', exerciseButtonClicked);
charFilter.addEventListener('keydown', preventCharE);
form.addEventListener('submit', startActivity);
startButton.addEventListener('click', function() {
   startTimer(timeLeft)})

var savedActivities = [];
var activity;

function studyButtonClicked(e) {
  e.preventDefault();
  studyButtonToggle();
}

function meditateButtonClicked(e) {
  e.preventDefault();
  meditateButtonToggle();
}

function exerciseButtonClicked(e) {
  e.preventDefault();
  exerciseButtonToggle();
}

function exerciseButtonToggle() {
  if (studyButton.classList.length > 1) {
    studyButtonToggle();
  }
  if (meditateButton.classList.length > 1) {
    meditateButtonToggle();
  }
  exerciseButton.classList.toggle('exercise-button-clicked');
  if (exerciseButton.classList.contains('exercise-button-clicked')){
    exerciseImage.src = "./assets/exercise-active.svg";
  } else {
    exerciseImage.src = "./assets/exercise.svg";
  }
}

function studyButtonToggle() {
  if (meditateButton.classList.length > 1) {
    meditateButtonToggle();
  }
  if (exerciseButton.classList.length > 1) {
    exerciseButtonToggle();
  }
  studyButton.classList.toggle('study-button-clicked');
  if (studyButton.classList.contains('study-button-clicked')){
      studyImage.src = "./assets/study-active.svg";
  } else {
      studyImage.src = "./assets/study.svg";
  }
}

function meditateButtonToggle() {
  if (studyButton.classList.length > 1) {
    studyButtonToggle();
  }
  if (exerciseButton.classList.length > 1) {
    exerciseButtonToggle();
  }
  meditateButton.classList.toggle('meditate-button-clicked');
  if (meditateButton.classList.contains('meditate-button-clicked')){
      meditateImage.src = "./assets/meditate-active.svg";
  } else {
      meditateImage.src = "./assets/meditate.svg";
  }
}

function preventCharE(e) {
  var invalidChar = ['e', 'E', '-', '+'];
  if (invalidChar.includes(e.key)) {
    e.preventDefault();
  }
}

function startActivity(e) {
  e.preventDefault();
  checkInput();
  hide(formAlignment);
  show(activityTimer);
  updateTimer();
  var categorySelected = selectCategory();
  var activity = new Activity (categorySelected, accomplishInput, minutes, seconds);
  savedActivities.push(activity);
}


function updateTimer() {
  accomplishOutput.innerText = accomplishInput.value;
  timeLeft.innerText = `${minutes.value}:${seconds.value}`;
  changeButtonBorder();
}

function selectCategory() {
  if (studyButton.classList.length > 1) {
    return 'study';
  } else if (meditateButton.classList.length > 1) {
    return 'meditate';
  } else if (exerciseButton.classList.length > 1) {
    return 'exercise';
  }
}

function checkInput() {
  if (!accomplishInput.value) {
    show(accomplishWarning);
  } else {
    hide(accomplishWarning);
  }
  if (!minutesInput.value) {
    show(minutesWarning);
  } else {
    hide(minutesWarning);
  }
  if (!secondsInput.value) {
    show(secondsWarning);
  } else {
    hide(secondsWarning);
  }
}

function changeButtonBorder() {
  if (studyButton.classList.length > 1) {
    startButton.classList.add('study-button-clicked');
  } else if (meditateButton.classList.length > 1) {
    startButton.classList.add('meditate-button-clicked');
  } else if (exerciseButton.classList.length > 1) {
    startButton.classList.add('exercise-button-clicked');
  }
}

// function setInterval(startTimer, 1000);

function startTimer() {
  //activity.minutes = minutes
  //activity.seconds = seconds 
  var savedMinutes = parseInt(activity.minutes * 60);
  var savedSeconds = parseInt(activity.seconds);
  var time = savedMinutes + savedSeconds
  
  var minutesTimer = Math.floor(time/60)
  var secondsTimer = time % 60

      minutesTimer = minutes < 10 ? "0" + minutes : minutes;
      secondsTimer = seconds < 10 ? "0" + seconds : seconds;

      timeLeft.innerText = `${minutesTimer}:${secondsTimer}`
      time--;

  };


function hide(element) {
    element.classList.add('hidden');
}

function show(element) {
    element.classList.remove('hidden');
}

