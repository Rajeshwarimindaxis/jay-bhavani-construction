document.addEventListener("DOMContentLoaded", function () {
    const brochureNavItem = document.getElementById("brochureNavItem");
    const brochureTrigger = document.getElementById("brochureNavTrigger");
    const brochureToggle = document.getElementById("brochureDropdownToggle");
    const brochureDropdown = document.getElementById("brochureDropdown");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");

    if (!brochureNavItem || !brochureTrigger || !brochureToggle || !brochureDropdown) {
        return;
    }

    function setBrochureDropdownOpen(isOpen) {
        brochureNavItem.classList.toggle("dropdown-open", isOpen);
        brochureTrigger.setAttribute("aria-expanded", String(isOpen));
        brochureToggle.setAttribute("aria-expanded", String(isOpen));
        brochureDropdown.setAttribute("aria-hidden", String(!isOpen));
    }

    function toggleBrochureDropdown(event) {
        event.preventDefault();
        event.stopPropagation();

        setBrochureDropdownOpen(!brochureNavItem.classList.contains("dropdown-open"));
    }

    brochureTrigger.addEventListener("click", toggleBrochureDropdown);
    brochureToggle.addEventListener("click", toggleBrochureDropdown);

    document.addEventListener("click", function (event) {
        if (!brochureNavItem.contains(event.target)) {
            setBrochureDropdownOpen(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && brochureNavItem.classList.contains("dropdown-open")) {
            setBrochureDropdownOpen(false);
            brochureToggle.focus();
        }
    });

    brochureDropdown.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setBrochureDropdownOpen(false);
            navbar?.classList.remove("active");
            menuToggle?.classList.remove("active");
            menuToggle?.setAttribute("aria-expanded", "false");
            menuToggle?.setAttribute("aria-label", "Open Menu");
        });
    });
});
