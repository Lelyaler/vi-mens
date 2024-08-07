document.addEventListener("DOMContentLoaded", function () {
  // Menu Toggle
  const menu = document.querySelector(".header__menu");
  const burgerMenu = document.querySelector(".header__menu-burger");
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    burgerMenu.style.display = menuOpen ? "block" : "none";
  }

  if (menu && burgerMenu) {
    menu.addEventListener("click", toggleMenu);
    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !burgerMenu.contains(event.target)) {
        burgerMenu.style.display = "none";
        menuOpen = false;
      }
    });
  }

  // Video Overlay
  function handleVideoOverlayClick(event) {
    const overlay = event.currentTarget;
    const iframe = overlay.previousElementSibling;

    if (iframe) {
      overlay.style.display = "none";
      iframe.style.display = "block";
      iframe.requestFullscreen?.();
    }
  }

  const videoOverlay = document.getElementById("video-overlay");
  if (videoOverlay) {
    videoOverlay.addEventListener("click", function () {
      this.style.display = "none";
      const video = document.getElementById("video");
      if (video) {
        video.style.display = "block";
      }
    });
  }

  document
    .querySelectorAll(".custom-video-overlay, .about__us-video-overlay")
    .forEach((overlay) => {
      overlay.addEventListener("click", handleVideoOverlayClick);
    });

  // Carousel
  function updateCarousel() {
    const track = document.querySelector(".carousel__track");
    if (!track) return;

    const items = Array.from(track.children);
    const indicators = document.querySelectorAll(".carousel__indicator");
    let currentIndex = 0;

    function moveToIndex(index) {
      const itemWidth = items[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${itemWidth * index}px)`;
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("carousel__indicator--active", i === index);
      });
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        moveToIndex(currentIndex);
      });
    });

    moveToIndex(currentIndex);
  }

  updateCarousel();

  // Swiper Initialization
  const swiperContainers = document.querySelectorAll(
    ".swiper-container, .reviews-swiper-container"
  );

  swiperContainers.forEach((container) => {
    new Swiper(container, {
      loop: true,
      slidesPerView: container.classList.contains("reviews-swiper-container")
        ? 3
        : 5,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: false,
    });
  });

  // Machine Slider 1
  document.querySelectorAll(".machine__slider").forEach((slider) => {
    const prevButton = slider.querySelector(".prev");
    const nextButton = slider.querySelector(".next");
    const sliderContent = slider.querySelector(".machine__slider-content");
    const slides = sliderContent.querySelectorAll(".machine__slide");
    const totalSlides = slides.length;
    const slidesVisible = 5;
    let currentIndex = 0;

    function showSlide(index) {
      if (index >= totalSlides) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = totalSlides - slidesVisible;
      } else {
        currentIndex = index;
      }
      sliderContent.style.transform = `translateX(-${
        (currentIndex * 100) / slidesVisible
      }%)`;
    }

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => showSlide(currentIndex - 1));
      nextButton.addEventListener("click", () => showSlide(currentIndex + 1));
    }

    showSlide(currentIndex);
  });

  // Machine Slider 2
  function initializeMachineSlider() {
    const track = document.querySelector(".machine__items");
    if (!track) return;

    const items = Array.from(track.children);
    const indicators = document.querySelectorAll(
      ".machine__carousel-indicator"
    );
    let currentIndex = 0;

    function updateCarousel() {
      if (items.length) {
        const itemWidth = items[0].getBoundingClientRect().width;
        const amountToMove = -itemWidth * currentIndex;
        track.style.transform = `translateX(${amountToMove}px)`;

        indicators.forEach((indicator, index) => {
          indicator.classList.toggle(
            "machine__carousel-indicator--active",
            index === currentIndex
          );
        });
      }
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    updateCarousel();
  }

  initializeMachineSlider();
});
