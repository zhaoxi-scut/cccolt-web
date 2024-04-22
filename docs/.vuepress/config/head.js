export const headData = [
  // icon
  [
    'link',
    {
      rel: 'icon',
      href: '/images/favicon.png'
    }
  ],
  // mathjax
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
    }
  ],
  [
    'link',
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
    }
  ],
  // baidu analytics
  [
    "script", {},
    `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?eff1f3112347e09ae4492b92ac49e5eb";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `
  ]
];
