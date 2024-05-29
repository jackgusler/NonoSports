import { spacing } from "./sketch";

class Cell {
  constructor(p, x, y) {
    this.p = p;

    this.x = x;
    this.y = y;
    this.color = 255;
    this.checked = false;
    this.marked = false;
  }

  getChecked() {
    return this.checked;
  }

  setChecked(val) {
    this.checked = val;
    if (val === true) {
      this.color = 0;
    } else {
      this.color = 255;
    }
  }

  getMarked() {
    return this.marked;
  }

  setMarked(val) {
    this.marked = val;
  }

  show() {
    // eslint-disable-next-line no-undef
    this.p.fill(this.color);
    this.p.square(this.x, this.y, spacing);
    this.p.strokeWeight(1);
    this.p.stroke(0);
    if (this.getMarked()) {
      this.p.stroke(255, 0, 0);
      this.p.line(
        this.x + 10,
        this.y + 10,
        this.x + spacing - 10,
        this.y + spacing - 10
      );
      this.p.line(
        this.x + spacing - 10,
        this.y + 10,
        this.x + 10,
        this.y + spacing - 10
      );
      this.p.stroke(0);
    }
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
  }
}

export default Cell;
