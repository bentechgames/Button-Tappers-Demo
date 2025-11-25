let score = 0;

const scoreEl = document.getElementById("score-value");
const button = document.getElementById("tap-button");
const effectsLayer = document.getElementById("effects-layer");
const infoToggle = document.getElementById("info-toggle");
const infoPanel = document.getElementById("info-panel");
const infoClose = document.getElementById("info-close");
const splash = document.getElementById("splash");

function updateScore() {
  scoreEl.textContent = String(score);
}

function spawnPlusEffect(x, y) {
  const plus = document.createElement("div");
  plus.textContent = "+1";
  plus.className = "plus-effect";

  plus.style.left = `${x}px`;
  plus.style.top = `${y}px`;

  effectsLayer.appendChild(plus);

  plus.addEventListener(
    "animationend",
    () => {
      plus.remove();
    },
    { once: true }
  );
}

function handleTap(evt) {
  evt.preventDefault();

  score += 1;
  updateScore();

  const rect = button.getBoundingClientRect();
  let x;
  let y;

  if (evt.touches && evt.touches[0]) {
    x = evt.touches[0].clientX;
  } else if (evt.changedTouches && evt.changedTouches[0]) {
    x = evt.changedTouches[0].clientX;
  } else if (evt.clientX !== undefined) {
    x = evt.clientX;
  } else {
    x = rect.left + rect.width / 2;
  }

  // Position the floating +1 a bit higher above the button
  y = rect.top + rect.height * 0.02;

  spawnPlusEffect(x, y);
}

// Touch
button.addEventListener(
  "touchstart",
  (e) => {
    handleTap(e);
  },
  { passive: false }
);

// Mouse / pointer
button.addEventListener("click", (e) => {
  handleTap(e);
});

if (infoToggle && infoPanel) {
  infoToggle.addEventListener("click", () => {
    const isOpen = infoPanel.classList.toggle("open");
    infoPanel.setAttribute("aria-hidden", String(!isOpen));
  });
}

if (infoClose && infoPanel) {
  infoClose.addEventListener("click", () => {
    infoPanel.classList.remove("open");
    infoPanel.setAttribute("aria-hidden", "true");
  });
}

if (splash) {
  const hideSplash = () => {
    splash.classList.add("hidden");
  };

  window.addEventListener("load", () => {
    setTimeout(hideSplash, 1200);
  });

  splash.addEventListener("click", hideSplash);
  splash.addEventListener("touchstart", (e) => {
    e.preventDefault();
    hideSplash();
  }, { passive: false });
}