const reveals = document.querySelectorAll('.reveal');

function revealSections() {

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            section.classList.add('active');
        }

    });

}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);


const counters = document.querySelectorAll('.counter');

let started = false;

function startCounters() {

    if (started) return;

    const stats = document.querySelector('.stats');

    if (!stats) return;

    const statsTop = stats.getBoundingClientRect().top;

    if (statsTop < window.innerHeight - 100) {

        started = true;

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let current = 0;

            const increment = target / 50;

            const updateCounter = () => {

                if (current < target) {

                    current += increment;

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;
                }
            };

            updateCounter();

        });

    }
}

window.addEventListener('scroll', startCounters);
window.addEventListener('load', startCounters);