import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import Creator from './creator.js';
// import getPromptFeatures from './get-prompt-features.js';

/**
 * 执行create时的处理
 * @param {any} name // 创建的项目名
 * @param {any} options // 配置项 必须是上面option配置的选项之一，否则就报错  这里取的起始就是cmd里面的options的各个option的long属性
 */
const create = async (projectName, options) => {
  // 先判断是否重名，如果重名，若选择了force则直接覆盖之前的目录，否则报错
  // 获取工作目录
  const cwd = process.cwd();
  // 目标目录也就是要创建的目录
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    // 选择了强制创建，先删除旧的目录，然后创建新的目录
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          // 提示信息
          message: `${projectName} is existed, do you want to overwrite this directory`,
          // 选项
          choices: [
            { name: 'overwrite', value: true },
            { name: 'cancel', value: false },
          ],
        },
      ]);
      if (!action) {
        return;
      } else {
        console.log('\r\noverwriting...');
        await fs.remove(targetDir);
        console.log('overwrite done');
      }
    }
  }
  // const promptFeatures = getPromptFeatures();
  // 创建项目
  const creator = new Creator(projectName, targetDir);
  creator.create();
};

export default create;