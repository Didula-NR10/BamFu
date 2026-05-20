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

// ========== SMOOTH SCROLL FOR CONTACT BUTTON ==========
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        alert('Contact form coming soon! Thank you for your interest in BamFu 🐼');
    });
}

// ========== MOUSE MOVE EFFECT ON TEXT ==========
const textLetters = document.querySelectorAll('.text-letter');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    textLetters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
        
        const distance = Math.hypot(mouseX - letterX, mouseY - letterY);
        
        if (distance < 120) {
            const angle = Math.atan2(mouseY - letterY, mouseX - letterX);
            const offsetX = Math.cos(angle) * (120 - distance) * 0.4;
            const offsetY = Math.sin(angle) * (120 - distance) * 0.4;
            
            letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
            letter.style.transform = 'translate(0, 0)';
        }
    });
});

// ========== CONSOLE MESSAGE ==========
console.log('%cWelcome to BamFu! 🐼', 'font-size: 20px; color: #2d6a4f; font-weight: bold;');
console.log('%cSustainable Bamboo Solutions', 'font-size: 14px; color: #52b788;');
