document.addEventListener("DOMContentLoaded", () => {

    initSkills();
    initProjects();
    initReveal();
    initCounters(); // for about page stats

});

function initSkills() {

    const skillSection = document.querySelector("#skill");
    const progressBars = document.querySelectorAll(".progress");

    if (!skillSection || progressBars.length === 0) return;

    let started = false;

    function animateSkill(bar, delay) {
        setTimeout(() => {
            const target = parseInt(bar.getAttribute("data-progress"));
            const percentText = bar.parentElement
                .previousElementSibling
                .querySelector(".percent");

            let count = 0;

            bar.style.width = target + "%";

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

        const sectionTop =
            skillSection.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight - 100 && !started) {

            progressBars.forEach((bar, index) => {
                animateSkill(bar, index * 400);
            });

            started = true;
        }
    });

}


function initProjects() {

    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length === 0) return;

    function revealProjects() {
        projectCards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < window.innerHeight - 100) {
                card.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealProjects);
    revealProjects(); // run once on load

}


function initReveal() {

    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {

                setTimeout(() => {
                    entry.target.classList.add("active");
                }, index * 150);

            }
        });

    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));

}


function initCounters() {

    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats");

    if (!statsSection || counters.length === 0) return;

    let started = false;

    function startCounters() {

        counters.forEach(counter => {

            const target = parseInt(counter.getAttribute("data-target"));
            const suffix = counter.getAttribute("data-suffix") || "";
            let count = 0;

            const duration = 4000; // total animation time
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {

                count++;

                counter.textContent = count + suffix;

                if (count >= target) {
                    clearInterval(timer);
                    counter.textContent = target + suffix;
                }

            }, stepTime);

        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                startCounters();
                started = true;
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}
