const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        //console.log(devices);
        // videoinput, audiooutput, audioinput
        let audiooutputs = devices.filter((device)=>{
            return device.kind === 'audiooutput';
        });
        let videoinputs = devices.filter((device)=>{
            return device.kind === 'videoinput';
        });
        let audioinputs = devices.filter((device)=>{
            return device.kind === 'audioinput';
        });
        //console.log(audiooutputs);
        //console.log(videoinputs);
        //console.log(audioinputs);
        videoinputs.push(videoinputs[0])
        videoinputs.forEach((camera)=>{
            //console.log(camera);
            const optionTag = document.createElement("option");
            optionTag.innerText = camera.label;
            optionTag.value = camera.deviceId;
            cameraSelect.appendChild(optionTag);
        });
    } catch(e) {
        console.log(e);
    }
}

async function getMedia(deviceId) {
    const constrains = {
        audio: false, 
        video:{facingMode: "user"}
    };

    const cameraConstrains = {
        audio: false, 
        video:{deviceId : {exact : deviceId}}
    };

    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstrains : constrains
        );
        //console.log(myStream);
        myFace.srcObject = myStream;
        if(!deviceId) {
            await getCameras();
        }
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

cameraSelect.addEventListener('change', async function(event){
    console.log(this.value);
    await getMedia(this.value)
});