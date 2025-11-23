console.log("Chaise & Co loaded");

//
// REVEAL ON SCROLL
//
const reveals = document.querySelectorAll(".reveal");

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.85;
  reveals.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) el.classList.add("active");
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

//
// SCROLL PROGRESS BAR
//
const scrollBar = document.getElementById("scroll-progress");
if (scrollBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollBar.style.transform = `scaleX(${progress})`;
  });
}

//
// HERO PARALLAX
//
const parallaxEls = document.querySelectorAll("[data-parallax]");
if (parallaxEls.length) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      el.style.transform = `translateY(${y * -speed}px)`;
    });
  });
}

//
// CAROUSEL SIGNATURE
//
const track = document.querySelector(".carousel-track");
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

if (track && btnLeft && btnRight) {
  let index = 0;
  const cardWidth = 320;

  btnRight.addEventListener("click", () => {
    if (index < track.children.length - 1) index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  });

  btnLeft.addEventListener("click", () => {
    if (index > 0) index--;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  });
}

//
// GALERIE PRODUIT
//
const mainImage = document.getElementById("product-main");
const thumbs = document.querySelectorAll(".product-thumbs .thumb");

if (mainImage && thumbs.length) {
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImage.src = thumb.dataset.large;
    });
  });
}

//
// MINI-PANIER SLIDE-IN
//
const cartOverlay = document.getElementById("cart-overlay");
const cartPanel = document.getElementById("cart-panel");
const cartClose = document.getElementById("cart-close");
const cartIcon = document.getElementById("cart-icon");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

function openCart() {
  if (!cartOverlay || !cartPanel) return;
  cartOverlay.classList.add("active");
  cartPanel.classList.add("active");

  if (cartIcon) {
    cartIcon.classList.add("shake");
    setTimeout(() => cartIcon.classList.remove("shake"), 350);
  }
}

function closeCart() {
  if (!cartOverlay || !cartPanel) return;
  cartOverlay.classList.remove("active");
  cartPanel.classList.remove("active");
}

if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
if (cartClose) cartClose.addEventListener("click", closeCart);
if (cartIcon) cartIcon.addEventListener("click", openCart);

function updateCartUI() {
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;

    const el = document.createElement("div");
    el.classList.add("cart-item");
    el.innerHTML = `
      <img src="${item.img}" alt="">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.variant || ""}</p>
      </div>
      <div class="cart-item-price">${item.price}€</div>
    `;
    cartItems.appendChild(el);
  });

  cartTotal.textContent = total + "€";
}

function addToCart(product) {
  cart.push(product);
  updateCartUI();
  openCart();
}

window.addToCart = addToCart;

//
// Quick add depuis la page produit
//
const productAddBtn = document.getElementById("product-add-cart");

if (productAddBtn && mainImage) {
  productAddBtn.addEventListener("click", () => {
    addToCart({
      name: "Chaise N°3 – Noyer Italien",
      price: 450,
      img: mainImage.src,
      variant: "Noyer italien • Taille M"
    });
  });
}

//
// QUICK VIEW MODAL
//
const qvOverlay = document.getElementById("quickview-overlay");
const qvClose = document.getElementById("quickview-close");
const qvImage = document.getElementById("qv-image");
const qvTitle = document.getElementById("qv-title");
const qvPrice = document.getElementById("qv-price");
const qvTag = document.getElementById("qv-tag");
const qvDescription = document.getElementById("qv-description");
const qvAddCart = document.getElementById("qv-add-cart");

let currentQVProduct = null;

function openQuickView(data) {
  if (!qvOverlay || !qvImage || !qvTitle) return;

  currentQVProduct = data;

  qvImage.src = data.img;
  qvTitle.textContent = data.name;
  if (qvPrice)
    qvPrice.textContent =
      data.price && data.price !== "—" ? data.price + "€" : "";
  if (qvTag) qvTag.textContent = data.tag || "";
  if (qvDescription) qvDescription.textContent = data.description || "";

  qvOverlay.classList.add("active");
}

function closeQuickView() {
  if (!qvOverlay) return;
  qvOverlay.classList.remove("active");
  currentQVProduct = null;
}

if (qvOverlay) {
  qvOverlay.addEventListener("click", (e) => {
    if (e.target === qvOverlay) closeQuickView();
  });
}
if (qvClose) qvClose.addEventListener("click", closeQuickView);

if (qvAddCart) {
  qvAddCart.addEventListener("click", () => {
    if (!currentQVProduct) return;
    if (currentQVProduct.price && currentQVProduct.price !== "—") {
      addToCart({
        name: currentQVProduct.name,
        price: Number(currentQVProduct.price),
        img: currentQVProduct.img,
        variant: currentQVProduct.tag || ""
      });
      closeQuickView();
    }
  });
}

//
// Attacher les triggers Quick-View
//
function attachQuickViewTriggers() {
  const triggers = document.querySelectorAll("[data-quickview]");

  triggers.forEach((el) => {
    const internalBtn =
      el.querySelector(".product-quick") || el.querySelector(".btn-ghost");

    const handler = (event) => {
      event.preventDefault();
      event.stopPropagation();

      openQuickView({
        name: el.dataset.name || "",
        price: el.dataset.price || "—",
        img: el.dataset.img || "",
        tag: el.dataset.tag || "",
        description: el.dataset.description || ""
      });
    };

    if (internalBtn) {
      internalBtn.addEventListener("click", handler);
    } else {
      el.addEventListener("click", handler);
    }
  });
}

attachQuickViewTriggers();

//
// DARK MODE
//
const themeToggle = document.getElementById("theme-toggle");

function applyStoredTheme() {
  const saved = localStorage.getItem("chaise_theme");

  if (saved === "dark") {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    if (themeToggle) themeToggle.textContent = "☀";
  } else {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    if (themeToggle) themeToggle.textContent = "☾";
  }
}

applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    document.body.classList.toggle("theme-light");
    localStorage.setItem("chaise_theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀" : "☾";
  });
}
// ----- FORMULAIRE SUR-MESURE -----
const customForm = document.getElementById("custom-form");

if (customForm) {
  customForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // mini feedback luxe (tu pourras remplacer par un vrai envoi plus tard)
    alert("Merci, nous reviendrons vers vous très prochainement avec une proposition sur-mesure.");
    customForm.reset();
  });
}