/* ============================================================
 * 商城 —— 配置中心
 * 以后改内容，只改这一个文件！
 *
 * 怎么改：
 *   SHOP.title         = 商城标题（品牌名）
 *   SHOP.notice        = 顶部公告文字
 *   SHOP.footer        = 底部文字
 *   SHOP.categories[]  = 分类列表（每个 { } 一个分类）
 *       name = 分类名称
 *       icon = 分类图标图片
 *   SHOP.items[]       = 商品列表（每个 { } 一个商品）
 *       name      = 商品名称
 *       category  = 属于哪个分类（填分类的 id）
 *       price     = 价格（数字）
 *       cover     = 商品图片
 *       desc      = 商品详情说明（支持换行 \n）
 *       stock     = 库存
 *       keys      = 卡密列表（每行一个卡密，买一个发一个）
 *       note      = 卡密弹窗里的使用说明
 *   SHOP.pays[]       = 支付方式列表
 *
 * 注意：除了内容和地址，其他格式别动
 * ============================================================ */
const SHOP = {
    title: "红豆",
    notice: "虚拟产品售出不退，如有问题联系客服。",
    footer: "红豆商城 · 自动发货",
    contact_placeholder: "请输入联系方式",

    /* ---------- 分类（5 个） ---------- */
    categories: [
        { id: 1, name: "三角洲",      icon: "assets/uploads/cat_delta.jpg" },
        { id: 2, name: "和平精英",    icon: "assets/uploads/cat_pubg.jpg" },
        { id: 3, name: "王者荣耀",    icon: "assets/uploads/cat_wzry.jpg" },
        { id: 4, name: "手机完美环境", icon: "assets/uploads/cat_phone.jpg" },
        { id: 5, name: "售后教程1-1服务", icon: "assets/uploads/cat_service.jpg" }
    ],

    /* ---------- 商品 ---------- */
    items: [
        /* 三角洲 */
        { id: 1,  name: "三角洲天卡",   category: 1, price: 25,  cover: "assets/uploads/cat_delta.jpg",  stock: 1, desc: "三角洲天卡，自动发货，秒发卡密。", keys: ["HD-TRI-2385-001", "HD-TRI-2385-002"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 2,  name: "三角洲周卡",   category: 1, price: 100, cover: "assets/uploads/cat_delta.jpg",  stock: 1, desc: "三角洲周卡，自动发货，秒发卡密。", keys: ["HD-TRI-WK-7712", "HD-TRI-WK-7713"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 3,  name: "三角洲月卡",   category: 1, price: 350, cover: "assets/uploads/cat_delta.jpg",  stock: 1, desc: "三角洲月卡，自动发货，秒发卡密。", keys: ["HD-TRI-MO-9011", "HD-TRI-MO-9012"], note: "卡密为一行一个，复制到游戏内兑换。" },

        /* 和平精英 */
        { id: 4,  name: "和平精英天卡", category: 2, price: 15,  cover: "assets/uploads/cat_pubg.jpg",  stock: 1, desc: "和平精英天卡，自动发货，秒发卡密。", keys: ["HD-PUBG-1182", "HD-PUBG-1183"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 5,  name: "和平精英周卡", category: 2, price: 100, cover: "assets/uploads/cat_pubg.jpg",  stock: 1, desc: "和平精英周卡，自动发货，秒发卡密。", keys: ["HD-PUBG-WK-5520", "HD-PUBG-WK-5521"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 6,  name: "和平精英月卡", category: 2, price: 350, cover: "assets/uploads/cat_pubg.jpg",  stock: 1, desc: "和平精英月卡，自动发货，秒发卡密。", keys: ["HD-PUBG-MO-3366", "HD-PUBG-MO-3367"], note: "卡密为一行一个，复制到游戏内兑换。" },

        /* 王者荣耀 */
        { id: 7,  name: "王者荣耀天卡", category: 3, price: 15,  cover: "assets/uploads/cat_wzry.jpg",  stock: 1, desc: "王者荣耀天卡，自动发货，秒发卡密。", keys: ["HD-WZRY-8841", "HD-WZRY-8842"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 8,  name: "王者荣耀周卡", category: 3, price: 100, cover: "assets/uploads/cat_wzry.jpg",  stock: 1, desc: "王者荣耀周卡，自动发货，秒发卡密。", keys: ["HD-WZRY-WK-2290", "HD-WZRY-WK-2291"], note: "卡密为一行一个，复制到游戏内兑换。" },
        { id: 9,  name: "王者荣耀月卡", category: 3, price: 350, cover: "assets/uploads/cat_wzry.jpg",  stock: 1, desc: "王者荣耀月卡，自动发货，秒发卡密。", keys: ["HD-WZRY-MO-6602", "HD-WZRY-MO-6603"], note: "卡密为一行一个，复制到游戏内兑换。" },

        /* 手机完美环境 */
        { id: 10, name: "环境搭建·基础版",  category: 4, price: 50,  cover: "assets/uploads/cat_phone.jpg", stock: 1, desc: "手机完美环境基础版，远程协助搭建，自动发货。", keys: ["HD-ENV-BASE-001", "HD-ENV-BASE-002"], note: "付款后请加客服QQ获取远程协助服务。" },
        { id: 11, name: "环境搭建·高级版",  category: 4, price: 100, cover: "assets/uploads/cat_phone.jpg", stock: 1, desc: "手机完美环境高级版，远程协助搭建，自动发货。", keys: ["HD-ENV-PRO-001", "HD-ENV-PRO-002"], note: "付款后请加客服QQ获取远程协助服务。" },
        { id: 12, name: "环境搭建·尊享版",  category: 4, price: 200, cover: "assets/uploads/cat_phone.jpg", stock: 1, desc: "手机完美环境尊享版，远程协助搭建，自动发货。", keys: ["HD-ENV-MAX-001", "HD-ENV-MAX-002"], note: "付款后请加客服QQ获取远程协助服务。" },

        /* 售后教程1-1服务 */
        { id: 13, name: "售后教程服务",   category: 5, price: 50,  cover: "assets/uploads/cat_service.jpg", stock: 1, desc: "售后教程1-1服务，下单后由客服一对一处理，自动发货。", keys: ["HD-AFT-SVC-001", "HD-AFT-SVC-002"], note: "付款后请加客服QQ，客服会在一对一服务中为你处理。" },
        { id: 14, name: "一对一指导",     category: 5, price: 100, cover: "assets/uploads/cat_service.jpg", stock: 1, desc: "售后教程1-1服务·一对一指导，下单后由客服一对一处理，自动发货。", keys: ["HD-AFT-TUT-001", "HD-AFT-TUT-002"], note: "付款后请加客服QQ，客服会在一对一服务中为你处理。" }
    ],

    /* ---------- 支付方式（图标为内嵌SVG，不用额外图片文件） ---------- */
    pays: [
        { id: 1, name: "WeChat", icon: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="8" fill="#07c160"/><text x="20" y="27" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle" font-family="Arial">微</text></svg>'), color: "#07c160" },
        { id: 2, name: "Alipay", icon: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="8" fill="#1677ff"/><text x="20" y="27" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle" font-family="Arial">支</text></svg>'), color: "#1677ff" },
        { id: 3, name: "QQ钱包", icon: "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="8" fill="#12b7f5"/><text x="20" y="27" font-size="14" font-weight="bold" fill="#fff" text-anchor="middle" font-family="Arial">QQ</text></svg>'), color: "#12b7f5" }
    ],

    /* ---------- 语言（zh-cn 默认；其他语言缺词时自动回退中文） ---------- */
    langs: [
        { code: "zh-cn", name: "简体中文", short: "简" },
        { code: "zh-tw", name: "繁體中文", short: "繁" },
        { code: "en",    name: "English",  short: "EN" },
        { code: "ja",    name: "日本語",   short: "日" }
    ]
};

/* 英文词典：key 是中文，value 是英文 */
const I18N_EN = {
    "购物": "Shop", "订单查询": "Order Lookup",
    "公告": "Notice", "购买": "Buy",
    "虚拟产品售出不退，如有问题联系客服。": "Virtual products are non-refundable once sold. Contact customer service if any issue.",
    "自动发货": "Auto Delivery", "库存": "Stock", "已售": "Sold", "售罄": "Sold Out",
    "没有商品": "No products", "请输入要搜索的商品名称关键词": "Please enter product keywords to search",
    "联系方式": "Contact", "数量": "Quantity", "验证码": "CAPTCHA",
    "支付方式": "Payment", "商品详情": "Product Details",
    "您购买的宝贝信息": "Your purchased item info",
    "复制": "Copy", "下载": "Download", "卡密已复制": "Card key copied",
    "复制失败，请手动选中上方内容复制": "Copy failed, please select and copy manually",
    "使用说明": "Usage instructions",
    "订单查询": "Order Lookup", "订单号/联系方式": "Order No. / Contact", "查询订单": "Find Order",
    "待付款": "Pending", "已付款": "Paid", "未知状态": "Unknown",
    "等待发货": "Waiting Shipment", "已发货": "Shipped",
    "宝贝内容": "Item Content", "订单金额": "Amount",
    "下单时间": "Order Time", "付款时间": "Pay Time",
    "支付方式": "Payment Method", "商品类型": "Type",
    "查看卡密": "View Card", "请输入查询密码": "Enter password",
    "正在解密数据": "Decrypting",
    "登录": "Sign In", "注册": "Sign Up",
    "用户名/手机号/邮箱": "Username / Mobile / Email", "密码": "Password",
    "记住我": "Stay Signed In", "忘记密码?": "Forgot password?",
    "还没有账号？立即注册": "No account yet? Sign Up Now",
    "登录红豆，优惠多多！": "Sign In 红豆 for more discounts!",
    "用户名（可中文）": "Username (Chinese allowed)", "设置登录密码": "Set Login Password",
    "已有账号？去登录": "Have an account? Go to Sign In",
    "请输入联系方式": "Please enter your contact",
    "图形验证码": "Image CAPTCHA",
    "请输入要搜索的商品名称关键词": "Please enter product keywords to search",
    "搜索商品关键词..": "Search product keywords..",
    "确认支付": "Confirm Pay", "我已支付": "I've Paid", "扫码支付": "Scan to Pay",
    "请使用对应APP扫描二维码": "Please scan the QR code with the corresponding app",
    "订单号": "Order No.", "实付金额": "Paid Amount",
    "我的订单": "My Orders", "退出登录": "Logout",
    "没有找到相关订单": "No orders found",
    "请输入联系方式或订单号再查询": "Please enter contact or order no.",
    "请输入正确的验证码": "Incorrect captcha", "请填写所有必填项": "Please fill in all required fields",
    "用户名已存在": "Username already exists", "注册成功": "Registered successfully",
    "用户名或密码错误": "Wrong username or password", "登录成功": "Signed in successfully",
    "库存不足": "Out of stock", "下单成功，请完成支付": "Order created, please complete payment",
    "支付成功": "Payment successful",
    "分享链接复制成功，快去分享给朋友吧！": "Share link copied! Share it with friends!",
    "还没有登录，请先登录": "Please sign in first"
};

/* 繁体词典 */
const I18N_TW = {
    "购物": "購物", "订单查询": "訂單查詢",
    "公告": "公告", "购买": "購買",
    "虚拟产品售出不退，如有问题联系客服。": "虛擬產品售出不退，如有問題請聯繫客服。",
    "自动发货": "自動發貨", "库存": "庫存", "已售": "已售", "售罄": "售罄",
    "没有商品": "沒有商品", "请输入要搜索的商品名称关键词": "請輸入要搜尋的商品名稱關鍵字",
    "联系方式": "聯絡方式", "数量": "數量", "验证码": "驗證碼",
    "支付方式": "支付方式", "商品详情": "商品詳情",
    "您购买的宝贝信息": "您購買的寶貝資訊",
    "复制": "複製", "下载": "下載", "卡密已复制": "卡密已複製",
    "复制失败，请手动选中上方内容复制": "複製失敗，請手動選取上方內容複製",
    "使用说明": "使用說明",
    "订单号/联系方式": "訂單號/聯絡方式", "查询订单": "查詢訂單",
    "待付款": "待付款", "已付款": "已付款", "未知状态": "未知狀態",
    "等待发货": "等待發貨", "已发货": "已發貨",
    "宝贝内容": "寶貝內容", "订单金额": "訂單金額",
    "下单时间": "下單時間", "付款时间": "付款時間",
    "支付方式": "支付方式", "商品类型": "商品類型",
    "查看卡密": "查看卡密", "请输入查询密码": "請輸入查詢密碼",
    "正在解密数据": "正在解密資料",
    "登录": "登入", "注册": "註冊",
    "用户名/手机号/邮箱": "用戶名/手機號/郵箱", "密码": "密碼",
    "记住我": "記住我", "忘记密码?": "忘記密碼?",
    "还没有账号？立即注册": "還沒有帳號？立即註冊",
    "登录红豆，优惠多多！": "登入紅豆，優惠多多！",
    "用户名（可中文）": "用戶名（可中文）", "设置登录密码": "設定登入密碼",
    "已有账号？去登录": "已有帳號？去登入",
    "请输入联系方式": "請輸入聯絡方式",
    "图形验证码": "圖形驗證碼",
    "搜索商品关键词..": "搜尋商品關鍵字..",
    "确认支付": "確認支付", "我已支付": "我已支付", "扫码支付": "掃碼支付",
    "请使用对应APP扫描二维码": "請使用對應APP掃描二維碼",
    "订单号": "訂單號", "实付金额": "實付金額",
    "我的订单": "我的訂單", "退出登录": "退出登入",
    "没有找到相关订单": "沒有找到相關訂單",
    "请输入联系方式或订单号再查询": "請輸入聯絡方式或訂單號再查詢",
    "请输入正确的验证码": "請輸入正確的驗證碼", "请填写所有必填项": "請填寫所有必填項",
    "用户名已存在": "用戶名已存在", "注册成功": "註冊成功",
    "用户名或密码错误": "用戶名或密碼錯誤", "登录成功": "登入成功",
    "库存不足": "庫存不足", "下单成功，请完成支付": "下單成功，請完成支付",
    "支付成功": "支付成功",
    "分享链接复制成功，快去分享给朋友吧！": "分享連結複製成功，快去分享給朋友吧！",
    "还没有登录，请先登录": "還沒有登入，請先登入"
};

/* 日语词典（常用词） */
const I18N_JA = {
    "购物": "ショッピング", "订单查询": "注文照会",
    "公告": "お知らせ", "购买": "購入",
    "虚拟产品售出不退，如有问题联系客服。": "バーチャル商品は一度販売すると返品できません。問題があればカスタマーサービスにお問い合わせください。",
    "自动发货": "自動配信", "库存": "在庫", "已售": "販売済み", "售罄": "売り切れ",
    "没有商品": "商品がありません", "请输入要搜索的商品名称关键词": "検索キーワードを入力してください",
    "联系方式": "連絡先", "数量": "数量", "验证码": "認証コード",
    "支付方式": "支払い方法", "商品详情": "商品詳細",
    "您购买的宝贝信息": "購入した商品情報",
    "复制": "コピー", "下载": "ダウンロード", "卡密已复制": "カードキーをコピーしました",
    "复制失败，请手动选中上方内容复制": "コピーに失敗しました。手動でコピーしてください",
    "使用说明": "使用方法",
    "订单号/联系方式": "注文番号/連絡先", "查询订单": "注文を検索",
    "待付款": "未払い", "已付款": "支払い済み", "未知状态": "不明",
    "等待发货": "発送待ち", "已发货": "発送済み",
    "宝贝内容": "商品内容", "订单金额": "注文金額",
    "下单时间": "注文時間", "付款时间": "支払い時間",
    "支付方式": "支払い方法", "商品类型": "タイプ",
    "查看卡密": "カードキーを見る", "请输入查询密码": "パスワードを入力してください",
    "正在解密数据": "復号中",
    "登录": "ログイン", "注册": "登録",
    "用户名/手机号/邮箱": "ユーザー名/電話番号/メール", "密码": "パスワード",
    "记住我": "ログイン状態を保持", "忘记密码?": "パスワードをお忘れですか?",
    "还没有账号？立即注册": "アカウントがありませんか？今すぐ登録",
    "登录红豆，优惠多多！": "紅豆にログインして特典をゲット！",
    "用户名（可中文）": "ユーザー名（中国語可）", "设置登录密码": "ログインパスワード設定",
    "已有账号？去登录": "アカウントをお持ちですか？ログイン",
    "请输入联系方式": "連絡先を入力してください",
    "图形验证码": "画像認証コード",
    "搜索商品关键词..": "商品キーワード検索..",
    "确认支付": "支払い確認", "我已支付": "支払い済み", "扫码支付": "QRコード支払い",
    "请使用对应APP扫描二维码": "対応するアプリでQRコードをスキャンしてください",
    "订单号": "注文番号", "实付金额": "支払金額",
    "我的订单": "マイ注文", "退出登录": "ログアウト",
    "没有找到相关订单": "注文が見つかりません",
    "请输入联系方式或订单号再查询": "連絡先または注文番号を入力してください",
    "请输入正确的验证码": "認証コードが正しくありません", "请填写所有必填项": "必須項目をすべて入力してください",
    "用户名已存在": "ユーザー名は既に存在します", "注册成功": "登録成功",
    "用户名或密码错误": "ユーザー名またはパスワードが間違っています", "登录成功": "ログイン成功",
    "库存不足": "在庫不足", "下单成功，请完成支付": "注文が作成されました。支払いを完了してください",
    "支付成功": "支払い成功",
    "分享链接复制成功，快去分享给朋友吧！": "共有リンクをコピーしました！友達に共有しましょう！",
    "还没有登录，请先登录": "ログインしてください"
};
