/*

;-) aob.

*/
var delta = 0;
var synthIntervalA;
var synthIntervalB;
var synthIntervalC;
var synthIntervalD;

function loop() {
    const loop = setInterval(anim, 10);
}

function anim() {
    delta += 0.01;
    setRotation(delta);
    delta %= 6;
}

function createDronePlusPanner(positionX, positionY, positionZ) {
    const panner = new Tone.Panner3D({
        panningModel: "HRTF",
        positionX,
        positionY,
        positionZ,
    }).toDestination();

    const synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.95,
            decay: 0.95,
            sustain: .95,
            release: 15
        },
        volume: -24
    }).connect(panner);
    
    return synth;
}


function chord(listOfFreqs) {

    for (const freq of listOfFreqs) {
        monoDrone(freq);
    }

}


function monoDrone(val) {
    var randX = Math.random() * 2;
    var randY = Math.random() * 2;
    var randZ = Math.random() * 2;

    var synth = createDronePlusPanner(randX,randY,randZ);
    const now = Tone.now();

    synth.triggerAttack(val, now);
    synth.triggerRelease(now+28);
    }

function setRotation(angle) {
    Tone.Listener.forwardX.value = Math.sin(angle);
    Tone.Listener.forwardY.value = 0;
    Tone.Listener.forwardZ.value = -Math.cos(angle);
}