let currentSlide = 0; // поточний слайд
let totalSlides = 5; // загальна к-ть слайдів
let isPlaying = true; // чи автоматично крутиться слайдер
let autoTimer = null; // таймер для автокрутіння
let progressTimer = null;

const SLIDER_TIMER = 5000;

const slides = document.querySelector("#slides");
const indicators = document.querySelector("#indicators");
const progress = document.querySelector("#progress");
const playText = document.querySelector("#playText");

const nextSlide = () => {
  currentSlide = currentSlide + 1; //currentSlide++
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }
  updatesSlider();
  resetAutoplay();
};

const prevSlide = () => {
  currentSlide = currentSlide - 1; //currentSlide−−

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  updatesSlider();
  resetAutoplay;
};

const goToSlide = (slideNumber) => {
  currentSlide = slideNumber;

  updatesSlider();
  resetAutoplay;
};

const updatesSlider = () => {
  const moveDistance = -currentSlide * 100;
  slides.style.transform = `translateX(${moveDistance}%)`;
  const allIndicators = indicators.querySelectorAll(".indicator");

  allIndicators.forEach((item, index) => {
    if (index === currentSlide) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

const togglePlay = () => {
  if (isPlaying) {
    stopAutoPlay();
    isPlaying = false;
    playText.textContent = "Play";
  } else {
    startAutoPlay();
    isPlaying = true;
    playText.textContent = "Pause";
  }
};

const startAutoPlay = () => {
  autoTimer = setInterval(() => {
    nextSlide();
  }, SLIDER_TIMER);

  startProgressBar();
};

const stopAutoPlay = () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;

    stopProgressBar();
  }
};

const resetAutoplay = () => {
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
};

const startProgressBar = () => {
  let startTime = Date.now();

  const updateProgress = () => {
    if (!isPlaying) return;
    const elapsed = Date.now() - startTime;
    const progressPercent = (elapsed / SLIDER_TIMER) * 100;

    if (progressPercent >= 100) {
      progress.style.width = "100%";
      setTimeout(() => {
        progress.style.width = "0%";
        startTime = Date.now();
      }, 100);
    } else {
      progress.style.width = `${progressPercent}%`;
    }
    progressTimer = requestAnimationFrame(updateProgress);
  };

  updateProgress();
};

const stopProgressBar = () => {
  if (progressTimer) {
    cancelAnimationFrame(progressTimer);
    progressTimer = null;
  }
  progress.style.width = "0%";
};

const handleKeyboard = (event) => {
  switch (event.key) {
    case "ArrowLeft":
      prevSlide();
      break;
    case "ArrowRight":
      nextSlide();
      break;
    case " ":
      togglePlay();
      break;
  }
};

const createIndicators = () => {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.classList.add("indicator");
    dot.onclick = () => goToSlide(i);
    indicators.appendChild(dot);
  }
};

const initSlider = () => {
  createIndicators();
  updatesSlider();
  startAutoPlay();

  document.addEventListener("keydown", handleKeyboard);
};

document.addEventListener("DOMContentLoaded", initSlider);
