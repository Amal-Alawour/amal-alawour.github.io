
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // =========================================
    // SUPABASE CONNECTION
    // =========================================

    const supabaseUrl =
        "https://aqhpwoghvuhjovcnmucy.supabase.co";

    // Keep your existing Supabase publishable key here.
    const supabaseKey = "sb_publishable_w9rbK_-GBzLFFMMc6YSpKg_K0n__EVl";

    const supabaseClient =
        window.supabase &&
        typeof window.supabase.createClient === "function"
            ? window.supabase.createClient(
                  supabaseUrl,
                  supabaseKey
              )
            : null;

    // =========================================
    // ELEMENTS
    // =========================================

    const languageToggle =
        document.getElementById("language-toggle");

    const themeToggle =
        document.getElementById("theme-toggle");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const aboutButton =
        document.getElementById("about-button");

    const aboutMessage =
        document.getElementById("about-message");

    const contactForm =
        document.getElementById("contact-form");

    const formMessage =
        document.getElementById("form-message");

    const scrollTopButton =
        document.getElementById("scroll-top");

    const currentYear =
        document.getElementById("current-year");

    // =========================================
    // LANGUAGE SYSTEM
    // =========================================

    let currentLanguage =
        localStorage.getItem("language") || "en";

    if (!["en", "ar"].includes(currentLanguage)) {
        currentLanguage = "en";
    }

    function updateAboutMessage() {
        if (!aboutMessage || !aboutButton) {
            return;
        }

        const isVisible =
            aboutMessage.classList.contains("show");

        if (isVisible) {
            if (currentLanguage === "ar") {
                aboutMessage.textContent =
                    "أجمع بين خبرتي في تقنية المعلومات والدعم الفني والأنظمة الرقمية والتدريب التقني، مع اهتمام بالبرمجة وتحليل البيانات والأتمتة. أركز على تقديم تدريب عملي وحلول تقنية تساعد المستخدمين والمتعلمين على استخدام التقنية بفعالية.";

                aboutButton.textContent = "إخفاء ↑";
            } else {
                aboutMessage.textContent =
                    "I combine my experience in IT, technical support, digital systems and technology training with an interest in programming, data analytics and automation. I focus on practical training and technology solutions that help users and learners use technology effectively.";

                aboutButton.textContent = "Show Less ↑";
            }
        } else {
            aboutMessage.textContent = "";

            aboutButton.textContent =
                currentLanguage === "ar"
                    ? "اعرف المزيد ←"
                    : "Learn More →";
        }
    }

    function setLanguage(language) {
        if (!["en", "ar"].includes(language)) {
            return;
        }

        currentLanguage = language;

        document.documentElement.lang = language;
        document.documentElement.dir =
            language === "ar" ? "rtl" : "ltr";

        if (languageToggle) {
            languageToggle.textContent =
                language === "ar" ? "English" : "العربية";

            languageToggle.setAttribute(
                "aria-label",
                language === "ar"
                    ? "Switch to English"
                    : "Switch to Arabic"
            );
        }

        // Translate elements with data-en and data-ar.
        document
            .querySelectorAll("[data-en][data-ar]")
            .forEach(function (element) {
                const translatedText =
                    element.getAttribute("data-" + language);

                if (translatedText !== null) {
                    element.textContent = translatedText;
                }
            });

        const nameInput =
            document.getElementById("name");

        const emailInput =
            document.getElementById("email");

        const messageInput =
            document.getElementById("message");

        if (nameInput) {
            nameInput.placeholder =
                language === "ar"
                    ? "اكتب اسمك"
                    : "Your name";
        }

        if (emailInput) {
            emailInput.placeholder =
                language === "ar"
                    ? "بريدك الإلكتروني"
                    : "your@email.com";
        }

        if (messageInput) {
            messageInput.placeholder =
                language === "ar"
                    ? "اكتب رسالتك..."
                    : "Write your message...";
        }

        if (contactForm) {
            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (submitButton && !submitButton.disabled) {
                submitButton.textContent =
                    language === "ar"
                        ? "إرسال الرسالة"
                        : "Send Message";
            }
        }

        document.title =
            language === "ar"
                ? "أمل العاوور | تقنية المعلومات والتدريب التقني"
                : "Amal Alawour | IT & Technology Trainer";

        updateAboutMessage();

        if (formMessage) {
            formMessage.textContent = "";
            formMessage.classList.remove("error");
        }

        localStorage.setItem("language", language);
    }

    if (languageToggle) {
        languageToggle.addEventListener("click", function () {
            setLanguage(
                currentLanguage === "en" ? "ar" : "en"
            );
        });
    }

    // =========================================
    // DARK MODE
    // =========================================

    let currentTheme =
        localStorage.getItem("theme") || "light";

    if (!["light", "dark"].includes(currentTheme)) {
        currentTheme = "light";
    }

    function setTheme(theme) {
        if (!["light", "dark"].includes(theme)) {
            return;
        }

        currentTheme = theme;

        document.body.classList.toggle(
            "dark-mode",
            theme === "dark"
        );

        if (themeToggle) {
            themeToggle.textContent =
                theme === "dark" ? "☀️" : "🌙";

            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                theme === "dark" ? "true" : "false"
            );
        }

        localStorage.setItem("theme", theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            setTheme(
                currentTheme === "light" ? "dark" : "light"
            );
        });
    }

    // =========================================
    // MOBILE MENU
    // =========================================

    function closeMobileMenu() {
        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMobileMenu();
            });
        });

        navMenu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    document.addEventListener("click", function () {
        closeMobileMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 820) {
            closeMobileMenu();
        }
    });

    // =========================================
    // ABOUT - LEARN MORE
    // =========================================

    if (aboutButton && aboutMessage) {
        aboutButton.addEventListener("click", function () {
            const isVisible =
                aboutMessage.classList.toggle("show");

            aboutButton.setAttribute(
                "aria-expanded",
                isVisible ? "true" : "false"
            );

            updateAboutMessage();
        });
    }

    // =========================================
    // CONTACT FORM - SUPABASE
    // =========================================

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            async function (event) {
                event.preventDefault();

                if (!formMessage) {
                    return;
                }

                formMessage.textContent = "";
                formMessage.classList.remove("error");

                // Honeypot spam protection.
                const honeypot =
                    document.getElementById("website_check");

                if (
                    honeypot &&
                    honeypot.value.trim() !== ""
                ) {
                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "تعذر إرسال الرسالة."
                            : "Unable to submit the message.";

                    formMessage.classList.add("error");
                    return;
                }

                // Check Supabase availability.
                if (!supabaseClient) {
                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "تعذر الاتصال بخدمة حفظ الرسائل. يرجى تحديث الصفحة والمحاولة مرة أخرى."
                            : "The message service is unavailable. Please refresh the page and try again.";

                    formMessage.classList.add("error");
                    return;
                }

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");

                const phoneInput =
                    document.getElementById("phone");

                const serviceTypeInput =
                    document.getElementById("service_type");

                const name =
                    nameInput ? nameInput.value.trim() : "";

                const email =
                    emailInput ? emailInput.value.trim() : "";

                const message =
                    messageInput ? messageInput.value.trim() : "";

                const phone =
                    phoneInput ? phoneInput.value.trim() : "";

                const serviceType =
                    serviceTypeInput
                        ? serviceTypeInput.value.trim()
                        : "General inquiry";

                // Required fields.
                if (!name || !email || !message) {
                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "يرجى تعبئة الاسم والبريد الإلكتروني والرسالة."
                            : "Please enter your name, email address, and message.";

                    formMessage.classList.add("error");
                    return;
                }

                // Field length limits.
                if (
                    name.length > 100 ||
                    email.length > 254 ||
                    message.length > 5000 ||
                    phone.length > 30 ||
                    serviceType.length > 100
                ) {
                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "بعض الحقول أطول من الحد المسموح. يرجى تقصير النص والمحاولة مجددًا."
                            : "One or more fields exceed the allowed length. Please shorten them and try again.";

                    formMessage.classList.add("error");
                    return;
                }

                // Basic email validation.
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {
                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "يرجى إدخال بريد إلكتروني صحيح."
                            : "Please enter a valid email address.";

                    formMessage.classList.add("error");
                    return;
                }

                const requestData = {
                    name: name,
                    email: email,
                    phone: phone || null,
                    service_type:
                        serviceType || "General inquiry",
                    message: message
                };

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent =
                        currentLanguage === "ar"
                            ? "جارٍ الإرسال..."
                            : "Sending...";
                }

                try {
                    const { error } =
                        await supabaseClient
                            .from("customer_requests")
                            .insert([requestData]);

                    if (error) {
                        throw error;
                    }

                    formMessage.classList.remove("error");

                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "تم إرسال رسالتك بنجاح. شكرًا لتواصلك معنا!"
                            : "Your message was submitted successfully. Thank you for contacting us!";

                    contactForm.reset();

                    // Restore placeholders after resetting the form.
                    if (nameInput) {
                        nameInput.placeholder =
                            currentLanguage === "ar"
                                ? "اكتب اسمك"
                                : "Your name";
                    }

                    if (emailInput) {
                        emailInput.placeholder =
                            currentLanguage === "ar"
                                ? "بريدك الإلكتروني"
                                : "your@email.com";
                    }

                    if (messageInput) {
                        messageInput.placeholder =
                            currentLanguage === "ar"
                                ? "اكتب رسالتك..."
                                : "Write your message...";
                    }
                } catch (error) {
                    console.error(
                        "Supabase submission error:",
                        error
                    );

                    formMessage.classList.add("error");

                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "لم نتمكن من حفظ الرسالة. يرجى المحاولة مرة أخرى."
                            : "We could not save your message. Please try again.";
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;

                        submitButton.textContent =
                            currentLanguage === "ar"
                                ? "إرسال الرسالة"
                                : "Send Message";
                    }
                }
            }
        );
    }

    // =========================================
    // SCROLL TO TOP
    // =========================================

    if (scrollTopButton) {
        function updateScrollButton() {
            if (window.scrollY > 500) {
                scrollTopButton.classList.add("show");
            } else {
                scrollTopButton.classList.remove("show");
            }
        }

        window.addEventListener(
            "scroll",
            updateScrollButton,
            { passive: true }
        );

        scrollTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        updateScrollButton();
    }

    // =========================================
    // CURRENT YEAR
    // =========================================

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

    // =========================================
    // INITIAL SETTINGS
    // =========================================

    setLanguage(currentLanguage);
    setTheme(currentTheme);
});
