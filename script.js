document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

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


    /* =====================================================
       LANGUAGE SYSTEM
    ====================================================== */

    let currentLanguage =
        localStorage.getItem("language") || "en";


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

                aboutButton.textContent =
                    "إخفاء ↑";

            } else {

                aboutMessage.textContent =
                    "I combine my experience in IT, technical support, digital systems and technology training with an interest in programming, data analytics and automation. I focus on practical training and technology solutions that help users and learners use technology effectively.";

                aboutButton.textContent =
                    "Show Less ↑";
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

        currentLanguage = language;


        /* ---------------------------------------------
           HTML LANGUAGE & DIRECTION
        --------------------------------------------- */

        document.documentElement.lang =
            language;

        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";


        /* ---------------------------------------------
           LANGUAGE BUTTON
        --------------------------------------------- */

        if (languageToggle) {

            if (language === "ar") {

                languageToggle.textContent =
                    "English";

                languageToggle.setAttribute(
                    "aria-label",
                    "Switch to English"
                );

            } else {

                languageToggle.textContent =
                    "العربية";

                languageToggle.setAttribute(
                    "aria-label",
                    "Switch to Arabic"
                );
            }
        }


        /* ---------------------------------------------
           TRANSLATE ELEMENTS
        --------------------------------------------- */

        const translatableElements =
            document.querySelectorAll(
                "[data-en][data-ar]"
            );


        translatableElements.forEach(
            function (element) {

                const translatedText =
                    element.getAttribute(
                        "data-" + language
                    );


                if (
                    translatedText !== null
                ) {
                    element.textContent =
                        translatedText;
                }

            }
        );


        /* ---------------------------------------------
           FORM PLACEHOLDERS
        --------------------------------------------- */

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
                "your@email.com";
        }


        if (messageInput) {

            messageInput.placeholder =
                language === "ar"
                    ? "اكتب رسالتك..."
                    : "Write your message...";
        }


        /* ---------------------------------------------
           PAGE TITLE
        --------------------------------------------- */

        document.title =
            language === "ar"
                ? "أمل العاوور | تقنية المعلومات والتدريب التقني"
                : "Amal Alawour | IT & Technology Trainer";


        /* ---------------------------------------------
           ABOUT
        --------------------------------------------- */

        updateAboutMessage();


        /* ---------------------------------------------
           CLEAR FORM MESSAGE
        --------------------------------------------- */

        if (formMessage) {

            formMessage.textContent = "";

            formMessage.classList.remove(
                "error"
            );
        }


        /* ---------------------------------------------
           SAVE LANGUAGE
        --------------------------------------------- */

        localStorage.setItem(
            "language",
            language
        );
    }


    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            function () {

                setLanguage(
                    currentLanguage === "en"
                        ? "ar"
                        : "en"
                );

            }
        );
    }



    /* =====================================================
       DARK MODE
    ====================================================== */

    let currentTheme =
        localStorage.getItem("theme") || "light";


    function setTheme(theme) {

        currentTheme = theme;


        if (theme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );


            if (themeToggle) {

                themeToggle.textContent =
                    "☀️";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    "true"
                );
            }

        } else {

            document.body.classList.remove(
                "dark-mode"
            );


            if (themeToggle) {

                themeToggle.textContent =
                    "🌙";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "aria-pressed",
                    "false"
                );
            }
        }


        localStorage.setItem(
            "theme",
            theme
        );
    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                setTheme(
                    currentTheme === "light"
                        ? "dark"
                        : "light"
                );

            }
        );
    }



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function closeMobileMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }


        navMenu.classList.remove(
            "active"
        );

        menuToggle.classList.remove(
            "active"
        );

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

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const isOpen =
                    navMenu.classList.toggle(
                        "active"
                    );


                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        const navLinks =
            navMenu.querySelectorAll(
                "a"
            );


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                    }
                );

            }
        );


        navMenu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );
    }


    document.addEventListener(
        "click",
        function () {

            closeMobileMenu();

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 820) {

                closeMobileMenu();

            }

        }
    );



    /* =====================================================
       ABOUT - LEARN MORE
    ====================================================== */

    if (aboutButton && aboutMessage) {

        aboutButton.addEventListener(
            "click",
            function () {

                const isVisible =
                    aboutMessage.classList.toggle(
                        "show"
                    );


                aboutButton.setAttribute(
                    "aria-expanded",
                    isVisible
                        ? "true"
                        : "false"
                );


                updateAboutMessage();

            }
        );
    }



    /* =====================================================
       CONTACT FORM
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* ---------------------------------------------
                   CLEAR PREVIOUS MESSAGE
                --------------------------------------------- */

                if (formMessage) {

                    formMessage.textContent = "";

                    formMessage.classList.remove(
                        "error"
                    );
                }


                /* ---------------------------------------------
                   REQUIRED FIELDS
                --------------------------------------------- */

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            currentLanguage === "ar"
                                ? "يرجى تعبئة جميع الحقول."
                                : "Please fill in all fields.";

                        formMessage.classList.add(
                            "error"
                        );
                    }

                    return;
                }


                /* ---------------------------------------------
                   EMAIL VALIDATION
                --------------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            currentLanguage === "ar"
                                ? "يرجى إدخال بريد إلكتروني صحيح."
                                : "Please enter a valid email address.";

                        formMessage.classList.add(
                            "error"
                        );
                    }

                    return;
                }


                /* ---------------------------------------------
                   EMAIL DETAILS
                --------------------------------------------- */

                const recipient =
                    "Amal.Alawour@gmail.com";


                const subject =
                    currentLanguage === "ar"
                        ? "رسالة من موقع أمل العاوور"
                        : "Message from Amal Alawour Website";


                const body =
                    currentLanguage === "ar"
                        ? `الاسم: ${name}

البريد الإلكتروني: ${email}

الرسالة:

${message}`
                        : `Name: ${name}

Email: ${email}

Message:

${message}`;


                const mailtoLink =
                    "mailto:" +
                    recipient +
                    "?subject=" +
                    encodeURIComponent(subject) +
                    "&body=" +
                    encodeURIComponent(body);


                /* ---------------------------------------------
                   SUCCESS MESSAGE
                --------------------------------------------- */

                if (formMessage) {

                    formMessage.classList.remove(
                        "error"
                    );

                    formMessage.textContent =
                        currentLanguage === "ar"
                            ? "سيتم فتح برنامج البريد الإلكتروني."
                            : "Your email application will open.";
                }


                /* ---------------------------------------------
                   OPEN EMAIL APPLICATION
                --------------------------------------------- */

                window.location.href =
                    mailtoLink;

            }
        );
    }



    /* =====================================================
       SCROLL TO TOP
    ====================================================== */

    if (scrollTopButton) {

        function updateScrollButton() {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add(
                    "show"
                );

            } else {

                scrollTopButton.classList.remove(
                    "show"
                );
            }
        }


        window.addEventListener(
            "scroll",
            updateScrollButton,
            {
                passive: true
            }
        );


        scrollTopButton.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        updateScrollButton();
    }



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }



    /* =====================================================
       INITIAL SETTINGS
    ====================================================== */

    setLanguage(
        currentLanguage
    );

    setTheme(
        currentTheme
    );

});