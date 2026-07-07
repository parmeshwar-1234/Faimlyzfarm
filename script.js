const menuToggle = document.querySelector(".menu-toggle");
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".product-card");
const cartButton = document.querySelector(".cart-button span");
const cartActions = document.querySelectorAll(".add-cart");
const partnerForm = document.querySelector(".partner-form");
const newsletter = document.querySelector(".newsletter");
const productSwitch = document.querySelector(".product-switch");
const themeMenus = document.querySelectorAll(".theme-menu-panel");
const themeCopy = document.querySelectorAll("[data-theme-copy]");

let cartCount = 0;

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const megaItems = document.querySelectorAll(".mega-item");

megaItems.forEach((item) => {
  const trigger = item.querySelector(".mega-trigger");

  trigger?.addEventListener("click", () => {
    const isOpen = !item.classList.contains("mega-open");
    document.body.classList.toggle("mega-menu-open", isOpen);

    megaItems.forEach((menuItem) => {
      menuItem.classList.remove("mega-open");
      menuItem.querySelector(".mega-trigger")?.setAttribute("aria-expanded", "false");
    });

    item.classList.toggle("mega-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open", "mega-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    megaItems.forEach((item) => item.classList.remove("mega-open"));
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".mega-item")) {
    document.body.classList.remove("mega-menu-open");
    megaItems.forEach((item) => {
      item.classList.remove("mega-open");
      item.querySelector(".mega-trigger")?.setAttribute("aria-expanded", "false");
    });
  }
});

productSwitch?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const theme = button.dataset.themeSwitch;
  if (!theme) return;

  document.body.dataset.theme = theme;

  productSwitch.querySelector(".active").classList.remove("active");
  button.classList.add("active");

  themeMenus.forEach((menu) => {
    menu.classList.toggle("active", menu.dataset.menuTheme === theme);
  });

  themeCopy.forEach((item) => {
    item.textContent = item.dataset[theme] || "";
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach((item) => item.classList.toggle("active", item === tab));

    cards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") ?? [];
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

cartActions.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    cartButton.textContent = String(cartCount);
    button.textContent = "Added";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = "Add to cart";
      button.disabled = false;
    }, 1200);
  });
});

partnerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = partnerForm.querySelector(".form-note");
  if (note) {
    note.textContent = "Thanks. The Faimly Farm team will get back to you soon.";
  }
  partnerForm.reset();
});

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = newsletter.querySelector("input");
  const button = newsletter.querySelector("button");
  if (input && button) {
    input.value = "";
    button.textContent = "Joined";
    setTimeout(() => {
      button.textContent = "Join";
    }, 1400);
  }
});
