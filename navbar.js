document.addEventListener("DOMContentLoaded", () => {
  // Charger dynamiquement la navbar
  fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;

      // Après insertion du HTML → activer le lien de la page courante
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

      // Ajout de la logique du burger menu
      const burgerMenu = document.getElementById("burger-menu");
      const mobileMenuContainer = document.getElementById("mobile-menu-container");
      
      // S'assurer que les éléments existent
      if (burgerMenu && mobileMenuContainer) {
        burgerMenu.addEventListener("click", () => {
          // Toggle la classe active sur le conteneur du menu mobile ET sur le burger
          mobileMenuContainer.classList.toggle("active");
          burgerMenu.classList.toggle("active");
        });
        
        // Fermer le menu si on clique sur un lien
        const mobileLinks = mobileMenuContainer.querySelectorAll("a");
        mobileLinks.forEach(link => {
          link.addEventListener("click", () => {
            mobileMenuContainer.classList.remove("active");
            burgerMenu.classList.remove("active");
          });
        });
      } else {
        console.error("Éléments du menu mobile non trouvés");
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement de la navbar :", error);
    });
});