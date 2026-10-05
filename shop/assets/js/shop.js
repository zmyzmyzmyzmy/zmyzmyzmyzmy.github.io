/* ============================================================
 * 商城首页逻辑：分类切换 / 商品网格 / 搜索
 * ============================================================ */
(() => {
    /* 从 URL 读取分类 ?cat=xxx */
    function getCatId() {
        const q = util.getParam("cat");
        return q ? Number(q) : 0;
    }

    /* 公告 */
    document.getElementById("notice-text").textContent = SHOP.notice;

    /* 当前分类（默认第一个） */
    const defaultCatId = SHOP.categories[0] ? SHOP.categories[0].id : 0;
    const catId = getCatId() || defaultCatId;
    let currentCat = catId;

    /* 渲染分类胶囊 */
    const catsBox = document.getElementById("cats");
    SHOP.categories.forEach(c => {
        const a = document.createElement("a");
        a.href = "javascript:void(0)";
        a.className = "chip" + (c.id === catId ? " is-primary" : "");
        a.dataset.id = c.id;
        a.innerHTML = `<span class="chip-icon" style="background-image:url('${c.icon}')"></span>${util.esc(i18n(c.name))}`;
        a.addEventListener("click", () => switchCategory(c.id, true));
        catsBox.appendChild(a);
    });

    /* 分类切换 */
    function switchCategory(id, push) {
        if (id === currentCat) return;
        currentCat = id;
        catsBox.querySelectorAll(".chip").forEach(c =>
            c.classList.toggle("is-primary", Number(c.dataset.id) === id));
        if (push) history.pushState(null, "", "?cat=" + id);
        renderItems(SHOP.items.filter(it => it.category === id));
    }

    /* 渲染商品 */
    const itemList = document.getElementById("item-list");
    const emptyTip = document.getElementById("empty-tip");

    function renderItems(list) {
        itemList.innerHTML = "";
        if (!list.length) {
            itemList.style.display = "none";
            emptyTip.style.display = "block";
            emptyTip.textContent = i18n("没有商品");
            return;
        }
        itemList.style.display = "grid";
        emptyTip.style.display = "none";

        list.forEach(it => {
            const soldOut = it.stock <= 0;
            const card = document.createElement("a");
            card.className = "col-12 col-md-6 col-lg-3 mb-3 item-card" + (soldOut ? " soldout" : "");
            if (!soldOut) card.href = "item.html?id=" + it.id;
            card.innerHTML = `
                <div class="item-thumb" style="background-image:url('${it.cover}')"></div>
                <div class="item-info">
                    <div class="item-tags">
                        <span class="badge-soft badge-soft-success">${i18n("自动发货")}</span>
                        ${it.recommend ? `<span class="badge-soft badge-soft-primary">${i18n("推荐")}</span>` : ""}
                    </div>
                    <p class="goods-title">${util.esc(i18n(it.name))}</p>
                    <div class="price"><span class="unit">¥</span>${it.price}</div>
                    <div class="stat-bottom">
                        <span>${i18n("库存")}:${it.stock}</span><span>${i18n("已售")}:${it.sold || 0}</span>
                    </div>
                </div>
                ${soldOut ? `<div class="soldout-ribbon">${i18n("售罄")}</div>` : ""}`;
            itemList.appendChild(card);
        });
    }

    /* 搜索（键盘输入过滤） */
    function search(kw) {
        kw = (kw || "").trim();
        catsBox.querySelectorAll(".chip").forEach(c => c.classList.remove("is-primary"));
        currentCat = 0;
        if (!kw) {
            currentCat = catId;
            catsBox.querySelectorAll(".chip").forEach(c =>
                c.classList.toggle("is-primary", Number(c.dataset.id) === currentCat));
            renderItems(SHOP.items.filter(it => it.category === currentCat));
            return;
        }
        renderItems(SHOP.items.filter(it => (it.name.includes(kw)) || (it.desc && it.desc.includes(kw))));
    }

    /* 导航栏搜索框：回车触发 */
    document.querySelectorAll(".item-search-input").forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") search(input.value);
        });
    });

    /* 初始渲染 */
    renderItems(SHOP.items.filter(it => it.category === currentCat));
})();
