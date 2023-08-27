# simple-scaffold

一个最简单的脚手架入门实例
入门详细教程：[juejin.cn](https://juejin.cn/post/7260144602471776311#heading-9)

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
git clone https://github.com/chenyajin/simple-scaffold.git

# 进入项目
cd simple-scaffold

# 安装依赖
pnpm i

# 进去测试包
cd examples/app

# 本地文件拷贝shell
pnpm mortal copy --name=project

# git仓库模版文件拷贝shell
pnpm mortal create --name=project

# 命令行解释说明
pnpm mortal use

## 命令解释
# mortal => mortal-cli脚手架中自定义脚本命令
# ['create', 'c', 'copy', 'use'] => 自定义子命令
# ['name', 'n'] => 命令行参数
```
