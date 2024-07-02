---
outline: deep
---

# 环境配置

## 技术栈

`vue3/2 + vuex/pinia + javascript/typescript + vue-router + eslint/oxlint + stylelint +  husky + lint-staged`

## 组件库：

1. [**element-plus**](https://element-plus.org/zh-CN/): 用于 pc 项目；目前 pc 的项目基本是这个;
2. [**vant**](https://vant-ui.github.io/vant/#/zh-CN): h5 + 混合开发项目；
3. [**layui**](https://layui.dev/): 老项目(pc + h5)
4. [**thorUI**](https://thorui.cn/doc/docs/introduce.html): 用于小程序(uni-app);

## 环境配置:

- 下载`nvm`安装不同版本的`node`以适配不同的项目;
  - [mac 安装 nvm 链接(点击查看)](https://github.com/nvm-sh/nvm);
  - [windows 安装链接](https://github.com/coreybutler/nvm-windows);
- 当然也是可以用`fnm`去做包管理，`node`官网也是推荐的;与`nvm`的区别
  - `nvm`是`shell`编写，而`fnm`是`rust`编写，速度更快
  - 安装方式不同 [github](https://github.com/Schniz/fnm?tab=readme-ov-file), [node+fnm](https://nodejs.org/en/download/package-manager)
- 安装不一样的包管理，配置完成`node`之后默认的安装为`npm`;
  - **npm**: 默认的安装， 安装速度有点慢，有赖于镜像地址;
  - **yarn**: 安装速度比`npm`快一些，使用比较稳定;
  - **pnpm**: 不一样的安装方式, 节省磁盘空间;
- 切换镜像源`nrm`, 可以通过`install`安装全局；
  - `npm/yarn/pnpm install -g nrm`；
  - 使用`nvm`安装的`node`，安装的全局依赖在切换`node`版本之后就不存在了；

## Git 配置

下载安装`git`， 配置相对应的用户信息

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的电子邮箱"
```

## 其他工作需要

- **企业邮箱**: 技术老大或者管理员配置；
- **GitLab 公司私有仓库**: 技术老大或者管理员配置，建议修改默认密码；代码合并联系`技术经理`；
- **Tapd 任务调度**：用企业邮箱登录;
- **蓝狐(项目原型以及设计稿)**: 用企业邮箱登录; 如果没有权限联系`产品经理`
- **yapi**: 技术老大或者管理员配置，建议修改默认密码;

## 常用地址

- **yapi**: http://yapi.dev.anbangke.com
- **jenkins**: http://jenkins.dev.anbangke.com
- **gitlab**: http://gitlab.dev.anbangke.com
- **App 下载（内测版本）**: https://h5.anbangke.com/html/appdown.html
