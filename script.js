document.addEventListener("DOMContentLoaded", () => {
  // --- Bases de Datos ---
  const teamData = {
    1: {
      name: "Lic. Víctor Manuel Luna Castro",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VMLC",
    },
    2: {
      name: "Lic. Patricia Ivonne Herrera Piedra",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=PIHP",
    },
    3: {
      name: "Lic. Juan Pablo Ruiz Velazco Rivera Melo",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=JPRV",
    },
    4: {
      name: "Lic. Hugo Luna Castro",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=HLC",
    },
    5: {
      name: "Valeria San Agustín Rodríguez",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VSAR",
    },
    6: {
      name: "Lic. Perla Velda Cedillo",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=PVC",
    },
    7: {
      name: "Karla Lariza Pacheco Carrera",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=KLPC",
    },
    8: {
      name: "Rebeca García Guzmán",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=RGG",
    },
    9: {
      name: "Víctor Luna Lomelí",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=VLL",
    },
    10: {
      name: "Hugo Luna Quiroz",
      image: "https://via.placeholder.com/140x210/cccccc/ffffff?text=HLQ",
    },
  };

  const servicesData = {
    familia: {
      title: "Derecho Familiar",
      intro:
        "Abordamos las disputas familiares no solo como un problema legal, sino como un evento de vida que requiere un manejo sensible.",
      details: `<h3>Servicios Detallados</h3><ul><li>Planificación Patrimonial</li><li>Divorcio y Disolución de Sociedad Conyugal</li><li>Guardia, Custodia y Convivencia</li></ul>`,
      experts: [3, 5, 8],
    },
    deudor: {
      title: "Defensa del Deudor",
      intro:
        "Frente a una situación de sobreendeudamiento, ofrecemos una defensa legal robusta y una reestructuración financiera integral.",
      details: `<h3>Servicios Detallados</h3><ul><li>Negociación Estratégica con Acreedores</li><li>Defensa en Juicios Ejecutivos y Embargos</li><li>Auditoría y Contabilidad Patrimonial</li></ul>`,
      experts: [3, 6, 9],
    },
    // ... (datos de los demás servicios)
  };

  // --- Lógica de Roles y Contraseñas ---
  const userRoles = {
    DIR_2025: { role: "director", name: "Director" },
    ADMIN_2025: { role: "admin", name: "Administración" },
    SUP_2025: { role: "supervisor", name: "Supervisión" },
    HUGO_LC: { role: "abogado", teamId: "unidad-1", name: "Hugo" },
    VAL_SA: { role: "abogado", teamId: "unidad-2", name: "Valeria" },
    EMANUEL_R: { role: "abogado", teamId: "unidad-3", name: "Emanuel" },
  };

  // --- Lógica de Modales ---
  const openModal = (modal) => (modal.style.display = "flex");
  const closeModal = (modal) => (modal.style.display = "none");

  document.querySelectorAll(".modal-overlay .close-button").forEach((btn) => {
    btn.addEventListener("click", () =>
      closeModal(btn.closest(".modal-overlay")),
    );
  });
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // --- Lógica de la página ---
  const nosotrosModal = document.getElementById("nosotros-modal-overlay");
  document.getElementById("logo-button").addEventListener("click", () => {
    const container = document.getElementById("team-pills-container");
    container.innerHTML = Object.values(teamData)
      .map(
        (member) =>
          `<div class="team-pill"><img src="${member.image}" alt="${member.name}"><strong>${member.name}</strong></div>`,
      )
      .join("");
    openModal(nosotrosModal);
  });
  document
    .getElementById("footer-nosotros-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("logo-button").click();
    });

  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    const map = L.map("map").setView([19.429, -99.165], 16);
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map);
    L.marker([19.429, -99.165])
      .addTo(map)
      .bindPopup("<b>Luna Castro, Herrera & Asociados</b>")
      .openPopup();
  }

  // --- Lógica de Acceso al Dashboard ---
  const dashboardIcon = document.getElementById("dashboard-icon");
  const passwordModal = document.getElementById("password-modal-overlay");
  const passwordForm = document.getElementById("password-form");
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.getElementById("password-error");

  dashboardIcon.addEventListener("click", (e) => {
    e.preventDefault();
    passwordError.style.display = "none";
    passwordInput.value = "";
    openModal(passwordModal);
  });

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const key = passwordInput.value.toUpperCase();
    const userData = userRoles[key];

    if (userData) {
      localStorage.setItem("LCHA_user", JSON.stringify(userData));
      window.location.href = "dashboard.html";
    } else {
      passwordError.style.display = "block";
    }
  });

// --- Animaciones al hacer scroll ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.content-section').forEach(s => observer.observe(s));

// --- Datos de servicios para modales ---
const modalServicesData = {
  familia: {
    icon: '⚖️',
    title: 'Derecho Familiar',
    intro: 'Abordamos las disputas familiares no solo como un problema legal, sino como un evento de vida que requiere un manejo sensible y estratégico.',
    tags: ['Divorcios', 'Custodia', 'Patrimonio familiar'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Planificación patrimonial:</strong> Protección y distribución eficiente de activos familiares.</li>
        <li><strong>Divorcio y disolución de sociedad conyugal:</strong> Asesoría integral en procesos de separación.</li>
        <li><strong>Guardia, custodia y convivencia:</strong> Defensa del bienestar de menores e intereses parentales.</li>
      </ul>
    `
  },
  deudor: {
    icon: '🛡️',
    title: 'Defensa del Deudor y Protección Patrimonial',
    intro: 'Estrategias legales para preservar el patrimonio del deudor frente a acreedores, con un enfoque integral y preventivo.',
    tags: ['Reestructura de deuda', 'Embargos', 'Segunda oportunidad'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Negociación de quitas:</strong> Reducción y reestructuración de deudas con acreedores.</li>
        <li><strong>Oposición a embargos:</strong> Defensa activa frente a medidas cautelares y ejecutivas.</li>
        <li><strong>Segunda oportunidad (Ley 25/2015):</strong> Acogimiento al mecanismo de exoneración del pasivo insatisfecho.</li>
      </ul>
    `
  },
  mercantil: {
    icon: '🏢',
    title: 'Derecho Mercantil',
    intro: 'Regula relaciones empresariales y actos de comercio, ofreciendo soluciones a conflictos corporativos con precisión técnica.',
    tags: ['Conflictos societarios', 'Contratos', 'Impago empresarial'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Conflictos societarios:</strong> Disputas entre socios, accionistas y órganos directivos.</li>
        <li><strong>Reclamaciones por impago:</strong> Cobro de deudas entre empresas y ejecución de garantías.</li>
        <li><strong>Defensa frente a cláusulas abusivas:</strong> Revisión y litigación de contratos comerciales.</li>
      </ul>
    `
  },
  laboral: {
    icon: '👔',
    title: 'Derecho Laboral y Cumplimiento Corporativo',
    intro: 'Protege los derechos de trabajadores y garantiza el cumplimiento normativo en empresas de todos los tamaños.',
    tags: ['Despidos', 'Acoso laboral', 'Compliance'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Despidos improcedentes:</strong> Reclamación e impugnación ante tribunales laborales.</li>
        <li><strong>Acoso laboral:</strong> Protección y asesoría en situaciones de mobbing o acoso.</li>
        <li><strong>Cumplimiento corporativo:</strong> Elaboración de códigos éticos y planes de prevención de riesgos penales.</li>
      </ul>
    `
  },
  internacional: {
    icon: '🌐',
    title: 'Derecho Internacional',
    intro: 'Gestiona conflictos legales con elementos transfronterizos, ofreciendo soluciones en múltiples jurisdicciones.',
    tags: ['Bienes en el extranjero', 'Deudas internacionales', 'Derecho comparado'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Divorcios transnacionales:</strong> Gestión de procesos con bienes o partes en distintos países.</li>
        <li><strong>Cobro de deudas internacionales:</strong> Ejecución de sentencias y laudos en el extranjero.</li>
        <li><strong>Contratos bajo ley extranjera:</strong> Disputas sobre acuerdos regidos por normativa internacional.</li>
      </ul>
    `
  },
  inmobiliario: {
    icon: '🏛️',
    title: 'Derecho Inmobiliario',
    intro: 'Regula la propiedad, arrendamientos y derechos sobre bienes raíces, protegiendo sus intereses en cada etapa.',
    tags: ['Arrendamientos', 'Compraventa', 'Litigios de propiedad'],
    details: `
      <h3>Áreas de práctica</h3>
      <ul>
        <li><strong>Desahucios por impago:</strong> Recuperación ágil de inmuebles arrendados.</li>
        <li><strong>Vicios ocultos en compraventa:</strong> Reclamación por defectos no declarados en la transmisión.</li>
        <li><strong>Servidumbres y límites de propiedad:</strong> Resolución de conflictos sobre linderos y derechos reales.</li>
      </ul>
    `
  }
};

// --- Lógica de modales de servicios ---
const serviceModalOverlay = document.getElementById('service-modal-overlay');
const serviceModalContent = document.getElementById('service-modal-content');

document.querySelectorAll('.service-list li[data-service-id]').forEach(li => {
  li.addEventListener('click', () => {
    const id = li.getAttribute('data-service-id');
    const data = modalServicesData[id];
    if (!data) return;

    const tagsHtml = (data.tags || []).map(t => `<span class="service-modal-tag">${t}</span>`).join('');
    serviceModalContent.innerHTML = `
      <div class="service-modal-header">
        <div class="service-modal-icon">${data.icon}</div>
        <div>
          <h2 class="service-modal-title">${data.title}</h2>
          <p class="service-modal-intro">${data.intro}</p>
        </div>
      </div>
      <div style="margin-bottom:1rem">${tagsHtml}</div>
      <div class="service-modal-body">${data.details}</div>
    `;
    serviceModalOverlay.style.display = 'flex';
  });
});
});
