const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const linkMap = new Map(
  navLinks.map((link) => [link.getAttribute("href").slice(1), link])
);

const markHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

markHeader();
window.addEventListener("scroll", markHeader, { passive: true });

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => link.removeAttribute("aria-current"));
      const activeLink = linkMap.get(visible.target.id);
      if (activeLink) activeLink.setAttribute("aria-current", "true");
    },
    {
      rootMargin: "-28% 0px -55% 0px",
      threshold: [0.2, 0.45, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}
