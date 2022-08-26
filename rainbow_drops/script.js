let drops = [],
    max = 255;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background("#212121");
    let palette = [
        color(255, 0, 170, 255),
        color(255, 170, 0, 255),
        color(170, 255, 0, 255),
        color(0, 170, 255, 255),
        color(170, 0, 255, 255)
    ];
    for (let i = 0; i < max; i++) {
        let position = createVector(random(0, width), random(0, height));
        drops[i] = {i: i, position: position, c: palette[i % palette.length], rad: 0, w: random(20)};
    }
}

function draw() {
    background("#212121");
    noFill();
    for (let drop of drops) {
        strokeWeight(drop.w);
        stroke(drop.c);
        if (drop.i < frameCount) {
            circle(drop.position.x, drop.position.y, drop.rad);
            drop.rad += 1;
            drop.c = color(red(drop.c), green(drop.c), blue(drop.c), alpha(drop.c) - 1);
        }
        if (alpha(drop.c) <= 0) {
            drop.i = 0;
            drop.rad = 0;
            drop.c = color(red(drop.c), green(drop.c), blue(drop.c), 255);
        }
    }
}