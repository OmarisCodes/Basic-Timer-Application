let timer = null;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;

function startTimer(){
    if (!isRunning){
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 50);
    }
}

function pauseTimer(){
    if (isRunning){
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function resetTimer(){
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateTimer();
}
function updateTimer() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
    }
    const currentTime = formatTime(elapsedTime);
    document.getElementById("timerDisplay").textContent = currentTime;
}


function formatTime(elapsedTime){
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
}

function pad(number){
    return number.toString().padStart(2, '0');
}

function padMs(number){
    return number.toString().padStart(3, '0');
}


document.getElementById("buttonStartRace").addEventListener("click", startTimer);
document.getElementById("buttonStopTimer").addEventListener("click", pauseTimer);
document.getElementById("buttonResetTimer").addEventListener("click", resetTimer);
document.getElementById("buttonRecordTime").addEventListener("click", () => {
    console.log("Time Recorded:", formatTime(elapsedTime));
});
