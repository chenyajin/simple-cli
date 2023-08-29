# simple-cli

一个最简单的适合入门的脚手架实例
入门详细教程：[juejin.cn](https://juejin.cn/post/7272213962058301451)

## 环境

- node 16+
- 包管理器：pnpm
- monorepo 搭建

## 功能点

- [x] 命令参数解析校验、询问时交互。
- [x] copy: 实现本地模版文件的拷贝并自动安装依赖。
- [x] create: 实现从 git 仓库选取分支拉取模版代码。

## 第三方库

- [yargs](https://www.npmjs.com/package/yargs) node 命令解决方案。
- [inquirer](https://www.npmjs.com/package/inquirer) 在 shell 命令行中建立询问式交互
- [copy-dir](https://www.npmjs.com/package/copy-dir) 实现文件拷贝
- [mustache](https://www.npmjs.com/package/mustache) 动态更改文件
- [ora](https://www.npmjs.com/package/ora) 在 shell 命令行中实现加载动画
- [fs-extra](https://www.npmjs.com/package/fs-extra) 操作文件的库，比 node 自带的 fs 更强大一些
- [download-git-repo](https://www.npmjs.com/package/download-git-repo) 下载 git 仓库

## 快速开始

```shell

# 克隆项目
git clone https://github.com/chenyajin/simple-cli.git

# 进入项目根目录
cd simple-cli

# 安装依赖
pnpm i

# 打包脚手架
cd packages/simple-cli
npm run build:watch
cd ../..

# 进去测试包（目的：将测试包和核心包隔离）
cd examples/app

# 本地文件拷贝shell
pnpm cli copy

# git仓库模版文件拷贝shell
pnpm cli create

# 命令行解释说明
pnpm cli use

# 最终的结果文件显示在当前操作目录下
## 命令解释
# cli => simple-cli脚手架中自定义脚本命令
# ['create', 'c', 'copy', 'use'] => 自定义子命令
# ['name', 'n'] => 命令行参数
```
