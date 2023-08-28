"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inquirerPrompt = inquirerPrompt;
exports.install = install;
exports.isOverride = void 0;
var _inquirer = _interopRequireDefault(require("inquirer"));
var _child_process = require("child_process");
var _path = _interopRequireDefault(require("path"));
var _ora = _interopRequireDefault(require("ora"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const isOverride = async (name, targetDir) => {
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      name: 'action',
      type: 'list',
      // 提示信息
      message: `${name} is existed, do you want to overwrite this directory`,
      // 选项
      choices: [{
        name: 'overwrite',
        value: true
      }, {
        name: 'cancel',
        value: false
      }]
    }]).then(options => {
      const {
        action
      } = options;
      resolve(action);
    });
  });
};

// 交互式询问列表
exports.isOverride = isOverride;
function inquirerPrompt(argv) {
  const {
    name
  } = argv;
  return new Promise((resolve, reject) => {
    _inquirer.default.prompt([{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: name,
      validate: function (val) {
        if (!/^[a-zA-Z]+$/.test(val)) {
          return "模板名称只能含有英文";
        }
        if (!/^[A-Z]/.test(val)) {
          return "模板名称首字母必须大写";
        }
        return true;
      }
    }, {
      type: 'list',
      name: 'type',
      message: 'Choose Template type',
      choices: ['form', 'dynamicForm', 'nestedForm'],
      filter: function (value) {
        return {
          'form': "form",
          'dynamicForm': "dynamicForm",
          'nestedForm': "nestedForm"
        }[value];
      }
    }, {
      type: 'list',
      message: 'Choose Frame type',
      choices: ['vue', 'react'],
      name: 'frame'
    }]).then(answers => {
      const {
        frame
      } = answers;
      if (frame === 'react') {
        _inquirer.default.prompt([{
          type: 'list',
          message: 'Choose UI Library',
          choices: ['Ant Design'],
          name: 'library'
        }]).then(answers1 => {
          resolve(_objectSpread(_objectSpread({}, answers), answers1));
        }).catch(error => {
          reject(error);
        });
      }
      if (frame === 'vue') {
        _inquirer.default.prompt([{
          type: 'list',
          message: 'Choose UI Library',
          choices: ['Element'],
          name: 'library'
        }]).then(answers2 => {
          resolve(_objectSpread(_objectSpread({}, answers), answers2));
        }).catch(error => {
          reject(error);
        });
      }
    }).catch(error => {
      reject(error);
    });
  });
}
const LibraryMap = {
  'Ant Design': 'antd',
  'iView': 'view-ui-plus',
  'Ant Design Vue': 'ant-design-vue',
  'Element': 'element-plus'
};

// 自动安装依赖
function install(cmdPath, options) {
  const {
    frame,
    library
  } = options;
  const command = `pnpm add ${frame} && pnpm add ${LibraryMap[library]}`;
  return new Promise(function (resolve, reject) {
    const spinner = (0, _ora.default)();
    spinner.start(`正在安装依赖，请稍等`);
    (0, _child_process.exec)(command, {
      cwd: _path.default.resolve(cmdPath)
    }, function (error) {
      if (error) {
        reject();
        spinner.fail(`依赖安装失败`);
        return;
      }
      spinner.succeed(`依赖安装成功`);
      resolve();
    });
  });
}