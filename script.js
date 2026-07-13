const menuToggle = document.querySelector(".menu-toggle");
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".product-card");
const cartButton = document.querySelector(".cart-button span");
const cartActions = document.querySelectorAll(".add-cart");
const partnerForm = document.querySelector(".partner-form");
const newsletter = document.querySelector(".newsletter");
const productSwitch = document.querySelector(".product-switch");
const themeMenus = document.querySelectorAll(".theme-menu-panel[data-menu-theme]");
const themeCopy = document.querySelectorAll("[data-theme-copy]");
const themeRoot = document.body;
const searchInput = document.querySelector(".header-search input");
const searchables = document.querySelectorAll(".product-card");
const themeSections = document.querySelectorAll(".ghee-only, .a2-only");
const sectionTitleMap = {
  ghee: {
    title: "Faimly Farm Ghee | Pure Bilona Churned Ghee",
    description:
      "Shop Faimly Farm ghee: pure, bilona churned, fresh, danedar A2 cow, buffalo, blend, puja, combo, and trial ghee.",
  },
  a2: {
    title: "Faimly Farm A2 Ghee | Pure Bilona Churned A2 Ghee",
    description:
      "Shop Faimly Farm A2 ghee: native cow bilona ghee, fresh batches, combinations, subscriptions, and best sellers.",
  },
};

let cartCount = 0;
let currentFilter = "all";

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

  applyTheme(theme);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    currentFilter = tab.dataset.filter || "all";
    filterCards();
  });
});

searchInput?.addEventListener("input", filterCards);

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

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function applyTheme(theme) {
  themeRoot.dataset.theme = theme;
  productSwitch.querySelectorAll("button").forEach((item) => {
    const isActive = item.dataset.themeSwitch === theme;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  themeMenus.forEach((menu) => {
    menu.classList.toggle("active", menu.dataset.menuTheme === theme);
  });

  themeCopy.forEach((item) => {
    item.textContent = item.dataset[theme] || "";
  });

  const meta = sectionTitleMap[theme];
  if (meta) {
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);
  }

  themeSections.forEach((section) => {
    section.hidden = section.classList.contains(`${theme === "a2" ? "ghee" : "a2"}-only`);
  });

  themeRoot.classList.toggle("theme-a2", theme === "a2");
  themeRoot.classList.toggle("theme-ghee", theme === "ghee");

  const themeClasses = ["ghee-only", "a2-only"];
  themeSections.forEach((section) => {
    section.classList.toggle("is-active", true);
    themeClasses.forEach((className) => {
      const shouldHide = theme === "a2" ? className === "ghee-only" : className === "a2-only";
      section.hidden = section.classList.contains(className) && shouldHide;
    });
  });

  if (theme === "a2") {
    const a2Tab = document.querySelector('.tab[data-filter="a2"]');
    a2Tab?.click();
  } else {
    const allTab = document.querySelector('.tab[data-filter="all"]');
    allTab?.click();
  }

  filterCards();
}

function filterCards() {
  const theme = themeRoot.dataset.theme || "ghee";
  const query = (searchInput?.value || "").trim().toLowerCase();

  searchables.forEach((card) => {
    const categories = card.dataset.category?.split(" ") ?? [];
    const matchesTheme =
      theme === "ghee" ? categories.includes("ghee") || categories.includes("cultured") : categories.includes("a2");
    const matchesFilter = currentFilter === "all" || categories.includes(currentFilter);
    const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
    card.hidden = !(matchesTheme && matchesFilter && matchesQuery);
  });
}

applyTheme(themeRoot.dataset.theme || "ghee");
