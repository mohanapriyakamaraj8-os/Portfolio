// Mobile Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Navbar & remove mobile menu on scroll
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Reveal Animations using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Typing Effect for "Full Stack Developer"
const textElement = document.querySelector('.multiple-text');
const textArray = ["Full Stack Developer", "Java Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 150;

function typeEffect() {
    if(!textElement) return;

    const currentText = textArray[textIndex];
    
    if(isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 100;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 150;
    }

    if(!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeDelay = 1500; // Pause at end
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeDelay = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeDelay);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
    if(textElement) {
        setTimeout(typeEffect, 1000);
    }
});
