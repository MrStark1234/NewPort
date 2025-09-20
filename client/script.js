// testimonials-simple.js
(function () {
  const root = document.querySelector(".tms");
  if (!root) return;
  const track = root.querySelector(".tms-track");
  const prev = root.querySelector(".tms-prev");
  const next = root.querySelector(".tms-next");

  if (!track || !prev || !next) return;

  const items = Array.from(track.querySelectorAll(".tms-item"));
  if (items.length === 0) return;

  // Build dots
  items.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      const x =
        items[i].offsetLeft -
        (track.clientWidth / 2 - items[i].clientWidth / 2);
      track.scrollTo({
        left: x,
        behavior: prefersReduced() ? "auto" : "smooth",
      });
    });
  });

  function prefersReduced() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function stepWidth() {
    // Approx step = first card width + gap
    const first = items[0];
    const gap = parseFloat(getComputedStyle(track).gap || 16);
    return first.clientWidth + gap;
  }

  function scrollByCards(dir) {
    track.scrollBy({
      left: dir * stepWidth(),
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  }

  function activeIndex() {
    // Find the card whose center is closest to track center
    const center = track.scrollLeft + track.clientWidth / 2;
    let idx = 0,
      best = Infinity;
    items.forEach((el, i) => {
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const d = Math.abs(center - elCenter);
      if (d < best) {
        best = d;
        idx = i;
      }
    });
    return idx;
  }

  function updateUI() {
    const idx = activeIndex();
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= max;
  }

  prev.addEventListener("click", () => scrollByCards(-1));
  next.addEventListener("click", () => scrollByCards(1));
  track.addEventListener("scroll", () => requestAnimationFrame(updateUI), {
    passive: true,
  });
  window.addEventListener("resize", () => requestAnimationFrame(updateUI));

  // Initial center to first item
  const x0 =
    items[0].offsetLeft - (track.clientWidth / 2 - items[0].clientWidth / 2);
  track.scrollLeft = x0 > 0 ? x0 : 0;
  updateUI();
})();

document.getElementById("year").textContent = new Date().getFullYear();
