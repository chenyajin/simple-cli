"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _request = require("./request.js");
var _utils = require("./utils.js");
var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));
var _util = _interopRequireDefault(require("util"));
var _inquirer = _interopRequireDefault(require("inquirer"));
var _ora = _interopRequireDefault(require("ora"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // 编写一个creator类，整个找模板到下载模板的主要逻辑都抽象到了这个类中。
class Creator {
  constructor(projectName, targetDir) {
    _defineProperty(this, "fetchRepo", async () => {
      const branches = await (0, _utils.loading)(_request.fetchRepoList, 'waiting for fetch resources');
      return branches;
    });
    _defineProperty(this, "fetchTag", () => {});
    _defineProperty(this, "download", async branch => {
      // 1 拼接下载路径 这里放自己的模板仓库url
      const requestUrl = `chenyajin/clone-template/#${branch}`;
      // 2 把资源下载到某个路径上
      await this.downloadGitRepo(requestUrl, this.dir);
    });
    _defineProperty(this, "create", async () => {
      // 1 先去拉取当前仓库下的所有分支
      const branches = await this.fetchRepo();
      // 这里会在shell命令行弹出选择项，选项为choices中的内容
      const {
        curBranch
      } = await _inquirer.default.prompt([{
        name: 'curBranch',
        type: 'list',
        // 提示信息
        message: 'please choose current version:',
        // 选项
        choices: branches.filter(branch => branch.name !== 'main').map(branch => ({
          name: branch.name,
          value: branch.name
        }))
      }]);
      // 2 下载
      const spinner = (0, _ora.default)();
      spinner.start(`Creating...., Please wait`);
      await this.download(curBranch);
      spinner.succeed(`Done`);
    });
    this.name = projectName;
    this.dir = targetDir;
    // 将downloadGitRepo转成promise
    this.downloadGitRepo = _util.default.promisify(_downloadGitRepo.default);
  }
}
;
var _default = Creator;
exports.default = _default;