document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ========== NAVBAR ==========
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll(".nav-links a");

      navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");
        if (
          linkPage === currentPage ||
          (currentPage === "" && linkPage === "index.html")
        ) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      // Menu burger
      const burgerMenu = document.getElementById("burger-menu");
      const mobileMenuContainer = document.getElementById(
        "mobile-menu-container"
      );

      if (burgerMenu && mobileMenuContainer) {
        burgerMenu.addEventListener("click", () => {
          mobileMenuContainer.classList.toggle("active");
          burgerMenu.classList.toggle("active");
        });

        const mobileLinks = mobileMenuContainer.querySelectorAll("a");
        mobileLinks.forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenuContainer.classList.remove("active");
            burgerMenu.classList.remove("active");
          });
        });
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la navbar :", error);
    });

  // ========== MODE DYSLEXIQUE ==========
  const toggle2 = document.getElementById("toggleBtn2");

  function setDyslexicMode(enabled) {
    if (enabled) {
      root.classList.add("dyslexic-mode");
      toggle2?.classList.add("active");
      toggle2?.setAttribute("aria-checked", "true");
      localStorage.setItem("dyslexic", "true");
    } else {
      root.classList.remove("dyslexic-mode");
      toggle2?.classList.remove("active");
      toggle2?.setAttribute("aria-checked", "false");
      localStorage.setItem("dyslexic", "false");
    }
  }

  const savedMode = localStorage.getItem("dyslexic") === "true";
  setDyslexicMode(savedMode);

  toggle2?.addEventListener("click", () => {
    const isActive = toggle2.classList.contains("active");
    setDyslexicMode(!isActive);
  });

  // ========== MODE CONTRASTE ==========
  const toggle1 = document.getElementById("toggleBtn1");

  function setContrastMode(enabled) {
    if (enabled) {
      root.classList.add("high-contrast-mode");
      toggle1?.classList.add("active");
      toggle1?.setAttribute("aria-checked", "true");
      localStorage.setItem("contrast", "true");
    } else {
      root.classList.remove("high-contrast-mode");
      toggle1?.classList.remove("active");
      toggle1?.setAttribute("aria-checked", "false");
      localStorage.setItem("contrast", "false");
    }
  }

  const savedContrast = localStorage.getItem("contrast") === "true";
  setContrastMode(savedContrast);

  toggle1?.addEventListener("click", () => {
    const isActive = toggle1.classList.contains("active");
    setContrastMode(!isActive);
  });

  // ========== TAILLE DU TEXTE ==========
  const slider = document.getElementById("slider");

  function applyGlobalFontSize(size) {
    root.style.fontSize = `${size}px`;
    localStorage.setItem("fontSize", size);
  }

  function updateSliderBackground(value) {
    const min = parseInt(slider?.min);
    const max = parseInt(slider?.max);
    const percent = ((value - min) / (max - min)) * 100;
    if (slider) {
      slider.style.background = `linear-gradient(to right, var(--primary-color) ${percent}%, #ccc ${percent}%)`;
    }
  }

  const savedSize = parseInt(localStorage.getItem("fontSize")) || 16;
  root.style.fontSize = `${savedSize}px`;

  if (slider) {
    slider.max = "36";
    slider.value = savedSize;
    updateSliderBackground(savedSize);

    let debounceTimer;
    slider.addEventListener("input", () => {
      const size = slider.value;
      updateSliderBackground(size);

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyGlobalFontSize(size);
      }, 300);
    });
  }
});
