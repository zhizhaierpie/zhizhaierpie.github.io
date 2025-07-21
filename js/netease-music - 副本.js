// source/js/netease-music.js
document.addEventListener('DOMContentLoaded', function() {
    const songId = '476323574';

    // 创建播放器容器
    const player = document.createElement('div');
    player.id = 'netease-music-player';
    player.className = 'netease-music-player';
    document.body.appendChild(player);

    // 插入网易云音乐iframe
    player.innerHTML = `
        <iframe src="//music.163.com/outchain/player?type=2&id=${songId}&auto=1&height=66"></iframe>
        <div class="netease-music-toggle">◀</div>
    `;

    // 获取切换按钮
    const toggleBtn = player.querySelector('.netease-music-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            player.classList.toggle('hidden');
            toggleBtn.textContent = player.classList.contains('hidden') ? '▶' : '◀';
        });
    }

    // 自动播放功能
    const attemptAutoPlay = (iframe, attempts = 0) => {
        if (attempts >= 3) return; // 最多尝试3次

        try {
            iframe.contentWindow.postMessage(JSON.stringify({
                command: 'play',
            }), '*');
        } catch (e) {
            console.log('自动播放尝试失败，重试中...', attempts + 1);
            setTimeout(() => attemptAutoPlay(iframe, attempts + 1), 1000 * (attempts + 1));
        }
    };

    // 延迟1秒后尝试自动播放
    setTimeout(() => {
        const iframe = player.querySelector('iframe');
        if (iframe) {
            iframe.onload = () => attemptAutoPlay(iframe);
            // 额外尝试，防止onload在某些情况下不触发
            attemptAutoPlay(iframe);
        }
    }, 1000);
});