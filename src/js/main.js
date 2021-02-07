import { Helpers } from "./components/Helpers.js";
import Konva from "konva";

class DraggyShapes {
  constructor(data = {}) {
    this.colours = data.colours || [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];

    this.canvasEl = document.querySelector(".js_canvas-container");
    this.canvasWidth = this.canvasEl.clientWidth;
    this.canvasHeight = this.canvasEl.clientHeight;
    this.padding = data.padding ?? 100;

    this.init();
  }

  init() {
    this.stage = new Konva.Stage({
      container: "container",
      width: this.canvasWidth,
      height: this.canvasHeight,
    });

    this.layer = new Konva.Layer();

    this.stage.add(this.layer);

    this.addShapes(10);
  }

  async addShapes(n) {
    const self = this;

    // randomise the 15 available paths
    let indexArr = [];
    for (let i = 0; i < 15; i++) {
      indexArr.push(i);
    }
    indexArr = this.shuffle(indexArr);

    for (let i = 0; i < n; i++) {
      const shape = await this.getImageFromPathIndex(i);

      // show the hand cursor when hovering over the shape
      shape.on("mouseover", function() {
        document.body.style.cursor = "pointer";
      });

      shape.on("mouseout", function() {
        document.body.style.cursor = "default";
      });

      // cycle through the colours when clicking on the shape
      shape.on("click", (e) => {
        e.target.fill(self.getNextColour(e.target.fill())).draw();
      });

      // add the shape to the layer
      this.layer.add(shape);

      // add the layer to the stage
      this.stage.add(this.layer);
    }
  }

  async getImageFromPathIndex(index) {
    const self = this;
    const pathData = await this.loadPathFromIndex(index);

    return new Konva.Path({
      x: self.getRandomX(),
      y: self.getRandomY(),
      data: pathData,
      fill: self.getRandomColour(),
      scale: {
        x: 2,
        y: 2,
      },
      draggable: true,
    });
  }

  getNextColour(currentColour) {
    // const currentIndex = ;
    return this.colours[
      (this.colours.indexOf(currentColour) + 1) % this.colours.length
    ];
  }

  // ==============
  // Helper methods
  // ==============

  getRandomNumber(min, max) {
    return Math.random() * max + min;
  }

  getRandomX() {
    return this.getRandomNumber(0, this.stage.width() - this.padding);
  }

  getRandomY() {
    return this.getRandomNumber(0, this.stage.height() - this.padding);
  }

  getRandomColour() {
    const numColours = this.colours.length;
    const randomIndex = Math.round(Math.random() * numColours);
    return this.colours[randomIndex] || "green";
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  async loadPathFromIndex(i) {
    return await fetch(`/src/img/SVG/${i}.svg`).then((resp) => {
      return resp.text().then((svg) => {
        return svg;
      });
    });
  }
}

Helpers.ready(async () => {
  new DraggyShapes();
});

// window.printCanvas = () => {
//   var dataUrl = document.querySelector("canvas").toDataURL(); //attempt to save base64 string to server using this var
//   var windowContent = "<!DOCTYPE html>";
//   windowContent += "<html>";
//   windowContent += "<head><title>Print canvas</title></head>";
//   windowContent += "<body>";
//   windowContent += '<img src="' + dataUrl + '">';
//   windowContent += "</body>";
//   windowContent += "</html>";
//   var printWin = window.open("", "", "width=340,height=260");
//   printWin.document.open();
//   printWin.document.write(windowContent);
//   printWin.document.close();
//   printWin.focus();
//   printWin.print();
//   printWin.close();
// };
