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
      })
      .catch(error => {
        console.error("Erreur lors du chargement de la navbar :", error);
      });
  });
  