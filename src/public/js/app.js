const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true, video:true
        });
        console.log(myStream);
        myFace.srcObject = myStream;
    } catch(e) {
        console.log(e);
    }
}

getMedia();

function mediaToggle(target) {
    //console.log(myStream.getAudioTracks());
    myStream[target]().forEach( media => (media.enabled = !media.enabled) );
    //myStream[target]()[0].enabled = !(myStream[target]()[0].enabled);
}

muteBtn.addEventListener('click', function() {
    mediaToggle("getAudioTracks");
    if(!muted) {
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
});

cameraBtn.addEventListener('click', function() {
    //console.log(myStream.getVideoTracks());
    //myStream.getVideoTracks().forEach( media => (media.enabled = !media.enabled) );
    mediaToggle("getVideoTracks");
    if(!cameraOff) {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    } else {
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    }
});