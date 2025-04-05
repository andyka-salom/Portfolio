document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top'); // Get Back to Top button

    window.addEventListener('scroll', () => {
        // Header effect
        header.classList.toggle('scrolled', window.scrollY > 50);

        // Back to top button visibility
        if (backToTopButton) {
            backToTopButton.classList.toggle('visible', window.scrollY > 300); // Show after scrolling 300px
        }
    });

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', isActive); // Add/remove based on state
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

     // --- Generic Item Modal Logic ---
    const allItems = document.querySelectorAll('.project-item, .certification-item');
    const modal = document.getElementById('item-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalLinkIcon = document.getElementById('modal-link-icon');
    const modalLinkText = document.getElementById('modal-link-text');
    const closeModalBtn = document.querySelector('.modal-close');

    const detail1Container = document.getElementById('modal-detail-1-container');
    const detail1Icon = document.getElementById('modal-detail-1-icon');
    const detail1Label = document.getElementById('modal-detail-1-label');
    const detail1Value = document.getElementById('modal-detail-1-value');

    const detail2Container = document.getElementById('modal-detail-2-container');
    const detail2Icon = document.getElementById('modal-detail-2-icon');
    const detail2Label = document.getElementById('modal-detail-2-label');
    const detail2Value = document.getElementById('modal-detail-2-value');

    // --- DATA (REPLACE ALL PLACEHOLDERS!) ---
    const projectData = {
        proj1: { imgSrc: 'images/wablaz1.png', title: 'Notifikasi Whatsapp Website', date: 'Januari 2025', technologies: 'Laravel,Jquery,CSS', description: 'Developed a full-stack e-commerce platform featuring product listings, user authentication, shopping cart functionality, and admin management panels. Focused on RESTful API design and responsive UI.', link: '#' },
        proj3: { imgSrc: 'images/nitrak3.png', title: 'Monitoring Tender', date: 'November 2024', technologies: 'Laravel, JQuery, Mysql', description: 'An interactive dashboard to track project progress. Vendor management covering profiles, contracts, and performance. Automated email notifications for deadlines, documents, and project updates. Centralized document management. Multi-level access to ensure data security based on roles. The system enhances transparency, efficiency, and oversight in vendor collaboration processes..', link: null },
        proj2: { imgSrc: 'images/project3-full.png', title: '', date: 'January 2024', technologies: 'Python, Flask, Pandas, Plotly.js', description: 'Built an interactive web dashboard to visualize complex datasets. Used Flask for the backend API and Plotly.js for dynamic charts and graphs, enabling data exploration.', link: 'https://github.com/andyka-salom/repo-name' } // REPLACE link
    };
    const certificationData = {
        cert1: {
            imgSrc: 'images/sertif.jpg', // Full image for modal
            title: 'IT Perbankan',
            issuer: 'Digital Talent Scholarship (digikom)',
            skills: 'Team Building · Teamwork · Web Design · MySQL · PHP · Web Development · Software Development Life Cycle (SDLC) · Laravel · Analytical Skills · Kotlin · Android Development · Research Skills · Software Development · User Experience Design (UED) · Cloud Computing',
            description: 'Successfully completed an intensive training on IT systems in the banking industry. Covered topics include web and mobile app development using Laravel and Kotlin, database management with MySQL, and applying SDLC principles to deliver secure, user-focused financial solutions.',
            link: '#' // REPLACE validation link or null
        },
        cert2: {
            imgSrc: 'images/python.jpg', // Full image for modal
            title: 'Backend-Python(FLASK)',
            issuer: 'Myskill', // Example Issuer
            skills: 'Python, Flask, Postgree',
            description: 'Gained practical experience in building backend systems using Python and Flask, integrating PostgreSQL for data management. Learned to create RESTful APIs and apply best practices in backend development.',
            link: '#' // REPLACE validation link or null
        },
         cert3: {
            imgSrc: 'images/golang.png', // Full image for modal
            title: 'Backend-Golang(Gin)',
            issuer: 'Myskill',
            skills: 'Golang, Gin Framework, Postgree',
            description: 'Completed backend development training using Golang and the Gin framework. Focused on building high-performance APIs, integrating PostgreSQL databases, and applying clean architecture for scalable web services.',
            link: '#' // REPLACE validation link or null
         }
    };
    // ********************************************

    allItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const itemType = item.getAttribute('data-item-type');
            let data;

            detail1Container.style.display = 'none';
            detail2Container.style.display = 'none';
            modalLink.style.display = 'none';

            if (itemType === 'project' && projectData[itemId]) {
                data = projectData[itemId];
                modalImg.src = data.imgSrc;
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;

                detail1Icon.className = 'fas fa-calendar-alt';
                detail1Label.textContent = 'Date';
                detail1Value.textContent = data.date;
                detail1Container.style.display = 'flex'; // Use flex

                 detail2Icon.className = 'fas fa-tags';
                 detail2Label.textContent = 'Technologies';
                 detail2Value.textContent = data.technologies;
                 detail2Container.style.display = 'flex'; // Use flex

                 if (data.link) {
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-external-link-alt';
                    modalLinkText.textContent = 'Visit Project';
                    modalLink.style.display = 'inline-flex';
                }

            } else if (itemType === 'certification' && certificationData[itemId]) {
                data = certificationData[itemId];
                modalImg.src = data.imgSrc;
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;

                detail1Icon.className = 'fas fa-building-columns';
                detail1Label.textContent = 'Issuer';
                detail1Value.textContent = data.issuer;
                detail1Container.style.display = 'flex'; // Use flex

                detail2Icon.className = 'fas fa-check-circle';
                detail2Label.textContent = 'Skills';
                detail2Value.textContent = data.skills;
                detail2Container.style.display = 'flex'; // Use flex

                 if (data.link) {
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-certificate';
                    modalLinkText.textContent = 'Verify Credential';
                    modalLink.style.display = 'inline-flex';
                }

            } else {
                console.error("No data found for item ID:", itemId, "Type:", itemType);
                return;
            }

             if (data) {
                modalImg.alt = data.title + " Detail";
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal function
     function closeModal() {
          if (modal && modal.classList.contains('active')) { // Check if modal exists
             modal.classList.remove('active');
             document.body.style.overflow = '';
         }
     }
    if(closeModalBtn) { closeModalBtn.addEventListener('click', closeModal); }
    if(modal) { modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); }); }
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });

    // --- Auto Update Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formAction = contactForm.action;
            if (!formAction || formAction === "YOUR_FORM_ENDPOINT") {
                 formStatus.textContent = "Form endpoint not configured.";
                 formStatus.style.color = "orange"; return;
            }
            formStatus.textContent = "Sending..."; formStatus.style.color = "var(--grey-text)";
            try {
                const response = await fetch(formAction, { method: 'POST', body: formData, headers: {'Accept': 'application/json'} });
                if (response.ok) {
                    formStatus.textContent = "Message sent successfully!"; formStatus.style.color = "green"; contactForm.reset();
                } else {
                    const errorData = await response.json().catch(() => null);
                    formStatus.textContent = `Failed to send. ${errorData?.error || response.statusText}`; formStatus.style.color = "red";
                }
            } catch (error) {
                formStatus.textContent = "An error occurred. Please try again."; formStatus.style.color = "red";
            }
        });
    }

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('in-view'); }
            // else { entry.target.classList.remove('in-view'); } // Uncomment to re-animate on scroll up
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => { observer.observe(el); });

    // --- Active Nav Link Highlighting on Scroll ---
     const sections = document.querySelectorAll('main section[id]');
     const allNavLinks = document.querySelectorAll('.main-nav a.nav-link');
     function changeActiveLink() {
        let index = sections.length;
        const offset = header.offsetHeight + 20;
        while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}
        allNavLinks.forEach((link) => link.classList.remove('active'));
        const currentSectionId = (index >= 0) ? sections[index].id : 'home';
        const activeLink = document.querySelector(`.main-nav a[href="#${currentSectionId}"]`);
        if (activeLink) { activeLink.classList.add('active'); }
     }
     changeActiveLink();
     window.addEventListener('scroll', changeActiveLink);

});