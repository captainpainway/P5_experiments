function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(15);
    noiseSeed(1); // Keeping the noise the same on refresh.
}

let tick = 0.0;

function draw() {
    // Palette of rainbow colors I picked out earlier.
    let palette = ['#BD2A33', '#E02130', '#D68526', '#FAB243', '#ced630', '#93A31C', '#408156', '#2B5166', '#30374F', '#482344'];
    background('#F7F3E9');
    strokeWeight(2);

    noiseDetail(4, 0.75); // Smoothing out the waves more.

    noFill();
    for (let start = 350; start < 550; start += 20) {
        // Take the first color from the palette and set it
        // as the stroke color. Then, add it back to the end.
        let color = palette.shift();
        stroke(color);
        palette.push(color);

        beginShape();
        // Put a vertex at a random y point at each point x.
        for (let x = 0; x <= window.width; x += 5) {
            // Noise function to smooth out the wave.
            let y = map(noise(x / 200, tick), 0, 1, start, start + 200);
            // Use a sine wave to make it loop.
            // let y = map(noise(x / 200, Math.sin(tick)), 0, 1, start, start + 200);
            vertex(x, y);
        }
        endShape();
    }
    tick += .01;

    // Uncomment for a static image.
    // noLoop();
}