import { Helpers } from "./components/Helpers.js";
import Konva from "konva";

Helpers.ready(async () => {
  window.svgs = [];

  console.log("ready!");

  // await loadPaths();

  var width = window.innerWidth;
  var height = window.innerHeight;

  const colours = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];
  const defaultColour = colours[0];

  window.stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  var layer = new Konva.Layer();

  stage.add(layer);

  // randomise the 42 available images
  let indexArr = [];
  for (let i = 0; i < 15; i++) {
    indexArr.push(i);
  }
  indexArr = shuffle(indexArr);

  let shapes = [];

  // const shape = getImageFromPathIndex(0);

  // console.log(shape);

  for (let i = 0; i < 8; i++) {
    const index = indexArr[i];

    const shape = await getImageFromPathIndex(i);

    // show the hand cursor when hovering over the shape
    shape.on("mouseover", function() {
      document.body.style.cursor = "pointer";
    });

    shape.on("mouseout", function() {
      document.body.style.cursor = "default";
    });

    // cycle through the colours when clicking on the shape
    shape.on("click", (e) => {
      // e.target.fill("green").draw();
    });

    //   // add the shape to the layer
    layer.add(shape);

    //   // add the layer to the stage
    stage.add(layer);
  }
});

// const loadPaths = async () => {

//   for (const i = 0; i < 42; i++) {
//     await loadPathFromIndex(i);
//   }

// }

const loadPathFromIndex = async (i) => {
  return await fetch(`/src/img/SVG/${i}.svg`).then((resp) => {
    return resp.text().then((svg) => {
      return svg;
    });
  });
};

const getImageFromPathIndex = async (index) => {
  const pathData = await loadPathFromIndex(index);

  console.log(pathData);

  return new Konva.Path({
    x: getRandomX(),
    y: getRandomY(),
    data: pathData,
    fill: "green",
    scale: {
      x: 2,
      y: 2,
    },
    draggable: true,
  });
};

// const createRandomShape = () => {
//   let shape;
//   if (Math.random() > 0.5) {
//     shape = createNewBox();
//   } else {
//     shape = createNewWedge();
//   }

//   // add cursor styling
//   shape.on("mouseover", function() {
//     document.body.style.cursor = "pointer";
//   });

//   shape.on("mouseout", function() {
//     document.body.style.cursor = "default";
//   });

//   return shape;
// };

const getRandomNumber = (min, max) => {
  return Math.random() * max + min;
};

const getRandomX = () => {
  return getRandomNumber(0, window.stage.width());
};

const getRandomY = () => {
  return getRandomNumber(0, window.stage.height());
};

// const getRandomRadius = () => {
//   return getRandomNumber(60, 180);
// };

// const getRandomRotation = () => {
//   return getRandomNumber(0, 360);
// };

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

window.printCanvas = () => {
  var dataUrl = document.querySelector("canvas").toDataURL(); //attempt to save base64 string to server using this var
  var windowContent = "<!DOCTYPE html>";
  windowContent += "<html>";
  windowContent += "<head><title>Print canvas</title></head>";
  windowContent += "<body>";
  windowContent += '<img src="' + dataUrl + '">';
  windowContent += "</body>";
  windowContent += "</html>";
  var printWin = window.open("", "", "width=340,height=260");
  printWin.document.open();
  printWin.document.write(windowContent);
  printWin.document.close();
  printWin.focus();
  printWin.print();
  printWin.close();
};
