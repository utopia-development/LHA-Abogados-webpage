document.addEventListener("DOMContentLoaded", () => {

    // ==================== DATOS DE SERVICIOS ====================
    const servicesData = {
        familia: {
            title: "Derecho Familiar",
            intro: "Abordamos las disputas familiares con sensibilidad y enfoque humano.",
            details: `
                <ul>
                    <li>Divorcio y Disolución de Sociedad Conyugal</li>
                    <li>Guardia, Custodia y Convivencia</li>
                    <li>Pensión Alimenticia</li>
                    <li>Adopciones y Reconocimiento de Paternidad</li>
                </ul>
            `,
            image: "images/derecho_fam.jpg"
        },
        deudor: {
            title: "Defensa del Deudor y Protección Patrimonial",
            intro: "Defensa robusta ante sobreendeudamiento y embargos.",
            details: `
                <ul>
                    <li>Negociación con Acreedores</li>
                    <li>Defensa en Juicios Ejecutivos</li>
                    <li>Reestructuración Financiera</li>
                    <li>Blindaje Patrimonial</li>
                </ul>
            `,
            image: "https://images.unsplash.com/photo-1554224155-6726b9b5b8b0?auto=format&fit=crop&q=80"
        },
        mercantil: {
            title: "Derecho Mercantil",
            intro: "Asesoría en contratos, sociedades y operaciones comerciales.",
            details: `<ul><li>Constitución de Sociedades</li><li>Contratos Mercantiles</li><li>Fusiones y Adquisiciones</li></ul>`,
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
        },
        laboral: {
            title: "Derecho Laboral y Cumplimiento Corporativo",
            intro: "Defensa laboral y cumplimiento normativo para empresas y trabajadores.",
            details: `<ul><li>Contratos Laborales</li><li>Juicios Laborales</li><li>Auditorías de Cumplimiento</li></ul>`,
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
        },
        internacional: {
            title: "Derecho Internacional",
            intro: "Operaciones transfronterizas y comercio internacional.",
            details: `<ul><li>Contratos Internacionales</li><li>Arbitraje Internacional</li></ul>`,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
        },
        inmobiliario: {
            title: "Derecho Inmobiliario",
            intro: "Transacciones seguras y litigios prediales.",
            details: `<ul><li>Compra-Venta de Inmuebles</li><li>Due Diligence</li><li>Litigios Inmobiliarios</li></ul>`,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
        }
    };

    // ==================== MODAL DE SERVICIOS ====================
    const serviceModal = document.getElementById("service-modal-overlay");
    const serviceModalContent = document.getElementById("service-modal-content");

    function openServiceModal(serviceId) {
        const service = servicesData[serviceId];
        if (!service) return;

        serviceModalContent.innerHTML = `
            <span class="close-button">&times;</span>
            <img src="${service.image}" class="service-modal-image" alt="${service.title}">
            <h2>${service.title}</h2>
            <p style="font-size:1.1rem; color:var(--text-secondary); margin:1.2rem 0;">${service.intro}</p>
            <div style="background:#28344a; padding:1.5rem; border-radius:10px;">
                <h3 style="margin-top:0;">Servicios Detallados</h3>
                ${service.details}
            </div>
        `;

        serviceModal.style.display = "flex";

        // Cerrar con el botón ×
        serviceModalContent.querySelector(".close-button").addEventListener("click", () => {
            serviceModal.style.display = "none";
        });
    }

    // Abrir modal desde la lista de servicios
    document.querySelectorAll('.service-list li').forEach(li => {
        li.addEventListener('click', () => {
            const id = li.getAttribute('data-service-id');
            openServiceModal(id);
        });
    });

    // Cerrar modal haciendo clic fuera
    serviceModal.addEventListener("click", (e) => {
        if (e.target === serviceModal) {
            serviceModal.style.display = "none";
        }
    });

    // ==================== CALENDARIO DE CITAS ====================
    const calendarPlaceholder = document.querySelector('.calendar-embed-placeholder');
    if (calendarPlaceholder) {
        calendarPlaceholder.innerHTML = `
            <p style="font-size:1.3rem; margin-bottom:1rem;">📅 Calendario de Citas</p>
            <p style="max-width:380px; color:#9ca3af;">
                Selecciona una fecha y hora disponible para tu consulta inicial.<br><br>
                <strong>Próximamente:</strong> Integración completa con Calendly o sistema propio.
            </p>
            <p style="margin-top:2rem; font-size:0.95rem; opacity:0.8;">
                Mientras tanto, puedes escribirnos a <a href="mailto:contacto@lcha.com" style="color:#60a5fa;">contacto@lcha.com</a>
            </p>
        `;
    }

    // ==================== MODAL "QUIÉNES SOMOS" (mantenido) ====================
    const nosotrosModal = document.getElementById("nosotros-modal-overlay");
    document.getElementById("logo-button").addEventListener("click", () => {
        // ... tu código actual de team pills ...
        nosotrosModal.style.display = "flex";
    });

    // Cerrar modales con Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            serviceModal.style.display = "none";
            nosotrosModal.style.display = "none";
            // password modal también si quieres
        }
    });

    // Mapa Leaflet (sin cambios)
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
        const map = L.map("map").setView([19.429, -99.165], 16);
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; OpenStreetMap &copy; CARTO'
        }).addTo(map);
        L.marker([19.429, -99.165]).addTo(map)
            .bindPopup("<b>Luna Castro, Herrera & Asociados</b><br>Av. Paseo de la Reforma 222")
            .openPopup();
    }

    // Dashboard password (tu código actual)
    // ... déjalo igual ...
});