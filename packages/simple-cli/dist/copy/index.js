"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _inquirer = require("./inquirer");
var _copy = require("./copy");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const parseOptions = async argv => {
  (0, _inquirer.inquirerPrompt)(argv).then(answers => {
    const {
      name,
      type
    } = answers;
    const targetDir = _path.default.resolve(process.cwd(), `./${name}`);
    const isMkdirExists = (0, _copy.checkMkdirExists)(targetDir);
    if (isMkdirExists) {
      (0, _inquirer.isOverride)(name, targetDir).then(async action => {
        if (!action) {
          return;
        } else {
          console.log('\r\noverwriting...');
          await _fsExtra.default.remove(targetDir);
          console.log('overwrite done');
          (0, _copy.copyDir)(_path.default.resolve(__dirname, `./template/${type}`), _path.default.resolve(process.cwd(), `./${name}`));
        }
      });
    } else {
      // 1、拷贝文件夹
      (0, _copy.copyDir)(_path.default.resolve(__dirname, `./template/${type}`), _path.default.resolve(process.cwd(), `./${name}`));
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
      (0, _inquirer.install)(process.cwd(), answers);
    }
  });
};
var _default = parseOptions;
exports.default = _default;