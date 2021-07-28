// var allCategoryButtons = document.getElementbyId(activity-buttons-row);
var studyButton = document.getElementById('study-button');
var meditateButton = document.getElementById('meditate-button');
var exerciseButton = document.getElementById('exercise-button');
var meditateImage = document.getElementById('meditate-icon');
var exerciseImage = document.getElementById('exercise-icon');
var studyImage = document.getElementById('study-icon');
var charFilter = document.querySelector('.number-input');

// allCategoryButtons.addEventListener('click', )
studyButton.addEventListener('click', studyButtonClicked);
meditateButton.addEventListener('click', meditateButtonClicked);
exerciseButton.addEventListener('click', exerciseButtonClicked);
charFilter.addEventListener('keydown', preventCharE);

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
  var invalidChar = ['e', 'E'];

  if (invalidChar.includes(e.key)) {
    e.preventDefault();
  }
}
