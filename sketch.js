var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;
var zstep;

var fr;

var particles = [];

var cnv;

var mainColor;
var alpha;
var bgColor;
var canvasWidth;
var canvasHeight;
var particlesAmount;
var maxspeed;
var rainbow;
var paused = false;


function setup() {
    colorMode(HSB, 255);

    updateVariables();

    cnv = createCanvas(canvasWidth, canvasHeight);
    cols = floor(width / scl);
    rows = floor(height / scl);

    fr = createP('');

    for (var i = 0; i < particlesAmount; i++) {
        particles[i] = new Particle();
    }
    background(bgColor);
}

function draw() {
    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(zoff);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
    zoff += zstep;

    fr.html("Press 's' to save canvas. Framerate: " + floor(frameRate()));
}

function keyTyped() {
    if (key === 's') {
        save(cnv);
    }
}

function reloadForm() {
    //TODO: handle wrong input
    localStorage.zstep = document.getElementById("zstep").value;

    localStorage.mainColor = document.getElementById("maincolor").value;
    localStorage.alpha = document.getElementById("alpha").value;

    localStorage.bgColor = document.getElementById("bgcolor").value;

    localStorage.width = document.getElementById("width").value;
    localStorage.height = document.getElementById("height").value;

    localStorage.particles = document.getElementById("particles").value;
    localStorage.speed = document.getElementById("speed").value;

    localStorage.rainbow = document.getElementById("rainbow").checked;

    location.reload();
}

function updateVariables() {
    if (localStorage.zstep) {
        zstep = parseFloat(localStorage.zstep);
    }
    else {
        zstep = 0.001;
    }

    if (localStorage.mainColor) {
        mainColor = color(localStorage.mainColor);
    }
    else {
        mainColor = color(random(255), 255, 255);
    }
    if (localStorage.alpha) {
        alpha = parseInt(localStorage.alpha);
    }
    else {
        alpha = 5;
    }

    if (localStorage.bgColor) {
        bgColor = color(localStorage.bgColor);
    }
    else {
        bgColor = color("#000000");
    }


    if (localStorage.width) {
        canvasWidth = parseInt(localStorage.width);
    }
    else {
        canvasWidth = 1200;
    }
    if (localStorage.height) {
        canvasHeight = parseInt(localStorage.height);
    }
    else {
        canvasHeight = 600;
    }


    if (localStorage.particles) {
        particlesAmount = parseInt(localStorage.particles);
    }
    else {
        particlesAmount = 1000;
    }
    if (localStorage.speed) {
        maxspeed = parseFloat(localStorage.speed);
    }
    else {
        maxspeed = 4;
    }

    if (localStorage.rainbow) {
        rainbow = localStorage.rainbow === "true";
    }
    else {
        rainbow = false;
    }
}

function handlePause() {
    if(paused){
        paused = false;
        loop();
        document.getElementById("pause").value = "Pause";
    }
    else{
        paused = true;
        noLoop();
        document.getElementById("pause").value = "Continue";
    }
}