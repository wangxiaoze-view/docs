import { defineConfig } from "vitepress";
import {
	containerPreview,
	componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "项目文档",
	description: "文档",
	head: [
		[
			"link",
			{
				rel: "icon",
				href: "/logo.png",
			},
		],

		[
			"script",
			{},
			`
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-MT2ZDS8K');
			`,
		],
		[
			"script",
			{},
			`
				(function () {
				var hm = document.createElement("noscript");
				var iframe = document.createElement("iframe");
				iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-MT2ZDS8K";
				iframe.height = 0;
				iframe.width = 0;
				iframe.style.display = "none";
				iframe.style.visibility = "hidden";
				hm.appendChild(iframe)
				var s = document.querySelector("#app");
				s.parentNode.insertBefore(hm, s);
			})();
				`,
		],
		[
			"script",
			{},
			`
				var _hmt = _hmt || [];
				(function() {
					var hm = document.createElement("script");
					hm.src = "https://hm.baidu.com/hm.js?bfe6bd3cd2803cec6edda2872eb3faa2";
					var s = document.getElementsByTagName("script")[0]; 
					s.parentNode.insertBefore(hm, s);
				})();
			`,
		],
	],
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "主页", link: "/" },
			{ text: "安帮客", link: "/abk/rule/team-rule" },
			{
				text: "个人项目",
				items: [
					{ text: "utils-tools", link: "https://docs-tools.wangzevw.com/" },
					{ text: "知识库", link: "https://www.wangzevw.com" },
					{ text: "Demos", link: "https://demos.wangzevw.com" },
					{ text: "日志上报", link: "/personal/log-reporting/v1" },
					{ text: "sim-admin", link: "/personal/sim-admin/1" },
					{ text: "一键代码拉取", link: "/personal/temp-pro/docs" },
					{ text: "桌面端开发工具", link: "/personal/dev-tools/info" },
					{ text: "远程组件", link: "/personal/remote-components-lib/info" },
				],
			},
			{
				text: "统计",
				link: "https://cloud.umami.is/share/oKGfvOl37vYbyq06/docs.wangzevw.com",
			},
		],

		sidebar: {
			"/abk/": [
				{
					text: "规约须知",
					items: [
						{ text: "团队规约", link: "/abk/rule/team-rule" },
						{ text: "Gi规约", link: "/abk/rule/git-rule" },
						{ text: "前端开发规约", link: "/abk/rule/dev-rule" },
					],
				},
				{
					text: "环境配置",
					items: [
						{ text: "环境配置", link: "/abk/sys/env-sys" },
						{ text: "开发工具", link: "/abk/sys/dev-sys" },
					],
				},
				{
					text: "项目文档",
					items: [
						{ text: "工具文档（老项目）", link: "/abk/docs/utils-docs" },
						{ text: "项目功能规避问题（老项目）", link: "/abk/docs/pro-docs" },
					],
				},
				{
					text: "项目地址",
					items: [{ text: "项目地址", link: "/abk/link/doc-link" }],
				},
			],
			"/personal/": [
				{
					text: "log-reporting",
					items: [
						{ text: "V1", link: "/personal/log-reporting/v1" },
						{ text: "V2", link: "/personal/log-reporting/v2" },
					],
				},
				{
					text: "sim-admin",
					items: [{ text: "敬请期待", link: "/personal/sim-admin/1" }],
				},
				{
					text: "temp-pro",
					items: [{ text: "如何使用", link: "/personal/temp-pro/docs" }],
				},
				{
					text: "dev-tools",
					items: [
						{ text: "介绍", link: "/personal/dev-tools/info" },
						{ text: "环境配置", link: "/personal/dev-tools/env" },
						{ text: "常见问题", link: "/personal/dev-tools/bug" },
					],
				},
				{
					text: "remote-components-lib",
					items: [
						{ text: "介绍", link: "/personal/remote-components-lib/info" },
						{ text: "常见问题", link: "/personal/remote-components-lib/issue" },
						{
							text: "Element-plus",
							link: "/personal/remote-components-lib/element",
						},
						{ text: "Vant", link: "/personal/remote-components-lib/vant" },
						{ text: "枚举", link: "/personal/remote-components-lib/enum" },
						{ text: "hooks", link: "/personal/remote-components-lib/hooks" },
						{ text: "utils", link: "/personal/remote-components-lib/utils" },
					],
				},
			],
		},

		socialLinks: [
			{ icon: "github", link: "https://github.com/wangxiaoze-view" },
		],
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2024-present 王小泽",
		},
		docFooter: {
			prev: "上一页",
			next: "下一页",
		},
		search: {
			provider: "algolia",
			options: {
				appId: "WU1AJP2TAZ",
				apiKey: "7482b3c521667f0d090c5a782450b94d",
				indexName: "wangxiaoze",
			},
		},
	},
	markdown: {
		config(md) {
			md.use(containerPreview);
			md.use(componentPreview);
		},
	},
});
