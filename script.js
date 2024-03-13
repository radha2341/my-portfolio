document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', smoothScroll);
    document.body.addEventListener('touchstart', smoothScroll);
    document.body.addEventListener('touchend', smoothScroll);
    document.body.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            smoothScroll(event);
        }
    });

    function smoothScroll(event) {
        if (event.target.matches('a[href^="#"]')) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section');

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function checkSectionScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop - 100 && scrollPosition < section.offsetTop + section.offsetHeight - 100) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href').slice(1) === id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', debounce(checkSectionScroll));

    window.addEventListener('resize', function() {
        checkSectionScroll();
    });
});
