document.addEventListener('DOMContentLoaded', function() {
    // 初始化观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    // 观察所有需要渐显的元素
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        // 随机设置初始位置增加动感
        const randomY = Math.random() * 40 + 10;
        const randomX = (Math.random() - 0.5) * 40;
        el.style.transform = `translate(${randomX}px, ${randomY}px)`;

        observer.observe(el);
    });

    // 为标题添加渐变动画
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.classList.add('gradient-text');
    });
});