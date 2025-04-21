document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTopButton) {
            backToTopButton.classList.toggle('visible', window.scrollY > 300);
        }
    });

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a.nav-link'); // Target only nav links

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open', isActive); // Prevent body scroll when nav is open
        });
    }

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (navToggle) {
                    navToggle.classList.remove('active');
                }
                document.body.classList.remove('nav-open');
            }
        });
    });

    // --- Generic Item Modal Logic ---
    const allItems = document.querySelectorAll('.project-item, .certification-item');
    const modal = document.getElementById('item-modal');
    const modalImg = document.getElementById('modal-img');
    const modalIframe = document.getElementById('modal-iframe');
    const modalVideo = document.getElementById('modal-video'); // Get reference to the video element
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const modalLinkIcon = document.getElementById('modal-link-icon');
    const modalLinkText = document.getElementById('modal-link-text');
    const closeModalBtn = document.querySelector('.modal-close');

    // References to detail elements
    const detail1Container = document.getElementById('modal-detail-1-container');
    const detail1Icon = document.getElementById('modal-detail-1-icon');
    const detail1Label = document.getElementById('modal-detail-1-label');
    const detail1Value = document.getElementById('modal-detail-1-value');
    const detail2Container = document.getElementById('modal-detail-2-container');
    const detail2Icon = document.getElementById('modal-detail-2-icon');
    const detail2Label = document.getElementById('modal-detail-2-label');
    const detail2Value = document.getElementById('modal-detail-2-value');

    // --- DATA (Ensure paths are correct!) ---
    const projectData = {
        proj1: { imgSrc: 'images/wablaz1.png', title: 'Notifikasi Whatsapp Website', date: 'Januari 2025', technologies: 'Laravel, jQuery, CSS, MySQL', description: 'Website providing WhatsApp notification services, integrated with payment gateways and user management features. Built using Laravel framework.', link: null },
        proj2: { imgSrc: 'images/ourcity.png', title: 'OurCity Infrastructure Reporting Web App', date: 'Oktober 2024', technologies: 'Laravel, jQuery DataTables, Open Streets Maps API', description: 'A web-based application for reporting and managing city infrastructure issues. Built with Laravel for backend functionality and jQuery DataTables for dynamic data presentation. Integrated with Open Street Maps API for location-based issue tracking.', link: 'https://github.com/andyka-salom/ourcity' },
        proj3: { imgSrc: 'images/nitrak3.png', title: 'Nitrak Website – Tender Monitoring System', date: 'Jul 2024 – Nov 2024', technologies: 'Laravel, jQuery, MySQL', description: 'An internal web application developed to streamline monitoring and collaboration among buyers, vendors, and clients within a state-owned enterprise (BUMN). Key features include an interactive dashboard for project tracking, vendor management (profiles, contracts, performance), automated email notifications for deadlines and updates, centralized document handling, and role-based multi-level access control. The system significantly improves transparency, efficiency, and oversight throughout the vendor collaboration process.', link: null },
        proj4: { imgSrc: 'images/agt1.png', title: 'AGT Financial Submission Dashboard', date: 'Mar 2024 – May 2024', technologies: 'PHP, JavaScript, MySQL, Laravel', description: 'A web-based financial submission and reporting platform built for Airlangga Global Travel (AGT). This system facilitates the secure submission and approval of travel-related financial documents through a multi-level authorization workflow. It includes comprehensive reporting tools that provide management with detailed insights into travel expenses and budget allocations, enhancing financial oversight and decision-making.', link: null },
        proj5: { imgSrc: 'images/11.png', title: 'Personality & Eye Disease Diagnosis System', date: 'April 2025', technologies: 'Python (Flask), PostgreSQL, Certainty Factor', description: 'This system was developed as part of an Artificial Intelligence course project. It diagnoses personality traits and eye diseases using the Certainty Factor method to assist in early detection and decision support.', link: 'https://github.com/andyka-salom/web-sistem-pakar' },
        proj6: { imgSrc: 'images/dsi (2).png', title: 'Unair Merdeka Mobile App', date: 'September 2023', technologies: 'Flutter (Dart)', description: 'A mobile application developed for Universitas Airlangga, aimed at supporting MBKM (Merdeka Belajar Kampus Merdeka) and student exchange programs. This app provides students with access to information, program registration, and status tracking directly from their mobile devices. Built using Flutter for a responsive and cross-platform experience.', link: null },
        proj7: { imgSrc: 'images/14.png', title: 'Talent Network – Mobile Application', date: 'January 2024', technologies: 'Flutter (Dart), Golang (REST API), PostgreSQL', description: 'A mobile application developed as part of a Mobile Application Programming course. This project extends the existing Talent Network website by providing a mobile-friendly interface for users, including features such as profile management, job exploration, and real-time notifications.', link: 'https://github.com/andyka-salom/talentnetwork-mobileapp' },
        proj8: { imgSrc: 'images/taskly.png', title: 'Taskly – Personal Task Manager', date: 'Mar 2025', technologies: 'Flutter, Firebase, Cloud Firestore', description: 'Taskly is a personal task management mobile application designed to help users efficiently record and manage their daily tasks. Built using Flutter for a smooth and responsive UI, and Firebase Firestore for real-time data sync across devices. It features Firebase Authentication for secure and personalized user access. The app allows users to add, update, and delete tasks instantly, with a strong focus on intuitive UX and performance.', link: 'https://github.com/andyka-salom/taskly' },
        proj9: { imgSrc: 'images/simedi.png', title: 'Simedi – Plantation Inventory Management System', date: 'June 2024 - Dec 2024', technologies: 'Laravel, Livewire, jQuery, DataTables', description: 'Simedi is an internal web-based inventory system built for the regional company Perumda Kahyangan in Jember Regency. It is designed to manage and monitor plantation assets efficiently. Key features include real-time stock tracking, asset registration, maintenance history, and dynamic reporting powered by DataTables. With Livewire integration, the platform offers seamless interactivity without full page reloads. Users can view current stock levels, update inventory data, and generate detailed reports directly from the website.', link: null },
        proj10: { imgSrc: 'images/partitur.png', title: 'MyPartitur – Digital Score Storage', date: 'May 2025', technologies: 'Flutter, Firebase', description: 'A mobile application built with Flutter and Firebase for storing and managing digital song scores (partitur angka). Allows users to easily save, access, and organize their music scores on the go, leveraging Firebase for data storage and synchronization.', link: null }, // Add GitHub link if available
        proj11: {
            imgSrc: 'images/cleancycle.png', // Thumbnail for the grid
            videoSrc: 'images/cleancycle.mp4', // <<<<<<<------ CHANGE THIS PATH IF NEEDED
            title: 'Clean Cycle – Waste Reporting App',
            date: 'June 2025', // Example date, update if needed
            technologies: 'UI/UX Design, Flutter, Mobile App Design',
            description: 'UI/UX design and prototype for a mobile application enabling users to report waste issues and track collection schedules. Includes a demonstration video of the user flow. Designed using Figma and intended for implementation with Flutter.',
            link: null // Add Behance/Figma link if available
        },
    };
    const certificationData = {
        cert1: { imgSrc: 'images/sertif.jpg', title: 'IT Perbankan', issuer: 'Digital Talent Scholarship (Kominfo) & Bank Jatim', skills: 'Team Building, Teamwork, Web Design, MySQL, PHP, Web Dev, SDLC, Laravel, Analytical Skills, Kotlin, Android Dev, Research, Software Dev, UED, Cloud Computing', description: 'Successfully completed intensive training on IT systems in the banking industry. Covered web and mobile app development (Laravel, Kotlin), database management (MySQL), SDLC principles, and delivering secure, user-focused financial solutions.', link: null },
        cert2: { imgSrc: 'images/python.jpg', title: 'Backend-Python(FLASK)', issuer: 'Myskill', skills: 'Python, Flask, PostgreSQL, RESTful APIs', description: 'Gained practical experience building backend systems using Python and Flask, integrating PostgreSQL for data management. Learned to create RESTful APIs and apply best practices in backend development.', link: null },
        cert3: { imgSrc: 'images/golang.png', title: 'Backend-Golang(Gin)', issuer: 'Myskill', skills: 'Golang, Gin Framework, PostgreSQL, RESTful APIs, Clean Architecture', description: 'Completed backend development training using Golang and the Gin framework. Focused on building high-performance APIs, integrating PostgreSQL databases, and applying clean architecture for scalable web services.', link: null },
        cert4: {
            imgSrc: 'images/dicoding.png', // Thumbnail for grid
            title: 'Back-End Developer with Node.js & AWS',
            issuer: 'Dicoding Academy',
            skills: 'Node.js, RESTful APIs, Amazon EC2, Postman, Hapi.js, HTTP Protocol, Software Deployment',
            description: 'This course is designed for individuals aiming to become Back-End Developers with international-standard competencies set by AWS. Students learn to build and deploy simple RESTful APIs, understand client-server communication via HTTP, and operate web services on Amazon EC2. The curriculum includes fundamentals of Node.js, creating RESTful APIs using both native Node and Hapi framework, API testing with Postman, and ends with a final project implementing CRUD operations in a Bookshelf API. Total time investment: 45 hours.',
            link: 'https://www.dicoding.com/certificates/JMZV96OMNPN9' // Validation link
        },
        cert5: {
            imgSrc: 'images/aws-cloud.png', // Thumbnail for grid
            title: 'AWS Cloud Practitioner Essentials',
            issuer: 'Dicoding Academy',
            skills: 'Cloud Computing, AWS, EC2, S3, IAM, CloudFront, CloudWatch, AWS Pricing',
            description: 'This course is intended for beginners who want to start a career in cloud computing by learning international AWS competencies. By the end of the course, students gain a foundational understanding of AWS services, global infrastructure, pricing models, networking, security, storage, databases, and migration strategies. The curriculum prepares learners for the AWS Certified Cloud Practitioner certification.',
            link: 'https://www.dicoding.com/certificates/MEPJVV4OQP3V' // Validation link
        }
    };
    // ********************************************

    // --- Event Listener for Project/Certification Items ---
    allItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const itemType = item.getAttribute('data-item-type');
            let data;

            // Reset details and link display
            detail1Container.style.display = 'none';
            detail2Container.style.display = 'none';
            modalLink.style.display = 'none';

            // Hide all media elements initially & clear sources
            modalImg.style.display = 'none';
            modalIframe.style.display = 'none';
            modalVideo.style.display = 'none'; // Hide video too
            modalImg.src = '';
            modalIframe.src = 'about:blank';
            modalVideo.pause(); // Ensure video is paused before setting new source
            modalVideo.src = ''; // Clear video source

            // --- Populate Modal Based on Item Type ---
            if (itemType === 'project' && projectData[itemId]) {
                data = projectData[itemId];

                // --- UPDATED: Check for videoSrc ---
                if (data.videoSrc) {
                    modalVideo.src = data.videoSrc;   // Set video source
                    modalVideo.style.display = 'block'; // Show video
                    modalVideo.load();                // Preload video data
                    // Optional: Autoplay (remember 'muted' attribute in HTML)
                    // modalVideo.play().catch(e => console.error("Autoplay failed:", e));
                } else {
                    // Original logic: Show image if no video
                    modalImg.src = data.imgSrc;
                    modalImg.style.display = 'block';
                    modalImg.alt = data.title + " Screenshot";
                }
                // --- END UPDATE ---

                // Populate common project details
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                // Detail 1: Date
                detail1Icon.className = 'fas fa-calendar-alt';
                detail1Label.textContent = 'Date';
                detail1Value.textContent = data.date || 'N/A';
                detail1Container.style.display = 'flex';
                // Detail 2: Technologies
                detail2Icon.className = 'fas fa-tags';
                detail2Label.textContent = 'Technologies';
                detail2Value.textContent = data.technologies || 'N/A';
                detail2Container.style.display = 'flex';
                // Link
                if (data.link) {
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-external-link-alt';
                    modalLinkText.textContent = 'Visit Project'; // Or 'View Design' etc.
                    modalLink.style.display = 'inline-flex';
                }

            } else if (itemType === 'certification' && certificationData[itemId]) {
                data = certificationData[itemId];
                const isPdf = data.imgSrc && data.imgSrc.toLowerCase().endsWith('.pdf');

                // --- Certification Media Handling (Image vs PDF) ---
                 if (isPdf) {
                    // NOTE: This check assumes the PDF itself IS the 'imgSrc'
                    // If you have separate thumbnails and PDF files, adjust logic
                    modalIframe.src = data.imgSrc; // Set iframe source to PDF path
                    modalIframe.style.display = 'block'; // Show iframe
                    modalImg.alt = ""; // Clear alt text for img
                } else {
                    modalImg.src = data.imgSrc; // Set image source
                    modalImg.style.display = 'block'; // Show image
                    modalImg.alt = data.title + " Certificate"; // Set alt text for img
                }
                // --- End Certification Media Handling ---

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
                // Link (Verification)
                if (data.link && data.link !== '#') {
                    modalLink.href = data.link;
                    modalLinkIcon.className = 'fas fa-certificate';
                    modalLinkText.textContent = 'Verify Credential';
                    modalLink.style.display = 'inline-flex';
                }
            } else {
                // Handle case where data might be missing
                console.error("No data found for item ID:", itemId, "Type:", itemType);
                modalTitle.textContent = "Error";
                modalDescription.textContent = "Details could not be loaded.";
                // Ensure all media are hidden
                modalImg.style.display = 'none';
                modalIframe.style.display = 'none';
                modalVideo.style.display = 'none';
                return; // Don't try to open modal
            }

            // --- Open Modal if data was found ---
            if (data && modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
            }
        });
    });

    // --- Close Modal Function ---
    function closeModal() {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore body scroll

            // --- UPDATED: Stop and reset video too ---
            modalImg.src = '';
            modalIframe.src = 'about:blank'; // Important for iframe cleanup
            if (modalVideo) { // Check if element exists
                modalVideo.pause(); // Stop playback
                modalVideo.src = '';  // Clear source to free up resources
                modalVideo.style.display = 'none'; // Hide it
            }
            // --- END UPDATE ---

            modalImg.style.display = 'none';
            modalIframe.style.display = 'none';
            modalImg.alt = ""; // Clear alt text
        }
    }

    // Add listeners to close modal
    if (closeModalBtn) { closeModalBtn.addEventListener('click', closeModal); }
    if (modal) { modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); }); } // Close on outside click
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); }); // Close with Escape key

    // --- Auto Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- Contact Form Handling (Using Fetch with PHP Backend) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && formStatus && submitButton) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default page reload

            const formData = new FormData(contactForm);
            const formAction = contactForm.action; // Gets 'send_email.php'

            // Disable button and show sending status
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>'; // Use innerHTML for icon
            formStatus.textContent = ""; // Clear previous status message
            formStatus.style.color = "inherit"; // Reset color

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                     'Accept': 'application/json' // Expect JSON response from PHP
                }
            })
            .then(response => {
                 if (!response.ok) {
                     // Try to parse JSON error message from PHP, otherwise use status text
                     return response.json().then(errData => {
                         throw new Error(errData.message || `Server error: ${response.status}`);
                     }).catch(() => {
                         throw new Error(`Server error: ${response.status} ${response.statusText}`);
                     });
                 }
                return response.json(); // Parse JSON response body
            })
            .then(data => {
                 // Handle the JSON response from send_email.php
                if (data.success) {
                    formStatus.textContent = data.message; // Display success message from PHP
                    formStatus.style.color = "green";
                    contactForm.reset(); // Clear the form inputs
                } else {
                    // Display error message from PHP (e.g., validation, mail failure)
                    formStatus.textContent = data.message || "An unknown error occurred.";
                    formStatus.style.color = "red";
                }
            })
            .catch(error => {
                 // Handle network errors or errors thrown during fetch/parsing
                console.error("Form submission error:", error);
                formStatus.textContent = error.message || "A network error occurred. Please try again.";
                formStatus.style.color = "red";
            })
            .finally(() => {
                // Re-enable button and restore original text/icon regardless of success/failure
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            });
        });
    } else {
        console.error("Could not find contact form elements (form, status paragraph, or submit button). Form submission might not work.");
    }
    // --- End of Contact Form Handling ---

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing the element after it has been animated once
                // observer.unobserve(entry.target);
            }
            // Optional: Remove 'in-view' when scrolling up if you want re-animation
            // else {
            //     entry.target.classList.remove('in-view');
            // }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Active Nav Link Highlighting on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('main section[id]');
    const scrollSpyNavLinks = document.querySelectorAll('.main-nav a.nav-link');

    function changeActiveLink() {
        let index = sections.length;
        const offset = (header ? header.offsetHeight : 0) + 21; // Adjust offset as needed

        while (--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}

        scrollSpyNavLinks.forEach((link) => link.classList.remove('active'));

        const currentSectionId = (index >= 0) ? sections[index].id : null;
        if (currentSectionId) {
            const activeLink = document.querySelector(`.main-nav a.nav-link[href="#${currentSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else if (window.scrollY < sections[0].offsetTop - offset) { // Activate home if above first section
             const firstLink = document.querySelector(`.main-nav a.nav-link[href="#${sections[0].id}"]`);
             if(firstLink) firstLink.classList.add('active');
        }
    }

    if (sections.length > 0 && scrollSpyNavLinks.length > 0) {
        changeActiveLink(); // Initial call
        window.addEventListener('scroll', changeActiveLink);
    }

}); // End of DOMContentLoaded