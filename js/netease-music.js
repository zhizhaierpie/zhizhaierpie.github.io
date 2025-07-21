// source/js/netease-music.js
document.addEventListener('DOMContentLoaded', function() {
    const songId = '476323574';

    // 创建播放器容器
    const player = document.createElement('div');
    player.id = 'netease-music-player';
    player.className = 'netease-music-player';
    document.body.appendChild(player);

    // 使用网易云官方提供的iframe代码结构
    player.innerHTML = `
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" 
                width=330 height=86 
                src="//music.163.com/outchain/player?type=2&id=${songId}&auto=1&height=66"></iframe>
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

    // 更可靠的自动播放方案
    const triggerAutoPlay = (iframe) => {
        const sendPlayCommand = () => {
            try {
                iframe.contentWindow.postMessage(JSON.stringify({
                    command: 'play',
                }), 'https://music.163.com');
            } catch (e) {
                console.log('自动播放尝试失败');
            }
        };

        // 多重触发方案
        iframe.addEventListener('load', sendPlayCommand);

        // 延迟触发方案
        setTimeout(sendPlayCommand, 1000);
        setTimeout(sendPlayCommand, 3000); // 3秒后再次尝试
    };

    // 初始化自动播放
    const iframe = player.querySelector('iframe');
    if (iframe) {
        // 设置iframe加载完成后触发
        iframe.onload = function() {
            triggerAutoPlay(iframe);
        };

        // 备用触发方案
        setTimeout(() => {
            if (!iframe.contentWindow) {
                console.log('iframe未准备好，重新加载');
                iframe.src = iframe.src; // 重新加载iframe
            } else {
                triggerAutoPlay(iframe);
            }
        }, 2000);
    }
});