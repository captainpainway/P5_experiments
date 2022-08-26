let tick = 0, stars = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
}

function draw() {
    background(30, 35, 55);
    // createGradientBackground(); // Gradient background not looking great.
    createMoon();
    if (tick % 8 === 0) {
        stars.push(new Star());
    }

    // Makes an array of the indices of drawing_a_star that have gone offscreen.
    // This keeps the drawing_a_star array clean, with only "live" drawing_a_star.
    let removes = [];
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.update();
        if (star.y > height) {
            removes.push(i);
        }
    }

    // Remove drawing_a_star from highest to lowest index to avoid removing on-screen drawing_a_star.
    removes.sort((a, b) => b - a).forEach((idx) => {
        stars.splice(idx, 1);
    });

    tick++;
}

// Using a class to contain all of the star logic instead of creating objects in the draw function.
class Star {
    constructor() {
        this.x = map(random(), 0, 1, 0, width);
        this.y = -50;
        this.time = 1;
        this.random = map(random(), 0, 1, -5, 5); // Adding some random spin to the drawing_a_star.
        this.angle = 0;
        this.acceleration = Math.floor(Math.abs(this.random)) !== 0 ? this.random : 1; // Acceleration is > 0;
        this.color1 = color(255, 248, 166);
        this.color2 = color(250, 250, 250);
        this.color = lerpColor(this.color1, this.color2, random()); // Randomize star color.
        this.filled = random() > 0.5 ? true : false;
    }

    create(cx, cy) {
        strokeWeight(6);
        stroke(this.color);
        if (this.filled) {
            fill(this.color);
        } else {
            noFill();
        }
        strokeJoin(ROUND);

        // Star shape code from https://stackoverflow.com/a/25840319
        let rot = PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = PI / 5;
        let outerRadius = 40;
        let innerRadius = 20;

        beginShape();
        for (let i = 0; i < 5; i++) {
            x = cx + cos(rot) * outerRadius;
            y = cy + sin(rot) * outerRadius;
            vertex(x, y);
            rot += step;

            x = cx + cos(rot) * innerRadius;
            y = cy + sin(rot) * innerRadius;
            vertex(x, y);
            rot += step;
        }
        vertex(x, y);
        endShape(CLOSE);
    }

    update() {
        push();
        angleMode(DEGREES);
        translate(this.x, this.y);
        rotate(this.angle);
        scale(noise(this.time * 0.01)); // Scale the drawing_a_star to make them twinkle!
        angleMode(RADIANS);
        this.create(0, 0);
        this.y += this.time * 0.01;
        this.time += Math.abs(this.acceleration);
        this.angle += this.acceleration;
        pop();
    }
}

function createMoon() {
    stroke(230);
    noFill();
    strokeWeight(4);
    // Outer edge of the moon.
    arc(width - 150, 150, 120, 120, PI + 1, TWO_PI + 2, OPEN);
    // Inner edge of the moon will be a bezier curve.
    beginShape();
        vertex(width - 181, 99);
        // Bezier points(control point 1x, control point 1y, control point 2x, control point 2y, x, y)
        bezierVertex(width - 110, 85, width - 90, 200, width - 176, 204);
    endShape();
}

function createGradientBackground() {
    strokeWeight(2);
    let c1 = color(11, 32, 66);
    let c2 = color(178, 211, 219);
    // Create a background gradient by drawing lines across
    // the screen that gradually get lighter.
    for (let y = 0; y < height; y++) {
        let n = map(y, 0, height, 0, 1);
        let gradient = lerpColor(c1, c2, n);
        stroke(gradient);
        line(0, y, width, y);
    }
}
