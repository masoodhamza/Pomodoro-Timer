const timer = document.querySelector("#timer");
const workTime = document.querySelector("#worktime");
const breakTime = document.querySelector("#breaktime");
const task = document.querySelector("#task");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const taskList = document.querySelector("ul");

let timeInterval = null;
let currentTimeLeft = workTime.value * 60;
let initialTime = workTime.value * 60;

play.disabled = true;
pause.disabled = true;
stop.disabled = true;

timer.innerHTML = workTime.value + ":00";

workTime.addEventListener("change", (e) => {
  timer.innerHTML = e.target.value + ":00";
  currentTimeLeft = e.target.value * 60;
  initialTime = e.target.value * 60;
});

task.addEventListener("keyup", () => {
  play.disabled = false;
  pause.disabled = false;
  stop.disabled = false;
});

play.addEventListener("click", () => {
  workTime.disabled = true;
  breakTime.disabled = true;
  task.disabled = true;

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

  timeInterval = setInterval(() => {
    if (currentTimeLeft == 0) {
      clearInterval(timeInterval);
      completeTask();
    } else {
      currentTimeLeft--;
    }
    displayTimeLeft();
  }, 1000);
});

pause.addEventListener("click", () => {
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  clearInterval(timeInterval);
});

let completeTask = () => {
  clearInterval(timeInterval);
  const li = document.createElement("li");

  const timeConsumed = parseInt((initialTime - currentTimeLeft) / 60);

  li.textContent = `${task.value} : ${
    timeConsumed > 0 ? timeConsumed + " mins" : " < 1 min"
  }`;
  taskList.appendChild(li);

  task.value = "";
  currentTimeLeft = workTime.value * 60;
  timer.innerHTML = workTime.value + ":00";

  play.disabled = true;
  pause.disabled = true;
  stop.disabled = true;

  play.classList.remove("d-none");
  pause.classList.add("d-none");
  stop.classList.add("d-none");
  document.querySelector("#msgli").classList.add("d-none");

  workTime.disabled = false;
  breakTime.disabled = false;
  task.disabled = false;
};

stop.addEventListener("click", completeTask);