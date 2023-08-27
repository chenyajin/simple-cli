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
/**
 * 初始化
 * @param {any} name // 创建的项目名
 * @param {any} options // 配置项
 */
const create = async (name, options) => {
  let projectName = !name ? await createProjectName() : name;
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
  // 创建项目
  const creator = new _creator.default(projectName, targetDir);
  creator.create();
};

/**
 * 获取用户输入的项目名称
 * @returns {string} projectName
 */
const createProjectName = async () => {
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      validate: function (val) {
        if (!/^[a-zA-Z]+$/.test(val)) {
          return "模板名称只能含有英文";
        }
        // if (!/^[A-Z]/.test(val)) {
        //   return "模板名称首字母必须大写"
        // }
        return true;
      }
    }]).then(options => {
      resolve(options.name);
    });
  });
};
var _default = create;
exports.default = _default;