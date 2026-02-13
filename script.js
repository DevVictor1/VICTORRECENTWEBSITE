const skillSection = document.querySelector("#skill");
const progressBars = document.querySelectorAll(".progress");

let started = false;

function animateSkill(bar, delay) {
    setTimeout(() => {
        const target = parseInt(bar.getAttribute("data-progress"));
        const percentText = bar.parentElement.previousElementSibling.querySelector(".percent");

        let count = 0;

        // Animate bar width
        bar.style.width = target + "%";

        // Count animation
        const updateCount = () => {
            if (count < target) {
                count++;
                percentText.textContent = count + "%";
                requestAnimationFrame(updateCount);
            } else {
                percentText.textContent = target + "%";
            }
        };

        updateCount();
    }, delay);
}

window.addEventListener("scroll", () => {
    const sectionTop = skillSection.offsetTop - window.innerHeight + 100;

    if (window.scrollY > sectionTop && !started) {

        progressBars.forEach((bar, index) => {
            animateSkill(bar, index * 400); // 400ms delay between each
        });

        started = true;
    }
});


const projectCards = document.querySelectorAll(".project-card");

function revealProjects() {
    projectCards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealProjects);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {

            setTimeout(() => {
                entry.target.classList.add("active");
            }, index * 150); // stagger effect

        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));



