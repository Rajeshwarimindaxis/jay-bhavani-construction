/* =====================================================
   JAY BHAVANI CONSTRUCTION
   CENTRAL WEBSITE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= 1. CURRENT YEAR ================= */
    const yearElements = document.querySelectorAll("#currentYear, .current-year");
    const year = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = year;
    });

    /* ================= 2. HEADER SCROLL EFFECT ================= */
    const header = document.getElementById("header");
    function updateHeaderScroll() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", updateHeaderScroll, { passive: true });
    updateHeaderScroll();

    /* ================= 3. MOBILE MENU ================= */
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navbar.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
        });

        // Close mobile nav when clicking normal nav links
        navbar.querySelectorAll(".nav-link:not(.services-nav-link), .nav-quote").forEach(link => {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open Menu");
            });
        });
    }

    /* ================= 4. SERVICES DROPDOWN ================= */
    const servicesNavItem = document.getElementById("servicesNavItem");
    const servicesToggle = document.getElementById("servicesDropdownToggle");
    const servicesDropdown = document.getElementById("servicesDropdown");

    if (servicesNavItem && servicesToggle && servicesDropdown) {
        function setDropdownState(open) {
            servicesNavItem.classList.toggle("dropdown-open", open);
            servicesToggle.setAttribute("aria-expanded", String(open));
            servicesDropdown.setAttribute("aria-hidden", String(!open));
            servicesToggle.setAttribute(
                "aria-label",
                open ? "Close Services dropdown" : "Open Services dropdown"
            );
        }

        servicesToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = servicesNavItem.classList.contains("dropdown-open");
            setDropdownState(!isOpen);
        });

        document.addEventListener("click", function (event) {
            if (!servicesNavItem.contains(event.target)) {
                setDropdownState(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setDropdownState(false);
                servicesToggle.focus();
            }
        });

        servicesDropdown.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function () {
                setDropdownState(false);
                if (navbar && menuToggle) {
                    navbar.classList.remove("active");
                    menuToggle.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open Menu");
                }
            });
        });

        const servicesSectionLink = servicesNavItem.querySelector(".services-nav-link");
        if (servicesSectionLink) {
            servicesSectionLink.addEventListener("click", function () {
                setDropdownState(false);
                if (navbar && menuToggle) {
                    navbar.classList.remove("active");
                    menuToggle.classList.remove("active");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Open Menu");
                }
            });
        }
    }

    /* ================= 5. BACK TO TOP BUTTON ================= */
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        function updateBackToTop() {
            backToTop.classList.toggle("show", window.scrollY > 450);
        }
        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ================= 6. SERVICES SLIDER (HOME PAGE) ================= */
    const servicesSection = document.querySelector(".services-section");
    const servicesTrack = document.querySelector(".services-track");
    const serviceCards = document.querySelectorAll(".services-track .service-card");
    const serviceNext = document.querySelector(".services-next, .next-btn, .service-next");
    const servicePrev = document.querySelector(".services-prev, .prev-btn, .service-prev");

    if (servicesTrack && serviceCards.length && serviceNext) {
        let currentIndex = 0;
        let autoSlide = null;
        let isAnimating = false;

        function getVisibleCards() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1100) return 2;
            return 3;
        }

        function getCardWidth() {
            const firstCard = serviceCards[0];
            return firstCard ? firstCard.offsetWidth : 0;
        }

        function updateSlider(animate = true) {
            const visibleCards = getVisibleCards();
            const gap = window.innerWidth <= 768 ? 16 : 24;
            const cardWidth = getCardWidth();
            if (!cardWidth) return;

            servicesTrack.style.transition = animate
                ? "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none";
            servicesTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        }

        function nextSlide() {
            if (isAnimating) return;
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, serviceCards.length - visibleCards);

            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }

            isAnimating = true;
            updateSlider(true);
            setTimeout(() => { isAnimating = false; }, 750);
        }

        function previousSlide() {
            if (isAnimating) return;
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, serviceCards.length - visibleCards);

            if (currentIndex <= 0) {
                currentIndex = maxIndex;
            } else {
                currentIndex--;
            }

            isAnimating = true;
            updateSlider(true);
            setTimeout(() => { isAnimating = false; }, 750);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlide = setInterval(nextSlide, 3800);
        }

        function stopAutoSlide() {
            if (autoSlide) {
                clearInterval(autoSlide);
                autoSlide = null;
            }
        }

        serviceNext.addEventListener("click", () => {
            nextSlide();
            startAutoSlide();
        });

        if (servicePrev) {
            servicePrev.addEventListener("click", () => {
                previousSlide();
                startAutoSlide();
            });
        }

        if (servicesSection) {
            servicesSection.addEventListener("mouseenter", stopAutoSlide);
            servicesSection.addEventListener("mouseleave", startAutoSlide);
        }

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        servicesTrack.addEventListener("touchstart", e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        servicesTrack.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) nextSlide();
                else previousSlide();
                startAutoSlide();
            }
        }, { passive: true });

        window.addEventListener("resize", () => {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, serviceCards.length - visibleCards);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            updateSlider(false);
        });

        updateSlider(false);
        startAutoSlide();
    }

    /* ================= 7. SCROLL REVEAL ANIMATIONS ================= */
    const revealItems = document.querySelectorAll(".reveal, .industrial-reveal, .service-reveal");
    if (revealItems.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active", "show");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealItems.forEach(el => observer.observe(el));
    } else {
        revealItems.forEach(el => el.classList.add("active", "show"));
    }

    /* ================= 8. CONTACT FORM ================= */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const nameEl = document.getElementById("name");
            const phoneEl = document.getElementById("phone");
            const emailEl = document.getElementById("email");

            if (!nameEl || !nameEl.value.trim() || !phoneEl || !phoneEl.value.trim()) {
                event.preventDefault();
                alert("Please provide your name and phone number so we can reach you.");
                return;
            }
        });
    }
});
