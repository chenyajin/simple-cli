"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class PromptApi {
  constructor(creator) {
    this.creator = creator;
  }
  // 需要添加的特性
  injectFeature(feature) {
    this.creator.featurePrompts.choices.push(feature);
  }
  // 特性的弹窗
  injectPrompt(prompt) {
    this.creator.injectPrompts.push(prompt);
  }
  // 选择特性完成之后的回调
  onPromptComplete(cb) {
    this.creator.promptCompleteCbs.push(cb);
  }
}
var _default = PromptApi;
exports.default = _default;