#!/usr/bin/env node
const path = require('path');
// 获取命令行参数模块
const yargs = require("yargs")
// 建立询问时交互模块
const { inquirerPrompt, install } = require("./inquirer");
// 拷贝文件夹模块
const { copyDir, copyFile, copyTemplate, checkMkdirExists } = require("./copy");

yargs.command(
  ['create', 'c'],
  '新建一个模板',
  function (yargs) {
    return yargs.option('name', {
      alias: 'n',
      demand: true,
      describe: '模板名称',
      type: 'string'
    })
  },
  function (argv) {
    inquirerPrompt(argv).then(answers => {
      const { name, type } = answers;
      const isMkdirExists = checkMkdirExists(
        path.resolve(process.cwd(), `./src/pages/${name}`)
      );
      if (isMkdirExists) {
        console.log(`${name}文件夹已经存在`)
      } else {
        // 1、拷贝文件夹
        // copyDir(
        //   path.resolve(__dirname, `./template/${type}`),
        //   path.resolve(process.cwd(), `./src/pages/${name}`)
        // )
        // // 2、拷贝文件
        // copyFile(
        //   path.resolve(__dirname, `./template/${type}/index.js`),
        //   path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
        //   {
        //     name,
        //   }
        // )
        // 3、拷贝模版
        copyTemplate(
          path.resolve(__dirname, `./template/${type}/index.tpl`),
          path.resolve(process.cwd(), `./src/pages/${name}/index.js`),
          {
            name,
          }
        )
        install(process.cwd(), answers);
      }
    })
  }
).argv;