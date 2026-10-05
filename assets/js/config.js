/* ============================================================
 * 红豆商城 —— 配置中心
 * 以后改网站内容，只改这一个文件就够了！
 *
 * 怎么改：
 * 1. 网站名         → 改 siteName
 * 2. 公告文字       → 改 announcement
 * 3. 分类           → 在 categories 数组里加/删名称（用英文逗号隔开）
 * 4. 商品           → 在 products 数组里复制一段 { }, 修改：
 *                        category = 属于哪个分类（必须是上面 categories 里的）
 *                        title    = 商品名称
 *                        price    = 价格（数字）
 *                        stock    = 库存
 *                        sold     = 已售数量
 *                        img      = 商品图片文件名（图片放 assets/uploads/ 里）
 *                        tag      = 商品角标文字（如：自动发货）
 * 5. 客服链接       → 改 qqCustomer（QQ 客服加好友链接）
 * 注意：除了中文内容和数字，其他格式别动
 * ============================================================ */
const SITE_CONFIG = {

    // 网站名（左上角 Logo 和浏览器标题）
    siteName: "红豆",

    // 公告文字（顶部橙色警告）
    announcement: "虚拟产品售出不退，如有问题联系客服。",

    // ===== 分类列表（要加分类就加一个名称） =====
    categories: [
        "三角洲",
        "和平精英",
        "王者荣耀",
        "手机完美环境",
        "售后教程1-1服务"
    ],

    // ===== 商品列表（要加商品就复制一段 { }, ） =====
    products: [
        // ---- 三角洲 ----
        {
            category: "三角洲",
            title: "三角洲行动 天卡",
            price: 24,
            stock: 1,
            sold: 3,
            img: "assets/uploads/cat_delta.jpg",
            tag: "自动发货"
        },
        {
            category: "三角洲",
            title: "三角洲行动 周卡",
            price: 99,
            stock: 1,
            sold: 7,
            img: "assets/uploads/cat_delta.jpg",
            tag: "自动发货"
        },
        {
            category: "三角洲",
            title: "三角洲行动 月卡",
            price: 349,
            stock: 1,
            sold: 2,
            img: "assets/uploads/cat_delta.jpg",
            tag: "自动发货"
        },
        // ---- 和平精英 ----
        {
            category: "和平精英",
            title: "和平精英 天卡",
            price: 24,
            stock: 1,
            sold: 5,
            img: "assets/uploads/cat_pubg.jpg",
            tag: "自动发货"
        },
        {
            category: "和平精英",
            title: "和平精英 周卡",
            price: 99,
            stock: 1,
            sold: 9,
            img: "assets/uploads/cat_pubg.jpg",
            tag: "自动发货"
        },
        {
            category: "和平精英",
            title: "和平精英 月卡",
            price: 349,
            stock: 1,
            sold: 4,
            img: "assets/uploads/cat_pubg.jpg",
            tag: "自动发货"
        },
        // ---- 王者荣耀 ----
        {
            category: "王者荣耀",
            title: "王者荣耀 天卡",
            price: 24,
            stock: 1,
            sold: 6,
            img: "assets/uploads/cat_wzry.jpg",
            tag: "自动发货"
        },
        {
            category: "王者荣耀",
            title: "王者荣耀 周卡",
            price: 99,
            stock: 1,
            sold: 8,
            img: "assets/uploads/cat_wzry.jpg",
            tag: "自动发货"
        },
        {
            category: "王者荣耀",
            title: "王者荣耀 月卡",
            price: 349,
            stock: 1,
            sold: 3,
            img: "assets/uploads/cat_wzry.jpg",
            tag: "自动发货"
        },
        // ---- 手机完美环境 ----
        {
            category: "手机完美环境",
            title: "手机完美环境 天卡",
            price: 24,
            stock: 1,
            sold: 2,
            img: "assets/uploads/cat_phone.jpg",
            tag: "自动发货"
        },
        {
            category: "手机完美环境",
            title: "手机完美环境 周卡",
            price: 99,
            stock: 1,
            sold: 5,
            img: "assets/uploads/cat_phone.jpg",
            tag: "自动发货"
        },
        {
            category: "手机完美环境",
            title: "手机完美环境 月卡",
            price: 349,
            stock: 1,
            sold: 1,
            img: "assets/uploads/cat_phone.jpg",
            tag: "自动发货"
        },
        // ---- 售后教程1-1服务 ----
        {
            category: "售后教程1-1服务",
            title: "售后教程 1-1服务 单次",
            price: 15,
            stock: 10,
            sold: 12,
            img: "assets/uploads/cat_service.jpg",
            tag: "人工服务"
        },
        {
            category: "售后教程1-1服务",
            title: "售后教程 1-1服务 包周",
            price: 99,
            stock: 10,
            sold: 6,
            img: "assets/uploads/cat_service.jpg",
            tag: "人工服务"
        }
    ],

    // ===== 客服链接（悬浮客服按钮跳转地址） =====
    qqCustomer: "https://qm.qq.com/q/QnWGJfEGQQ"
};
