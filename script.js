// Año footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Menú móvil
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cerrar menú al clicar un enlace en móvil
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Tabs carta
const tabs = Array.from(document.querySelectorAll(".tab"));
const panes = Array.from(document.querySelectorAll(".tabpane"));

tabs.forEach((t) => {
  t.addEventListener("click", () => {
    const targetId = t.dataset.tab;

    tabs.forEach((x) => x.classList.remove("is-active"));
    t.classList.add("is-active");

    panes.forEach((p) => p.classList.remove("is-active"));
    document.getElementById(targetId)?.classList.add("is-active");

    // reset búsqueda
    const search = document.getElementById("menuSearch");
    if (search) {
      search.value = "";
      filterMenu("");
    }
  });
});

// Buscador de carta (solo en tab activo)
const menuSearch = document.getElementById("menuSearch");
const hint = document.getElementById("searchHint");

function filterMenu(query) {
  const q = query.trim().toLowerCase();
  const activePane = document.querySelector(".tabpane.is-active");
  if (!activePane) return;

  const items = Array.from(activePane.querySelectorAll(".menu li"));
  let visible = 0;

  items.forEach((li) => {
    const text = li.innerText.toLowerCase();
    const show = q === "" || text.includes(q);
    li.classList.toggle("is-hidden", !show);
    if (show) visible++;
  });

  if (hint) hint.textContent = q ? `Resultados: ${visible}` : "";
}

if (menuSearch) {
  menuSearch.addEventListener("input", (e) => filterMenu(e.target.value));
}

// Modal (para eventos/galería)
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");

function openModal(title, sub) {
  if (!modal) return;
  if (modalTitle) modalTitle.textContent = title || "Detalle";
  if (modalSub) modalSub.textContent = sub || "";
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".openModal").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.title, btn.dataset.sub);
  });
});

modal?.addEventListener("click", (e) => {
  const close = e.target?.getAttribute?.("data-close");
  if (close) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.getAttribute("aria-hidden") === "false") closeModal();
});

// Animación reveal al hacer scroll
const revealEls = Array.from(document.querySelectorAll(".reveal"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
} else {
  // fallback
  revealEls.forEach((el) => el.classList.add("is-visible"));
}