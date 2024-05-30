import Cell from "./Cell";
import { state, spacing } from "./sketch";

class State extends Cell {
  constructor(p, x, y, value) {
    super(p, x, y);
    this.value = value;
    this.fillState();
  }

  fillState() {
    if (this.value === "checking") {
      this.color = 0;
    }
    if (this.value === "unchecking") {
      this.color = 255;
    }
    if (this.value === "marking") {
      this.setMarked(true);
    }
    if (this.value === state) {
      this.p.strokeWeight(4);
      this.p.stroke(0, 255, 0);
    }
    this.show();
  }

  isClicked() {
    if (
      this.p.mouseX >= this.x &&
      this.p.mouseX <= this.x + spacing &&
      this.p.mouseY >= this.y &&
      this.p.mouseY <= this.y + spacing
    ) {
      if (this.p.mouseIsPressed) {
        return true;
      }
    }
    return false;
  }
}

export default State;
