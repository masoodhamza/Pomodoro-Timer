const timer = document.querySelector("#timer");
const workTime = document.querySelector("#worktime");
const breakTime = document.querySelector("#breakTime");
const task = document.querySelector("#task");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const taskList = document.querySelector("ul");

let timeInterval = null;

play.disabled = true;
pause.disabled = true;
stop.disabled = true;

let currentTimeLeft = workTime.value * 60;
const initialTime = currentTimeLeft;

timer.innerHTML = parseInt(currentTimeLeft / 60) + ":00";

workTime.addEventListener("change", (e) => {
  timer.innerHTML = e.target.value + ":00";
  currentTimeLeft = e.target.value * 60;
});

task.addEventListener("keyup", () => {
  play.disabled = false;
  pause.disabled = false;
  stop.disabled = false;
});

play.addEventListener("click", () => {
  workTime.disabled = true;
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

  timeInterval = setInterval(() => {
    if (currentTimeLeft == 0) {
      clearInterval(timeInterval);
      addTask();
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

let addTask = () => {
  clearInterval(timeInterval);
  const timeLeft = currentTimeLeft;
  const li = document.createElement("li");
  
  const timeConsumed = parseInt((initialTime - timeLeft) / 60);

  li.textContent = `${task.value} : ${timeConsumed > 0 ? timeConsumed + " mins" : " < 1 min"}`;
  taskList.appendChild(li);
  task.value = "";
  play.disabled = true;
  pause.disabled = true;
  stop.disabled = true;
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  stop.classList.add("d-none");
  workTime.disabled = false;
  breakTime.disabled = false;
};

stop.addEventListener("click", addTask);