/* ============================================================
 * 商品详情页逻辑：渲染 / 数量 / 验证码 / 支付下单
 * 流程：选支付方式 → 校验（联系方式+验证码）→ 创建订单 →
 *      跳转收银台 pay.html → 支付 → 弹出卡密
 * ============================================================ */
(() => {
    const id = Number(util.getParam("id"));
    const item = SHOP.items.find(i => i.id === id);
    if (!item) {
        document.querySelector("main").innerHTML = `<div class="panel mt-3"><div class="panel-body empty-tip">${i18n("没有商品")}</div></div>`;
        return;
    }

    document.title = item.name + " - " + SHOP.title;

    /* ---------- 渲染 ---------- */
    document.getElementById("item-cover").src = item.cover;
    document.getElementById("item-name").textContent = i18n(item.name);
    document.getElementById("item-sold").textContent = `${i18n("已售")} ${item.sold || 0}`;
    const stockEl = document.getElementById("item-stock");
    stockEl.textContent = `${i18n("库存")} ${item.stock}`;
    document.getElementById("item-price").textContent = item.price;
    document.getElementById("inp-contact").placeholder = i18n("请输入联系方式");
    document.getElementById("inp-captcha").placeholder = i18n("图形验证码");
    document.getElementById("item-desc").innerHTML = (item.desc || "").split("\n").map(p => `<p>${util.esc(i18n(p))}</p>`).join("");

    /* ---------- 封面点击放大（对应原站点封面看大图） ---------- */
    document.getElementById("item-cover").addEventListener("click", () => {
        const mask = document.createElement("div");
        mask.className = "hd-layer-mask cover-zoom";
        const img = document.createElement("img");
        img.src = item.cover;
        img.alt = i18n(item.name);
        mask.appendChild(img);
        document.body.appendChild(mask);
        mask.addEventListener("click", () => mask.remove());
    });

    /* ---------- 数量加减 ---------- */
    const numInput = document.getElementById("inp-num");
    document.querySelector(".change-num-sub").addEventListener("click", () => {
        numInput.value = Math.max(1, (+numInput.value || 1) - 1);
    });
    document.querySelector(".change-num-add").addEventListener("click", () => {
        numInput.value = Math.max(1, (+numInput.value || 1) + 1);
    });

    /* ---------- 验证码 ---------- */
    const canvas = document.getElementById("captcha-canvas");
    captcha.draw(canvas);
    canvas.addEventListener("click", () => captcha.draw(canvas));

    /* ---------- 支付方式 ---------- */
    const payList = document.getElementById("pay-list");
    let activePay = null;
    SHOP.pays.forEach(p => {
        const a = document.createElement("a");
        a.href = "javascript:void(0)";
        a.className = "pay";
        a.dataset.id = p.id;
        a.innerHTML = `<img src="${p.icon}" onerror="this.style.display='none'"><span>${util.esc(i18n(p.name))}</span>`;
        a.addEventListener("click", () => {
            payList.querySelectorAll(".pay").forEach(x => x.classList.remove("is-active"));
            a.classList.add("is-active");
            activePay = p;
        });
        payList.appendChild(a);
    });

    /* ---------- 分享按钮 ---------- */
    document.getElementById("btn-share").addEventListener("click", () => {
        util.copyText(location.href, () => message.success(i18n("分享链接复制成功，快去分享给朋友吧！")), () => message.error(i18n("复制失败，请手动选中上方内容复制")));
    });

    /* ---------- 下单 ---------- */
    function submitOrder() {
        const contact = document.getElementById("inp-contact").value.trim();
        const num = Math.max(1, +numInput.value || 1);
        const captchaVal = document.getElementById("inp-captcha").value.trim();

        if (!contact) { message.error(i18n("请填写所有必填项")); return; }
        if (!captcha.verify(captchaVal)) { message.error(i18n("请输入正确的验证码")); captcha.draw(canvas); return; }
        if (!activePay) { message.error(i18n("请选择支付方式")); return; }
        if (item.stock < num) { message.error(i18n("库存不足")); return; }

        /* 从卡密池取卡密（本地模拟） */
        const pool = item.keys || [];
        const issued = pool.slice(0, num);
        const secret = issued.length
            ? issued.join("\n")
            : Array.from({ length: num }, (_, i) => `HD-${item.id}-${Date.now()}-${i}`).join("\n");

        const order = orderStore.add({
            trade_no: util.genTradeNo(),
            item_id: item.id,
            item_name: i18n(item.name),
            cover: item.cover,
            contact: contact,
            num: num,
            price: item.price,
            amount: item.price * num,
            pay_id: activePay.id,
            pay_name: activePay.name,
            status: 0,            // 0=待付款 1=已付款
            delivery_status: 0,   // 0=等待发货 1=已发货
            secret: secret,
            leave_message: item.note || "",
            ship_to: /@/.test(contact) ? `${i18n("邮箱")}：${contact}` : `${i18n("联系方式")}：${contact}`,
            create_time: formatTime(),
            pay_time: null
        });

        /* 扣减展示库存（刷新后以 config 为准） */
        item.stock -= num;

        message.success(i18n("下单成功，请完成支付"));
        setTimeout(() => {
            location.href = "pay.html?tradeNo=" + order.trade_no;
        }, 800);
    }

    function formatTime() {
        const d = new Date();
        const p = n => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }

    /* 点击支付方式卡片即下单（对应原站：点支付方式即发起购买） */
    payList.addEventListener("click", (e) => {
        if (e.target.closest(".pay")) {
            submitOrder();
        }
    });
})();
