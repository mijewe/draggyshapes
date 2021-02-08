import { Helpers } from "./components/Helpers.js";
import Konva from "konva";
import Swal from "sweetalert2";

class DraggyShapes {
  constructor(data = {}) {
    this.colours = data.colours || [
      "#FFB04D",
      "#C7F464",
      "#FF6B64",
      "#4ECCC3",
      "#000",
      "#D9D9D9",
      "#575756",
      "#fff",
    ];

    this.canvasEl = document.querySelector(".js_canvas-container");
    this.themerEl = document.querySelector(".js_themer");

    this.padding = data.padding ?? 100;

    this.numPaths = 15;
    this.initialNumPaths = 10;

    this.init();
  }

  async init() {
    this.stage = new Konva.Stage({
      container: "container",
    });

    this.setCanvasSize();

    this.setScale();

    await this.cachePaths();

    this.initLayer();

    this.bindBgButtons();

    this.bindResetButton();

    this.bindAddShapeButton();

    // do not show context menu on right click
    this.stage.on("contentContextmenu", (e) => {
      e.evt.preventDefault();
    });

    // resize canvas on window resize
    window.addEventListener("resize", (e) => {
      this.setCanvasSize();
    });
  }

  setCanvasSize() {
    this.canvasWidth = this.canvasEl.clientWidth;
    this.canvasHeight = this.canvasEl.clientHeight;

    this.stage.width(this.canvasWidth);
    this.stage.height(this.canvasHeight);
  }

  setScale() {
    const w = this.canvasEl.clientWidth;
    const h = this.canvasEl.clientHeight;

    if (w < 768 || h < 768) {
      this.scale = 1;
    } else {
      this.scale = 2;
    }
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

    // Hammer JS is required for the "press" event
    new Hammer(shape, { domEvents: true });

    // show the hand cursor when hovering over the shape
    shape.on("mouseover", function() {
      document.body.style.cursor = "pointer";
    });
    shape.on("mouseout", function() {
      document.body.style.cursor = "default";
    });

    // ==============
    // Mouse gestures
    // ==============

    // Left Click : change colour
    // Right Click : bring to front
    shape.on("click", (e) => {
      if (e.evt.button === 0) {
        this.changeShapeColour(e.target);
      } else if (e.evt.button === 2) {
        this.bringShapeToFront(e.target);
      }
    });

    // ==============
    // Touch gestures
    // ==============

    // Double Tap : change colour
    shape.on("dbltap", (e) => {
      this.changeShapeColour(e.target);
    });

    // Long Press : bring to front
    shape.on("press", (e) => {
      this.bringShapeToFront(e.target);
    });

    // add the shape to the layer
    this.layer.add(shape);

    // add the layer to the stage
    this.stage.add(this.layer);
  }

  changeShapeColour(shape) {
    shape.fill(this.getNextColour(shape.fill())).draw();
  }

  bringShapeToFront(shape) {
    shape.moveToTop();
    shape.draw();
  }

  bindBgButtons() {
    const self = this;
    for (const el of document.querySelectorAll(".js_change-bg")) {
      el.addEventListener("click", (e) => {
        const themeClass = e.target.dataset["themeclass"];
        const bgClass = e.target.dataset["bgclass"];

        this.removeClassesWithPrefix(this.themerEl, "theme-");
        this.removeClassesWithPrefix(this.themerEl, "dark:theme-");
        this.removeClassesWithPrefix(this.canvasEl, "bg-");
        this.removeClassesWithPrefix(this.canvasEl, "dark:bg-");

        this.addClasses(this.themerEl, themeClass);
        this.addClasses(this.canvasEl, bgClass);
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
        x: this.scale,
        y: this.scale,
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

    return await fetch(`/dist/img/paths/${i}.svg`).then((resp) => {
      return resp.text().then((svg) => {
        sessionStorage.setItem(cacheKey, svg);
        return svg;
      });
    });
  }
}

Helpers.ready(async () => {
  new DraggyShapes();

  const aboutBtn = document.querySelector(".js_about-btn");
  const aboutContentEl = document.querySelector(".js_about-content");

  aboutBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Welcome to Geo Shapes",
      html: aboutContentEl.innerHTML,
      showCloseButton: true,
      showConfirmButton: false,
    });
  });
});
