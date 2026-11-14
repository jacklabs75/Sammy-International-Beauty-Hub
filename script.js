// Add Sammy's WhatsApp number in international format, digits only.
// Example format: 2348012345678 (do not include +, spaces or dashes).

const BUSINESS_WHATSAPP_NUMBER = "2347065165710";
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const choice = document.querySelector("#service-choice");
    const wanted = link.dataset.service;
    const matching = [...choice.options].find(option => option.text === wanted);
    if (matching) choice.value = matching.value;
  });
});

document.querySelector("#enquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const service = String(form.get("service") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!BUSINESS_WHATSAPP_NUMBER) {
    document.querySelector("#form-note").textContent =
      "Setup needed: add Sammy's WhatsApp number in script.js to activate this form.";
    return;
  }

  const text = [
    "Hello Sammy International & Beauty Hub,",
    `My name is ${name}.`,
    `My contact number: ${phone}.`,
    `Service: ${service}.`,
    message ? `Details: ${message}` : ""
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  
  window.location.href = url;
});

