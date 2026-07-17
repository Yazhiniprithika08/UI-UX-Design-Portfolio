/**
 * Yazhini Prithika UI/UX Portfolio Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Active Link and Scroll State
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".portfolio-section");

    // Add border/shadow/bg change to navbar on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Navigation Toggle Elements
    const menuToggle = document.getElementById("menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    // Handle smooth scrolls for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            // Close mobile menu if active on link click
            if (menuToggle && menuToggle.classList.contains("active")) {
                menuToggle.classList.remove("active");
                if (navLinksContainer) navLinksContainer.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    // Mobile Navigation Hamburger Interaction
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinksContainer.classList.toggle("active");
            
            if (navLinksContainer.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });
        
        // Close menu if clicking the mobile CTA button inside it
        const mobileCtaLink = navLinksContainer.querySelector(".mobile-cta-item a");
        if (mobileCtaLink) {
            mobileCtaLink.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinksContainer.classList.remove("active");
                document.body.style.overflow = "";
            });
        }
    }

    // 2. Intersection Observer for Active Navigation States
    const navObserverOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies the mid-upper part of screen
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSectionId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    if (link.getAttribute("data-section") === activeSectionId) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // 3. Skills Progress Bar Animation Observer
    const skillsSection = document.querySelector(".page-skills");
    const progressFills = document.querySelectorAll(".progress-bar-fill");

    const skillsObserverOptions = {
        root: null,
        threshold: 0.15 // Trigger when 15% of the skills section is visible
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                progressFills.forEach(fill => {
                    fill.classList.add("active");
                });
                
                // Once triggered, we can stop observing
                skillsObserver.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // 4. Subtle Micro-animations on cards
    const cards = document.querySelectorAll(".soft-skill-card, .skills-category-card");
    const cardObserverOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.05
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
        
        cardObserver.observe(card);
    });

    // ==========================================================================
    // 5. Interactive Desktop Case Study Mockup Toggler
    // ==========================================================================
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    const mockupScreens = document.querySelectorAll(".mockup-screen");
    const mockDescTitle = document.getElementById("mock-desc-title");
    const mockDescText = document.getElementById("mock-desc-text");

    const mockupDescriptions = {
        "dashboard": {
            title: "Dashboard View",
            text: "The primary mission center for sales coordinators. Displays instant pipeline indicators and lists leads qualified by AI in real-time. Features color-coded match scores (Hot vs. Warm) so representatives immediately prioritize outreach paths."
        },
        "lead-form": {
            title: "Lead Form View",
            text: "A clean interface enabling manual entry of target company websites. The AI Agent automatically initiates crawling protocols and enriches profile inputs instantly, removing standard data-entry lag."
        },
        "lead-history": {
            title: "Lead History Table",
            text: "An audit log that preserves all previous qualification decisions. Provides full transparency into AI confidence percentages, sources, and status flags so operations teams can trace routing results."
        },
        "analytics": {
            title: "Analytics Dashboard",
            text: "Highlights core operational velocity metrics. Compares response latency improvements and converts qualification flows into visual funnel steps to isolate conversion leaks."
        }
    };

    sidebarItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Update active sidebar item
            sidebarItems.forEach(sib => sib.classList.remove("active"));
            item.classList.add("active");

            // Display matching screen
            const targetScreen = item.getAttribute("data-mock-screen");
            mockupScreens.forEach(screen => {
                screen.classList.remove("active");
                if (screen.getAttribute("id") === `screen-${targetScreen}`) {
                    screen.classList.add("active");
                }
            });

            // Update description box text
            if (mockupDescriptions[targetScreen]) {
                mockDescTitle.textContent = mockupDescriptions[targetScreen].title;
                mockDescText.textContent = mockupDescriptions[targetScreen].text;
            }
        });
    });

    // ==========================================================================
    // 6. Interactive Wireframe Progression Studio
    // ==========================================================================
    const screenBtns = document.querySelectorAll(".studio-screen-btn");
    const progTabBtns = document.querySelectorAll(".prog-tab-btn");
    const canvasElement = document.getElementById("wireframe-canvas");
    
    const annotFidelityTitle = document.getElementById("annot-fidelity-title");
    const annotDetails = document.getElementById("annot-details");
    const annotRefinement = document.getElementById("annot-refinement");

    let currentScreen = "dash";
    let currentFidelity = "sketch";

    // Standard annotations for stages
    const fidelityInfo = {
        "sketch": {
            title: "Hand-Drawn Sketch",
            desc: "Early brainstorm layout mapping elements onto paper templates. Intended to quickly test block spacing and structure visual balance before proceeding to digital vector systems.",
            refine: "Identified critical focus paths. Switched the main dashboard layout from grid views to prioritized list view cards for better scan-ability."
        },
        "low": {
            title: "Low-Fidelity Wireframe",
            desc: "Converted paper concepts to digital boxes. This stage focuses on layout proportions, reading order, and component grids, deliberately leaving visual styles gray and generic.",
            refine: "Increased header spacing and padded table margins to improve content reading comfort."
        },
        "mid": {
            title: "Mid-Fidelity Blueprint",
            desc: "Constructed structural layouts utilizing blueprint grids. Element sizing tokens, thin line markers, and system fonts are integrated here to prepare technical alignments.",
            refine: "Introduced clear status badges (Approved, Flagged) to draw instant attention to AI actions."
        },
        "high": {
            title: "High-Fidelity Structure",
            desc: "Introduced readable content blocks, actual form elements, real data points, and standard vectors. Serves as a prototype draft before applying colors and typography branding.",
            refine: "Shifted search filters and query logs inside drawers to keep the visual grid minimal and clean."
        },
        "final": {
            title: "Final Visual Design",
            desc: "Applied the final branding scheme: high-end Poppins/Inter font weights, deep shadow depth, rounded borders, green/blue alerts, and gradient details.",
            refine: "Added dynamic hover states and glow highlights on top leads to boost user engagement during reviews."
        }
    };

    // Canvas layout generators
    function renderWireframeContents(screen, fidelity) {
        // Clear previous modes
        canvasElement.className = "wireframe-render-canvas";
        canvasElement.classList.add(`mode-${fidelity}`);

        let htmlContent = "";

        if (screen === "dash") {
            // Dashboard layout mockup
            htmlContent = `
                <div class="wf-container">
                    <div class="wf-navbar">
                        <div class="wf-logo">DASHBOARD SCREEN</div>
                        <div class="wf-nav-items">
                            <span class="wf-nav-dot"></span>
                            <span class="wf-nav-dot"></span>
                        </div>
                    </div>
                    <div class="wf-sidebar-layout">
                        <div class="wf-side">
                            <span class="wf-nav-dot"></span>
                            <span class="wf-nav-dot"></span>
                            <span class="wf-nav-dot"></span>
                        </div>
                        <div class="wf-main">
                            <div class="wf-grid-3">
                                <div class="wf-card-mini wf-placeholder-cross"></div>
                                <div class="wf-card-mini wf-placeholder-cross"></div>
                                <div class="wf-card-mini wf-placeholder-cross"></div>
                            </div>
                            <div class="wf-box wf-placeholder-cross">Leads Table Area</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (screen === "landing") {
            // Landing page layout mockup
            htmlContent = `
                <div class="wf-container" style="text-align: center; justify-content: center; align-items: center; padding: 20px;">
                    <div class="wf-hero-title"></div>
                    <div class="wf-hero-text"></div>
                    <div class="wf-hero-text" style="width: 60%;"></div>
                    <div class="wf-grid-3" style="width: 100%; margin-top: 24px;">
                        <div class="wf-box wf-placeholder-cross" style="height: 100px;">Features</div>
                        <div class="wf-box wf-placeholder-cross" style="height: 100px;">AI Agent</div>
                        <div class="wf-box wf-placeholder-cross" style="height: 100px;">Integrations</div>
                    </div>
                </div>
            `;
        } else if (screen === "entry") {
            // Lead Entry form mockup
            htmlContent = `
                <div class="wf-container">
                    <div class="wf-navbar">
                        <div class="wf-logo">ADD LEAD FORM</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px; margin: 0 auto; width: 100%;">
                        <div class="wf-hero-text" style="height: 24px; width: 100%;">Input Domain</div>
                        <div class="wf-hero-text" style="height: 24px; width: 100%;">Budget Size</div>
                        <div class="wf-box wf-placeholder-cross" style="height: 80px;">Prompt Criteria</div>
                        <div class="wf-card-mini wf-placeholder-cross" style="height: 36px; background: var(--accent-blue);">Submit Button</div>
                    </div>
                </div>
            `;
        } else if (screen === "details") {
            // Details drawer mockup
            htmlContent = `
                <div class="wf-container">
                    <div class="wf-navbar">
                        <div class="wf-logo">LEAD RECORDS</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 180px; gap: 16px; height: 200px;">
                        <div class="wf-box wf-placeholder-cross">Main Table Grid</div>
                        <div class="wf-box wf-placeholder-cross" style="border: 2px solid #ef4444; background: #fee2e2;">Sidebar Detail Drawer Details</div>
                    </div>
                </div>
            `;
        } else if (screen === "analytics") {
            // Analytics page mockup
            htmlContent = `
                <div class="wf-container">
                    <div class="wf-navbar">
                        <div class="wf-logo">PERFORMANCE ANALYTICS</div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="wf-box wf-placeholder-cross" style="height: 160px;">Conversion Funnel Chart</div>
                        <div class="wf-box wf-placeholder-cross" style="height: 160px;">Response Speed Metrics</div>
                    </div>
                </div>
            `;
        } else if (screen === "history") {
            // History list log mockup
            htmlContent = `
                <div class="wf-container">
                    <div class="wf-navbar">
                        <div class="wf-logo">AUDIT QUALIFICATION HISTORY</div>
                    </div>
                    <div class="wf-main">
                        <div class="wf-card-mini wf-placeholder-cross" style="height: 30px;">Row 1: netflix.com - Approved</div>
                        <div class="wf-card-mini wf-placeholder-cross" style="height: 30px;">Row 2: microsoft.com - Approved</div>
                        <div class="wf-card-mini wf-placeholder-cross" style="height: 30px;">Row 3: spam.org - Discarded</div>
                    </div>
                </div>
            `;
        }

        canvasElement.innerHTML = htmlContent;

        // Apply annotation texts
        if (fidelityInfo[fidelity]) {
            annotFidelityTitle.textContent = fidelityInfo[fidelity].title;
            annotDetails.textContent = fidelityInfo[fidelity].desc;
            annotRefinement.textContent = fidelityInfo[fidelity].refine;
        }
    }

    // Connect Screen Selector buttons
    screenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            screenBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentScreen = btn.getAttribute("data-screen-id");
            renderWireframeContents(currentScreen, currentFidelity);
        });
    });

    // Connect Progression tabs
    progTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            progTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFidelity = btn.getAttribute("data-fidelity");
            renderWireframeContents(currentScreen, currentFidelity);
        });
    });

    // Run initial canvas draw on page load
    renderWireframeContents(currentScreen, currentFidelity);

    // ==========================================================================
    // 7. Interactive Android Mobile UI Simulator State Manager
    // ==========================================================================
    const simScreenBtns = document.querySelectorAll(".sim-screen-btn");
    const phoneNavItems = document.querySelectorAll(".phone-nav-item");
    const phoneScreenViews = document.querySelectorAll(".phone-screen-view");

    // Handle simulator screen select buttons (Splash, Login, Details, etc.)
    simScreenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update button states
            simScreenBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Deactivate bottom nav highlights (as splash/login are out-of-flow screens)
            phoneNavItems.forEach(nav => nav.classList.remove("active"));

            // Switch to selected screen
            const targetScreenId = btn.getAttribute("data-mobile-screen-id");
            phoneScreenViews.forEach(view => {
                view.classList.remove("active");
                if (view.getAttribute("id") === `p-screen-${targetScreenId}`) {
                    view.classList.add("active");
                }
            });

            // If switching to details screen, we can highlight the "Home" bottom tab
            if (targetScreenId === "details") {
                document.querySelector('.phone-nav-item[data-phone-screen="dashboard"]').classList.add("active");
            }
        });
    });

    // Handle bottom navigation bar buttons
    phoneNavItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            // Update bottom nav active highlight
            phoneNavItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            // Deactivate simulator selector buttons (since we've navigated)
            simScreenBtns.forEach(b => b.classList.remove("active"));

            // Switch screen panel
            const targetScreen = item.getAttribute("data-phone-screen");
            phoneScreenViews.forEach(view => {
                view.classList.remove("active");
                if (view.getAttribute("id") === `p-screen-${targetScreen}`) {
                    view.classList.add("active");
                }
            });
        });
    });

    // Handle simulated Android switch toggles
    const mockSwitches = document.querySelectorAll(".mock-switch");
    mockSwitches.forEach(sw => {
        sw.addEventListener("click", () => {
            sw.classList.toggle("active");
        });
    });

    // ==========================================================================
    // 8. Graphic Design Showcase Lightbox Handler
    // ==========================================================================
    const graphicsCards = document.querySelectorAll(".graphics-card");
    const lightboxModal = document.getElementById("design-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDesc = document.getElementById("lightbox-desc");
    const lightboxClose = document.getElementById("lightbox-close");

    graphicsCards.forEach(card => {
        card.addEventListener("click", () => {
            const src = card.getAttribute("data-img-src");
            const title = card.getAttribute("data-design-title");
            const desc = card.getAttribute("data-design-desc");

            // Update lightbox content
            lightboxImg.src = src;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;

            // Open overlay modal
            lightboxModal.classList.add("active");
            lightboxModal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden"; // Disable scroll when modal open
        });
    });

    // Close Lightbox Modal
    const closeModal = () => {
        lightboxModal.classList.remove("active");
        lightboxModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Re-enable background scrolling
        setTimeout(() => {
            lightboxImg.src = ""; // Clear src to avoid flicker on reopen
        }, 300);
    };

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeModal);
    }

    // Close when clicking outside of contents on the blurred backdrop
    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                closeModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal.classList.contains("active")) {
            closeModal();
        }
    });
});


