"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _creator = _interopRequireDefault(require("./creator.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  const targetDir = _path.default.join(cwd, projectName);
  if (_fsExtra.default.existsSync(targetDir)) {
    // 选择了强制创建，先删除旧的目录，然后创建新的目录
    if (options.force) {
      await _fsExtra.default.remove(targetDir);
    } else {
      const {
        action
      } = await _inquirer.default.prompt([{
        name: 'action',
        type: 'list',
        // 提示信息
        message: `${projectName} is existed, do you want to overwrite this directory`,
        // 选项
        choices: [{
          name: 'overwrite',
          value: true
        }, {
          name: 'cancel',
          value: false
        }]
      }]);
      if (!action) {
        return;
      } else {
        console.log('\r\noverwriting...');
        await _fsExtra.default.remove(targetDir);
        console.log('overwrite done');
      }
    }
  }
  // const promptFeatures = getPromptFeatures();
  // 创建项目
  const creator = new _creator.default(projectName, targetDir);
  creator.create();
};
var _default = create;
exports.default = _default;