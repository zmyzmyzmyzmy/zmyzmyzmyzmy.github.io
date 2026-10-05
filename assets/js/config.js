/* ============================================================
 * 入口导航页 —— 配置中心
 * 以后改内容，只改这一个文件！
 * 怎么改：
 *   title/subtitle  = 标题和副标题
 *   avatar/background = 头像和背景图（图片放 assets/uploads/）
 *   links 里每个 { } 是一个链接卡片：
 *       title = 卡片文字
 *       url   = 点击跳转的地址
 *       icon  = 图标图片文件名
 *       color = 卡片颜色
 * 注意：除了中文内容和地址，其他格式别动
 * ============================================================ */
const SITE_CONFIG = {
    title: "欢迎访问",
    subtitle: "探索更多精彩内容",
    avatar: "assets/uploads/img_1790701548_0b945101.jpeg",
    background: "assets/uploads/img_1790701935_7cf45ae8.jpeg",
    footer: 'Powered by <a href="?">SuperLink</a>',

    links: [
        {
            title: "购卡地址",
            url: "shop/index.html",
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
