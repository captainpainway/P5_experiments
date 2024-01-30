let max_pendulums = 20;
let pendulums = [];
let started = false;
let time = 0;
let count = 0;
let bg = '#000000';
let stopframe = 1000;

function setup() {
    createCanvas(3840, 2160);
    colorMode(HSL, 255);
    background(bg);

    let col1 = '#ffbe6f';
    let col2 = '#b894ff';
    let len = 10;
    for (let i = 0; i < max_pendulums; i++) {
        let col = lerpColor(color(col1), color(col2), i / max_pendulums);
        pendulums.push(new Pendulum(i, len, col, stopframe));
        len += (height - 210) / max_pendulums;
        stopframe += 100 * (i + 1);
    }
}

function draw() {
    time += 0.3;
    for (let pendulum of pendulums) {
        pendulum.update();
    }
    if (frameCount >= 20000) {
        noLoop();
    }
}

class Pendulum {
    constructor(i, len, col, stopframe) {
        this.index = i;
        this.len = len;
        this.angle = PI / 2;
        this.angleV = 0; // angular velocity
        this.angleA = 0; // angular acceleration
        this.bob = createVector();
        this.origin = createVector(width / 2, 0);
        this.gravity = 0.1;
        this.last = createVector();
        this.col = col;
        this.stopframe = stopframe;
    }

    update() {
        if (frameCount >= this.stopframe) {
            if (frameCount === this.stopframe) {
                console.log(`${this.index} stopped at ${frameCount}`);
            }
            return;
        }

        let len = this.len + sin(time) * (height / (max_pendulums * 2.5));
        // Calculate force, acceleration, velocity, angle
        const force = this.gravity * sin(this.angle);
        this.angleA = (-1 * force) / this.len;
        this.angleV += this.angleA;
        this.angle += this.angleV;

        // Calculate position of bob each frame
        this.bob.x = this.len * sin(this.angle) + this.origin.x
        this.bob.y = len * cos(this.angle) + this.origin.y;

        if (this.last.x === 0) {
            this.last.x = this.bob.x;
            this.last.y = this.bob.y;
        }

        stroke(this.col);
        strokeWeight(1);
        noFill();
        line(this.last.x, this.last.y, this.bob.x, this.bob.y);
        this.last.x = this.bob.x;
        this.last.y = this.bob.y;
    }
}
