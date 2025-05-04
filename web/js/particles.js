/**
 * Particle animation system
 */

// Initialize canvas
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(startInside = true) {
        this.radius = 2;
        this.color = `rgba(0, 0, 0, ${Math.random() * 0.5 + 0.1})`;
        this.speed = Math.random() * 0.5 + 0.1;

        if (startInside) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        } else {
            this.spawnFromEdge();
        }

        this.angle = Math.random() * Math.PI * 2;
    }

    spawnFromEdge() {
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0: // Top
                this.x = Math.random() * canvas.width;
                this.y = -this.radius;
                break;
            case 1: // Right
                this.x = canvas.width + this.radius;
                this.y = Math.random() * canvas.height;
                break;
            case 2: // Bottom
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + this.radius;
                break;
            case 3: // Left
                this.x = -this.radius;
                this.y = Math.random() * canvas.height;
                break;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.draw();
    }

    isOutOfBounds() {
        return (
            this.x < -this.radius ||
            this.x > canvas.width + this.radius ||
            this.y < -this.radius ||
            this.y > canvas.height + this.radius
        );
    }

    connect(particle) {
        const distance = Math.sqrt(
            (this.x - particle.x) ** 2 + (this.y - particle.y) ** 2
        );

        if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
        }
    }
}

// Particle system settings
const PARTICLE_COUNT = 30;
const particles = [];

// Create initial particles
function createInitialParticles() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(true));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();

        if (p.isOutOfBounds()) {
            particles.splice(i, 1);
            particles.push(new Particle(false));
        }
    }

    // Connect particles with lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            particles[i].connect(particles[j]);
        }
    }

    requestAnimationFrame(animate);
}

// Initialize and start animation
createInitialParticles();
animate();