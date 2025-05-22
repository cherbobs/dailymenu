document.addEventListener("DOMContentLoaded", () => {
  // ========== NAVBAR ==========
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Activer le lien de la page courante
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
  const root = document.documentElement;

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

  // ========== TAILLE DU TEXTE ==========
  const slider = document.getElementById("slider");

  function applyGlobalFontSize(size) {
    document.documentElement.style.fontSize = `${size}px`;
    localStorage.setItem("fontSize", size);
  }

  function updateSliderBackground(value) {
    const min = parseInt(slider?.min);
    const max = parseInt(slider?.max);
    const percent = ((value - min) / (max - min)) * 100;
    if (slider) {
      slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
    }
  }

  const savedSize = parseInt(localStorage.getItem("fontSize")) || 16;
  document.documentElement.style.fontSize = `${savedSize}px`;

  if (slider) {
    slider.max = "36"; // Définit dynamiquement le maximum à 36 si besoin
    slider.value = savedSize;
    updateSliderBackground(savedSize);
  }

  // Debounce lors du changement
  let debounceTimer;
  slider?.addEventListener("input", () => {
    const size = slider.value;
    updateSliderBackground(size);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      applyGlobalFontSize(size);
    }, 300);
  });
});
