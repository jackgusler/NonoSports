class Cell {
  constructor(x, y) {
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
    if (val == true) {
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
    fill(this.color);
    square(this.x, this.y, spacing);
    strokeWeight(1);
    stroke(0);
    if (this.getMarked()) {
      stroke(255, 0, 0);
      line(
        this.x + 10,
        this.y + 10,
        this.x + spacing - 10,
        this.y + spacing - 10
      );
      line(
        this.x + spacing - 10,
        this.y + 10,
        this.x + 10,
        this.y + spacing - 10
      );
      stroke(0);
    }
  }

  isClicked() {
    if (
      mouseX >= this.x &&
      mouseX <= this.x + spacing &&
      mouseY >= this.y &&
      mouseY <= this.y + spacing
    ) {
      if (mouseIsPressed) {
        return true;
      }
    }
  }
}

export default Cell;