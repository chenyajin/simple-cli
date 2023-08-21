const copydir = require('copy-dir');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

// 读取动态模板文件内容
function readTemplate (path, data = {}) {
  const str = fs.readFileSync(path, { encoding: 'utf8' })
  return Mustache.render(str, data);
}

// 拷贝模版并动态修改
function copyTemplate (from, to, data = {}) {
  if (path.extname(from) !== '.tpl') {
    return copyFile(from, to);
  }
  const parentToPath = path.dirname(to);
  mkdirGuard(parentToPath);
  fs.writeFileSync(to, readTemplate(from, data));
}

// 目录守卫：父目录不存在时，立即创建目录
function mkdirGuard (target) {
  try {
    // 创建文件夹目录，父目录不存在，则报错被catch捕获
    fs.mkdirSync(target, { recursive: true });
  } catch (e) {
    // mkdirp(target)
    // function mkdirp (dir) {
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
function copyDir (from, to, options) {
  mkdirGuard(to);
  copydir.sync(from, to, options);
}

// 拷贝文件
function copyFile (from, to) {
  const buffer = fs.readFileSync(from);
  const parentPath = path.dirname(to);
  mkdirGuard(parentPath)
  fs.writeFileSync(to, buffer);
}

function checkMkdirExists (path) {
  return fs.existsSync(path)
};

exports.checkMkdirExists = checkMkdirExists;
exports.copyDir = copyDir;
exports.mkdirGuard = mkdirGuard;
exports.copyFile = copyFile;
exports.copyTemplate = copyTemplate;