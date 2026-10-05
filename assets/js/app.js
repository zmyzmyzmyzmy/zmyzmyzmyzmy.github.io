(() => {
    const $ = (id) => document.getElementById(id);

    // ===== 基础信息 =====
    document.title = SITE_CONFIG.siteName + " - 红豆商城";
    $('logo-text').textContent = SITE_CONFIG.siteName;
    $('announcement').textContent = SITE_CONFIG.announcement;

    // 客服按钮链接
    $('btn-cs').href = SITE_CONFIG.qqCustomer;

    // ===== 分类状态 =====
    let currentCategory = SITE_CONFIG.categories[0] || '';
    let searchKeyword = '';

    // ===== 渲染分类标签 =====
    const tabsBox = $('category-tabs');
    SITE_CONFIG.categories.forEach((cat, i) => {
        const tab = document.createElement('div');
        tab.className = 'category-tab' + (i === 0 ? ' active' : '');
        tab.textContent = cat;
        tab.dataset.category = cat;
        tab.addEventListener('click', () => {
            currentCategory = cat;
            searchKeyword = '';
            $('search-input').value = '';
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProducts();
        });
        tabsBox.appendChild(tab);
    });

    // ===== 渲染商品 =====
    function renderProducts() {
        const grid = $('product-grid');
        grid.innerHTML = '';

        // 过滤：先按分类，再按搜索关键词（名称或分类名匹配）
        let list = SITE_CONFIG.products.filter(p => p.category === currentCategory);
        if (searchKeyword) {
            const kw = searchKeyword.toLowerCase();
            list = SITE_CONFIG.products.filter(p =>
                (p.title + p.category).toLowerCase().includes(kw)
            );
        }

        const emptyTip = $('empty-tip');
        emptyTip.style.display = list.length ? 'none' : 'block';

        list.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${p.img}" alt="${p.title}" loading="lazy">
                    ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
                </div>
                <div class="card-body">
                    <div class="product-name">${p.title}</div>
                    <div class="product-price">¥${p.price.toFixed(2)}</div>
                    <div class="product-meta">
                        <span>库存: ${p.stock}</span>
                        <span>已售: ${p.sold}</span>
                    </div>
                </div>`;
            // 点击商品卡片 → 提示联系客服购买
            card.addEventListener('click', () => {
                openModal('商品详情', `「${p.title}」<br>价格：¥${p.price.toFixed(2)}<br><br>虚拟产品售出不退，购买请直接联系客服，付款后自动发货。`);
            });
            grid.appendChild(card);
        });
    }

    // ===== 搜索 =====
    $('search-input').addEventListener('input', (e) => {
        searchKeyword = e.target.value.trim();
        renderProducts();
    });

    // ===== 弹窗 =====
    const modalMask = $('modal-mask');
    function openModal(title, html) {
        $('modal-title').textContent = title;
        $('modal-body').innerHTML = html;
        modalMask.style.display = 'flex';
    }
    function closeModal() {
        modalMask.style.display = 'none';
    }
    $('modal-close').addEventListener('click', closeModal);
    modalMask.addEventListener('click', (e) => {
        if (e.target === modalMask) closeModal();
    });

    // ===== 顶部导航 =====
    $('nav-home').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        $('nav-home').classList.add('active');
    });
    $('nav-shop').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        $('nav-shop').classList.add('active');
        $('search-input').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // 订单查询
    $('nav-order').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        $('nav-order').classList.add('active');
        openModal('订单查询', `
            <input class="order-input" id="order-input" placeholder="请输入订单号或手机号" maxlength="30">
            <button class="order-btn" id="order-submit">查 询</button>
            <div class="order-result" id="order-result" style="display:none;">未找到相关订单，如有疑问请联系客服。</div>`);
        const submit = $('order-submit');
        const result = $('order-result');
        submit.addEventListener('click', () => {
            const v = $('order-input').value.trim();
            if (!v) {
                result.textContent = '请输入订单号或手机号';
                result.style.display = 'block';
                return;
            }
            result.textContent = '未找到相关订单，如有疑问请联系客服。';
            result.style.display = 'block';
        });
        $('order-input').addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') submit.click();
        });
        $('order-input').focus();
    });

    // ===== 悬浮按钮 =====
    $('btn-qr').addEventListener('click', () => {
        openModal('联系客服', '请添加客服 QQ：<a href="' + SITE_CONFIG.qqCustomer + '" target="_blank" rel="noopener noreferrer" style="color:#ff6b9d;font-weight:600;">点此加客服QQ</a><br><br>或扫码添加微信客服（请点击右下角客服按钮）。');
    });

    // ===== 首次渲染 =====
    renderProducts();
})();
