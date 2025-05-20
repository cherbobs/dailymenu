document.addEventListener("DOMContentLoaded", () => {
  // === 1. Charger dynamiquement la navbar ===
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // === 2. Marquer la page active dans la navbar ===
      const currentPage = window.location.pathname.split("/").pop();
      const navLinks = document.querySelectorAll(".nav-links a");

      navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    })
    .catch(error => {
      console.error("Erreur lors du chargement de la navbar :", error);
    });

  // === 3. Appliquer la taille de texte enregistrée à <html> ===
  const size = localStorage.getItem('fontSize');
  if (size) {
    document.documentElement.style.fontSize = `${size}px`;
  }

  // === 4. Appliquer les autres préférences (facultatif) ===
  if (localStorage.getItem('modeContraste') === 'on') {
    document.body.classList.add('contraste');
  }

  if (localStorage.getItem('modeDyslexique') === 'on') {
    document.body.classList.add('dyslexie');
  }
});