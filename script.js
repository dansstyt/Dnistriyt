// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.random() * 155 + 100}, ${Math.random() * 155 + 100}, 255, 0.8)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
            let dx = particlesArray[i].x - particlesArray[j].x;
            let dy = particlesArray[i].y - particlesArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(102, 126, 234, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);
});

// Navigation Function
function navigateTo(sectionName) {
    const sections = document.querySelectorAll('section');
    
    // Hide all sections first
    sections.forEach(section => {
        section.classList.remove('active-section');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.style.display = 'flex';
        // Small delay to trigger animation
        setTimeout(() => {
            targetSection.classList.add('active-section');
        }, 10);
    }
}

// 3D Tilt Effect
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', function() {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    const aurora = document.querySelectorAll('.aurora-layer');
    aurora.forEach((layer, index) => {
        const speed = (index + 1) * 0.03;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    const blobs = document.querySelectorAll('.morph-blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mouse Parallax for Background
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const aurora = document.querySelectorAll('.aurora-layer');
    aurora.forEach((layer, index) => {
        const speed = (index + 1) * 20;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        layer.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Animate on Scroll Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// Skill Orb Interaction
const skillOrbs = document.querySelectorAll('.skill-orb');

skillOrbs.forEach(orb => {
    orb.addEventListener('mouseenter', function() {
        const skill = this.getAttribute('data-skill');
        this.style.background = `linear-gradient(135deg, rgba(102, 126, 234, 0.6), rgba(240, 147, 251, 0.6))`;
    });
    
    orb.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))';
    });
});

// Island Card Enhanced Hover
const islandCards = document.querySelectorAll('.island-card');

islandCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});

// Connect Orb Ripple on Click
const connectOrbs = document.querySelectorAll('.connect-orb');

connectOrbs.forEach(orb => {
    orb.addEventListener('click', function() {
        const ripple = this.querySelector('.orb-ripple');
        ripple.style.animation = 'none';
        setTimeout(() => {
            ripple.style.animation = 'ripple 1s ease-out';
        }, 10);
    });
});

// Smooth Transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance Optimization
let ticking = false;

function requestTick(callback) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Cursor Trail Effect (Optional)
let cursorDot = null;

document.addEventListener('DOMContentLoaded', function() {
    // Add custom cursor if desired
    // cursorDot = document.createElement('div');
    // cursorDot.className = 'cursor-dot';
    // document.body.appendChild(cursorDot);
});

// Prevent context menu on long press (mobile)
window.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Console Easter Egg
console.log('%c🌌 AURORA PORTFOLIO 🌌', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 10px 20px; border-radius: 10px;');
console.log('%cBuilt with creativity and passion ✨', 'font-size: 14px; color: #667eea;');