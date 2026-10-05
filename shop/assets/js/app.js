/* ============================================================
 * 商城 —— 公共库
 * 提供：多语言 / 导航栏 / 图形验证码 / 本地订单 / 卡密弹窗
 * 一般不用改这个文件
 * ============================================================ */

/* ---------- 多语言 ---------- */
const I18N = {
    lang: "zh-cn",
    dict: { "zh-cn": {}, "zh-tw": I18N_TW, "en": I18N_EN, "ja": I18N_JA },
    init() {
        try { this.lang = localStorage.getItem("hd_lang") || "zh-cn"; } catch (e) { this.lang = "zh-cn"; }
    },
    set(lang) {
        this.lang = lang;
        try { localStorage.setItem("hd_lang", lang); } catch (e) {}
    },
    t(key) {
        if (this.lang === "zh-cn") return key;
        const d = this.dict[this.lang];
        return (d && d[key]) || key;
    }
};
const i18n = (k) => I18N.t(k);

/* 语言简码（对应原站按钮上显示的 简/繁/EN/日） */
function langShort() {
    const l = (SHOP.langs || []).find(x => x.code === I18N.lang);
    return (l && l.short) || I18N.lang.toUpperCase();
}

/* ---------- 页面工具 ---------- */
const util = {
    /* 获取 URL 参数 */
    getParam(name) {
        const m = new URLSearchParams(location.search);
        return m.get(name);
    },
    /* 转义 HTML */
    esc(v) {
        return String(v == null ? "" : v).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[c]);
    },
    /* 复制文本 */
    copyText(text, ok, fail) {
        const done = () => { try { navigator.clipboard.writeText(text).then(ok, () => fallback()); } catch (e) { fallback(); } };
        const fallback = () => {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); ok(); } catch (e) { fail && fail(); }
            document.body.removeChild(ta);
        };
        done();
    },
    /* 金额格式 */
    money(n) {
        return "¥" + (Number(n) || 0);
    },
    /* 订单号生成 */
    genTradeNo() {
        return "HD" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    }
};

/* ---------- 提示消息 ---------- */
const message = {
    _create(text, cls) {
        const box = document.createElement("div");
        box.className = "hd-message " + cls;
        box.textContent = text;
        document.body.appendChild(box);
        setTimeout(() => box.classList.add("show"), 10);
        setTimeout(() => { box.classList.remove("show"); setTimeout(() => box.remove(), 300); }, 2500);
    },
    success(t) { this._create(t, "hd-message-success"); },
    error(t) { this._create(t, "hd-message-error"); },
    info(t) { this._create(t, "hd-message-info"); }
};

/* ---------- 图形验证码（本地生成） ---------- */
const captcha = {
    key: "hd_captcha",
    gen() {
        let code = "";
        for (let i = 0; i < 4; i++) code += Math.floor(Math.random() * 10);
        try { sessionStorage.setItem(this.key, code); } catch (e) {}
        return code;
    },
    get() {
        try { return sessionStorage.getItem(this.key) || ""; } catch (e) { return ""; }
    },
    verify(input) {
        return String(input || "").toLowerCase() === this.get().toLowerCase();
    },
    /* 生成验证码图片，画到 canvas 上 */
    draw(canvas) {
        if (!canvas) return;
        const code = this.gen();
        const ctx = canvas.getContext("2d");
        const w = canvas.width, h = canvas.height;
        ctx.fillStyle = "#f3f4f6";
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = "rgba(0,0,0,.12)";
            ctx.beginPath();
            ctx.moveTo(Math.random() * w, Math.random() * h);
            ctx.lineTo(Math.random() * w, Math.random() * h);
            ctx.stroke();
        }
        for (let i = 0; i < 4; i++) {
            const x = 12 + i * 20 + Math.random() * 6;
            const y = 18 + Math.random() * 10;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((Math.random() - 0.5) * 0.5);
            ctx.font = "bold 22px Arial";
            ctx.fillStyle = ["#333", "#555", "#666", "#444"][Math.floor(Math.random() * 4)];
            ctx.fillText(code[i], 0, 0);
            ctx.restore();
        }
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = "rgba(0,0,0,.08)";
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
};

/* ---------- 本地用户 ---------- */
const auth = {
    storeKey: "hd_users",
    sessionKey: "hd_login",
    getUsers() {
        try { return JSON.parse(localStorage.getItem(this.storeKey) || "{}"); } catch (e) { return {}; }
    },
    saveUsers(users) {
        try { localStorage.setItem(this.storeKey, JSON.stringify(users)); } catch (e) {}
    },
    register(username, password) {
        const users = this.getUsers();
        if (users[username]) return { ok: false, msg: i18n("用户名已存在") };
        users[username] = { password, created: Date.now() };
        this.saveUsers(users);
        return { ok: true, msg: i18n("注册成功") };
    },
    login(username, password, stay) {
        const users = this.getUsers();
        if (!users[username] || users[username].password !== password) {
            return { ok: false, msg: i18n("用户名或密码错误") };
        }
        try { localStorage.setItem(this.sessionKey, JSON.stringify({ name: username })); } catch (e) {}
        return { ok: true, msg: i18n("登录成功") };
    },
    logout() {
        try { localStorage.removeItem(this.sessionKey); } catch (e) {}
    },
    current() {
        try { return JSON.parse(localStorage.getItem(this.sessionKey) || "null"); } catch (e) { return null; }
    }
};

/* ---------- 本地订单 ---------- */
const orderStore = {
    storeKey: "hd_orders",
    getAll() {
        try { return JSON.parse(localStorage.getItem(this.storeKey) || "[]"); } catch (e) { return []; }
    },
    save(list) {
        try { localStorage.setItem(this.storeKey, JSON.stringify(list)); } catch (e) {}
    },
    add(order) {
        const list = this.getAll();
        list.unshift(order);
        this.save(list);
        return order;
    },
    /* 用订单号或联系方式查询 */
    query(keywords) {
        const kw = String(keywords || "").trim();
        if (!kw) return [];
        return this.getAll().filter(o =>
            o.trade_no === kw || (o.contact && o.contact.includes(kw))
        );
    },
    findByNo(no) {
        return this.getAll().find(o => o.trade_no === no);
    },
    update(no, patch) {
        const list = this.getAll();
        const i = list.findIndex(o => o.trade_no === no);
        if (i >= 0) {
            list[i] = Object.assign({}, list[i], patch);
            this.save(list);
            return list[i];
        }
        return null;
    }
};

/* ---------- 卡密弹窗（对应原站的 treasure.show） ---------- */
const treasure = {
    styleInjected: false,
    style() {
        if (this.styleInjected) return;
        this.styleInjected = true;
        const el = document.createElement("style");
        el.textContent = `.acg-secret{display:flex;flex-direction:column;gap:14px;padding:18px 20px 20px;box-sizing:border-box;font-size:14px;}
.acg-secret__code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.75;white-space:pre-wrap;word-break:break-all;padding:14px 16px;border-radius:10px;background:rgba(127,127,127,.12);border:1px solid rgba(127,127,127,.22);max-height:300px;overflow:auto;user-select:text;-webkit-user-select:text;}
.acg-secret__bar{display:flex;justify-content:flex-end;gap:10px;}
.acg-secret__btn{display:inline-flex;align-items:center;gap:6px;padding:7px 16px;border-radius:9px;cursor:pointer;font-size:13px;line-height:1.4;color:inherit;background:transparent;border:1px solid rgba(127,127,127,.38);transition:background .15s ease,border-color .15s ease;}
.acg-secret__btn:hover{background:rgba(127,127,127,.16);border-color:rgba(127,127,127,.6);}
.acg-secret__btn svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.acg-secret__note{border-radius:10px;padding:12px 14px;background:rgba(127,127,127,.10);border-left:3px solid rgba(127,127,127,.45);}
.acg-secret__note-title{display:flex;align-items:center;gap:6px;font-size:12px;opacity:.7;margin-bottom:6px;}
.acg-secret__note-title svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.acg-secret__note-body{font-size:13px;line-height:1.75;white-space:pre-line;word-break:break-word;max-height:180px;overflow:auto;}
.acg-secret__note-body p:last-child{margin-bottom:0;}
.acg-secret__ship{display:flex;align-items:flex-start;gap:8px;border-radius:10px;padding:10px 12px;background:rgba(82,196,26,.12);border:1px solid rgba(82,196,26,.35);color:#237804;font-size:13px;line-height:1.6;}
.acg-secret__ship b{font-weight:700;}`;
        document.head.appendChild(el);
    },
    show(code, leaveMessage, shipTo) {
        this.style();
        const o = String(code == null ? "" : code);
        const note = leaveMessage
            ? `<div class="acg-secret__note"><div class="acg-secret__note-title"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><span>${i18n("使用说明")}</span></div><div class="acg-secret__note-body">${util.esc(leaveMessage)}</div></div>`
            : "";
        const ship = shipTo
            ? `<div class="acg-secret__ship">📬 <div><b>${i18n("自动发货成功")}！</b>${i18n("卡密已自动发送至")} ${util.esc(shipTo)}</div></div>`
            : "";
        const layer = document.createElement("div");
        layer.className = "hd-layer";
        layer.innerHTML = `
            <div class="hd-layer-mask" data-close></div>
            <div class="hd-layer-body acg-secret-wrap">
                <div class="hd-layer-title">${i18n("您购买的宝贝信息")}:</div>
                <div class="acg-secret">
                    ${ship}
                    <div class="acg-secret__code">${util.esc(o)}</div>
                    <div class="acg-secret__bar">
                        <button type="button" class="acg-secret__btn" data-act="copy"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg><span>${i18n("复制")}</span></button>
                        <button type="button" class="acg-secret__btn" data-act="download"><svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg><span>${i18n("下载")}</span></button>
                    </div>
                    ${note}
                </div>
            </div>`;
        document.body.appendChild(layer);
        requestAnimationFrame(() => layer.classList.add("show"));
        layer.querySelector('[data-act="copy"]').addEventListener("click", () => {
            util.copyText(o, () => message.success(i18n("卡密已复制")), () => message.error(i18n("复制失败，请手动选中上方内容复制")));
        });
        layer.querySelector('[data-act="download"]').addEventListener("click", () => {
            const blob = new Blob([o], { type: "text/plain;charset=utf-8" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "card.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        });
        layer.querySelector('[data-close]').addEventListener("click", () => {
            layer.classList.remove("show");
            setTimeout(() => layer.remove(), 250);
        });
    },
    close() {
        document.querySelectorAll(".hd-layer").forEach(l => l.remove());
    }
};

/* ---------- 导航栏渲染（所有商城页面共用） ---------- */
function renderNav() {
    const nav = document.querySelector("#site-nav");
    if (!nav) return;
    const u = auth.current();
    nav.innerHTML = `
        <div class="navbar container">
            <a class="navbar-brand" href="index.html">
                <img src="assets/uploads/logo.png" alt="ACG Logo" class="brand-logo" onerror="this.style.display='none'">
                <span class="brand-name">${util.esc(SHOP.title)}</span>
            </a>
            <div class="nav-menu" id="nav-menu">
                <a class="nav-link ${location.pathname.endsWith("index.html") || location.pathname.endsWith("/shop/") ? "active" : ""}" href="index.html"><i class="ico">🛒</i>${i18n("购物")}</a>
                <a class="nav-link ${location.pathname.endsWith("query.html") ? "active" : ""}" href="query.html"><i class="ico">📂</i>${i18n("订单查询")}</a>
            </div>
            ${document.body.classList.contains("has-search") ? `
            <div class="nav-search">
                <input class="form-control item-search-input" type="search" placeholder="${i18n("搜索商品关键词..")}" aria-label="Search">
            </div>` : ""}
            <div class="nav-right">
                <div class="lang-switch">
                    <button class="lang-btn" id="lang-btn">🌐 <span class="lang-code" id="lang-code">${util.esc(langShort())}</span></button>
                    <div class="lang-menu" id="lang-menu"></div>
                </div>
                <div class="auth-area" id="auth-area"></div>
                <button class="nav-toggle" id="nav-toggle">☰</button>
            </div>
        </div>`;

    /* 语言菜单 */
    const langMenu = document.getElementById("lang-menu");
    SHOP.langs.forEach(l => {
        const a = document.createElement("a");
        a.href = "javascript:void(0)";
        a.className = "lang-item" + (l.code === I18N.lang ? " active" : "");
        a.dataset.lang = l.code;
        a.textContent = l.name;
        langMenu.appendChild(a);
    });
    document.getElementById("lang-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("show");
    });
    document.addEventListener("click", () => langMenu.classList.remove("show"));
    langMenu.querySelectorAll(".lang-item").forEach(a => {
        a.addEventListener("click", () => {
            I18N.set(a.dataset.lang);
            location.reload();
        });
    });

    /* 登录区 */
    const authArea = document.getElementById("auth-area");
    if (u) {
        authArea.innerHTML = `<span class="user-chip">👤 ${util.esc(u.name)}</span>
            <a class="btn btn-outline" href="javascript:void(0)" id="btn-logout">${i18n("退出登录")}</a>`;
        document.getElementById("btn-logout").addEventListener("click", () => {
            auth.logout();
            location.reload();
        });
    } else {
        authArea.innerHTML = `<a class="btn btn-outline" href="login.html">${i18n("登录")}</a>
            <a class="btn btn-primary" href="register.html">${i18n("注册")}</a>`;
    }

    /* 移动端菜单 */
    document.getElementById("nav-toggle").addEventListener("click", () => {
        document.getElementById("nav-menu").classList.toggle("open");
    });
}

/* ---------- 页面初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
    I18N.init();
    document.documentElement.lang = I18N.lang === "zh-cn" ? "zh-CN" : I18N.lang;
    renderNav();
    /* 翻译静态文案（data-i18n） */
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = i18n(el.textContent.trim());
    });
});
