class Converter {
  constructor(img) {
    this.img = img;
    this.rows = [];
    this.cols = [];
    this.numRows = [];
    this.numCols = [];
  }

  convert() {
    let pixelatedWidth = Math.floor(this.img.width / spacing);
    let pixelatedHeight = Math.floor(this.img.height / spacing);

    this.img.loadPixels();

    for (let i = 0; i < pixelatedHeight; i++) {
      this.rows[i] = [];
    }
    for (let i = 0; i < pixelatedWidth; i++) {
      this.cols[i] = [];
    }

    for (let y = 0; y < pixelatedHeight; y++) {
      for (let x = 0; x < pixelatedWidth; x++) {
        let val = this.isNotWhite(x * spacing, y * spacing);
        if (val) {
          this.rows[y].push(x);
          this.cols[x].push(y);
        }
      }
    }

    this.calcNums();
  }

  isNotWhite(startX, startY) {
    let r = 0,
      g = 0,
      b = 0,
      a = 0,
      count = 0;

    for (let y = startY; y < startY + spacing && y < this.img.height; y++) {
      for (let x = startX; x < startX + spacing && x < this.img.width; x++) {
        let index = (x + y * this.img.width) * 4;
        r += this.img.pixels[index];
        g += this.img.pixels[index + 1];
        b += this.img.pixels[index + 2];
        a += this.img.pixels[index + 3];
        count++;
      }
    }

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);
    a = Math.floor(a / count);

    // Check both color values and transparency
    if (a < 10) {
      return false; // Transparent
    } else {
      return !(r > 150 && g > 150 && b > 150); // Not white
    }
  }

  calcNums() {
    let tempRows = [];
    for (let y = 0; y < this.rows.length; y++) {
      let row = this.rows[y];
      let temp = [];
      let count = 0;

      for (let i = 0; i < row.length; i++) {
        if (i === 0 || row[i] - row[i - 1] === 1) {
          count++;
        } else {
          temp.push(count);
          count = 1;
        }
      }

      if (count > 0) {
        temp.push(count);
      }

      tempRows[y] = temp;
    }

    this.numRows = tempRows;

    let tempCols = [];
    for (let x = 0; x < this.cols.length; x++) {
      let col = this.cols[x];
      let temp = [];
      let count = 0;

      for (let i = 0; i < col.length; i++) {
        if (i === 0 || col[i] - col[i - 1] === 1) {
          count++;
        } else {
          temp.push(count);
          count = 1;
        }
      }

      if (count > 0) {
        temp.push(count);
      }

      tempCols[x] = temp;
    }

    this.numCols = tempCols;
  }
}

export default Converter;
