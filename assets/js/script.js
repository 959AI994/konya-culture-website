// DOM Elements
const musicBtn = document.getElementById('musicBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const scrollIndicator = document.querySelector('.scroll-indicator');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close');

// Music Control
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
            showNotification('Now playing: Taka - Die With A Smile (Live)');
        }).catch(error => {
            console.error('Error playing music:', error);
            showNotification('Cannot play music, please check audio file');
        });
    }
});

// Smooth Scrolling
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

// Scroll Indicator
scrollIndicator.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Timeline Interactions
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        const story = item.getAttribute('data-story');
        showStoryModal(story);
    });
});

// Gallery Modal Functionality
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-image');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        modalImg.src = imgSrc;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Story Modal
function showStoryModal(storyType) {
    const stories = {
        'first-meeting': {
            title: 'First Words on HelloTalk',
            content: 'In the digital realm of language learning, two hearts found each other. What began as simple corrections and vocabulary exchanges became the foundation of something beautiful.'
        },
        'growing-understanding': {
            title: 'Growing Understanding',
            content: 'Each message revealed more than grammar rules. Through patient teaching and eager learning, we discovered the rhythm of each other\'s thoughts.'
        },
        'cultural-exchange': {
            title: 'Cultural Exchange',
            content: 'You painted pictures of Konya with your words - the call to prayer at dawn, the scent of Turkish tea, the ancient stones that hold centuries of stories. I shared tales of Chinese traditions, the Great Wall\'s majesty, and the poetry of our ancestors.'
        },
        'dream-of-meeting': {
            title: 'A Dream of Meeting',
            content: 'Though we have never walked the same street or breathed the same air, I carry the dream of meeting you in the city you love. Until that day, these words bridge the distance between our hearts.'
        }
    };
    
    const story = stories[storyType];
    if (story) {
        showNotification(`${story.title}: ${story.content}`);
    }
}

// Notification System
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.5s ease-out;
        line-height: 1.5;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.about-text, .about-visual, .timeline-item, .declaration-content, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 58, 95, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 58, 95, 0.95)';
    }
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    handleNavbarScroll();
});

// Heart Cursor Effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.05) { // 5% chance
        createHeartCursor(e.clientX, e.clientY);
    }
});

function createHeartCursor(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'heart-cursor';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add some interactive hover effects
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Poem line animation trigger
function animatePoemLines() {
    const poemLines = document.querySelectorAll('.poem-line');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    poemLines.forEach(line => {
        observer.observe(line);
    });
}

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.gallery-overlay');
        overlay.style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.gallery-overlay');
        overlay.style.transform = 'translateY(100%)';
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        handleScrollAnimations();
    }, 500);
    
    // Initialize poem animation
    animatePoemLines();
    
    // Add welcome message
    setTimeout(() => {
        showNotification('Welcome to this love letter from Alex to sevval. Click on timeline items and gallery images to explore more.');
    }, 2000);
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .gallery-item .gallery-overlay {
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .gallery-overlay {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.cssText = `
        position: fixed;
        color: var(--accent-color);
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 4s ease-out forwards;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -50px;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Add floating heart animation
const floatingHeartStyle = document.createElement('style');
floatingHeartStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingHeartStyle);

// Create floating hearts periodically
setInterval(createFloatingHeart, 8000);

