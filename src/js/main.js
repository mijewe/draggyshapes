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

  stage.add(layer);

  let indexArr = [];
  for (let i = 0; i < 42; i++) {
    indexArr.push(i);
  }
  indexArr = shuffle(indexArr);

  for (let i = 0; i < 8; i++) {
    const index = indexArr[i];

    Konva.Image.fromURL(`/dist/img/256w/Asset ${index}.png`, (image) => {
      image.setAttrs({
        x: getRandomX(),
        y: getRandomY(),
        draggable: true,
      });

      image.on("mouseover", function() {
        document.body.style.cursor = "pointer";
      });

      image.on("mouseout", function() {
        document.body.style.cursor = "default";
      });

      layer.add(image);
      layer.draw();
    });
  }
});

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
