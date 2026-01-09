/* =====================================================
   MOBILE MENU & SCROLL ANIMATION
===================================================== */
const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

// Toggle Menu Mobile
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Burger menu animation
  const bars = mobileMenuBtn.querySelectorAll(".bar");
});

// Close the burger menu
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Scroll animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".section").forEach((sec) => observer.observe(sec));

const skillsData = {
  mastered: {
    title: "Maîtrisés",
    skills: ["PHP", "Symfony", "JavaScript", "React", "Git", "HTML5/CSS3"],
  },
  learning: {
    title: "En cours",
    skills: ["Python", "MySQL", "TensorFlow"],
  },
  notions: {
    title: "Notions",
    skills: ["Linux", "Docker"],
  },
};

const projectsData = [
  {
    title: "LogiScan Auto",
    stack: ["Python", "Automatisation", "API"],
    description:
      "Automatisation des impressions logistiques via scan de QR codes sur mobile (bras articulé). Développement d'un algorithme de dé-doublonnage pour empêcher les scans multiples et optimiser le flux de production.",
    year: 2024,
    github: "https://github.com/Riad8321/QrCodeFilePrinter",
  },
];

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
  const level = card.dataset.skillLevel; // mastered, learning, notions
  const data = skillsData[level];

  if (!data) return;

  // Remplir le titre
  const titleElement = card.querySelector("h3");
  titleElement.textContent = data.title;

  // Remplir les tags
  const tagsContainer = card.querySelector(".tags");
  tagsContainer.innerHTML = "";

  data.skills.forEach((skill) => {
    const span = document.createElement("span");
    span.textContent = skill;
    tagsContainer.appendChild(span);
  });
});

let activeSkillLevel = null;

skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    const level = card.dataset.skillLevel;

    if (activeSkillLevel === level) {
      // Désactiver le filtre
      activeSkillLevel = null;
      resetSkillsView();
    } else {
      // Activer le filtre
      activeSkillLevel = level;
      filterSkills(level);
    }
  });
});

function filterSkills(level) {
  skillCards.forEach((card) => {
    if (card.dataset.skillLevel === level) {
      card.classList.add("active");
      card.classList.remove("inactive");
    } else {
      card.classList.remove("active");
      card.classList.add("inactive");
    }
  });
}

function resetSkillsView() {
  skillCards.forEach((card) => {
    card.classList.remove("active", "inactive");
  });
}

const projectContent = document.getElementById("project-content");

function renderProject(project) {
  projectContent.innerHTML = `
    <h3>${project.title}</h3>
    <p class="tech-stack">Stack : ${project.stack.join(" · ")}</p>
    <p>${project.description}</p>
    <a href="${project.github}" target="_blank" class="btn-link">
      Voir sur GitHub <i class="fas fa-arrow-right"></i>
    </a>
  `;
}

// Affichage initial du premier projet
renderProject(projectsData[0]);

// État du tri
let sortOrder = "desc"; // "asc" ou "desc"

// Fonction de tri par année
function sortProjectsByYear() {
  const sorted = [...projectsData].sort((a, b) => {
    return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
  });

  // On affiche le premier projet après tri
  renderProject(sorted[0]);
}

// Bouton de tri
const sortBtn = document.getElementById("sort-btn");

if (sortBtn) {
  sortBtn.addEventListener("click", () => {
    if (sortOrder === "asc") {
      sortOrder = "desc";
      sortBtn.textContent = "Trier par année ↓";
    } else {
      sortOrder = "asc";
      sortBtn.textContent = "Trier par année ↑";
    }

    sortProjectsByYear();
  });
}

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const contactData = {
  name: "",
  email: "",
  message: "",
};

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  contactData.name = document.getElementById("name").value.trim();
  contactData.email = document.getElementById("email").value.trim();
  contactData.message = document.getElementById("message").value.trim();

  handleFormValidation();
});

function handleFormValidation() {
  if (!contactData.name || !contactData.email || !contactData.message) {
    showFormMessage("Tous les champs sont obligatoires.", "error");
    return;
  }

  if (!isValidEmail(contactData.email)) {
    showFormMessage("Adresse email invalide.", "error");
    return;
  }

  sendEmail();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = type;
}

function sendEmail() {
  const templateParams = {
    name: contactData.name,
    email: contactData.email,
    message: contactData.message,
  };

  emailjs
    .send("service_bineqzm", "template_l0cwvya", templateParams)
    .then((response) => {
      console.log("Email envoyé :", response);
      showFormMessage("Message envoyé avec succès ✅", "success");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Erreur EmailJS :", error);
      showFormMessage("Erreur lors de l'envoi ❌", "error");
    });
}
