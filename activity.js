class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
    this.time = 0;
    this.counterId = 0;
  }

  countdown() {
    var minutes = Math.floor(this.time/60);
    var seconds = this.time%60;
    verifySmallNumbers(minutes, seconds);
    this.time--;
    if (this.time === -1) {
      clearInterval(this.counterId);
      this.markComplete();
    }
  }

  markComplete() {
    startButton.disabled = false;
    this.completed = true;
    completeTimer();
  }

  saveToStorage() {
    savedActivities.unshift(this);
    var stringedActivity = JSON.stringify(savedActivities);
    localStorage.setItem('pastActivityString', stringedActivity);
  }
}
