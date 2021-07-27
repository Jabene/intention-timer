class Activity {
  constructor(category, description, minutes, seconds, completed) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = completed;
    this.id = Date.now();
  }
  countdown() {

  }
  markComplete() {

  }
  saveToStorage() {

  }
}
