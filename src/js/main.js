import { Helpers } from "./components/Helpers.js";
import Konva from "konva";

class DraggyShapes {
  constructor(data = {}) {
    this.colours = data.colours || ["#FFB04D", "#C7F464", "#FF6B64", "#4ECCC3"];

    this.canvasEl = document.querySelector(".js_canvas-container");
    this.canvasWidth = this.canvasEl.clientWidth;
    this.canvasHeight = this.canvasEl.clientHeight;
    this.padding = data.padding ?? 100;

    this.numPaths = 15;
    this.initialNumPaths = 10;

    this.init();
  }

  async init() {
    this.stage = new Konva.Stage({
      container: "container",
      width: this.canvasWidth,
      height: this.canvasHeight,
    });

    await this.cachePaths();

    this.initLayer();

    this.bindBgButtons();

    this.bindResetButton();

    this.bindAddShapeButton();

    // do not show context menu on right click
    this.stage.on("contentContextmenu", (e) => {
      e.evt.preventDefault();
    });
  }

  initLayer() {
    this.layer = new Konva.Layer();

    this.stage.add(this.layer);

    this.addShapes();
  }

  async addShapes(n = this.initialNumPaths) {
    for (let i = 0; i < n; i++) {
      this.addShape();
    }
  }

  async addShape() {
    const self = this;
    const r = Math.floor(this.getRandomNumber(0, this.numPaths));

    const shape = await this.getImageFromPathIndex(r);

    // show the hand cursor when hovering over the shape
    shape.on("mouseover", function() {
      document.body.style.cursor = "pointer";
    });
    shape.on("mouseout", function() {
      document.body.style.cursor = "default";
    });

    // cycle through the colours when left clicking on the shape
    // bring the shape to the front when right clicking
    shape.on("click", (e) => {
      console.log(e.evt.button);

      if (e.evt.button === 0) {
        e.target.fill(self.getNextColour(e.target.fill())).draw();
      } else if (e.evt.button === 2) {
        e.target.moveToTop();
        e.target.draw();
      }
    });

    // add the shape to the layer
    this.layer.add(shape);

    // add the layer to the stage
    this.stage.add(this.layer);
  }

  bindBgButtons() {
    const self = this;
    for (const el of document.querySelectorAll(".js_change-bg")) {
      el.addEventListener("click", (e) => {
        const classes = e.target.dataset["classes"];

        this.removeClassesWithPrefix(this.canvasEl, "theme-");
        this.removeClassesWithPrefix(this.canvasEl, "bg-");

        this.addClasses(this.canvasEl, classes);
      });
    }
  }

  bindResetButton() {
    const self = this;

    const btn = document.querySelector(".js_reset");

    btn.addEventListener("click", (e) => {
      this.resetCanvas();
    });
  }

  resetCanvas() {
    this.layer.destroy();
    this.initLayer();
  }

  bindAddShapeButton() {
    const btn = document.querySelector(".js_add-shape");

    btn.addEventListener("click", () => {
      this.addShape();
    });
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

  async cachePaths() {
    for (let i = 0; i < this.numPaths; i++) {
      await this.loadPathFromIndex(i);
    }
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
    return this.colours[randomIndex] || this.colours[0];
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  addClasses(el, classes) {
    const arr = classes.split(" ");
    el.classList.add(...arr);
  }

  removeClassesWithPrefix(el, prefix) {
    const classes = el.className
      .split(" ")
      .filter((c) => !c.startsWith(prefix));
    el.className = classes.join(" ").trim();
  }

  async loadPathFromIndex(i) {
    const cacheKey = `path_${i}`;

    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      return cached;
    }

    return await fetch(`/src/img/paths/${i}.svg`).then((resp) => {
      return resp.text().then((svg) => {
        sessionStorage.setItem(cacheKey, svg);
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
