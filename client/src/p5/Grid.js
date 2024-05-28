import Cell from "./Cell";

class Grid {
  constructor() {
    this.rowCount = Math.floor((width - 2 * gap) / spacing);
    this.colCount = Math.floor((height - 2 * gap) / spacing);
    this.rows = [];
    this.cols = [];
    this.cells = [];

    // Initialize cells
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.colCount; j++) {
        let x = gap + i * spacing;
        let y = gap + j * spacing;
        this.cells.push(new Cell(x, y, spacing));
      }
    }

    // Initialize rows and cols with false values
    for (let i = 0; i < this.rowCount; i++) {
      this.rows[i] = new Array(this.colCount).fill(false);
    }
    for (let i = 0; i < this.colCount; i++) {
      this.cols[i] = new Array(this.rowCount).fill(false);
    }
  }

  show() {
    for (let cell of this.cells) {
      cell.show();
    }
  }

  showNums() {
    textAlign(CENTER, CENTER);
    textSize(12);

    // Display row numbers (right to left, starting from outside the grid)
    for (let i = 0; i < this.rowCount; i++) {
      let nums = converter.numRows[i];
      let filledSequence = this.getFilledSequences(this.rows[i]);

      for (let j = 0; j < nums.length; j++) {
        let num = nums[nums.length - 1 - j];
        let fillColor =
          filledSequence[filledSequence.length - 1 - j] === num
            ? "grey"
            : "black";
        fill(fillColor);
        text(
          num, // Reverse the order of nums for right to left
          gap - (j + 1) * 15, // Offset each number horizontally to the left, starting from outside the grid
          gap + i * spacing + spacing / 2 // Centered in the row
        );
      }
    }

    // Display column numbers (top to bottom, starting from outside the grid)
    for (let i = 0; i < this.colCount; i++) {
      let nums = converter.numCols[i];
      let filledSequence = this.getFilledSequences(this.cols[i]);

      for (let j = 0; j < nums.length; j++) {
        let num = nums[nums.length - 1 - j];
        let fillColor =
          filledSequence[filledSequence.length - 1 - j] === num
            ? "grey"
            : "black";
        fill(fillColor);
        text(
          num, // Reverse the order of nums for top to bottom
          gap + i * spacing + spacing / 2, // Centered in the column
          gap - (j + 1) * 15 // Offset each number vertically upward, starting from outside the grid
        );
      }
    }
  }

  // Helper method to get sequences of filled cells
  getFilledSequences(arr) {
    let sequences = [];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        count++;
      } else if (count > 0) {
        sequences.push(count);
        count = 0;
      }
    }

    if (count > 0) {
      sequences.push(count);
    }

    return sequences;
  }

  monitor() {
    for (let cell of this.cells) {
      if (cell.isClicked()) {
        let row = Math.floor((cell.y - gap) / spacing);
        let col = Math.floor((cell.x - gap) / spacing);

        if (state == "checking") {
          if (!cell.getMarked()) {
            cell.setChecked(true);
            this.rows[row][col] = true;
            this.cols[col][row] = true;
          }
        } else if (state == "unchecking") {
          cell.setChecked(false);
          cell.setMarked(false);
          this.rows[row][col] = false;
          this.cols[col][row] = false;
        } else if (state == "marking") {
          if (!cell.getChecked()) {
            cell.setMarked(true);
          }
        }
      }
    }
  }

  checkWin() {
    let rowsMatch = true;
    let colsMatch = true;

    // Check if rows match
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.colCount; j++) {
        if (this.rows[i][j] !== converter.rows[i].includes(j)) {
          rowsMatch = false;
          break;
        }
      }
    }

    // Check if cols match
    for (let i = 0; i < this.colCount; i++) {
      for (let j = 0; j < this.rowCount; j++) {
        if (this.cols[i][j] !== converter.cols[i].includes(j)) {
          colsMatch = false;
          break;
        }
      }
    }

    if (rowsMatch && colsMatch) {
      console.log("You win!");
    } else {
      console.log("Keep trying!");
    }
  }
}

export default Grid;
