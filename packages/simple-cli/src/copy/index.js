
import path from 'path'
import fs from 'fs-extra';
import { inquirerPrompt, install, isOverride } from './inquirer'
import { copyDir, copyFile, copyTemplate, checkMkdirExists } from './copy'

const parseOptions = async (argv) => {
  inquirerPrompt(argv).then(answers => {
    const { name, type } = answers;
    const targetDir = path.resolve(process.cwd(), `./${name}`)
    const isMkdirExists = checkMkdirExists(targetDir);
    if (isMkdirExists) {
      isOverride(name, targetDir).then(async action => {
        if (!action) {
          return;
        } else {
          console.log('\r\noverwriting...');
          await fs.remove(targetDir);
          console.log('overwrite done');
          copyDir(
            path.resolve(__dirname, `./template/${type}`),
            path.resolve(process.cwd(), `./${name}`)
          )
        }
      })
    } else {
      // 1、拷贝文件夹
      copyDir(
        path.resolve(__dirname, `./template/${type}`),
        path.resolve(process.cwd(), `./${name}`)
      )
      // // 2、拷贝文件
      // copyFile(
      //   path.resolve(__dirname, `./template/${type}/index.js`),
      //   path.resolve(process.cwd(), `./${name}/index.js`),
      //   {
      //     name,
      //   }
      // )
      // 3、拷贝模版
      // copyTemplate(
      //   path.resolve(__dirname, `./template/${type}/index.tpl`),
      //   path.resolve(process.cwd(), `./${name}/index.js`),
      //   {
      //     name,
      //   }
      // )
      install(process.cwd(), answers);
    }
  })
}

export default parseOptions