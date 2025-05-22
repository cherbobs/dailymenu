document.addEventListener("DOMContentLoaded", () => {
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
      } else {
        console.error("Éléments du menu mobile non trouvés");
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la navbar :", error);
    });

  // ========== MODE DYSLEXIQUE ==========
  const toggle2 = document.getElementById("toggleBtn2");
  const root = document.documentElement;

  function setDyslexicMode(enabled) {
    if (!toggle2) return;
    if (enabled) {
      root.classList.add("dyslexic-mode");
      toggle2.classList.add("active");
      toggle2.setAttribute("aria-checked", "true");
      localStorage.setItem("dyslexic", "true");
    } else {
      root.classList.remove("dyslexic-mode");
      toggle2.classList.remove("active");
      toggle2.setAttribute("aria-checked", "false");
      localStorage.setItem("dyslexic", "false");
    }
  }

  const savedMode = localStorage.getItem("dyslexic") === "true";
  setDyslexicMode(savedMode);

  if (toggle2) {
    toggle2.addEventListener("click", () => {
      const isActive = toggle2.classList.contains("active");
      setDyslexicMode(!isActive);
    });
  }

  // ========== SLIDER POLICE ==========
  const slider = document.getElementById("slider");
  const text = document.getElementById("text");
  const valueDisplay = document.getElementById("value");

  function updateSliderBackground(value) {
    if (!slider) return;
    const min = slider.min;
    const max = slider.max;
    const percent = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
  }

  const savedFontSize = localStorage.getItem("fontSize");
  if (slider && text && valueDisplay) {
    if (savedFontSize) {
      slider.value = savedFontSize;
      text.style.fontSize = savedFontSize + "px";
      valueDisplay.textContent = savedFontSize + " px";
      updateSliderBackground(savedFontSize);
    } else {
      updateSliderBackground(slider.value);
    }

    slider.addEventListener("input", () => {
      const fontSize = slider.value;
      text.style.fontSize = fontSize + "px";
      valueDisplay.textContent = fontSize + " px";
      localStorage.setItem("fontSize", fontSize);
      updateSliderBackground(fontSize);
    });
  }
});
