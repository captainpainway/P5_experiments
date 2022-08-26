function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
}

let tick = 0.0;
let angle = 0.0;

function draw() {
    background(30, 35, 55);
    const colors = ['#55da93', '#ff2656', '#bada55', '#0dd2d2'];

    for (let i = 1; i < 5; i++) {
        let r = i + 4
        new Circle(r * 100, colors.shift(), tick * i, tick * i + angle);
        angle = abs(sin(tick) + i);
    }

    tick += 0.05;
}

class Circle {
    constructor(radius, color, start, end) {
        this.create(width / 2, height / 2, radius, color, start, end);
    }

    create(x, y, r, c, start, end) {
        stroke(c);
        noFill();
        strokeCap(ROUND);
        strokeWeight(30);
        arc(x, y, r, r, start, end);
    }
}