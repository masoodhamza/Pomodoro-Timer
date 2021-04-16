const timer = document.querySelector("#timer");
const time = document.querySelector("#time");
const task = document.querySelector("#task");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");

play.addEventListener("click", () => {
  if (task.value) {
    let currentTimeLeft = time.value * 60;

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

    setInterval(() => {
      if (currentTimeLeft == 0) {
        clearInterval();
      } else {
        currentTimeLeft--;
      }
      displayTimeLeft();
    }, 1000);
  } else {
      alert('Please add your task')
  }
});
