document.addEventListener('DOMContentLoaded', function() {
    // 修复后的文字动画函数
    function animateText(element) {
        const text = element.textContent;
        element.innerHTML = ''; // 清空原有内容

        // 创建文档片段提高性能
        const fragment = document.createDocumentFragment();

        // 正确处理空格和特殊字符
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.className = 'char-reveal';

            // 直接使用原字符，不转换空格
            span.textContent = text[i];

            // 设置延迟
            span.style.animationDelay = `${i * 0.05}s`;

            // 如果是空格，添加特定类名以便特殊处理
            if (text[i] === ' ') {
                span.classList.add('char-space');
            }

            fragment.appendChild(span);
        }

        element.appendChild(fragment);
    }

    // 应用动画到所有标题
    const titles = document.querySelectorAll('.post-title, .page-title, .post-header h1');
    titles.forEach(title => {
        // 避免重复处理
        if (!title.classList.contains('char-animated')) {
            animateText(title);
            title.classList.add('char-animated');
        }
    });

    // 可选：滚动触发的段落渐显
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.post-content p').forEach(p => {
        p.classList.add('reveal-on-scroll');
        observer.observe(p);
    });
});

// 添加段落动画样式
const style = document.createElement('style');
style.textContent = `
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
  }
  
  .reveal-on-scroll.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* 特殊处理空格 */
  .char-space {
    min-width: 0.3em;
    display: inline-block;
  }
`;
document.head.appendChild(style);