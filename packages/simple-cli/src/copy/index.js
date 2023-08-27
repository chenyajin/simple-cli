
import path from 'path'
import { inquirerPrompt, install } from './inquirer'
import { copyDir, copyFile, copyTemplate, checkMkdirExists } from './copy'

const parseAnswer = async (argv) => {
  inquirerPrompt(argv).then(answers => {
    const { name, type } = answers;
    const isMkdirExists = checkMkdirExists(
      path.resolve(process.cwd(), `./${name}`)
    );
    if (isMkdirExists) {
      console.log(`${name}文件夹已经存在`)
    } else {
      // 1、拷贝文件夹
      // copyDir(
      //   path.resolve(__dirname, `./template/${type}`),
      //   path.resolve(process.cwd(), `./${name}`)
      // )
      // // 2、拷贝文件
      // copyFile(
      //   path.resolve(__dirname, `./template/${type}/index.js`),
      //   path.resolve(process.cwd(), `./${name}/index.js`),
      //   {
      //     name,
      //   }
      // )
      // 3、拷贝模版
      copyTemplate(
        path.resolve(__dirname, `./template/${type}/index.tpl`),
        path.resolve(process.cwd(), `./${name}/index.js`),
        {
          name,
        }
      )
      install(process.cwd(), answers);
    }
  })
}

export default parseAnswer