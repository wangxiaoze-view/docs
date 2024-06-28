import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "项目文档",
	description: "文档",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "utils-tools", link: "https://docs-tools.wangzevw.com/" },
			{ text: "主页", link: "/" },
			{ text: "安帮客", link: "/abk/rule/team-rule" },
			{
				text: "个人项目",
				items: [
					{ text: "log-reporting", link: "/personal/log-reporting/v1" },
					{ text: "sim-admin", link: "/personal/sim-admin/1" },
					{ text: "temp-pro", link: "/personal/temp-pro/1" },
				],
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
					items: [{ text: "敬请期待", link: "/personal/temp-pro/1" }],
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
});
