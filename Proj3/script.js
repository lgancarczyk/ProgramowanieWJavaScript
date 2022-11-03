// ustawić SetTimeout do odtwarzania 
import {KeyToSound} from './Constants/KeyToSound.js';


document.addEventListener('keypress', onKeyPress);
const startStopButton = document.querySelector('#startStopRecordingButton')
startStopButton.addEventListener('click', changeRecordingStatus)

let isRecording = false;

function changeRecordingStatus(){
    if (isRecording == false){
        isRecording = true;
        startStopButton.setAttribute('class', 'buttonIsRecording' )
    }
    else{
        isRecording = false;
        startStopButton.setAttribute('class', 'buttonIsNotRecording' );
    }
}

function onKeyPress(ev) {
    const sound = KeyToSound[ev.key]
    if(sound != undefined){
        recordSound(sound);
    }
}

function recordSound(sound){
    playSound(sound);
}

function playSound(sound) {
    if (!sound) {
        return
    }
    const audioTag = getSoundById(sound)
    audioTag.currentTime = 0
    audioTag.play()
}

function getSoundById(sound){
    return document.querySelector(`#${sound}`);
}