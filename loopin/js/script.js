function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(60);
    createLoop(30);
    animLoop.noiseFrequency(0.4);
    animLoop.noiseRadius(5);
    background('#150052');
}

function draw() {
    background('#150052');
    stroke(255, 255, 255, 150);
    strokeWeight(12);
    noFill();

    let angle = 0;
    let radius = width / 4;
    beginShape();
    for (let i = 0; i <= 300; i++) {
        let x = sin(angle) * radius;
        let y = cos(angle) * radius;
        let n = map(animLoop.noise2D(x * 0.005, y * 0.005), 0, 1, 1, 1.5);
        angle += TWO_PI / 300;
        vertex(x * n + width / 2, y * n + height / 2);
    }
    endShape();
}