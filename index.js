// ============================================
// PORTFOLIO JAVASCRIPT - ANIMAÇÕES FLUIDAS
// ============================================

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScroll();
    initTypingEffect();
    initParallax();
    initProjectCards();
    initPreloader();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    });
}

// ============================================
// HEADER COM SCROLL
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adiciona background blur ao rolar
        if (currentScroll > 50) {
            header.style.background = 'rgba(10, 14, 39, 0.8)';
            header.style.backdropFilter = 'blur(40px)';
            header.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.4)';
            header.style.backdropFilter = 'blur(30px)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
        }

        // Esconde header ao rolar para baixo, mostra ao rolar para cima
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL (FADE IN)
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Elementos para animar
    const elements = document.querySelectorAll(`
        .sobre-content,
        .timeline-item,
        .projeto-card,
        .sobre-destaque .destaque-item
    `);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });
}

// ============================================
// EFEITO DE DIGITAÇÃO NO TÍTULO
// ============================================
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-content h3');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let i = 0;
    const typingSpeed = 100;

    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            // Adiciona cursor piscante
            subtitle.innerHTML += '<span class="cursor">|</span>';
            addCursorBlink();
        }
    }

    // Inicia após delay
    setTimeout(type, 1000);
}

function addCursorBlink() {
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
            margin-left: 5px;
            color: var(--cor-primaria);
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// EFEITO PARALLAX
// ============================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax na imagem do hero
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Parallax nos orbes
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.setProperty('--scroll', scrolled * 0.5 + 'px');
        }
    });
}

// ============================================
// ANIMAÇÃO NOS CARDS DE PROJETO
// ============================================
function initProjectCards() {
    const cards = document.querySelectorAll('.projeto-card');
    
    cards.forEach((card, index) => {
        // Hover 3D effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });

        // Animação de entrada escalonada
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 100 * index);
    });
}

// ============================================
// CONTADOR ANIMADO NOS NÚMEROS DE DESTAQUE
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observa quando os números entram na tela
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const numero = entry.target.querySelector('.numero');
            const target = parseInt(numero.textContent);
            animateCounter(numero, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.destaque-item').forEach(item => {
    counterObserver.observe(item);
});

// ============================================
// PARTÍCULAS FLUTUANTES NO BACKGROUND
// ============================================
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 30 + 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(0, 217, 255, 0.8), transparent);
            border-radius: 50%;
            left: ${x}%;
            bottom: -10px;
            animation: float ${duration}s linear ${delay}s infinite;
            filter: blur(1px);
            box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        `;
        
        particlesContainer.appendChild(particle);
    }

    // Adiciona animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ============================================
// CURSOR CUSTOMIZADO (OPCIONAL)
// ============================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--cor-primaria);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Aumenta o cursor ao passar sobre links e botões
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.backgroundColor = 'rgba(0, 217, 255, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// Descomente para ativar cursor customizado
// initCustomCursor();

// ============================================
// ADICIONA EFEITOS DE SOM (OPCIONAL)
// ============================================
function addSoundEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Feedback tátil visual
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
}

addSoundEffects();

// ============================================
// PERFORMANCE: LAZY LOADING DE IMAGENS
// ============================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🚀 Bem-vindo ao Portfolio de Greice Costa!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%c✨ Desenvolvido com tecnologias modernas', 'color: #9d4edd; font-size: 14px;');

// ============================================
// FIM DO ARQUIVO
// ============================================