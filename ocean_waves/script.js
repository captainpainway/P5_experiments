function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
}

let tick = 0.0;

function draw() {
    background('#001046');
    const stripe_width = 30;
    strokeWeight(3);

    noiseDetail(2, 0);

    let from = color('#173db9');
    let to = color('#a6d7ff');
    let lerp = 0.01;

    noFill();
    let div = 100;
    for (let start = 0; start < window.innerHeight; start += stripe_width) {
        stroke(lerpColor(from, to, lerp));
        beginShape(POINTS);
        for (let x = 0; x <= window.width; x += 25) {
            let y = map(noise(x / div + tick, tick), 0, 1, start, 0);
            vertex(x, y);
        }
        endShape();
        div += 10;
        lerp += 0.02;
    }

    strokeWeight(2);
    from = color('#19446F');
    to = color('#00daff');
    lerp2 = 0.01;
    let div2 = 100;
    for (let start = window.innerHeight; start > 0; start -= stripe_width) {
        stroke(lerpColor(from, to, lerp2));
        beginShape();
        for (let x = 0; x <= window.width; x += 5) {
            let y = map(noise(x / div + tick, tick), 1, 0, start, window.innerHeight - 50);
            vertex(x, y);
        }
        endShape();
        div2 += 10;
        lerp2 += 0.02;
    }

    fill(color('#00061f'));
    noStroke();
    beginShape();
        vertex(0, 0);
        vertex(width, 0);
        vertex(width, height);
        vertex(0, height);

        beginContour()
        for (let i = 0; i < TWO_PI; i += TWO_PI / 100) {
            let r = min((width / 2) - 40, (height / 2) - 40);
            let x = sin(i) * r;
            let y = cos(i) * r;
            vertex(x + width / 2, y + height / 2);
        }
        endContour();
    endShape();

    fill(color('#00030d'));
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(width, 0);
    vertex(width, height);
    vertex(0, height);

    beginContour()
    for (let i = 0; i < TWO_PI; i += TWO_PI / 100) {
        let r = min((width / 2) - 20, (height / 2) - 20);
        let x = sin(i) * r;
        let y = cos(i) * r;
        vertex(x + width / 2, y + height / 2);
    }
    endContour();
    endShape();
    tick += 0.02;
}

function mouseClicked() {
    noiseSeed(random(0, 5000));
    tick = 0.0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
