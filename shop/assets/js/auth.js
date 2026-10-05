/* ============================================================
 * 登录/注册逻辑（本地模拟）
 * ============================================================ */
(() => {
    const isLogin = !!document.getElementById("login-form");
    const isRegister = !!document.getElementById("register-form");
    if (!isLogin && !isRegister) return;

    const page = isLogin ? "login" : "register";

    /* 占位符 */
    if (isLogin) {
        document.getElementById("inp-username").placeholder = i18n("用户名/手机号/邮箱");
        document.getElementById("inp-password").placeholder = i18n("密码");
    } else {
        document.getElementById("inp-username").placeholder = i18n("用户名（可中文）");
        document.getElementById("inp-password").placeholder = i18n("设置登录密码");
    }
    document.getElementById("inp-captcha").placeholder = i18n("图形验证码");

    /* 验证码 */
    const canvas = document.getElementById("captcha-canvas");
    captcha.draw(canvas);
    canvas.addEventListener("click", () => captcha.draw(canvas));

    const form = document.getElementById(page === "login" ? "login-form" : "register-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("inp-username").value.trim();
        const password = document.getElementById("inp-password").value.trim();
        const captchaVal = document.getElementById("inp-captcha").value.trim();

        if (!username || !password) { message.error(i18n("请填写所有必填项")); return; }
        if (!captcha.verify(captchaVal)) { message.error(i18n("请输入正确的验证码")); captcha.draw(canvas); return; }

        if (page === "register") {
            const res = auth.register(username, password);
            if (!res.ok) { message.error(res.msg); return; }
            message.success(res.msg);
            setTimeout(() => { location.href = "login.html"; }, 800);
        } else {
            const stay = document.getElementById("inp-stay").checked;
            const res = auth.login(username, password, stay);
            if (!res.ok) { message.error(res.msg); captcha.draw(canvas); return; }
            message.success(res.msg);
            setTimeout(() => { location.href = "index.html"; }, 800);
        }
    });
})();
