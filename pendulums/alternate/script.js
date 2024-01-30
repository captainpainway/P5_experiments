let max_pendulums = 20;
let pendulums = [];
let started = false;
let time = 0;
let count = 0;
let bg = '#231d1d';
let stopframe = 1000;
let colors = ['#FEFAE0', '#A1B46A', '#C5D19A', '#E9EDC9', '#FAEDCD', '#DDB892']

function setup() {
    createCanvas(3840, 2160);
    colorMode(HSL, 255);
    background(bg);

    let len = 10;
    for (let i = 0; i < max_pendulums; i++) {
        let col = colors.pop();
        pendulums.push(new Pendulum(i, len, col, stopframe));
        len += (height / 2 - 210) / max_pendulums;
        stopframe += 100 * (i + 1);
        colors.unshift(col);
    }
}

function draw() {
    time += 0.33;
    for (let pendulum of pendulums) {
        pendulum.update();
    }
    // Stop looping after 20000 frames
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
        this.origin = createVector(width / 2, height / 2);
        this.gravity = 0.1;
        this.last = createVector();
        this.col = col;
        this.stopframe = stopframe;
    }

    update() {
        // Stopping each row of the pendulums at different frames
        if (frameCount >= this.stopframe) {
            if (frameCount === this.stopframe) {
                console.log(`${this.index} stopped at ${frameCount}`);
            }
            return;
        }

        // Lengthen and shorten the pendulum's string with a sine wave
        let len = this.len + sin(time) * (height / (max_pendulums * 5));

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
