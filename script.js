// Menú móvil
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Año en footer
document.getElementById("year").textContent = String(new Date().getFullYear());

// Tabs carta
const tabs = Array.from(document.querySelectorAll(".tab"));
const panes = Array.from(document.querySelectorAll(".tabpane"));

tabs.forEach(t => {
  t.addEventListener("click", () => {
    const targetId = t.dataset.tab;

    tabs.forEach(x => x.classList.remove("is-active"));
    t.classList.add("is-active");

    panes.forEach(p => p.classList.remove("is-active"));
    const target = document.getElementById(targetId);
    target?.classList.add("is-active");

    // reset de búsqueda al cambiar de tab (opcional)
    const search = document.getElementById("menuSearch");
    if (search) {
      search.value = "";
      filterMenu("");
    }
  });
});

// Buscador en carta (filtra solo el tab activo)
const menuSearch = document.getElementById("menuSearch");
const hint = document.getElementById("searchHint");

function filterMenu(query) {
  const q = query.trim().toLowerCase();
  const activePane = document.querySelector(".tabpane.is-active");
  if (!activePane) return;

  const items = Array.from(activePane.querySelectorAll(".menu li"));
  let visible = 0;

  items.forEach(li => {
    const text = li.innerText.toLowerCase();
    const show = q === "" || text.includes(q);
    li.classList.toggle("is-hidden", !show);
    if (show) visible++;
  });

  if (hint) {
    hint.textContent = q ? `Resultados: ${visible}` : "";
  }
}

menuSearch?.addEventListener("input", (e) => {
  filterMenu(e.target.value);
});

// “Enviar” fake
const fakeSend = document.getElementById("fakeSend");
const formMsg = document.getElementById("formMsg");

fakeSend?.addEventListener("click", () => {
  formMsg.textContent = "Listo. Si quieres, lo conecto a WhatsApp con mensaje automático.";
  setTimeout(() => (formMsg.textContent = ""), 4500);
});

// Modal para logos y eventos
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

function openModal(src, caption) {
  modalImg.src = src;
  modalCaption.textContent = caption || "";
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  modalCaption.textContent = "";
}

document.querySelectorAll(".logo-item, .event-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const full = btn.getAttribute("data-full");
    const img = btn.querySelector("img");
    const caption = img?.getAttribute("alt") || "";
    if (full) openModal(full, caption);
  });
});

modal?.addEventListener("click", (e) => {
  const close = e.target?.getAttribute?.("data-close");
  if (close) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});
