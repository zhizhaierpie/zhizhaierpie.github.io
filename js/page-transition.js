// source/js/page-transition.js
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    main.style.opacity = 0;
    main.style.transition = 'opacity 0.6s ease';

    setTimeout(() => {
        main.style.opacity = 1;
    }, 100);

    document.querySelectorAll('a').forEach(link => {
        if (link.href.includes(window.location.hostname)) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                main.style.opacity = 0;

                setTimeout(() => {
                    window.location.href = link.href;
                }, 600);
            });
        }
    });
});