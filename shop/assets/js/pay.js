/* ============================================================
 * 收银台逻辑：根据订单号展示支付信息
 * 模拟二维码 → 点击"我已支付" → 标记已付款 → 弹卡密
 * ============================================================ */
(() => {
    const tradeNo = util.getParam("tradeNo");
    const order = tradeNo ? orderStore.findByNo(tradeNo) : null;

    if (!order) {
        document.querySelector(".pay-wrap").innerHTML =
            `<div class="panel"><div class="panel-body empty-tip">${i18n("没有找到相关订单")}</div></div>`;
        return;
    }
    if (order.status === 1) {
        /* 已支付：直接展示卡密 */
        treasure.show(order.secret, order.leave_message);
        document.getElementById("btn-paid").textContent = i18n("查看卡密");
    }

    const pay = SHOP.pays.find(p => p.id === order.pay_id);
    document.getElementById("pay-sub").textContent =
        `${i18n("支付方式")}：${pay ? pay.name : ""}`;
    document.getElementById("pay-no").textContent = `${i18n("订单号")}：${order.trade_no}`;
    document.getElementById("pay-amount").textContent = `${i18n("实付金额")} ${util.money(order.amount)}`;

    /* 伪二维码：用订单号做种子生成方格 */
    drawQr(order.trade_no);

    function drawQr(seed) {
        const canvas = document.getElementById("qr-canvas");
        const ctx = canvas.getContext("2d");
        const n = 21, cell = 180 / n;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 180, 180);

        /* 简单确定性伪随机（种子来自订单号） */
        let s = 0;
        for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) % 999999937;
        const rand = () => { s = (s * 48271) % 2147483647; return s / 2147483647; };

        ctx.fillStyle = "#111";
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                /* 三个定位角 */
                const corner = (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
                if (corner) {
                    const isFinder = (x % 7 === 0 || x % 7 === 6) && (y % 7 === 0 || y % 7 === 6) ||
                        (x % 7 >= 2 && x % 7 <= 4 && y % 7 >= 2 && y % 7 <= 4);
                    if (isFinder) ctx.fillRect(x * cell, y * cell, cell, cell);
                    continue;
                }
                if (rand() < 0.48) ctx.fillRect(x * cell, y * cell, cell, cell);
            }
        }
    }

    /* 我已支付 */
    document.getElementById("btn-paid").addEventListener("click", () => {
        if (order.status === 1) {
            treasure.show(order.secret, order.leave_message);
            return;
        }
        orderStore.update(order.trade_no, {
            status: 1,
            delivery_status: 1,
            pay_time: formatTime()
        });
        order.status = 1;
        message.success(i18n("支付成功"));
        setTimeout(() => {
            treasure.show(order.secret, order.leave_message);
            document.getElementById("btn-paid").textContent = i18n("查看卡密");
        }, 500);
    });

    function formatTime() {
        const d = new Date();
        const p = n => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    }
})();
