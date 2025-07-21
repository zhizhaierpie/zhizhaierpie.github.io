document.addEventListener('DOMContentLoaded', function() {
    // 更精美的SVG风车
    const windmillSVG = `
    <svg class="svg-windmill" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <g class="windmill-blade">
        <path d="M12,5L12,2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M17,7L19,4" stroke="currentColor" stroke-width="1.5"/>
        <path d="M19,12L22,12" stroke="currentColor" stroke-width="1.5"/>
        <path d="M17,17L19,20" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12,19L12,22" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7,17L5,20" stroke="currentColor" stroke-width="1.5"/>
        <path d="M5,12L2,12" stroke="currentColor" stroke-width="1.5"/>
        <path d="M7,7L5,4" stroke="currentColor" stroke-width="1.5"/>
      </g>
    </svg>
  `;

    // 添加到所有标题
    const addWindmill = () => {
        document.querySelectorAll('.post-title, .page-title, .post-header h1').forEach(title => {
            if (!title.querySelector('.svg-windmill')) {
                title.insertAdjacentHTML('afterbegin', windmillSVG);
            }
        });
    };

    // 初始添加
    addWindmill();

    // Pjax兼容（如果使用）
    document.addEventListener('pjax:complete', addWindmill);

    // 点击交互效果
    document.addEventListener('click', function(e) {
        const windmill = e.target.closest('.svg-windmill');
        if (windmill) {
            windmill.querySelector('.windmill-blade').style.animationDuration = '0.8s';
            setTimeout(() => {
                windmill.querySelector('.windmill-blade').style.animationDuration = '';
            }, 800);
        }
    });
});