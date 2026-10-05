/* ============================================================
 * 订单查询逻辑：按订单号/联系方式查本地订单
 * ============================================================ */
(() => {
    const loading = document.getElementById("loading-state");
    const noResults = document.getElementById("no-results");
    const results = document.getElementById("order-results");

    function fmtTime(t) { return t || "-"; }

    function statusBadge(status) {
        if (status === 1) return `<span class="status-badge status-paid">✓ ${i18n("已付款")}</span>`;
        return `<span class="status-badge status-pending">🕐 ${i18n("待付款")}</span>`;
    }

    function shipmentBadge(status) {
        if (status === 1) return `<span class="shipment-badge shipment-paid">${i18n("已发货")}</span>`;
        return `<span class="shipment-badge shipment-waiting">${i18n("等待发货")}</span>`;
    }

    function createOrderItem(order) {
        const pay = SHOP.pays.find(p => p.id === order.pay_id);
        const cardSection = order.status === 1 ? `
            <div class="card-section">
                <div class="card-header">
                    <div class="shipment-title">
                        <span>🎁 ${i18n("宝贝内容")}</span>
                        ${shipmentBadge(order.delivery_status)}
                    </div>
                </div>
                ${order.ship_to ? `<div class="ship-to-line">📬 ${i18n("自动发货至")}：${util.esc(order.ship_to)}</div>` : ""}
                <div class="card-display">${util.esc(order.secret || "")}</div>
                ${order.leave_message ? `<div class="mt-3" style="white-space:pre-line;font-size:13px;color:var(--sub);">${util.esc(order.leave_message)}</div>` : ""}
            </div>` : "";

        return `
        <div class="order-item">
            <div class="order-header">
                <div>
                    <div class="order-status">${statusBadge(order.status)}</div>
                    <div class="order-basic">
                        <div class="order-no">#<span>${util.esc(order.trade_no)}</span></div>
                        <div>${i18n("下单时间")}：${fmtTime(order.create_time)}</div>
                        <div>${i18n("付款时间")}：${fmtTime(order.pay_time)}</div>
                        <div>${i18n("支付方式")}：
                            <span class="payment-method">
                                ${pay && pay.icon ? `<img src="${pay.icon}" class="payment-icon" onerror="this.style.display='none'">` : ""}
                                <span>${pay ? util.esc(i18n(pay.name)) : "-"}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="order-amount">
                    <span class="amount-label">${i18n("订单金额")}</span>
                    <span class="amount-value">¥<span class="amount-number">${order.amount}</span></span>
                </div>
            </div>

            <div class="goods-section">
                <div class="goods-thumb"><img src="${util.esc(order.cover)}" onerror="this.style.display='none'"></div>
                <div>
                    <h6 class="goods-name">${util.esc(order.item_name)}</h6>
                    <div class="goods-meta">
                        <span class="goods-sku a-badge a-badge-warning">${i18n("数量")}：${order.num}</span>
                    </div>
                </div>
            </div>
            ${cardSection}
        </div>`;
    }

    function showResults(orders) {
        results.innerHTML = "";
        if (!orders.length) {
            noResults.style.display = "block";
            return;
        }
        noResults.style.display = "none";
        orders.forEach(o => { results.insertAdjacentHTML("beforeend", createOrderItem(o)); });
    }

    document.getElementById("query-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const kw = document.getElementById("inp-keywords").value.trim();
        if (!kw) {
            message.error(i18n("请输入联系方式或订单号再查询"));
            return;
        }
        noResults.style.display = "none";
        results.innerHTML = "";
        loading.style.display = "block";
        setTimeout(() => {
            loading.style.display = "none";
            showResults(orderStore.query(kw));
        }, 600);
    });
})();
