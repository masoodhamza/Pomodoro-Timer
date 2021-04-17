const timer = document.querySelector("#timer");
const workTime = document.querySelector("#worktime");
const breakTime = document.querySelector("#breaktime");
const task = document.querySelector("#task");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const taskList = document.querySelector("ul");

let totalWorkTime = 0;

let workInterval = null;
let breakInterval = null;

let initialWorkTime = workTime.value * 60;
let workTimeLeft = workTime.value * 60;

let initialBreakTime = breakTime.value * 60;
let breakTimeLeft = breakTime.value * 60;

play.disabled = true;
pause.disabled = true;
stop.disabled = true;

// do {
  workTime.addEventListener("change", (e) => {
    timer.innerHTML = e.target.value + ":00";
    workTimeLeft = e.target.value * 60;
    initialWorkTime = e.target.value * 60;
  });

  breakTime.addEventListener("change", (e) => {
    timer.innerHTML = e.target.value + ":00";
    breakTimeLeft = e.target.value * 60;
    initialBreakTime = e.target.value * 60;
  });

  task.addEventListener("keyup", () => {
    play.disabled = false;
    pause.disabled = false;
    stop.disabled = false;
  });

  //play button
  let startTask = () => {
    workTime.parentElement.classList.add("worktime");
    timer.classList.add("timerwork");
    breakTime.parentElement.classList.remove("breaktime");
    timer.classList.remove("timerbreak");

    workTime.disabled = true;
    breakTime.disabled = true;
    task.disabled = true;

    const displayTimeLeft = () => {
      const secondsLeft = workTimeLeft;
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

    workInterval = setInterval(() => {
      if (workTimeLeft == 0) {
        clearInterval(workInterval);
        totalWorkTime += initialWorkTime;
        breakTask();        
      } else {
        workTimeLeft--;
      }
      displayTimeLeft();
    }, 10);
  };

  play.addEventListener("click", startTask);

  // break task
  let breakTask = () => {
    workTime.parentElement.classList.remove("worktime");
    timer.classList.remove("timerwork");
    breakTime.parentElement.classList.add("breaktime");
    timer.classList.add("timerbreak");

    workTime.disabled = true;
    breakTime.disabled = true;
    task.disabled = true;

    const displayTimeLeft = () => {
      const secondsLeft = breakTimeLeft;
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

    breakInterval = setInterval(() => {
      if (breakTimeLeft == 0) {
        clearInterval(breakInterval);
        startTask();        
      } else {
        breakTimeLeft--;
      }
      displayTimeLeft();
    }, 10);
  };

  //pause button
  pause.addEventListener("click", () => {
    play.classList.remove("d-none");
    pause.classList.add("d-none");
    clearInterval(workInterval);
  });

  //stop button
  let completeTask = () => {
    clearInterval(workInterval);
    clearInterval(breakInterval);

    const li = document.createElement("li");

    const timeConsumed = parseInt((totalWorkTime - workTimeLeft) / 60);

    li.textContent = `${task.value} : ${
      timeConsumed > 0 ? timeConsumed + " mins" : " < 1 min"
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
  };

  stop.addEventListener("click", completeTask);
// } while (isWorking);
