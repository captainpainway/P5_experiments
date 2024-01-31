let max_pendulums = 20;
let pendulums = [];
let started = false;
let time = 0;
let count = 0;
let bg = '#2a5980';
let stopframe = 1500;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(3840, 2160);
    background(bg);

    let len = 10;
    for (let i = 0; i < max_pendulums; i++) {
        pendulums.push(new Pendulum(i, len, stopframe));
        len += (height - (height / 10)) / max_pendulums;
        stopframe += 100 * (i + 1);
    }
}

function draw() {
    time += 0.05;
    for (let pendulum of pendulums) {
        pendulum.update();
    }
    // Stop looping after 20000 frames
    if (frameCount >= 20000) {
        noLoop();
    }
}

class Pendulum {
    constructor(i, len, stopframe) {
        this.index = i;
        this.len = len;
        this.angle = PI / 2;
        this.angleV = 0; // angular velocity
        this.angleA = 0; // angular acceleration
        this.bob = createVector();
        this.origin = createVector(width / 2, 0);
        this.gravity = 0.1;
        this.last = createVector();
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
        let len = this.len + sin(time) * (height / (max_pendulums * 3));

        // Calculate force, acceleration, velocity, angle
        const force = this.gravity * sin(this.angle);
        this.angleA = (-1 * force) / this.len;
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

        if (this.index % 2 !== 0) {
            stroke('rgba(4,35,59,0.6)');
        } else {
            stroke('rgba(163,194,218,0.6)');
        }
        strokeWeight(3);
        noFill();
        let multiplier = 3;
        point(this.bob.x, this.bob.y);
        // line(this.last.x - this.angle * multiplier, this.last.y + this.angle * multiplier, this.bob.x, this.bob.y);

        // Update the last position to the current position
        this.last.x = this.bob.x;
        this.last.y = this.bob.y;
    }
}
