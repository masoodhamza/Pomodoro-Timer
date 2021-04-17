const timer = document.querySelector("#timer");

const time = document.querySelector("#time");
const breakTime = document.querySelector("#breakTime");

const task = document.querySelector("#task");

const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");

let isPaused = false;

play.disabled = true;
pause.disabled = true;
stop.disabled = true;

let currentTimeLeft = time.value * 60;
timer.innerHTML = currentTimeLeft / 60 + ":00";

time.addEventListener("change", (e) => {
  timer.innerHTML = e.target.value + ":00";
  currentTimeLeft = e.target.value * 60;
});

task.addEventListener("keyup", () => {
  play.disabled = false;
  pause.disabled = false;
  stop.disabled = false;
});

play.addEventListener("click", () => {
  time.disabled = true;
  breakTime.disabled = true;

  const displayTimeLeft = () => {
    const secondsLeft = currentTimeLeft;
    let result = "";
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;

    function addZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }

    result += `${addZeroes(minutes)}:${addZeroes(seconds)}`;
    timer.innerText = result.toString();

    play.classList.add("d-none");
    pause.classList.remove("d-none");
    stop.classList.remove("d-none");
  };

  let timeInterval = setInterval(() => {
    if (isPaused || currentTimeLeft == 0) {
      clearInterval(timeInterval);    
    } else {
      currentTimeLeft--;
    }
    displayTimeLeft();
  }, 1000);
});

pause.addEventListener("click", () => {
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  isPaused = true;
  console.log('a ' + currentTimeLeft)
});