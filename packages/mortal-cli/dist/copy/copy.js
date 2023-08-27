"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;
exports.copyFile = copyFile;
exports.copyTemplate = copyTemplate;
exports.mkdirGuard = mkdirGuard;
exports.readTemplate = readTemplate;
var _copyDir = _interopRequireDefault(require("copy-dir"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _mustache = _interopRequireDefault(require("mustache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 读取动态模板文件内容
function readTemplate(path, data = {}) {
  const str = _fs.default.readFileSync(path, {
    encoding: 'utf8'
  });
  return _mustache.default.render(str, data);
}

// 拷贝模版并动态修改
function copyTemplate(from, to, data = {}) {
  if (_path.default.extname(from) !== '.tpl') {
    return copyFile(from, to);
  }
  const parentToPath = _path.default.dirname(to);
  mkdirGuard(parentToPath);
  _fs.default.writeFileSync(to, readTemplate(from, data));
}

// 目录守卫：父目录不存在时，立即创建目录
function mkdirGuard(target) {
  try {
    // 创建文件夹目录，父目录不存在，则报错被catch捕获
    _fs.default.mkdirSync(target, {
      recursive: true
    });
  } catch (e) {
    // mkdirp(target)
    // export function mkdirp (dir) {
    //   // 检测目录是否存在
    //   if (fs.existsSync(dir)) { return true }
    //   const dirname = path.dirname(dir);
    //   console.log('dir', dir)
    //   mkdirp(dirname);
    //   // fs.mkdirSync(dir);
    // }
  }
}

// 拷贝文件夹
function copyDir(from, to, options) {
  mkdirGuard(to);
  _copyDir.default.sync(from, to, options);
}

// 拷贝文件
function copyFile(from, to) {
  const buffer = _fs.default.readFileSync(from);
  const parentPath = _path.default.dirname(to);
  mkdirGuard(parentPath);
  _fs.default.writeFileSync(to, buffer);
}
function checkMkdirExists(path) {
  return _fs.default.existsSync(path);
}
;