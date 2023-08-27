"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRepoList = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 下载仓库

_axios.default.interceptors.response.use(res => {
  return res.data;
});

// 这里是获取模板仓库的所有分支，url写自己的模板仓库url
const fetchRepoList = () => {
  return _axios.default.get('https://api.github.com/repos/chenyajin/clone-template/branches');
};
exports.fetchRepoList = fetchRepoList;