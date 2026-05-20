// ========== UPDATE TIME DISPLAY ==========
function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString('en-US', options);
    
    timeElement.textContent = time;
    dateElement.textContent = date;
}

updateTime();
setInterval(updateTime, 1000);

// ========== SMOOTH SCROLL ACTIVE LINK ==========
const links = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #2d6a4f, #52b788)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ========== PARALLAX SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    
    // Subtle parallax for hero section
    if (window.pageYOffset < window.innerHeight) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
        }
    }
});

// ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Observe stats
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = 'all 0.6s ease';
    observer.observe(stat);
});

// ========== CONTACT BUTTON SCROLL ==========
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== ANIMATE COUNTER NUMBERS ==========
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Start counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text
            const match = text.match(/(\d+)/);
            if (match) {
                const number = parseInt(match[1]);
                animateCounter(statNumber, number, 1500);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// ========== PANDA BLINK ANIMATION ==========
function randomBlink() {
    const blinkTime = Math.random() * 4000 + 2000;
    setTimeout(() => {
        const eyes = document.querySelectorAll('.panda-eye::after');
        eyes.forEach(eye => {
            eye.style.animation = 'none';
            setTimeout(() => {
                eye.style.animation = 'blink 0.3s ease-in-out';
            }, 10);
        });
        randomBlink();
    }, blinkTime);
}

randomBlink();

// ========== RESPONSIVE NAV MENU ==========
function addMobileMenu() {
    const nav = document.querySelector('.nav-container');
    if (window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'rgba(45, 106, 79, 0.95)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '0 0 0 10px';
            navLinks.style.gap = '1rem';
            navLinks.style.width = '200px';
        }
    }
}

window.addEventListener('resize', addMobileMenu);

// ========== MOUSE CURSOR EFFECT ==========
document.addEventListener('mousemove', (e) => {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const letters = title.querySelectorAll('.title-letter');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
        
        const distance = Math.hypot(mouseX - letterX, mouseY - letterY);
        
        if (distance < 100) {
            const angle = Math.atan2(mouseY - letterY, mouseX - letterX);
            const offsetX = Math.cos(angle) * (100 - distance) * 0.3;
            const offsetY = Math.sin(angle) * (100 - distance) * 0.3;
            
            letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
            letter.style.transform = 'translate(0, 0)';
        }
    });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
document.body.style.opacity = '1';

// ========== CONSOLE MESSAGE ==========
console.log('%cWelcome to BamFu! 🐼', 'font-size: 20px; color: #2d6a4f; font-weight: bold;');
console.log('%cSustainable Bamboo Solutions with Panda Heart', 'font-size: 14px; color: #52b788;');
console.log('%cPress H to go Home or C to Contact us! 📞', 'font-size: 12px; color: #666;');
