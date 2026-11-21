/* LOADER */
let progress = 0;
const loader = document.getElementById("loader");
const progressBar = document.getElementById("loaderProgress");
const progressText = document.getElementById("loaderPercent");
const loadingInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 7) + 2;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
    setTimeout(() => loader.classList.add("hide"), 500);
  }
  progressBar.style.width = progress + "%";
  progressText.textContent = String(progress).padStart(2, "0") + "%";
}, 80);

/* YEAR */
document.querySelectorAll(".year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* CUSTOM CURSOR */
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + "px";
  cursorRing.style.top = ringY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll("a, button, .work, .service, .social-link").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    cursorRing.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
    cursorRing.classList.remove("active");
  });
});

/* SCROLL REVEAL */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* WORK FILTER */
const filterButtons = document.querySelectorAll(".filter-btn");
const works = document.querySelectorAll(".work");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    works.forEach(work => {
      if (filter === "all" || work.dataset.category === filter) {
        work.style.display = "block";
        setTimeout(() => {
          work.style.opacity = "1";
          work.style.transform = "translateY(0)";
        }, 20);
      } else {
        work.style.opacity = "0";
        work.style.transform = "translateY(20px)";
        setTimeout(() => {
          if (filter !== "all" && work.dataset.category !== filter) work.style.display = "none";
        }, 300);
      }
    });
  });
});

/* ACTIVE NAV */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".side-nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 250) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

/* SMOOTH ANCHOR */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* HERO PARALLAX */
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-background");
  if (!hero) return;
  const y = window.scrollY;
  if (y < window.innerHeight) {
    hero.style.transform = `translateY(${y * 0.12}px) scale(1.02)`;
  }
});

/* IMAGES */
document.querySelectorAll("img").forEach(img => {
  img.loading = "lazy";
  img.addEventListener("dragstart", e => e.preventDefault());
});

/* ESC = scroll to top */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") window.scrollTo({ top: 0, behavior: "smooth" });
});

/* MOBILE MENU */
const menuBtn = document.getElementById("mobileMenuBtn");
const mobilePanel = document.getElementById("mobilePanel");
function setMenu(open) {
  menuBtn.classList.toggle("open", open);
  mobilePanel.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
}
menuBtn.addEventListener("click", () => setMenu(!mobilePanel.classList.contains("open")));
mobilePanel.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenu(false));
});

/* LOADED */
window.addEventListener("load", () => document.body.classList.add("loaded"));

/* MUSIC PLAYER */
(function () {
  const bgMusic = document.getElementById("bgMusic");
  const musicDisc = document.getElementById("musicDisc");
  const musicIcon = document.getElementById("musicIcon");
  const musicButton = document.getElementById("musicButton");
  const musicStatus = document.getElementById("musicStatus");
  bgMusic.addEventListener("error", () => {
    musicStatus.textContent = "File not found: assets/music/ready-to-die.mp3";
  });
  musicButton.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicDisc.classList.add("playing");
        musicIcon.textContent = "Ⅱ";
        musicButton.title = "Pause music";
      } catch (error) {
        musicStatus.textContent = "Error: " + error.message;
      }
    } else {
      bgMusic.pause();
      musicDisc.classList.remove("playing");
      musicIcon.textContent = "▶";
      musicButton.title = "Play music";
    }
  });
})();

/* BOOKING FORM */
document.getElementById("bookingForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("bookingName").value.trim();
  const email = document.getElementById("bookingEmail").value.trim();
  const type = document.getElementById("bookingType").value;
  const date = document.getElementById("bookingDate").value || "Flexible / to be discussed";
  const details = document.getElementById("bookingDetails").value.trim();
  const subject = encodeURIComponent("Booking Request — " + type + " — " + name);
  const body = encodeURIComponent(
    "Hello WEYA.exe,\n\nI would like to make a booking.\n\n" +
    "Name: " + name + "\nEmail: " + email + "\nService: " + type +
    "\nPreferred date: " + date + "\n\nDetails:\n" + details +
    "\n\nThank you!"
  );
  window.location.href = "mailto:WEYAexe666@gmail.com?subject=" + subject + "&body=" + body;
});
