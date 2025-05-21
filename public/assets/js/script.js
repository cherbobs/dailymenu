document.addEventListener("DOMContentLoaded", () => {
  // Charger dynamiquement la navbar
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Après insertion du HTML → activer le lien de la page courante
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

      // Ajout de la logique du burger menu
      const burgerMenu = document.getElementById("burger-menu");
      const mobileMenuContainer = document.getElementById(
        "mobile-menu-container"
      );

      // S'assurer que les éléments existent
      if (burgerMenu && mobileMenuContainer) {
        burgerMenu.addEventListener("click", () => {
          // Toggle la classe active sur le conteneur du menu mobile ET sur le burger
          mobileMenuContainer.classList.toggle("active");
          burgerMenu.classList.toggle("active");
        });

        // Fermer le menu si on clique sur un lien
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
});

/* const toggle1 = document.getElementById("toggleBtn1");
const status1 = document.getElementById("status1");

toggle1.addEventListener("click", () => {
  toggle1.classList.toggle("active");

  if (toggle1.classList.contains("active")) {
    status1.textContent = "État : ON";
  } else {
    status1.textContent = "État : OFF";
  }
}); */
const toggle2 = document.getElementById("toggleBtn2");
const root = document.documentElement;

function setDyslexicMode(enabled) {
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

document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("dyslexic") === "true";
  setDyslexicMode(savedMode);

  toggle2.addEventListener("click", () => {
    const isActive = toggle2.classList.contains("active");
    setDyslexicMode(!isActive);
  });
});

const slider = document.getElementById("slider");
const text = document.getElementById("text");
const valueDisplay = document.getElementById("value");

// Met à jour le fond du slider selon la valeur
function updateSliderBackground(value) {
  const min = slider.min;
  const max = slider.max;
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
}

// Charger la valeur sauvegardée
const savedFontSize = localStorage.getItem("fontSize");
if (savedFontSize) {
  slider.value = savedFontSize;
  text.style.fontSize = savedFontSize + "px";
  valueDisplay.textContent = savedFontSize + " px";
  updateSliderBackground(savedFontSize);
} else {
  updateSliderBackground(slider.value);
}

// Écouteur
slider.addEventListener("input", () => {
  const fontSize = slider.value;
  text.style.fontSize = fontSize + "px";
  valueDisplay.textContent = fontSize + " px";
  localStorage.setItem("fontSize", fontSize);
  updateSliderBackground(fontSize);
});
