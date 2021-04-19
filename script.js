//output time
const timer = document.querySelector("#timer");

//input textboxes
const workTime = document.querySelector("#worktime");
const breakTime = document.querySelector("#breaktime");
const task = document.querySelector("#task");

//completed task list
const taskList = document.querySelector("ul");

//buttons
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");

//initilizing timers and intervals
let totalWorkTime = 0;

let workInterval = null;
let breakInterval = null;

let initialWorkTime = workTime.value * 60;
let workTimeLeft = workTime.value * 60;

let initialBreakTime = breakTime.value * 60;
let breakTimeLeft = breakTime.value * 60;

let isBreak = false;

//buttons will be enabled when some task in taskbox
// buttons disabled
play.disabled = true;
pause.disabled = true;
stop.disabled = true;

//upon adding task buttons enabled
task.addEventListener("keyup", () => {
  play.disabled = false;
  pause.disabled = false;
  stop.disabled = false;
});

//if user change worktime/breaktime
//chaning worktime
workTime.addEventListener("change", (e) => {
  timer.innerHTML = e.target.value + ":00";
  workTimeLeft = e.target.value * 60;
  initialWorkTime = e.target.value * 60;
});

//changing breaktime
breakTime.addEventListener("change", (e) => {
  timer.innerHTML = e.target.value + ":00";
  breakTimeLeft = e.target.value * 60;
  initialBreakTime = e.target.value * 60;
});

//function to display remaining time
const displayTimeLeft = (timeLeft) => {
  const secondsLeft = timeLeft;
  let result = "";
  const seconds = secondsLeft % 60;
  const minutes = parseInt(secondsLeft / 60) % 60;

  function addZeroes(time) {
    return time < 10 ? `0${time}` : time;
  }

  result += `${addZeroes(minutes)}:${addZeroes(seconds)}`;
  return result.toString();
};

//function to disable inputs
const disableInputs = () => {
  //disabling all input textboxes
  workTime.disabled = true;
  breakTime.disabled = true;
  task.disabled = true;

  //hide play button
  play.classList.add("d-none");

  //show pause/stop buttons
  pause.classList.remove("d-none");
  stop.classList.remove("d-none");
};

//start task
let startTask = () => {
  //changing color of time started time
  workTime.parentElement.classList.add("bg-success", "text-light");
  timer.classList.add("text-success");
  breakTime.parentElement.classList.remove("bg-danger", "text-light");
  timer.classList.remove("text-danger");

  //disable inputs
  disableInputs();

  // start timer
  workInterval = setInterval(() => {
    if (workTimeLeft == 0) {
      clearInterval(workInterval);
      totalWorkTime += initialWorkTime;
      workTimeLeft = workTime.value * 60;
      breakTask();
    } else {
      workTimeLeft--;
    }
    isBreak = false;
    timer.innerText = displayTimeLeft(workTimeLeft);
  }, 1000);
};

// break task
let breakTask = () => {
  //changing color of time break time
  workTime.parentElement.classList.remove("bg-success", "text-light");
  timer.classList.remove("text-success");
  breakTime.parentElement.classList.add("bg-danger", "text-light");
  timer.classList.add("text-danger");

  //disable inputs
  disableInputs();

  //start timer
  breakInterval = setInterval(() => {
    if (breakTimeLeft == 0) {
      clearInterval(breakInterval);
      breakTimeLeft = breakTime.value * 60;
      startTask();
    } else {
      breakTimeLeft--;
    }
    isBreak = true;
    timer.innerText = displayTimeLeft(breakTimeLeft);
  }, 1000);
};

//pause button
pause.addEventListener("click", () => {
  play.classList.remove("d-none");
  pause.classList.add("d-none");
  clearInterval(workInterval);
  clearInterval(breakInterval);
});

//stop button
let completeTask = () => {
  clearInterval(workInterval);
  clearInterval(breakInterval);

  const li = document.createElement("li");
  const secondsLeft = totalWorkTime + initialWorkTime - workTimeLeft;

  li.textContent = `${task.value} : ${
    secondsLeft > 60 ? displayTimeLeft(secondsLeft) : " < 1 min"
  }`;

  taskList.appendChild(li);

  task.value = "";
  workTimeLeft = workTime.value * 60;
  breakTimeLeft = breakTime.value * 60;

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

  totalWorkTime = 0;
};

stop.addEventListener("click", completeTask);

if (isBreak) {
  play.addEventListener("click", breakTask);
} else {
  play.addEventListener("click", startTask);
}