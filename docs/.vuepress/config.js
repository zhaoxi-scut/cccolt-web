
module.exports = {
    title: "Cccolt 个人主页",
    description: "带你快速了解 Cccolt 的个人信息",
    head: [
        ["link", { rel: "icon", href: "/favicon.png" }],
        [
            "script", {}, `
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?eff1f3112347e09ae4492b92ac49e5eb";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
            `
        ]
    ],
    themeConfig: {
        nav: [
            { text: "首页", link: "/" },
            { text: "项目", link: "/projects/" },
            { text: "网络", link: "/proxy/" },
            { text: "教程", link: "/tutorial/" },
            { text: "Github", link: "https://github.com/zhaoxi-scut/cccolt-web" }
        ],
        sidebar: {
            "/projects/rmvl/": [
                "", "quick_start", "doc_navigation"
            ],
            "/proxy/": [
                "", "client", "server"
            ],
            "/tutorial/cmake/": [
                "01", "02", "03", "04", "05", "06", "07", "08", "09"
            ],
            "/tutorial/": [
                "", "cmake"
            ]
        },
        sidebarDepth: 3
    }
}