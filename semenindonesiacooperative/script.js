/* =========================================================
   SIC HOMEPAGE — JAVASCRIPT
   Interaksi yang ada:
   1. Buka/tutup menu pada layar kecil.
   2. Tutup menu setelah tautan diklik.
   3. Isi tahun copyright secara otomatis.
   ========================================================= */

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    });
  });
}

const yearElement = document.querySelector("#currentYear");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* SIC HISTORY TIMELINE CONTROLS */
(() => {
  const timeline = document.getElementById("sicTimeline");
  const prevButton = document.getElementById("timelinePrev");
  const nextButton = document.getElementById("timelineNext");

  if (!timeline || !prevButton || !nextButton) return;

  const cards = timeline.querySelectorAll(".timeline-item");

  function moveTimeline(direction) {
    const firstCard = cards[0];
    if (!firstCard) return;

    const styles = window.getComputedStyle(timeline);
    const gap = parseFloat(styles.columnGap) || 20;
    const distance = firstCard.getBoundingClientRect().width + gap;

    timeline.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  }

  prevButton.addEventListener("click", () => {
    moveTimeline(-1);
  });

  nextButton.addEventListener("click", () => {
    moveTimeline(1);
  });
})();



/* SIC TIMELINE ACTIVE CARD */
(() => {
  function initSicTimeline() {
    const timeline = document.getElementById("sicTimeline");
    if (!timeline) return;

    const cards = timeline.querySelectorAll(".timeline-item");
    if (!cards.length) return;

    function activateCard(selectedCard) {
      cards.forEach((card) => {
        card.classList.toggle("active", card === selectedCard);
      });
    }

    cards.forEach((card) => {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        activateCard(card);
      });

      card.setAttribute("tabindex", "0");

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateCard(card);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSicTimeline);
  } else {
    initSicTimeline();
  }
})();


const sicForm = document.getElementById("sicContactForm");

if (sicForm) {
  sicForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(sicForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    const body = [
      `Nama: ${name}`,
      `Email: ${email}`,
      "",
      "Pesan:",
      message
    ].join("\n");

    const mailto =
      "mailto:info@sic.co.id" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
  });
}

/* Frontend-only interaction: validate fields and show a local preview. No backend or network request. */
(function () {
  const form = document.getElementById('sicContactForm');
  const status = document.getElementById('sic-form-message');
  if (!form || !status) return;
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    status.textContent = 'Pratinjau siap: ' + data.get('subject') + '. Form ini masih frontend dan belum mengirim pesan.';
    status.style.display = 'block';
    status.classList.add('sic-form-preview');
  });
})();
