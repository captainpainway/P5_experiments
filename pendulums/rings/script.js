let max_pendulums = 10;
let pendulums = [];
let started = false;
let time = 0;
let count = 0;
let bg = '#212121';
let stopframe = 1000;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(3840, 2160);
    colorMode(HSL, 255);
    background(bg);

    let col1 = '#ff66ffaa';
    let col2 = '#66ffffaa';
    let len = 100;
    let last_height = random(50, height - 50);
    for (let i = 0; i < max_pendulums; i++) {
        let col = lerpColor(color(col1), color(col2), i / max_pendulums);
        let h = last_height < height / 2 ? random(height / 2, height - 50) : random(50, height / 2);
        last_height = h;
        let origin = createVector(i * (width / max_pendulums) + 50, h);
        for (let j = 0; j < 2; j++) {
            pendulums.push(new Pendulum(j, len, col, stopframe, origin));
        }
        len += 1;
    }
}

function draw() {
    time += 0.2;
    for (let pendulum of pendulums) {
        pendulum.update();
    }
    // Stop looping after 20000 frames
    if (frameCount >= 3000) {
        noLoop();
    }
}

class Pendulum {
    constructor(i, len, col, stopframe, origin) {
        this.index = i;
        this.len = len;
        this.angle = PI / 2;
        this.angleV = 0; // angular velocity
        this.angleA = 0; // angular acceleration
        this.bob = createVector();
        this.origin = origin;
        this.gravity = 0.1;
        this.last = createVector();
        this.col = col;
        this.stopframe = stopframe;
    }

    update() {
        // Lengthen and shorten the pendulum's string with a sine wave
        let len = this.len + sin(time) * 20;

        // Calculate force, acceleration, velocity, angle
        const force = this.gravity * sin(this.angle);
        let multiplier = this.index % 2 === 0 ? 1 : -1;
        this.angleA = (multiplier * force) / this.len;
        this.angleV += this.angleA;
        this.angle += this.angleV;

        // Calculate position of bob each frame
        this.bob.x = len * sin(this.angle) + this.origin.x
        this.bob.y = len * cos(this.angle) + this.origin.y;

        // If this is the first frame, set the last position
        // of the pendulum bob to the current position
        if (this.last.x === 0) {
            this.last.x = this.bob.x;
            this.last.y = this.bob.y;
        }

        stroke(this.col);
        strokeWeight(1);
        noFill();
        line(this.last.x, this.last.y, this.bob.x, this.bob.y);

        // Update the last position to the current position
        this.last.x = this.bob.x;
        this.last.y = this.bob.y;
    }
}
