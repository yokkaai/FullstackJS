class Slider {
  constructor(container, options = {}) {
    this.container = container;
    this.sliderElements = this.container.querySelectorAll(".slide");
    this.totalSlides = this.sliderElements.length;

    this.config = {
      autoplay: true,
      duration: 4000,
      ...this.getDataConfig(),
      ...options,
    };

    this.currentSlide = 0;
    this.isPlaying = this.config.autoplay;
    this.autoTimer = null;
    this.progressTimer = null;

    this.slides = this.container.querySelector(".slides");
    this.indicators = this.container.querySelector(".indicators");
    this.progress = this.container.querySelector(".progress");
    this.playText = this.container.querySelector("#playText");

    if (!this.slides || !this.totalSlides) {
      console.error("No slides");
      return;
    }

    this.init();
  }

  getDataConfig() {
    const config = this.container.getAttribute("data-slider-config");
    try {
      return config ? JSON.parse(config) : {};
    } catch (error) {
      console.log("Parse data config error");
      return {};
    }
  }

  init() {
    this.createIndicators();
    this.bindEvents();
    this.updateSlide();

    if (this.isPlaying) {
      this.startAutoPlay();
    }

    this.updatePlayButton();
  }

  createIndicators() {
    if (!this.indicators) return;
    this.indicators.innerHTML = "";

    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement("button");
      indicator.classList.add("indicator");
      indicator.setAttribute("data-slide", i);
      indicator.addEventListener("click", () => this.goToSlide(i));
      this.indicators.appendChild(indicator);
    }
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlide();
    this.requestAutoPlay();
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
    this.updateSlide();
    this.requestAutoPlay();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlide();
    this.requestAutoPlay();
  }

  updatePlayButton() {
    if (this.playText) {
      this.playText.textContent = this.isPlaying ? "Pause" : "Play";
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }

    this.updatePlayButton();
  }

  bindEvents() {
    this.container.addEventListener("click", (event) => {
      const action = event.target.getAttribute("data-action");
      switch (action) {
        case "prev":
          this.prevSlide();
          break;
        case "next":
          this.nextSlide();
          break;
        case "toggle":
          this.togglePlay();
          break;
      }
    });

    this.container.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.prevSlide();
          break;
        case "ArrowRight":
          this.nextSlide();
          break;
        case " ":
          this.togglePlay();
          break;
      }
    });
  }

  updateSlide() {
    const translateX = -this.currentSlide * 100;
    this.slides.style.transform = `translateX(${translateX}%)`;

    if (this.indicators) {
      const indicator = this.indicators.querySelectorAll(".indicator");
      indicator.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentSlide);
      });
    }
  }

  startProgressBar() {
    if (!this.progress) return;

    let startTime = Date.now();

    const updeteProgress = () => {
      if (!this.isPlaying || !this.autoTimer) return;

      const elapset = Date.now() - startTime;
      const progressPercent = (elapset / this.config.duration) * 100;

      if (progressPercent >= 100) {
        this.progress.style.width = "100%";
        setTimeout(() => {
          this.progress.style.width = "0%";
          startTime = Date.now();
        }, 100);
      } else {
        this.progress.style.width = `${progressPercent}%`;
      }
      this.progressTimer = requestAnimationFrame(updeteProgress);
    };
    updeteProgress();
  }

  stopProgressBar() {
    if (this.progressTimer) {
      cancelAnimationFrame(this.progressTimer);
      this.progressTimer = null;
    }
    this.progress.style.width = "0%";
  }

  startAutoPlay() {
    if (!this.config.autoplay) return;

    this.autoTimer = setInterval(() => {
      this.nextSlide();
    }, this.config.duration);

    this.startProgressBar();
  }

  stopAutoPlay() {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
      this.autoTimer = null;
    }
    this.stopProgressBar();
  }

  requestAutoPlay() {
    if (this.isPlaying) {
      this.stopAutoPlay();
       this.startAutoPlay();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  if (sliderContainer) {
    new Slider(sliderContainer);
  }
});
