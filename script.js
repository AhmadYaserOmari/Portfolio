const skills = [
  { group: "Mobile App development", items: ["Android", "iOS", "Flutter", "React Native", "Firebase"] },
  { group: "Web App development", items: ["HTML", "CSS", "JavaScript", "React"] },
  { group: "Tools", items: ["Git and GitHub", "Figma", "Android Studio", "VS Code"] }
];
 
const projects = [
  {
    title: "Structural Analysis and Calculation Tool Based on ACI Standards",
    description: "A web-based tool for structural analysis, design, and calculation of building elements based on ACI standards, helping engineers and students perform accurate and efficient reinforced concrete design.",
    tags: ["Web", "Your tools"],

  },
  {
    title: "Weather App",
    description: "Get real-time weather updates, temperature forecasts, humidity levels, and current conditions for any location.",
    tags: ["App", "Your tools"],

  }
];
 
const contacts = [
  { label: "Email me", href: "yaseromari2002@gmail.com" },
  { label: "GitHub", href: "https://github.com/ahmadyaseromari" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad-yaser-omari-aa71572b2?utm_source=share_via&utm_content=profile&utm_medium=member_ios" }
];
 

 
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
 
function renderSkills() {
  const wrap = document.getElementById("skillsList");
  skills.forEach(({ group, items }) => {
    const block = el("div", "skill-group");
    block.appendChild(el("h3", "", group));
    const tags = el("div", "skill-tags");
    items.forEach(item => tags.appendChild(el("span", "", item)));
    block.appendChild(tags);
    wrap.appendChild(block);
  });
}
 
function renderProjects() {
  const wrap = document.getElementById("projectList");
  projects.forEach(p => {
    const card = el("article", "project" + (p.link ? "" : " is-placeholder"));
    card.appendChild(el("h3", "", p.title));
    card.appendChild(el("p", "", p.description));
    if (p.link) {
      const a = el("a", "", "View project");
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener";
      card.appendChild(a);
    }
    const tags = el("div", "tags");
    p.tags.forEach(t => tags.appendChild(el("span", "", t)));
    card.appendChild(tags);
    wrap.appendChild(card);
  });
}
 
function renderContacts() {
  const wrap = document.getElementById("contactLinks");
  contacts.forEach(c => {
    const a = el("a", "", c.label);
    a.href = c.href;
    if (c.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    wrap.appendChild(a);
  });
}
 
/* =========================================================
   Phone preview: tabs switch the app screen
   ========================================================= */
 
function setupPhone() {
  const tabs = Array.from(document.querySelectorAll(".phone-tabs [role='tab']"));
  const screens = Array.from(document.querySelectorAll(".screen"));
 
  function show(name) {
    tabs.forEach(tab => {
      const on = tab.dataset.screen === name;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
    });
    screens.forEach(screen => {
      const on = screen.id === "screen-" + name;
      screen.hidden = !on;
      screen.classList.toggle("is-active", on);
    });
  }
 
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => show(tab.dataset.screen));
    tab.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      show(next.dataset.screen);
    });
  });
}
 
/* =========================================================
   Navigation
   ========================================================= */
 
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
 
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
 
  nav.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
 
  // Underline the link for the section currently on screen
  const links = Array.from(nav.querySelectorAll("a"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.toggle("is-current", l.getAttribute("href") === "#" + entry.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
 
  links.forEach(l => {
    const target = document.querySelector(l.getAttribute("href"));
    if (target) observer.observe(target);
  });
}
 
/* ========================================================= */
 
document.getElementById("year").textContent = new Date().getFullYear();
renderSkills();
renderProjects();
renderContacts();
setupPhone();
setupNav();