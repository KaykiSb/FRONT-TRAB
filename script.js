document.addEventListener("DOMContentLoaded", () => {
    // Marcar link ativo no menu baseado na página atual
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".navbar a").forEach(link => {
        if (link.getAttribute("href") === currentPath || (currentPath === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        }
    });

    // Intersection Observer para animações fluídas
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll(".hidden").forEach(el => {
        observer.observe(el);
    });

    // Construção Dinâmica do Sistema de Partículas em Segundo Plano
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.insertBefore(canvas, document.body.firstChild);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1'; 
    canvas.style.pointerEvents = 'none';

    let particles = [];
    const particleCount = 75;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
});

// Comportamento Adaptativo do Botão Voltar ao Topo
window.addEventListener("scroll", () => {
    const topBtn = document.querySelector(".top-btn");
    if(!topBtn) return;
    if(window.scrollY > 400){
        topBtn.style.opacity = "1";
        topBtn.style.pointerEvents = "auto";
    } else {
        topBtn.style.opacity = "0";
        topBtn.style.pointerEvents = "none";
    }
});