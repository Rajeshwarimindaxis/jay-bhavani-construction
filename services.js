/* =====================================================
   JAY BHAVANI CONSTRUCTION — SERVICES JAVASCRIPT
   Interactive Filters, Micro-interactions & Smooth Animations
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= 1. CATEGORY FILTER WITH STAGGERED CASCADE ================= */
    const filterButtons = document.querySelectorAll(".srv-filter-btn");
    const serviceCards = document.querySelectorAll(".srv-primary-card");

    if (filterButtons.length && serviceCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                const filter = this.getAttribute("data-filter");

                // Update active tab button
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                // Filter cards with smooth staggered waterfall
                let visibleCount = 0;
                serviceCards.forEach(card => {
                    const category = card.getAttribute("data-category");

                    if (filter === "all" || category === filter) {
                        card.classList.remove("is-filtered-out");
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.95) translateY(18px)";
                        const delay = visibleCount * 60;
                        visibleCount++;

                        setTimeout(() => {
                            card.style.transition = "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
                            card.style.opacity = "1";
                            card.style.transform = "scale(1) translateY(0)";
                        }, 40 + delay);
                    } else {
                        card.style.transition = "opacity 0.25s ease, transform 0.25s ease";
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.95) translateY(15px)";
                        setTimeout(() => {
                            card.classList.add("is-filtered-out");
                        }, 250);
                    }
                });
            });
        });
    }

    /* ================= 2. DESKTOP CURSOR-TRACKING SPOTLIGHT ================= */
    if (window.matchMedia("(min-width: 992px)").matches && serviceCards.length) {
        serviceCards.forEach(card => {
            card.addEventListener("mousemove", e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty("--srv-mouse-x", `${x}px`);
                card.style.setProperty("--srv-mouse-y", `${y}px`);
            });
        });
    }

    /* ================= 3. ANIMATED NUMBER COUNTERS ================= */
    const counterElements = document.querySelectorAll(".srv-counter");

    if (counterElements.length && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const targetValue = parseInt(counter.getAttribute("data-target"), 10);
                    const duration = 1600; // ms
                    const startTime = performance.now();

                    function updateNumber(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                        const currentVal = Math.floor(easeOutProgress * targetValue);

                        counter.textContent = currentVal;

                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            counter.textContent = targetValue;
                        }
                    }

                    requestAnimationFrame(updateNumber);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.25 });

        counterElements.forEach(counter => counterObserver.observe(counter));
    }

    /* ================= 4. SCROLL REVEAL OBSERVER ================= */
    const revealElements = document.querySelectorAll(".srv-reveal, .srv-reveal-left, .srv-reveal-right, .srv-reveal-scale");

    if (revealElements.length && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("is-revealed"));
    }

    /* ================= 5. INTERACTIVE FAQ ACCORDION ================= */
    const faqItems = document.querySelectorAll(".srv-faq-item");

    if (faqItems.length) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector(".srv-faq-question");
            if (!questionBtn) return;

            questionBtn.addEventListener("click", function () {
                const isCurrentlyActive = item.classList.contains("active");

                // Optional: close other open items for accordion feel
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                        const otherBtn = otherItem.querySelector(".srv-faq-question");
                        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                    }
                });

                // Toggle current item
                if (isCurrentlyActive) {
                    item.classList.remove("active");
                    questionBtn.setAttribute("aria-expanded", "false");
                } else {
                    item.classList.add("active");
                    questionBtn.setAttribute("aria-expanded", "true");
                }
            });
        });
    }

});
