(() => {
    // ===== 从配置渲染页面 =====
    // 背景图
    document.body.style.backgroundImage = `url('${SITE_CONFIG.background}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // 标题 / 副标题 / 标签页标题
    document.title = SITE_CONFIG.title;
    document.getElementById('site-title').textContent = SITE_CONFIG.title;
    document.getElementById('site-subtitle').textContent = SITE_CONFIG.subtitle;

    // 头像
    document.getElementById('site-avatar').src = SITE_CONFIG.avatar;

    // 页脚
    document.getElementById('site-footer').innerHTML = SITE_CONFIG.footer;

    // 链接卡片
    const list = document.getElementById('links-list');
    SITE_CONFIG.links.forEach((link, i) => {
        const a = document.createElement('a');
        a.className = 'link-card';
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.setProperty('--card-color', link.color);
        a.style.animationDelay = `${(i + 1) * 0.1}s`;
        a.innerHTML = `
            <div class="link-icon" style="background: ${link.color}20;">
                <img src="${link.icon}" alt="">
            </div>
            <div class="link-info">
                <div class="link-title shimmer">${link.title}</div>
            </div>
            <svg class="link-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/>
            </svg>`;
        list.appendChild(a);
    });

    // ===== 粒子背景 =====
    const particles = document.getElementById('particles');
    if (particles) {
        const count = Math.min(12, Math.floor(window.innerWidth / 100));
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 60 + 10;
            p.style.cssText = `
                width: ${size}px; height: ${size}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 15 + 15}s;
                animation-delay: ${Math.random() * 10}s;
            `;
            particles.appendChild(p);
        }
    }

    // ===== 卡片悬停效果 =====
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.boxShadow = `
                0 12px 40px rgba(0, 0, 0, 0.12),
                0 4px 12px rgba(0, 0, 0, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `;
        });
        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '';
        });
    });
})();
