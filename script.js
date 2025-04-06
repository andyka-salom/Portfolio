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
            // Only close if the mobile nav is currently active
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

     // --- Generic Item Modal Logic ---
    const allItems = document.querySelectorAll('.project-item, .certification-item'); // Select only projects and certs for modal
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
        proj1: { imgSrc: 'images/wablaz1.png', title: 'Notifikasi Whatsapp Website', date: 'Januari 2025', technologies: 'Laravel, jQuery, CSS, MySQL', description: 'Website providing WhatsApp notification services, integrated with payment gateways and user management features. Built using Laravel framework.', link: null }, // Example: No link
        proj2: {
            imgSrc: 'images/ourcity.png',
            title: 'OurCity Infrastructure Reporting Web App',
            date: 'Oktober 2024',
            technologies: 'Laravel, jQuery DataTables, Open Streets Maps API',
            description: 'A web-based application for reporting and managing city infrastructure issues. Built with Laravel for backend functionality and jQuery DataTables for dynamic data presentation. Integrated with Google Maps API for location-based issue tracking.',
            link: 'https://github.com/andyka-salom/ourcity' 
          },          
          proj3: {
            imgSrc: 'images/nitrak3.png',
            title: 'Nitrak Website – Tender Monitoring System',
            date: 'Jul 2024 – Nov 2024',
            technologies: 'Laravel, jQuery, MySQL',
            description: 'This internal web application is built to streamline monitoring and collaboration between buyers, vendors, and clients within a BUMN environment. Key features include an interactive dashboard for project tracking, vendor management (profiles, contracts, performance), automated email notifications for deadlines and project updates, centralized document handling, and role-based multi-level access control. The system significantly enhances transparency, efficiency, and oversight in the vendor collaboration process.',
            link: null 
          },
          
          proj4: {
            imgSrc: 'images/agt1.png',
            title: 'AGT Financial Submission Dashboard',
            date: 'Mar 2024 – May 2024',
            technologies: 'PHP, JavaScript, MySQL, Laravel',
            description: 'A web-based financial submission and reporting system developed for Airlangga Global Travel (AGT). The system streamlines the submission and approval of travel-related financial documents with a secure, multi-level authorization workflow. It also includes comprehensive reporting tools to provide management with clear insights into travel expenses and budget allocations, enabling improved financial oversight and decision-making.',
            link: null // Tambahkan jika tersedia
          },
          
        proj5: { imgSrc: 'images/11.png', title: 'Sistem Informasi Alumni', date: 'Desember 2023', technologies: 'Laravel, Bootstrap, MySQL', description: 'An information system designed to manage and connect with university alumni, featuring profiles, event notifications, and communication tools.', link: 'https://github.com/andyka-salom/si-alumni-ftmm' }, // REPLACE link if available
        proj6: { imgSrc: 'images/dsi (2).png', title: 'DSI Landing Page', date: 'September 2023', technologies: 'Laravel, CSS, MySQL', description: 'A landing page for DSI (likely Direktorat Sistem Informasi), built with Laravel, showcasing information and potentially services offered.', link: null },
        proj7: { imgSrc: 'images/14.png', title: 'Sistem Informasi Skripsi', date: 'Januari 2024', technologies: 'Laravel, CSS, MySQL', description: 'A web-based system to manage the thesis (skripsi) process for students and faculty, including submission, review, and progress tracking.', link: 'https://github.com/andyka-salom/SI-Skripsi' }, // REPLACE link if available
        proj8: {
            imgSrc: 'images/taskly.png',
            title: 'Taskly – Personal Task Manager',
            date: 'Mar 2025',
            technologies: 'Flutter, Firebase, Cloud Firestore',
            description: 'Taskly is a personal task management mobile application designed to help users efficiently record and manage their daily tasks. Built using Flutter for a smooth and responsive UI, and Firebase Firestore for real-time data sync across devices. It features Firebase Authentication for secure and personalized user access. The app allows users to add, update, and delete tasks instantly, with a strong focus on intuitive UX and performance.',
            link: 'https://github.com/andyka-salom/taskly'
          }          
    };
    const certificationData = {
        cert1: {
            imgSrc: 'images/sertif.jpg', // Full image for modal
            title: 'IT Perbankan',
            issuer: 'Digital Talent Scholarship (Kominfo) & Bank Jatim',
            skills: 'Team Building, Teamwork, Web Design, MySQL, PHP, Web Dev, SDLC, Laravel, Analytical Skills, Kotlin, Android Dev, Research, Software Dev, UED, Cloud Computing',
            description: 'Successfully completed intensive training on IT systems in the banking industry. Covered web and mobile app development (Laravel, Kotlin), database management (MySQL), SDLC principles, and delivering secure, user-focused financial solutions.',
            link: '#' // REPLACE validation link or null
        },
        cert2: {
            imgSrc: 'images/python.jpg', // Full image for modal
            title: 'Backend-Python(FLASK)',
            issuer: 'Myskill',
            skills: 'Python, Flask, PostgreSQL, RESTful APIs',
            description: 'Gained practical experience building backend systems using Python and Flask, integrating PostgreSQL for data management. Learned to create RESTful APIs and apply best practices in backend development.',
            link: '#' // REPLACE validation link or null
        },
         cert3: {
            imgSrc: 'images/golang.png', // Full image for modal
            title: 'Backend-Golang(Gin)',
            issuer: 'Myskill',
            skills: 'Golang, Gin Framework, PostgreSQL, RESTful APIs, Clean Architecture',
            description: 'Completed backend development training using Golang and the Gin framework. Focused on building high-performance APIs, integrating PostgreSQL databases, and applying clean architecture for scalable web services.',
            link: '#' // REPLACE validation link or null
         }
         // Add more certification data entries here...
    };
    // ********************************************

    allItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const itemType = item.getAttribute('data-item-type');
            let data;

            // Reset details and link display
            detail1Container.style.display = 'none';
            detail2Container.style.display = 'none';
            modalLink.style.display = 'none';

            if (itemType === 'project' && projectData[itemId]) {
                data = projectData[itemId];
                modalImg.src = data.imgSrc; // Use specific image source from data
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;

                // Detail 1: Date
                detail1Icon.className = 'fas fa-calendar-alt';
                detail1Label.textContent = 'Date';
                detail1Value.textContent = data.date || 'N/A'; // Handle missing date
                detail1Container.style.display = 'flex';

                 // Detail 2: Technologies
                 detail2Icon.className = 'fas fa-tags';
                 detail2Label.textContent = 'Technologies';
                 detail2Value.textContent = data.technologies || 'N/A'; // Handle missing tech
                 detail2Container.style.display = 'flex';

                 // Link
                 if (data.link) {
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-external-link-alt';
                    modalLinkText.textContent = 'Visit Project';
                    modalLink.style.display = 'inline-flex';
                }

            } else if (itemType === 'certification' && certificationData[itemId]) {
                data = certificationData[itemId];
                modalImg.src = data.imgSrc; // Use specific image source from data
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;

                // Detail 1: Issuer
                detail1Icon.className = 'fas fa-building-columns';
                detail1Label.textContent = 'Issuer';
                detail1Value.textContent = data.issuer || 'N/A';
                detail1Container.style.display = 'flex';

                // Detail 2: Skills
                detail2Icon.className = 'fas fa-check-circle';
                detail2Label.textContent = 'Skills';
                detail2Value.textContent = data.skills || 'N/A';
                detail2Container.style.display = 'flex';

                // Link
                 if (data.link && data.link !== '#') { // Only show if link exists and is not '#'
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-certificate';
                    modalLinkText.textContent = 'Verify Credential';
                    modalLink.style.display = 'inline-flex';
                }

            } else {
                console.error("No data found for item ID:", itemId, "Type:", itemType);
                // Optionally display a generic error in the modal
                // modalTitle.textContent = "Error";
                // modalDescription.textContent = "Details could not be loaded.";
                return; // Don't open modal if data is missing
            }

             // Open the modal if data was found
             if (data) {
                modalImg.alt = data.title + " Detail"; // Set alt text
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
            }
        });
    });

    // Close modal function
     function closeModal() {
          if (modal && modal.classList.contains('active')) { // Check if modal exists and is active
             modal.classList.remove('active');
             document.body.style.overflow = ''; // Restore body scroll
         }
     }
    // Add listeners to close modal
    if(closeModalBtn) { closeModalBtn.addEventListener('click', closeModal); }
    if(modal) { modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); }); } // Close on outside click
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); }); // Close with Escape key

    // --- Auto Update Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            const formData = new FormData(contactForm);
            const formAction = contactForm.action;

            // Basic check if endpoint is placeholder
            if (!formAction || formAction.includes("YOUR_FORM_ENDPOINT")) {
                 formStatus.textContent = "Form endpoint not configured.";
                 formStatus.style.color = "orange";
                 return; // Stop submission
            }

            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--grey-text)";

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: { // Important for services like Formspree
                        'Accept': 'application/json'
                    }
                 });

                if (response.ok) {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "green";
                    contactForm.reset(); // Clear the form
                } else {
                    // Try to get error message from response body
                    const errorData = await response.json().catch(() => null); // Gracefully handle non-JSON responses
                    formStatus.textContent = `Failed to send. ${errorData?.error || response.statusText || 'Server error'}`;
                    formStatus.style.color = "red";
                }
            } catch (error) {
                console.error("Form submission error:", error); // Log the error for debugging
                formStatus.textContent = "An network error occurred. Please try again.";
                formStatus.style.color = "red";
            }
        });
    }

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
            // else { entry.target.classList.remove('in-view'); } // Uncomment to re-animate on scroll up
        });
    }, {
         threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => { observer.observe(el); });

    // --- Active Nav Link Highlighting on Scroll (Scrollspy) ---
     const sections = document.querySelectorAll('main section[id]'); // Get all sections in main with an ID
     const allNavLinks = document.querySelectorAll('.main-nav a.nav-link'); // Get all nav links

     function changeActiveLink() {
        let index = sections.length;
        const offset = header.offsetHeight + 20; // Offset for fixed header height + some buffer

        // Find the index of the section currently in view
        while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}

        // Remove active class from all links
        allNavLinks.forEach((link) => link.classList.remove('active'));

        // Add active class to the corresponding link
        // Handle edge case where no section is found (e.g., scrolled to top before 'home')
        const currentSectionId = (index >= 0) ? sections[index].id : (sections[0] ? sections[0].id : null); // Fallback to first section ID if available

        if (currentSectionId) {
            const activeLink = document.querySelector(`.main-nav a[href="#${currentSectionId}"]`);
            if (activeLink) {
                 activeLink.classList.add('active');
            }
        }
     }

     // Initial call to set active link on page load
     changeActiveLink();
     // Add scroll listener
     window.addEventListener('scroll', changeActiveLink);

});