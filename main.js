var logActivityButton = document.getElementById('log-activity');
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
var form = document.querySelector('form');
var formHeading = document.querySelector('#form-heading');

var savedActivities = [];
var currentActivity = {};

verifyLocalStorage();

studyButton.addEventListener('click', studyButtonClicked);
meditateButton.addEventListener('click', meditateButtonClicked);
exerciseButton.addEventListener('click', exerciseButtonClicked);
charFilter.addEventListener('keydown', preventChar);
secondsInput.addEventListener('keyup', preventFirstZero);
startButton.addEventListener('click', counter);
form.addEventListener('submit', submitForm);
logActivityButton.addEventListener('click', logActivity);

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

function studyButtonToggle() {
  if (meditateButton.classList.length > 1) {
    meditateButtonToggle();
  }
  if (exerciseButton.classList.length > 1) {
    exerciseButtonToggle();
  }
  studyButton.classList.toggle('study-button-clicked');
  if (studyButton.classList.contains('study-button-clicked')) {
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
  if (meditateButton.classList.contains('meditate-button-clicked')) {
    meditateImage.src = "./assets/meditate-active.svg";
  } else {
    meditateImage.src = "./assets/meditate.svg";
  }
}

function exerciseButtonToggle() {
  if (studyButton.classList.length > 1) {
    studyButtonToggle();
  }
  if (meditateButton.classList.length > 1) {
    meditateButtonToggle();
  }
  exerciseButton.classList.toggle('exercise-button-clicked');
  if (exerciseButton.classList.contains('exercise-button-clicked')) {
    exerciseImage.src = "./assets/exercise-active.svg";
  } else {
    exerciseImage.src = "./assets/exercise.svg";
  }
}

function selectCategory() {
  if (studyButton.classList.length > 1) {
    return 'Study';
  } else if (meditateButton.classList.length > 1) {
    return 'Meditate';
  } else if (exerciseButton.classList.length > 1) {
    return 'Exercise';
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
  if (accomplishInput.value && minutesInput.value && secondsInput.value) {
    return true;
  } else {
    return false;
  }
}

function changeButtonBorder() {
  if (studyButton.classList.length > 1) {
    startButton.classList.add('study-button-clicked');
    return true;
  } else if (meditateButton.classList.length > 1) {
    startButton.classList.add('meditate-button-clicked');
    return true;
  } else if (exerciseButton.classList.length > 1) {
    startButton.classList.add('exercise-button-clicked');
    return true;
  } else {
    show(document.querySelector('#button-selection-warning'));
    return false;
  }
}

function submitForm(e) {
  e.preventDefault();
  if (!checkInput()) {
    return;
  }
  if (!changeButtonBorder()) {
    return;
  }
  accomplishOutput.innerText = accomplishInput.value;
  formHeading.innerText = "Current Activity";
  hide(formAlignment);
  show(activityTimer);
  var categorySelected = selectCategory();
  currentActivity = new Activity (categorySelected, accomplishInput.value, minutesInput.value, secondsInput.value);
  verifySmallNumbers(currentActivity.minutes, currentActivity.seconds);
  var minutesToSeconds = currentActivity.minutes * 60;
  currentActivity.time = parseInt(currentActivity.seconds) + parseInt(minutesToSeconds);
}

function counter(e) {
  e.preventDefault();
  startButton.disabled = true;
  currentActivity.counterId = setInterval(function() {
    currentActivity.countdown();
  }, 1000);
}

function logActivity(e) {
  e.preventDefault();
  currentActivity.saveToStorage();
  verifyLocalStorage();
  location.reload();
}

function completeTimer() {
  hide(activityTimer);
  show(document.querySelector('.congratulatory-message'));
  formHeading.innerText = "Completed Activity";
}

function verifyLocalStorage() {
  if (localStorage.length) {
    showPastActivities();
  }
}

function showPastActivities() {
  var retrievedActivity = localStorage.getItem('pastActivityString');
  savedActivities = JSON.parse(retrievedActivity);
  if (savedActivities.length) {
    hide(document.querySelector('.no-activity-card'));
    show(document.querySelector('.past-activity-cards'));
    populateCards();
  }
}

function populateCards() {
  document.querySelector('.past-activity-cards').innerHTML = "";
  for (var i = 0; i < savedActivities.length; i++) {
    document.querySelector('.past-activity-cards').innerHTML +=
    `<section class="activity-card">
      <div class="card-text">
        <p class="card-exercise">${savedActivities[i].category}</p>
        <p class="card-time">${savedActivities[i].minutes} MIN ${savedActivities[i].seconds} SEC</p>
        <p class="card-description">${savedActivities[i].description}</p>
      </div>
      <div class='activity-type-identifier ${savedActivities[i].category}'></div>
     </section>`;
  }
}

function verifySmallNumbers(minutes, seconds) {
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  setTimeLeft(minutes, seconds);
}

function setTimeLeft(minutes, seconds) {
  timeLeft.innerHTML = `${minutes}:${seconds}`;
}

function preventFirstZero() {
  if (this.value.charAt(0) === '0') {
    this.value = this.value.slice(1);
  }
}

function preventChar(e) {
  var invalidChar = ['e', 'E', '-', '+'];
  if (invalidChar.includes(e.key)) {
    e.preventDefault();
  }
}

function hide(element) {
  element.classList.add('hidden');
}
function show(element) {
  element.classList.remove('hidden');
}
