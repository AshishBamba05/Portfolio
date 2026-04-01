const storageKey = "portfolio-theme";
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const themePicker = document.getElementById("themePicker");
const themeToggle = document.getElementById("themeToggle");
const themeMenu = document.getElementById("themeMenu");
const themeOptions = [...document.querySelectorAll(".theme-option")];

const themeLabels = {
  auto: "Auto",
  midnight: "Midnight",
  slate: "Slate",
  sand: "Sand",
  forest: "Forest",
};

function resolveAutoTheme() {
  return "auto";
}

function getStoredThemeChoice() {
  const savedTheme = window.localStorage.getItem(storageKey);
  if (savedTheme && themeLabels[savedTheme]) {
    return savedTheme;
  }

  return "auto";
}

function updateThemeMenu(choice) {
  if (!themeToggle) {
    return;
  }

  themeToggle.textContent = themeLabels[choice];
  themeToggle.setAttribute("aria-label", `Open theme palette. Current palette is ${themeLabels[choice]}.`);

  themeOptions.forEach((option) => {
    const isActive = option.dataset.themeChoice === choice;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-checked", String(isActive));
  });
}

function applyThemeChoice(choice) {
  const resolvedTheme = choice === "auto" ? resolveAutoTheme() : choice;
  document.body.dataset.theme = resolvedTheme;
  updateThemeMenu(choice);
}

function closeThemeMenu() {
  if (!themePicker || !themeToggle) {
    return;
  }

  themePicker.classList.remove("is-open");
  themeToggle.setAttribute("aria-expanded", "false");
}

function openThemeMenu() {
  if (!themePicker || !themeToggle) {
    return;
  }

  themePicker.classList.add("is-open");
  themeToggle.setAttribute("aria-expanded", "true");
}

const initialThemeChoice = getStoredThemeChoice();
applyThemeChoice(initialThemeChoice);

if (themeToggle && themeMenu) {
  themeToggle.addEventListener("click", () => {
    const isOpen = themePicker.classList.contains("is-open");
    if (isOpen) {
      closeThemeMenu();
    } else {
      openThemeMenu();
    }
  });

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const choice = option.dataset.themeChoice;
      window.localStorage.setItem(storageKey, choice);
      applyThemeChoice(choice);
    });
  });

  document.addEventListener("click", (event) => {
    if (!themePicker.contains(event.target)) {
      closeThemeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeThemeMenu();
    }
  });
}

prefersDarkScheme.addEventListener("change", () => {
  const savedTheme = getStoredThemeChoice();
  if (savedTheme !== "auto") {
    return;
  }

  applyThemeChoice("auto");
});

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks.map((link) => {
  const href = link.getAttribute("href");
  const section = href ? document.querySelector(href) : null;
  return section ? { link, section } : null;
}).filter(Boolean);

function updateActiveNavLink() {
  if (sections.length === 0) {
    return;
  }

  const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
  const scrollMarker = window.scrollY + headerHeight + 96;
  const viewportBottom = window.scrollY + window.innerHeight;
  const documentBottom = document.documentElement.scrollHeight;

  if (viewportBottom >= documentBottom - 8) {
    sections.forEach((entry, index) => {
      entry.link.classList.toggle("is-active", index === sections.length - 1);
    });
    return;
  }

  let activeSection = sections[0];

  sections.forEach((entry) => {
    if (scrollMarker >= entry.section.offsetTop) {
      activeSection = entry;
    }
  });

  sections.forEach((entry) => {
    entry.link.classList.toggle("is-active", entry === activeSection);
  });
}

updateActiveNavLink();
window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);

const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}
