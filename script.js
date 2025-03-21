import { config } from './config.js';

class WebsiteController {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.progressBar = document.querySelector('.progress');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navList = document.querySelector('.nav-list');
        this.colorItems = document.querySelectorAll('.color-item');
        this.featureCards = document.querySelectorAll('.feature-card, .product-card, .comparison-card, .testimonial-card');
        
        this.currentSection = 0;
        this.init();
    }
    
    init() {
        // Setup navigation
        this.navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToSection(targetId);
                this.currentSection = index;
                this.updateProgress();
            });
        });
        
        // Setup scroll spy
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });
        
        // Setup mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.navList.classList.toggle('active');
            });
        }
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
        
        // Set up event listeners
        document.getElementById('prevSlide')?.addEventListener('click', () => this.navigate(-1));
        document.getElementById('nextSlide')?.addEventListener('click', () => this.navigate(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.navigate(1);
            if (e.key === 'ArrowLeft') this.navigate(-1);
        });
        
        // Setup color items hover effect
        this.colorItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.querySelector('.color-label')?.classList.add('visible');
            });
            
            item.addEventListener('mouseleave', () => {
                item.querySelector('.color-label')?.classList.remove('visible');
            });
        });
        
        // Show first section
        this.updateProgress();
        
        // Apply config settings
        this.applyConfigSettings();
        
        // Initialize any charts or visualizations
        this.initializeCharts();
    }
    
    applyConfigSettings() {
        // Apply typography settings
        document.documentElement.style.setProperty('--heading-large', `${config.typography.headingLarge / 16}rem`);
        document.documentElement.style.setProperty('--heading-medium', `${config.typography.headingMedium / 16}rem`);
        document.documentElement.style.setProperty('--text-regular', `${config.typography.textRegular / 16}rem`);
        document.documentElement.style.setProperty('--text-small', `${config.typography.textSmall / 16}rem`);
        
        // Apply color settings
        document.documentElement.style.setProperty('--primary-teal', config.colors.primary);
        document.documentElement.style.setProperty('--secondary-green', config.colors.secondary);
        document.documentElement.style.setProperty('--neutral-dark', config.colors.neutral);
        document.documentElement.style.setProperty('--neutral-light', config.colors.background);
    }
    
    navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition && 
                section.offsetTop + section.offsetHeight > scrollPosition) {
                // Remove all active classes
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const correspondingLink = document.querySelector(
                    `.nav-link[href="#${section.id}"]`
                );
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    this.currentSection = index;
                    this.updateProgress();
                }
            }
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add staggered animation to children
                        if (entry.target.classList.contains('grid-thirds')) {
                            const children = entry.target.children;
                            Array.from(children).forEach((child, index) => {
                                setTimeout(() => {
                                    child.classList.add('animate-in');
                                }, index * 150);
                            });
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
        
        this.featureCards.forEach(card => {
            observer.observe(card);
        });
        
        document.querySelectorAll('.grid-thirds').forEach(grid => {
            observer.observe(grid);
        });
    }
    
    navigate(direction) {
        const newSection = this.currentSection + direction;
        if (newSection >= 0 && newSection < this.sections.length) {
            this.currentSection = newSection;
            this.navigateToSection(this.sections[newSection].id);
        }
    }
    
    updateProgress() {
        // Calculate progress based on current section
        const progress = ((this.currentSection + 1) / this.sections.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    initializeCharts() {
        // This is where you would initialize any interactive charts
        // For now, we're using SVG for static chart representations
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WebsiteController();
    
    // Add animation classes
    document.querySelectorAll('.feature-card, .product-card, .chart-container, .comparison-card, .testimonial-card').forEach(card => {
        card.classList.add('fade-in');
    });
});