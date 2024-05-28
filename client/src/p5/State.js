class State extends Cell {
  constructor(x, y, value) {
    super(x, y);
    this.value = value;
    this.fillState();
  }

  fillState() {
    if (this.value == "checking") {
      this.color = 0;
    }
    if (this.value == "unchecking") {
      this.color = 255;
    }
    if (this.value == "marking") {
      this.setMarked(true);
    }
    if (this.value == state) {
      strokeWeight(4);
      stroke(0, 255, 0);
    }
    this.show();
  }

  setState() {
    state = this.value;
  }
}

export default State;
