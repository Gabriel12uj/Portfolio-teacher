// ==========================================
// ANIMAÇÃO DE CARREGAMENTO DA PÁGINA
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==========================================
// EFEITO PARALLAX NAS PARTÍCULAS
// ==========================================
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// SCROLL SUAVE PARA ÂNCORAS
// ==========================================
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

// ==========================================
// ANIMAÇÃO DE CONTAGEM NOS NÚMEROS
// ==========================================
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        
        // Apenas anima números que contêm "+"
        if (text.includes('+')) {
            const target = parseInt(text);
            let current = 0;
            const increment = target / 50;
            const duration = 2000; // 2 segundos
            const stepTime = duration / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, stepTime);
        }
    });
};

// Iniciar animação de números após um delay
setTimeout(animateNumbers, 1000);

// ==========================================
// HOVER SUAVE NOS CARDS DE ESTATÍSTICAS
// ==========================================
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// ==========================================
// OCULTAR SCROLL INDICATOR AO ROLAR
// ==========================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// EFEITO RIPPLE NOS BOTÕES
// ==========================================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Adicionar keyframes para o ripple via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// INTERSECTION OBSERVER (ANIMAÇÕES AO SCROLL)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos que devem animar ao entrar na viewport
document.querySelectorAll('.stat-card, .badge, .hero-title').forEach(el => {
    observer.observe(el);
});

// ==========================================
// PAUSAR ANIMAÇÕES QUANDO ABA NÃO ESTÁ ATIVA
// ==========================================
document.addEventListener('visibilitychange', () => {
    const animatedElements = document.querySelectorAll('.animated-bg, .particle, .deco-circle');
    
    if (document.hidden) {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// ==========================================
// EFEITO DE TYPING NO TÍTULO (OPCIONAL)
// ==========================================
const typewriterEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Descomente a linha abaixo para ativar o efeito de digitação
// setTimeout(() => {
//     const titleElement = document.querySelector('.gradient-text');
//     const originalText = titleElement.textContent;
//     typewriterEffect(titleElement, originalText, 80);
// }, 500);

// ==========================================
// SMOOTH REVEAL AO CARREGAR ELEMENTOS
// ==========================================
const revealElements = () => {
    const elements = document.querySelectorAll('.stat-card, .badge, .cta-container');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

// ==========================================
// ANIMAÇÃO DE ENTRADA DOS SOCIAL LINKS
// ==========================================
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
    link.style.animation = `fadeIn 0.5s ease ${1.7 + (index * 0.1)}s backwards`;
});

// ==========================================
// CURSOR CUSTOMIZADO (OPCIONAL)
// ==========================================
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--cor-primaria);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Descomente a linha abaixo para ativar o cursor customizado
// createCustomCursor();

// ==========================================
// LOG DE INICIALIZAÇÃO
// ==========================================
console.log('✨ Landing Page carregada com sucesso!');
console.log('🎨 Design por Greice Costa');
console.log('🚀 Todas as animações ativadas');