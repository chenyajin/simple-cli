import inquirer from 'inquirer';
import { exec } from 'child_process';
import path from 'path';
import ora from "ora";


const isOverride = async (name, targetDir) => {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        // 提示信息
        message: `${name} is existed, do you want to overwrite this directory`,
        // 选项
        choices: [
          { name: 'overwrite', value: true },
          { name: 'cancel', value: false },
        ],
      },
    ]).then(options => {
      const { action } = options
      resolve(action)
    })
  })
}


// 交互式询问列表
function inquirerPrompt (argv) {
  const { name } = argv;
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: name,
        validate: function (val) {
          if (!/^[a-zA-Z]+$/.test(val)) {
            return "模板名称只能含有英文";
          }
          if (!/^[A-Z]/.test(val)) {
            return "模板名称首字母必须大写"
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose Template type',
        choices: ['form', 'dynamicForm', 'nestedForm'],
        filter: function (value) {
          return {
            'form': "form",
            'dynamicForm': "dynamicForm",
            'nestedForm': "nestedForm",
          }[value];
        },
      },
      {
        type: 'list',
        message: 'Choose Frame type',
        choices: ['vue', 'react'],
        name: 'frame',
      }
    ]).then(answers => {
      const { frame } = answers;
      if (frame === 'react') {
        inquirer.prompt([
          {
            type: 'list',
            message: 'Choose UI Library',
            choices: [
              'Ant Design',
            ],
            name: 'library',
          }
        ]).then(answers1 => {
          resolve({
            ...answers,
            ...answers1,
          })
        }).catch(error => {
          reject(error)
        })
      }

      if (frame === 'vue') {
        inquirer.prompt([
          {
            type: 'list',
            message: 'Choose UI Library',
            choices: ['Element'],
            name: 'library',
          }
        ]).then(answers2 => {
          resolve({
            ...answers,
            ...answers2,
          })
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  })

}

const LibraryMap = {
  'Ant Design': 'antd',
  'iView': 'view-ui-plus',
  'Ant Design Vue': 'ant-design-vue',
  'Element': 'element-plus',
}

// 自动安装依赖
function install (cmdPath, options) {
  const { frame, library } = options;
  const command = `pnpm add ${frame} && pnpm add ${LibraryMap[library]}`
  return new Promise(function (resolve, reject) {
    const spinner = ora();
    spinner.start(
      `正在安装依赖，请稍等`
    );
    exec(
      command,
      {
        cwd: path.resolve(cmdPath),
      },
      function (error) {
        if (error) {
          reject();
          spinner.fail(`依赖安装失败`);
          return;
        }
        spinner.succeed(`依赖安装成功`);
        resolve()
      }
    )
  })
}

export { inquirerPrompt, install, isOverride }