# simple-scaffold

一个最简单的脚手架入门实例
详细教程：[juejin](https://juejin.cn/post/7260144602471776311#heading-9)

## 环境

- node 16+
- 包管理器：pnpm
- monorepo 搭建

## 功能点

- [x] 命令参数模块
- [x] 用户交互模块
- [x] 文件夹拷贝模块
- [x] 文件流拷贝模块
- [x] 动态文件生成模块
- [x] 自动安装依赖模块

## 基础依赖包

- [yargs](https://www.npmjs.com/package/yargs) 解析命令行参数
- [inquirer](https://www.npmjs.com/package/inquirer) 建立询问式的交互
- [copy-dir](https://www.npmjs.com/package/copy-dir) 实现文件拷贝
- [mustache](https://www.npmjs.com/package/mustache) 动态更改文件
- [ora](https://www.npmjs.com/package/ora) 实现加载动画

## 快速开始

```shell

# 克隆项目
git clone https://github.com/chenyajin/simple-scaffold.git

# 进入项目
cd simple-scaffold

# 安装依赖
pnpm i

# 使用
cd examples/app
# mac中需要这样写
pnpm mortal create --name=project
# windows中需要这样写
pnpm mortal create -- --name=project

## 命令解释
# mortal => mortal-cli脚手架中自定义脚本命令
# ['create', 'c'] => 自定义子命令
# ['name', 'n'] => 命令行参数
```
