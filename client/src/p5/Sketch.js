import React from 'react';
import Sketch from 'react-p5';

import Grid from './Grid';
import State from './State';
import Converter from './Converter';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.grid = null;
    this.spacing = 100;
    this.gap = 200;
    this.state = { state: "checking" };
    this.converter = null;
    this.img = null;
  }

  preload = (p5) => {
    let imagePath = `images/nyr.png`;
    this.img = p5.loadImage(imagePath);
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    this.img.resize(p5.width / 2, p5.height / 2);
    this.converter = new Converter(this.img);
    this.converter.convert();
    this.grid = new Grid();
  }

  draw = (p5) => {
    p5.background(255);
    this.stateButtons(p5);
    this.grid.show();
    this.grid.showNums();
    this.grid.monitor();
    this.grid.checkWin();
  }

  stateButtons = (p5) => {
    let marks = new State(p5.width - this.spacing, 0, "marking");
    if (marks.isClicked()) {
      marks.setState();
    }

    let unchecks = new State(p5.width - this.spacing * 2, 0, "unchecking");
    if (unchecks.isClicked()) {
      unchecks.setState();
    }

    let checking = new State(p5.width - this.spacing * 3, 0, "checking");
    if (checking.isClicked()) {
      checking.setState();
    }
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} preload={this.preload} />;
  }
}

export default MyComponent;