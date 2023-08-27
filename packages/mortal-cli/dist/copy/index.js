"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _inquirer = require("./inquirer");
var _copy = require("./copy");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const parseAnswer = async argv => {
  (0, _inquirer.inquirerPrompt)(argv).then(answers => {
    const {
      name,
      type
    } = answers;
    const isMkdirExists = (0, _copy.checkMkdirExists)(_path.default.resolve(process.cwd(), `./${name}`));
    if (isMkdirExists) {
      console.log(`${name}文件夹已经存在`);
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
      (0, _copy.copyTemplate)(_path.default.resolve(__dirname, `./template/${type}/index.tpl`), _path.default.resolve(process.cwd(), `./${name}/index.js`), {
        name
      });
      (0, _inquirer.install)(process.cwd(), answers);
    }
  });
};
var _default = parseAnswer;
exports.default = _default;