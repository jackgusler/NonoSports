import React, { useEffect, useRef } from "react";
import p5 from "p5";
import Converter from "./Converter";
import Grid from "./Grid";
import State from "./State";

let grid;
export let spacing = 50;
export let gap = 200;
export let state = "checking";
export let converter;
let img;

const Sketch = () => {
  const sketchRef = useRef();

  const sketch = (p) => {
    p.preload = () => {
      img = p.loadImage("https://picsum.photos/200");
    };

    p.setup = () => {
      p.createCanvas(800, 800);
      img.resize(p.width / 2, p.height / 2);
      converter = new Converter(p, img);
      converter.convert();
      converter.calcNums();
      grid = new Grid(p);
    };

    p.draw = () => {
      p.background(255);
      stateButtons(p);
      grid.show();
      grid.showNums();
      grid.monitor();
      grid.checkWin();
    };

    const stateButtons = (p) => {
      const marks = new State(p, p.width - spacing, 0, "marking");
      if (marks.isClicked()) {
        state = marks.value;
      }

      const unchecks = new State(p, p.width - spacing * 2, 0, "unchecking");
      if (unchecks.isClicked()) {
        state = unchecks.value;
      }

      const checking = new State(p, p.width - spacing * 3, 0, "checking");
      if (checking.isClicked()) {
        state = checking.value;
      }
    };
  };

  useEffect(() => {
    const myP5 = new p5(sketch, sketchRef.current);

    return () => myP5.remove();
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Sketch;
