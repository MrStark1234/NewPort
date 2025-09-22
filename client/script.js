// testimonials-simple.js
const track = document.querySelector(".tms-track");
const items = document.querySelectorAll(".tms-item");
const prevBtn = document.querySelector(".tms-prev");
const nextBtn = document.querySelector(".tms-next");

let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % items.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + items.length) % items.length;
  updateCarousel();
});

document.getElementById("year").textContent = new Date().getFullYear();

// emailjs-contact.js (replace the then/catch/finally block)
(function () {
  emailjs.init("3OzsoZJrQiSXc5pyQ");

  const form = document.getElementById("contact-form");
  if (!form) return;

  const btn = form.querySelector(".ct-send");
  const statusEl = form.querySelector(".ct-status");

  const showStatus = (msg, type) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.hidden = false;
    statusEl.classList.remove("success", "error");
    statusEl.classList.add(type);
    // auto-hide after 5s
    clearTimeout(showStatus._t);
    showStatus._t = setTimeout(() => {
      statusEl.hidden = true;
    }, 5000);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const phone = document.getElementById("phone")?.value?.trim();
    const subject = document.getElementById("subject")?.value?.trim();
    const message = document.getElementById("message")?.value?.trim();

    if (!name || !email || !message) {
      showStatus("Please fill name, email, and message.", "error");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending…";
    }

    const params = {
      "user-name": name,
      "user-email": email,
      "user-number": phone || "",
      "user-subject": subject || "",
      message: message,
    };

    emailjs
      .send("service_f9fayf8", "template_rbjkopp", params)
      .then(() => {
        showStatus("Thanks! Message sent successfully.", "success");
        form.reset();
      })
      .catch(() => {
        showStatus("Could not send. Please try again.", "error");
      })
      .finally(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Send message";
        }
      });
  });
})();
