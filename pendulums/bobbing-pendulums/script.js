let max_pendulums = 20;
let pendulums = [];
let time = 0;
let bg = '#000000';

function setup() {
    createCanvas(1920, 1080);
    background(bg);

    let len = 100;
    for (let i = 0; i < max_pendulums; i++) {
        pendulums.push(new Pendulum(len));
        len += (height - 100) / max_pendulums;
    }
}

function draw() {
    time += 0.1;
    background(bg);
    for (let pendulum of pendulums) {
        pendulum.update();
    }
}

class Pendulum {
    constructor(len) {
        this.len = len;
        this.angle = PI / 4;
        this.angleV = 0; // angular velocity
        this.angleA = 0; // angular acceleration
        this.bob = createVector();
        this.origin = createVector(width / 2, 0);
        this.gravity = 0.1;
    }

    update() {
        // Lengthen and shorten the pendulum's string with a sine wave
        let len = this.len + sin(time) * (height / (max_pendulums * 2.5));

        // Calculate force, acceleration, velocity, angle
        const force = this.gravity * sin(this.angle);
        this.angleA = (-1 * force) / this.len;
        this.angleV += this.angleA;
        this.angle += this.angleV;

        // Calculate position of bob each frame
        this.bob.x = len * sin(this.angle) + this.origin.x
        this.bob.y = len * cos(this.angle) + this.origin.y;

        // Draw string
        stroke(color(255, 255, 255, 100));
        strokeWeight(1);
        line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);

        // Draw pendulum bob
        stroke(color(255, 255, 255, 255));
        strokeWeight(20);
        noFill();
        point(this.bob.x, this.bob.y);
    }
}
