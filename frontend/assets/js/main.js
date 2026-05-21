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

const featuredGrid = document.getElementById("featuredProductsGrid");
const featuredDotsContainer = document.getElementById("featuredProductsDots");

if (featuredGrid && featuredDotsContainer) {
  const productCards = Array.from(featuredGrid.querySelectorAll(".featured-product-card"));
  let currentPage = 0;

  function getProductsPerPage() {
    return window.innerWidth <= 767 &&
          window.matchMedia("(orientation: portrait)").matches
          ? 6
          : 5;
  }

  function renderFeaturedProducts() {
    const perPage = getProductsPerPage();
    const totalPages = Math.ceil(productCards.length / perPage);

    if (currentPage >= totalPages) {
      currentPage = totalPages - 1;
    }

    productCards.forEach((card, index) => {
      const start = currentPage * perPage;
      const end = start + perPage;

      card.style.display = index >= start && index < end ? "grid" : "none";
    });

    featuredDotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "featured-dot";

      if (i === currentPage) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        currentPage = i;
        renderFeaturedProducts();
      });

      featuredDotsContainer.appendChild(dot);
    }
  }

  renderFeaturedProducts();

  window.addEventListener("resize", () => {
    currentPage = 0;
    renderFeaturedProducts();
  });
}
const promoGrid = document.getElementById("promoProductsGrid");
const promoDotsContainer = document.getElementById("promoProductsDots");

if (promoGrid && promoDotsContainer) {
  const promoCards = Array.from(promoGrid.querySelectorAll(".promo-product-card"));
  let currentPromoPage = 0;

  function getPromoProductsPerPage() {
    return window.innerWidth <= 767 &&
           window.matchMedia("(orientation: portrait)").matches
           ? 6
           : 5;
  }

  function renderPromoProducts() {
    const perPage = getPromoProductsPerPage();
    const totalPages = Math.ceil(promoCards.length / perPage);

    if (currentPromoPage >= totalPages) {
      currentPromoPage = totalPages - 1;
    }

    promoCards.forEach((card, index) => {
      const start = currentPromoPage * perPage;
      const end = start + perPage;

      card.style.display = index >= start && index < end ? "grid" : "none";
    });

    promoDotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "promo-dot";

      if (i === currentPromoPage) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        currentPromoPage = i;
        renderPromoProducts();
      });

      promoDotsContainer.appendChild(dot);
    }
  }

  renderPromoProducts();

  window.addEventListener("resize", () => {
    currentPromoPage = 0;
    renderPromoProducts();
  });
}
/* =========================
   PRODUCTS PAGE PAGINATION + FILTER
========================= */

const productsGrid = document.querySelector(".products-catalog-grid");
const productsCount = document.getElementById("productsCount");
const productsPageNumbers = document.getElementById("productsPageNumbers");
const productsPrevBtn = document.getElementById("productsPrevBtn");
const productsNextBtn = document.getElementById("productsNextBtn");
const productFilterButtons = document.querySelectorAll(".product-filter-btn");

if (productsGrid && productsPageNumbers && productsPrevBtn && productsNextBtn) {
  const allProductCards = Array.from(
    productsGrid.querySelectorAll(".catalog-product-card")
  );

  let currentProductsPage = 0;
  let currentFilter = "all";

  function getProductsPerPage() {
    const isMobilePortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
    return isMobilePortrait ? 6 : 12;
  }

  function getFilteredProducts() {
    if (currentFilter === "sale") {
      return allProductCards.filter((card) =>
        card.querySelector(".catalog-sale-price")
      );
    }

    if (currentFilter === "all") {
      return allProductCards;
    }

    return allProductCards.filter((card) =>
      card.dataset.category === currentFilter
    );
  }

  function renderProductsPage() {
    const productsPerPage = getProductsPerPage();
    const filteredProducts = getFilteredProducts();

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    if (currentProductsPage >= totalPages) {
      currentProductsPage = 0;
    }

    const start = currentProductsPage * productsPerPage;
    const end = start + productsPerPage;

    allProductCards.forEach((card) => {
      card.style.display = "none";
    });

    filteredProducts.slice(start, end).forEach((card) => {
      card.style.display = "flex";
    });

    if (productsCount) {
      productsCount.textContent =
        totalProducts > 0
          ? `Showing ${start + 1}–${Math.min(end, totalProducts)} of ${totalProducts} products`
          : `Showing 0 products`;
    }

    productsPageNumbers.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.type = "button";
      pageBtn.className = "product-page-btn";
      pageBtn.textContent = i + 1;

      if (i === currentProductsPage) {
        pageBtn.classList.add("active");
      }

      pageBtn.addEventListener("click", () => {
        currentProductsPage = i;
        renderProductsPage();
      });

      productsPageNumbers.appendChild(pageBtn);
    }

    productsPrevBtn.disabled = currentProductsPage === 0;
    productsNextBtn.disabled = currentProductsPage >= totalPages - 1;

    productsPrevBtn.style.display = totalPages <= 1 ? "none" : "flex";
    productsNextBtn.style.display = totalPages <= 1 ? "none" : "flex";
  }

  productFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      productFilterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      currentFilter = button.getAttribute("data-filter") || "all";
      currentProductsPage = 0;

      renderProductsPage();
    });
  });

  window.addEventListener("resize", () => {
    currentProductsPage = 0;
    renderProductsPage();
  });

  renderProductsPage();
}
