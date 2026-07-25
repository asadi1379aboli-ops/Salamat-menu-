let products = [];
let currentSize = "لیوانی";

// Load Products
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderTopProducts();
    renderMenu(products);
  });

// LOADING SCREEN
window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.querySelector(".loading-screen");
    if (loading) {
      loading.style.opacity = "0";
      loading.style.pointerEvents = "none";
      setTimeout(() => loading.remove(), 700);
    }
  }, 1200);
});

// RENDER TOP PRODUCTS
function renderTopProducts() {
  const slider = document.getElementById("topSlider");
  slider.innerHTML = "";
  
  products.slice(0, 5).forEach(product => {
    const price = product.prices["لیوانی"];
    if (price > 0) {
      slider.innerHTML += `
        <div class="top-card" onclick="openProduct(${product.id})">
          <img src="assets/images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${price.toLocaleString('fa-IR')} تومان</p>
        </div>
      `;
    }
  });
}

// RENDER MENU
function renderMenu(data) {
  const container = document.getElementById("menu-list");
  container.innerHTML = "";

  data.forEach(product => {
    const price = product.prices[currentSize];
    
    // اگر قیمت صفر باش��، نشون نده
    if (price === 0 || price === undefined) return;

    container.innerHTML += `
      <div class="menu-card fade-up" onclick="openProduct(${product.id})">
        <div class="menu-image">
          <img src="assets/images/${product.image}" alt="${product.name}">
        </div>
        <div class="menu-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
        <div class="menu-price">
          ${price.toLocaleString('fa-IR')} تومان
        </div>
      </div>
    `;
  });
}

// SIZE BUTTONS
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentSize = btn.dataset.size;
    renderMenu(products);
  });
});

// SEARCH
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", function() {
    const value = this.value.trim();
    
    if (value === "") {
      renderMenu(products);
      return;
    }

    const filtered = products.filter(item => 
      item.name.includes(value)
    );
    renderMenu(filtered);
  });
}

// OPEN PRODUCT MODAL
function openProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById("productModal");
  document.getElementById("modalTitle").innerHTML = product.name;
  document.getElementById("modalDescription").innerHTML = product.description;
  document.getElementById("modalImage").src = "assets/images/" + product.image;

  const pricesDiv = document.getElementById("modalPrices");
  pricesDiv.innerHTML = "";

  Object.entries(product.prices).forEach(([size, price]) => {
    if (price > 0) {
      pricesDiv.innerHTML += `
        <div class="price-item">
          <span>${size}</span>
          <span>${price.toLocaleString('fa-IR')} تومان</span>
        </div>
      `;
    }
  });

  modal.classList.add("active");
}

// CLOSE MODAL
const closeModal = document.getElementById("closeModal");
if (closeModal) {
  closeModal.addEventListener("click", () => {
    document.getElementById("productModal").classList.remove("active");
  });
}

document.getElementById("productModal").addEventListener("click", (e) => {
  if (e.target.id === "productModal") {
    e.target.classList.remove("active");
  }
});

// SCROLL TO TOP
const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// HERO BUTTON
const heroBtn = document.querySelector(".hero-btn");
if (heroBtn) {
  heroBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
  });
}

// FADE HERO ON SCROLL
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = 1 - window.scrollY / 900;
  }
});

// HEADER SHADOW
const header = document.querySelector(".header-fixed");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.style.background = "rgba(255,255,255,.92)";
    header.style.boxShadow = "0 15px 35px rgba(0,0,0,.15)";
  } else {
    header.style.background = "rgba(255,255,255,.65)";
    header.style.boxShadow = "0 15px 35px rgba(0,0,0,.08)";
  }
});
