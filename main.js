const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".about__content p", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 500,
});
ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".blog__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".blog__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".contact__image img", {
  ...scrollRevealOption,
});

(() => {
  const track = document.getElementById("image-track");
  if (!track) return;

  // init
  if (!track.dataset.mouseDownAt) track.dataset.mouseDownAt = "0";
  if (!track.dataset.prevPercentage) track.dataset.prevPercentage = "0";
  if (!track.dataset.percentage) track.dataset.percentage = "0";

  let raf = 0;
  let targetPct = 0;
  let currentPct = parseFloat(track.dataset.percentage || "0");

  const apply = (pct) => {
    track.style.transform = `translate(${pct}%, -50%)`;
    for (const image of track.getElementsByClassName("image")) {
      image.style.objectPosition = `${100 + pct}% center`;
    }
  };

  const tick = () => {
    // lerp sujuv liikumine
    currentPct += (targetPct - currentPct) * 0.04;
    if (Math.abs(targetPct - currentPct) < 0.05) {
      currentPct = targetPct;
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      raf = requestAnimationFrame(tick);
    }
    apply(currentPct);
  };

  const startRAF = () => { if (!raf) raf = requestAnimationFrame(tick); };

  const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
    track.classList.add("dragging");
  };

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = String(targetPct);
    track.classList.remove("dragging");
  };

  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = Math.max(1, window.innerWidth * 1.5);

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    targetPct = Math.max(Math.min(nextUnconstrained, 0), -100);

    track.dataset.percentage = String(targetPct);
    startRAF();
  };

  // Mouse
  window.addEventListener("mousedown", (e) => handleOnDown(e));
  window.addEventListener("mouseup", handleOnUp);
  window.addEventListener("mousemove", (e) => handleOnMove(e));

  // Touch
  window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]), { passive: true });
  window.addEventListener("touchend", handleOnUp, { passive: true });
  window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]), { passive: true });

  // esmane joonistus
  apply(currentPct);
})();
