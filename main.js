// var allCategoryButtons = document.getElementbyId(activity-buttons-row);
var studyButton = document.getElementById('study-button');
var meditateButton = document.getElementById('meditate-button');
var exerciseButton = document.getElementById('exercise-button');
var meditateImage = document.getElementById('meditate-icon');
var exerciseImage = document.getElementById('exercise-icon');
var studyImage = document.getElementById('study-icon');

// allCategoryButtons.addEventListener('click', )
studyButton.addEventListener('click', studyButtonClicked);
meditateButton.addEventListener('click', meditateButtonClicked);
exerciseButton.addEventListener('click', exerciseButtonClicked);

function meditateButtonClicked(e) {
    e.preventDefault();
    meditateButton.classList.toggle('meditate-button-clicked');
    if (meditateButton.classList.contains('meditate-button-clicked')){
        meditateImage.src = "./assets/meditate-active.svg";
    } else {
        meditateImage.src = "./assets/meditate.svg";  
    }
}

function studyButtonClicked(e) {
    e.preventDefault();
    studyButton.classList.toggle('study-button-clicked');
    if (studyButton.classList.contains('study-button-clicked')){
        studyImage.src = "./assets/study-active.svg";
    } else {
        studyImage.src = "./assets/study.svg";  
    }
}

function exerciseButtonClicked(e) {
    e.preventDefault();
    exerciseButton.classList.toggle('exercise-button-clicked');
    if (exerciseButton.classList.contains('exercise-button-clicked')){
        exerciseImage.src = "./assets/exercise-active.svg";
    } else {
        exerciseImage.src = "./assets/exercise.svg";  
    }
}




