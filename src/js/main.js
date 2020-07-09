import { Helpers } from "./components/Helpers.js";
import Konva from "konva";

Helpers.ready(() => {
  console.log("ready!");

  var width = window.innerWidth;
  var height = window.innerHeight;

  window.stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  var layer = new Konva.Layer();
  var rectX = stage.width() / 2 - 50;
  var rectY = stage.height() / 2 - 25;

  for (let index = 0; index < 20; index++) {
    const box = createRandomShape();

    layer.add(box);
    stage.add(layer);
  }
});

const createRandomShape = () => {
  let shape;
  if (Math.random() > 0.5) {
    shape = createNewBox();
  } else {
    shape = createNewWedge();
  }

  // add cursor styling
  shape.on("mouseover", function() {
    document.body.style.cursor = "pointer";
  });

  shape.on("mouseout", function() {
    document.body.style.cursor = "default";
  });

  return shape;
};

const createNewBox = () => {
  const box = new Konva.Rect({
    x: getRandomX(),
    y: getRandomY(),
    width: 100,
    height: 50,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
  });

  return box;
};

const createNewWedge = () => {
  return new Konva.Wedge({
    x: getRandomX(),
    y: getRandomY(),
    radius: 50,
    angle: getRandomRadius(),
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    rotation: getRandomRotation(),
    draggable: true,
  });
};

const getRandomNumber = (min, max) => {
  return Math.random() * max + min;
};

const getRandomX = () => {
  return getRandomNumber(0, window.stage.width());
};

const getRandomY = () => {
  return getRandomNumber(0, window.stage.height());
};

const getRandomRadius = () => {
  return getRandomNumber(60, 180);
};

const getRandomRotation = () => {
  return getRandomNumber(0, 360);
};
