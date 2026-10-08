/* =====================================================
   JAY BHAVANI CONSTRUCTION
   WEBSITE JAVASCRIPT
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });


    document.querySelectorAll(".nav-link, .nav-quote")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

            });

        });

}


/* ================= HEADER SCROLL ================= */

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length && navLinks.length) {

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =====================================================
   SERVICES SLIDER
   Automatic sliding + Arrow buttons

   Sequence:
   1 → 2 → 3 → 4 → 5 → 1 → 2 → 3...
===================================================== */

const servicesSection =
    document.querySelector(".services-section");

const servicesTrack =
    document.querySelector(".services-track");

const serviceCards =
    document.querySelectorAll(".service-card");

const serviceNext =
    document.querySelector(
        ".services-next, .next-btn, .service-next"
    );

const servicePrev =
    document.querySelector(
        ".services-prev, .prev-btn, .service-prev"
    );


if (
    servicesTrack &&
    serviceCards.length &&
    serviceNext
) {

    let currentIndex = 0;

    let autoSlide = null;

    let isAnimating = false;


    /* ================= GET VISIBLE CARDS ================= */

    function getVisibleCards() {

        if (window.innerWidth <= 768) {

            return 1;

        }

        if (window.innerWidth <= 1100) {

            return 2;

        }

        return 3;

    }


    /* ================= GET CARD WIDTH ================= */

    function getCardWidth() {

        const firstCard =
            serviceCards[0];

        if (!firstCard) return 0;

        return firstCard.offsetWidth;

    }


    /* ================= UPDATE SLIDER ================= */

    function updateSlider(animate = true) {

        const visibleCards =
            getVisibleCards();

        const gap =
            window.innerWidth <= 768
                ? 16
                : 24;


        const cardWidth =
            getCardWidth();


        if (!cardWidth) return;


        if (animate) {

            servicesTrack.style.transition =
                "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

        } else {

            servicesTrack.style.transition =
                "none";

        }


        servicesTrack.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;

    }


    /* ================= NEXT SLIDE ================= */

    function nextSlide() {

        if (isAnimating) return;

        const visibleCards =
            getVisibleCards();


        const maxIndex =
            serviceCards.length - visibleCards;


        /*
           When we reach the last possible position,
           go back to the first card.
        */

        if (currentIndex >= maxIndex) {

            currentIndex = 0;

        } else {

            currentIndex++;

        }


        isAnimating = true;

        updateSlider(true);


        setTimeout(() => {

            isAnimating = false;

        }, 850);

    }


    /* ================= PREVIOUS SLIDE ================= */

    function previousSlide() {

        if (isAnimating) return;


        const visibleCards =
            getVisibleCards();


        const maxIndex =
            serviceCards.length - visibleCards;


        if (currentIndex <= 0) {

            currentIndex = maxIndex;

        } else {

            currentIndex--;

        }


        isAnimating = true;

        updateSlider(true);


        setTimeout(() => {

            isAnimating = false;

        }, 850);

    }


    /* ================= AUTO SLIDE ================= */

    function startAutoSlide() {

        stopAutoSlide();


        autoSlide =
            setInterval(() => {

                nextSlide();

            }, 3500);

    }


    /* ================= STOP AUTO SLIDE ================= */

    function stopAutoSlide() {

        if (autoSlide) {

            clearInterval(autoSlide);

            autoSlide = null;

        }

    }


    /* ================= NEXT BUTTON ================= */

    serviceNext.addEventListener(
        "click",
        () => {

            nextSlide();

            /*
               Restart timer so the slider does not
               move immediately after clicking.
            */

            startAutoSlide();

        }
    );


    /* ================= PREVIOUS BUTTON ================= */

    if (servicePrev) {

        servicePrev.addEventListener(
            "click",
            () => {

                previousSlide();

                startAutoSlide();

            }
        );

    }


    /* ================= PAUSE ON HOVER ================= */

    if (servicesSection) {

        servicesSection.addEventListener(
            "mouseenter",
            () => {

                stopAutoSlide();

            }
        );


        servicesSection.addEventListener(
            "mouseleave",
            () => {

                startAutoSlide();

            }
        );

    }


    /* ================= TOUCH / MOBILE SUPPORT ================= */

    let touchStartX = 0;

    let touchEndX = 0;


    servicesTrack.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    servicesTrack.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {

                return;

            }


            if (difference > 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            startAutoSlide();

        },
        { passive: true }
    );


    /* ================= WINDOW RESIZE ================= */

    window.addEventListener(
        "resize",
        () => {

            const visibleCards =
                getVisibleCards();

            const maxIndex =
                serviceCards.length - visibleCards;


            /*
               Prevent the slider from going outside
               the available cards after resizing.
            */

            if (currentIndex > maxIndex) {

                currentIndex = Math.max(
                    0,
                    maxIndex
                );

            }


            updateSlider(false);

        }
    );


    /* ================= INITIAL POSITION ================= */

    updateSlider(false);


    /* ================= START AUTO SLIDER ================= */

    startAutoSlide();

}


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameElement =
                document.getElementById("name");

            const phoneElement =
                document.getElementById("phone");

            const emailElement =
                document.getElementById("email");

            const serviceElement =
                document.getElementById("service");

            const messageElement =
                document.getElementById("message");


            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";


            const phone =
                phoneElement
                    ? phoneElement.value.trim()
                    : "";


            const email =
                emailElement
                    ? emailElement.value.trim()
                    : "";


            const service =
                serviceElement
                    ? serviceElement.value
                    : "";


            const message =
                messageElement
                    ? messageElement.value.trim()
                    : "";


            if (
                !name ||
                !phone ||
                !email ||
                !service ||
                !message
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            alert(
                "Thank you, " +
                name +
                "! Your enquiry has been submitted."
            );


            contactForm.reset();

        }
    );

}


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ================= FOOTER YEAR ================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}