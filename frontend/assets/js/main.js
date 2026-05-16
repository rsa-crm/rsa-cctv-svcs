const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenuOverlay.classList.toggle("hidden");

    mobileMenuButton.innerHTML = mobileMenu.classList.contains("hidden") ? "☰" : "×";
  });

  mobileMenuOverlay.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenuOverlay.classList.add("hidden");
    mobileMenuButton.innerHTML = "☰";
  });

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuOverlay.classList.add("hidden");
      mobileMenuButton.innerHTML = "☰";
    });
  });
}

const featuredPages = document.querySelectorAll(".featured-products-page");
const featuredDots = document.querySelectorAll(".featured-dot");

if (featuredPages.length && featuredDots.length) {
  featuredDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      featuredPages.forEach((page) => {
        page.classList.remove("active");
      });

      featuredDots.forEach((dotItem) => {
        dotItem.classList.remove("active");
      });

      if (featuredPages[index]) {
        featuredPages[index].classList.add("active");
      }

      dot.classList.add("active");
    });
  });
}