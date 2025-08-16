let points = 0;
let habits = JSON.parse(localStorage.getItem("habits")) || [];
let pointsEl = document.getElementById("points");
let habitList = document.getElementById("habit-list");

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${habit.name}</span>
      <button onclick="completeHabit(${index})">✅</button>
    `;
    habitList.appendChild(li);
  });
}

function completeHabit(index) {
  points += 10;
  pointsEl.textContent = points;
  habits.splice(index, 1);
  saveData();
  renderHabits();
  unlockBadges();
}

document.getElementById("habit-form").addEventListener("submit", e => {
  e.preventDefault();
  let habitInput = document.getElementById("habit-input");
  habits.push({ name: habitInput.value });
  habitInput.value = "";
  saveData();
  renderHabits();
});

function unlockBadges() {
  if (points >= 100) document.getElementById("bronze").className = "unlocked";
  if (points >= 200) document.getElementById("silver").className = "unlocked";
  if (points >= 500) document.getElementById("gold").className = "unlocked";
}

function saveData() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

renderHabits();
