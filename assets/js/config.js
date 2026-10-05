/* ============================================================
 * 网站配置中心 —— 以后改网站内容，只改这一个文件就够了！
 *
 * 怎么改：
 * 1. 网站标题/副标题     → 改下面的 title / subtitle
 * 2. 头像图片           → 把新图片放进 assets/uploads/ 文件夹，
 *                          然后把 avatar 改成图片文件名
 * 3. 背景图             → 同上，改 background
 * 4. 链接卡片           → 在 links: [ ... ] 里复制一段 { } 修改
 *                          title = 卡片文字
 *                          url    = 点击跳转的地址
 *                          icon   = 卡片图标图片文件名
 *                          color  = 卡片点缀颜色（#RRGGBB 格式）
 * 5. 要删卡片           → 删掉对应的一整段 { ... },
 * 6. 要加卡片           → 复制一段 { ... }, 改内容后粘在最后一行前面
 * 注意：除了中文内容，其他地方别动，图片文件先放进 assets/uploads/
 * ============================================================ */
const SITE_CONFIG = {
    // 网站标题（浏览器标签页和页面大标题）
    title: "欢迎访问",

    // 副标题（大标题下面那行小字）
    subtitle: "探索更多精彩内容",

    // 头像图片（圆形头像，建议正方形图片）
    avatar: "assets/uploads/img_1790701548_0b945101.jpeg",

    // 背景图（整页背景）
    background: "assets/uploads/img_1790701935_7cf45ae8.jpeg",

    // 页脚文字（可以改成你自己的名字或留空）
    footer: 'Powered by <a href="?">SuperLink</a>',

    // ===== 链接卡片列表 =====
    links: [
        {
            title: "购卡地址",
            url: "https://xn--hlrzj456i.xn--um0a82z.vip",
            icon: "assets/uploads/img_1790702145_c502248b.jpeg",
            color: "#667eea"
        },
        {
            title: "TG交流群",
            url: "https://4399.com",
            icon: "assets/uploads/img_1790702274_2ab87cdf.png",
            color: "#333333"
        },
        {
            title: "QQ客服",
            url: "https://qm.qq.com/q/QnWGJfEGQQ",
            icon: "assets/uploads/img_1790702360_1448cf88.jpeg",
            color: "#f093fb"
        },
        {
            title: "QQ交流群",
            url: "https://qun.qq.com/universal-share/share?ac=1&authKey=N%2FJtrnxpGAv8FPqonGsf%2FyMewfvLPGRBBppt7Ae0FMHd4ZO8A0hbjlyEhtPIJGUy&busi_data=eyJncm91cENvZGUiOiI4NjY2MTk3NzUiLCJ0b2tlbiI6IjhNd0FGZFJmaktnRkZCWmNOanExR0lpNmRpSUJNdk8ybXUwWEg3SUtZeEpoZFlWdUhyeld3VWhZQ1lNMTFQaFQiLCJ1aW4iOiIxMjQxOTYxMzExIn0%3D&data=45_CGnKV11LEh75J5mzlot0jRehGduyelU6qCbHZdybLTmSotA0cF663kxULcepvGgVKlg4l4ZlrcwRPrcNA9w&svctype=4&tempid=h5_group_info",
            icon: "assets/uploads/img_1790702497_8f107c28.jpeg",
            color: "#667eea"
        }
    ]
};
